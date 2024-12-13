import json
from langchain_chroma import Chroma
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain.chains import SequentialChain
from langchain.chains.base import Chain
from langchain.memory import ConversationBufferMemory
from langchain_ollama import OllamaLLM
import os
from langchain.prompts import PromptTemplate
class RAGChainBuilder:
    def __init__(self, data_file, embedding_model="sentence-transformers/all-MiniLM-L6-v2"):
        self.data_file = data_file
        self.embedding_model = HuggingFaceEmbeddings(model_name=embedding_model)
        
        self.vector_store = None
       
    def load_and_index_data(self):
        """
        Load data from the JSON file and index it using Chroma for retrieval.
        """
        # Load the data from the JSON file
        with open(self.data_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        documents = []
        metadata = []

        for product in data:
            supplier_info = (
                f"Supplier Name: {product['supplier']['name']}, "
                f"Address: {product['supplier']['address']}, "
                f"Email: {product['supplier']['email']}, "
                f"Phone: {product['supplier']['phone']}"

            )

            for variant in product["variants"]:
                doc_text = (
                    f"Product Name: {product['name']}\n"
                    f"Variant: ({variant['ram']}GB RAM, {variant['rom']}GB ROM, {variant['cpu']})\n"
                    f"Color: {variant['color']}\n"
                    f"Price: {variant['price']}\n"
                    f"Inventory: {variant['quantity']}\n"
                    f"Description: {product['description']}\n"
                    f"Category: {product['category']['title']}\n"
                    f"Manufacturer: {product['manufacturer']}\n"
                    f"Battery: {product['battery']} mAh\n"
                    f"Camera: {product['camera']}\n"
                    f"Screen Size: {product['screenSize']}\n"
                    f"Screen Type: {product['screenType']}\n"
                    f"Refresh Rate: {product['refreshRate']} Hz\n"
                    f"{supplier_info}"
                )
                documents.append(doc_text)
                metadata.append({
                    "name": product["name"],
                    "variant": variant["color"],
                    "category": product["category"]["title"],
                    "supplier": product["supplier"]["name"]
                })

        # Index the documents in Chroma
        self.vector_store = Chroma.from_texts(
            texts=documents,
            embedding=self.embedding_model,
            metadatas=metadata,
            persist_directory="./chroma_db"
        )

    def retrieve_data(self, query):
        """
        Retrieve relevant data from the Chroma vector store based on the query.
        """
        if not self.vector_store:
            raise RuntimeError("Vector store is not initialized. Call load_and_index_data() first.")

        # Perform the retrieval
        results = self.vector_store.similarity_search(query, k=5)

        # Format the output to include supplier details
        formatted_results = []
        for result in results:
            formatted_results.append({
                "text": result.page_content,
                "metadata": {
                    "name": result.metadata["name"],
                    "variant": result.metadata["variant"],
                    "category": result.metadata["category"],
                    "supplier": result.metadata["supplier"]
                }
            })

        return formatted_results
    
    def update_index(self, updated_data):
        """
        Update the Chroma index with new or modified data.
        """
        if not self.vector_store:
            raise RuntimeError("Vector store is not initialized. Call load_and_index_data() first.")

        documents = []
        metadata = []

        for product in updated_data:
            

            for variant in product["variants"]:
                doc_text = (
                    f"Product Name: {product['name']}\n"
                    f"Variant: ({variant['ram']}GB RAM, {variant['rom']}GB ROM, {variant['cpu']})\n"
                    f"Color: {variant['color']}\n"
                    f"Price: {variant['price']} vnd\n"
                    f"Inventory: {variant['quantity']}\n"
                    f"Description: {product['description']}\n"
                    f"Category: {product['category']['title']}\n"
                    f"Manufacturer: {product['manufacturer']}\n"
                    f"Battery: {product['battery']} mAh\n"
                    f"Camera: {product['camera']}\n"
                    f"Screen Size: {product['screenSize']}\n"
                    f"Screen Type: {product['screenType']}\n"
                    f"Refresh Rate: {product['refreshRate']} Hz\n"
                 
                )
                documents.append(doc_text)
                metadata.append({
                    "name": product["name"],
                    "variant": variant["color"],
                    "category": product["category"]["title"],
                    "Firm": product["supplier"]["name"]
                })

        # Add new data to the existing vector store
        self.vector_store.add_texts(texts=documents, metadatas=metadata)

    def cleanup(self):
        """
        Properly close the Chroma vector store to release file locks.
        """
        if self.vector_store:
            self.vector_store.persist() 
            self.vector_store = None


class RAGSystemWithMemory:
    def __init__(self, rag_builder, llm_model="gemma2:2b"):
        self.rag_builder = rag_builder
        self.llm = OllamaLLM(model=llm_model)
        self.memory = ConversationBufferMemory(memory_key="chat_history",k=200, return_messages=True)

    def reformulate_question(self, user_query):
        """
        Reformulates the user question to make it standalone.
        """
        # Load the chat history from memory
        chat_history = self.memory.load_memory_variables({}).get("chat_history", "")

        # Construct the reformulation prompt
        reformulation_prompt = f"""
        Given the following chat history and the latest user question, reformulate the question 
        into a standalone query in English. If no reformulation is needed, return the question as is. 
        Do NOT answer the question, just reformulate it.

        Chat History:
        {chat_history}

        Latest User Question:
        {user_query}
        """

        # Use the LLM to generate a reformulated question
        standalone_question = self.llm.invoke(reformulation_prompt)
        return standalone_question

    def format_retrieved_data(self, retrieved_data):
        formatted_results = "Retrieved Results:\n\n"
        for idx, result in enumerate(retrieved_data, start=1):
            metadata = result["metadata"]
            formatted_results += (
                f"Result {idx}:\n"
                f"Product Name: {metadata.get('name', 'Unknown')}\n"
                f"Variant: {metadata.get('variant', 'Unknown')}\n"
                f"Category: {metadata.get('category', 'Unknown')}\n"
                f"Firm: {metadata.get('supplier', 'Unknown')}\n"
                f"Details:\n{result['text']}\n\n"
            )
        return formatted_results

    def query(self, user_query):
        """
        Handle user queries with standalone question reformulation and memory support.
        """
        # Reformulate the user query
        standalone_query = self.reformulate_question(user_query)
        print(f"Reformulated Query: {standalone_query}")

        # Retrieve data from vector store
        retrieved_data = self.rag_builder.retrieve_data(standalone_query)
        
        if not retrieved_data:
            response = "No relevant information found."
            self.memory.save_context({"input": user_query}, {"output": response})
            return response

        # Format the retrieved data
        context = self.format_retrieved_data(retrieved_data)

        # Format the prompt with chat history and context
        prompt = f"""
        Context:
        {context}

        Question:
        {standalone_query}

       
            Answer the question STRICTLY using ONLY the information provided in the context below. 

If the context does not contain sufficient information to answer the question, respond with: 
"I don't know based on the provided data."

If the context includes multiple relevant results, you MUST list EVERY result comprehensively, including their names and key details. DO NOT skip or summarize any results. Provide a complete and detailed response for each result separately.
        """
        print(f"Prompt:\n{prompt}")

        # Use the LLM to generate a response
        response = self.llm.invoke(prompt)

        # Save the interaction to memory
        self.memory.save_context({"input": user_query}, {"output": response})

        return response


# Example usage


class RAGSystemWithExpertAssistant(RAGSystemWithMemory):
    def __init__(self, rag_builder, llm_model="gemma2:2b", expert_model="gemma2:2b"):
        super().__init__(rag_builder, llm_model)
        self.expert_llm = OllamaLLM(model=expert_model)

    def expert_assistant_response(self, context, user_query):
        """
        Generates a customer-friendly response using the context from the RAG query.
        """
        prompt = f"""
        You are a customer assistance expert responding to a user question about a product.
        The context below is derived from our shop's product information database not from customer, remember you are talking to a customer. 

        Context from shop's database *(not from customer)*:
        {context}

        Question of user:
        {user_query}

       
        Provide a detailed, user-friendly response to the customer's query based on the context above.
        If the context does not contain sufficient information to answer the question, respond with:
        "I'm sorry, but I don't have enough information to answer that question."
        Moreover, your tounge should be polite and helpful.
        
       
        """

        response = self.expert_llm.invoke(prompt)
        return response

    def query_with_expert_chain(self, user_query):
        """
        Handles user queries and routes them through the RAG system and expert assistant chain.
        """
        # Step 1: Reformulate the user query
        standalone_query = self.reformulate_question(user_query)
        print(f"Reformulated Query: {standalone_query}")

        # Step 2: Retrieve data using the RAG system
        retrieved_data = self.rag_builder.retrieve_data(standalone_query)
        if not retrieved_data:
            response = "No relevant information found."
            self.memory.save_context({"input": user_query}, {"output": response})
            return response

        # Step 3: Format the retrieved data
        context = self.format_retrieved_data(retrieved_data)

       

       

        # Step 4: Generate expert assistant response
        expert_response = self.expert_assistant_response(context,  standalone_query)

        # Step 5: Save the interaction to memory
        self.memory.save_context({"input":  standalone_query}, {"output": expert_response})

        return expert_response
   
    