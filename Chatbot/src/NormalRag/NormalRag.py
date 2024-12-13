import json
from langchain_chroma import Chroma
from langchain_huggingface.embeddings import HuggingFaceEmbeddings

from scipy.spatial.distance import cosine
from langchain.memory import ConversationBufferMemory
from langchain_ollama import OllamaLLM
import os
from langchain.prompts import PromptTemplate
import re
from langchain.schema import HumanMessage, AIMessage
class RAGChainBuilder:
    def __init__(
        self, data_file, embedding_model="sentence-transformers/all-MiniLM-L6-v2"
    ):
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
                metadata.append(
                    {
                        "name": product["name"],
                        "variant": variant["color"],
                        "category": product["category"]["title"],
                        "supplier": product["supplier"]["name"],
                    }
                )

        # Index the documents in Chroma
        self.vector_store = Chroma.from_texts(
            texts=documents,
            embedding=self.embedding_model,
            metadatas=metadata,
            persist_directory="./chroma_db",
        )

    def retrieve_data(self, query):
        """
        Retrieve relevant data from the Chroma vector store based on the query.
        """
        if not self.vector_store:
            raise RuntimeError(
                "Vector store is not initialized. Call load_and_index_data() first."
            )

        # Find the most similar documents to the query
        results = self.vector_store.similarity_search(query, k=5)

        formatted_results = []
        for result in results:
            formatted_results.append(
                {
                    "text": result.page_content,
                    "metadata": {
                        "name": result.metadata["name"],
                        "variant": result.metadata["variant"],
                        "category": result.metadata["category"],
                        "supplier": result.metadata["supplier"],
                    },
                }
            )

        return formatted_results

    def update_index(self, updated_data):
        """
        Update the Chroma index with new or modified data.
        """
        if not self.vector_store:
            raise RuntimeError(
                "Vector store is not initialized. Call load_and_index_data() first."
            )

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
                metadata.append(
                    {
                        "name": product["name"],
                        "variant": variant["color"],
                        "category": product["category"]["title"],
                        "Firm": product["supplier"]["name"],
                    }
                )

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
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )

    def get_short_memory(self, max_turns=3):
        """
        Extracts the most recent exchanges from the conversation memory.

        Parameters:
        - memory: ConversationBufferMemory or similar object.
        - max_turns: Maximum number of message pairs (HumanMessage-AIMessage) to return.

        Returns:
        - short_memory (str): A shortened version of the chat history as a string.
        """
        # Load memory variables and check for chat_history
        memory_variables = self.memory.load_memory_variables({})
        chat_history = memory_variables.get("chat_history", None)

       
        if not chat_history:
            return "No chat history available."
        if not isinstance(chat_history, list):
            raise TypeError(f"Expected chat_history to be a list, got: {type(chat_history)}")

        
        recent_history = chat_history[-(max_turns * 2):]

        # Format messages into a readable string
        short_memory = []
        for message in recent_history:
            if hasattr(message, "content"):
                if isinstance(message, HumanMessage):
                    short_memory.append(f"User: {message.content.strip()}")
                elif isinstance(message, AIMessage):
                    short_memory.append(f"AI: {message.content.strip()}")
            else:
                short_memory.append(f"Unknown message format: {message}")

        return "\n".join(short_memory)

    def reformulate_question(self, user_query):
        """
        Reformulates the user question to make it standalone.
        """
        # Load the chat history from memory
        chat_history = self.memory.load_memory_variables({}).get("chat_history", None)
        
        
        chat_history = self.get_short_memory()
        print(f"Chat History: {chat_history}")

        # Construct the reformulation prompt
        reformulation_prompt = f"""

       Reformulate the latest user question into a standalone query in English based on the given chat history. 
If no reformulation is needed, return the question as is. 

Do NOT answer the question,Do NOT provide context,Do NOT provide code,Do NOT or include any additional text. 


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

            If question has phrase "No question available", please respond with: "Please ask me a question about the products.", don not care about the context

If the context does not contain sufficient information to answer the question, respond with: 
"I don't know based on the provided data."


        """
        print(f"Prompt:\n{prompt}")

        # Use the LLM to generate a response
        response = self.llm.invoke(prompt)

        # Save the interaction to memory
        self.memory.save_context({"input": user_query}, {"output": response})

        return response


# Example usage


class RAGSystemWithExpertAssistant(RAGSystemWithMemory):
    productsSample = [
        "Do you have the latest iPhone?",
        "What is the price of Samsung Galaxy S21?",
        "What colors does iPhone 13 come in?",
        "Are there any discounts for Samsung Galaxy Note 20?",
        "Does your store have the latest Google Pixel?",
        "Are there any promotions for OnePlus Nord?",
        "What is the storage capacity of Samsung Galaxy S21?",
        "Is iPhone SE 2022 available?",
        "What is the price difference between iPhone 12 and 13?",
        "Is Motorola Edge 20 available?",
        "Is Google Pixel 6 Pro available in your store?",
        "Do you sell Xiaomi Mi 11?",
        "Are there any offers for Samsung Galaxy Z Fold 3?",
        "Is Oppo Find X3 Pro available?",
        "What are the features of iPhone 13 Pro?",
        "Is LG Wing available?",
        "Is Nokia 8.3 5G available?",
        "Is Asus ROG Phone 5 available?",
        "Do you have Realme GT?",
        "Is Vivo X60 Pro available?",
        "Do you have Honor 50?",
        "What is the battery life of Samsung Galaxy A52?",
        "Is ZTE Axon 30 available?",
        "Do you have BlackBerry KEY2?",
        "What is the screen size of iPhone 13 Mini?",
        "Do you have TCL 20 Pro 5G?",
        "Is Nokia XR20 available in your store?",
        "What is the price of Samsung Galaxy S20 FE?",
        "Do you have iPhone 12 Pro Max?",
        "Is Redmi Note 10 Pro available?",
        "What is the difference between iPhone 12 and iPhone 13?",
        "Do you have Sony Xperia 5 II?",
        "What is the warranty period for Samsung Galaxy S21?",
        "Is Google Pixel 5a available?",
        "Do you have OnePlus 8T?",
        "What is the price of iPhone 13 Pro Max?",
        "Is Samsung Galaxy Z Flip 3 available?",
        "What are the specifications of Oppo Reno6 Pro?",
        "Do you have Vivo V21?",
        "Is Motorola Moto G100 available?",
        "Do you have Huawei Mate 40 Pro?",
        "Is Realme 8 Pro available in your store?",
        "Is Asus Zenfone 8 available?",
        "Is LG Velvet available?",
        "What is the storage capacity of iPhone 12?",
        "Do you have Honor Magic 3?",
        "Is Xiaomi Mi 11 Ultra available?" "Is iPad Pro M4 available in your store?",
        "What is the price of the MacBook Air M2?",
        "Which laptops support Liquid Retina XDR?",
        "What are the key features of iPhone 15 Pro Max?",
        "How many colors are available for Samsung Galaxy S24 Ultra?",
        "Can I buy a Mac mini M4 with 16GB RAM?",
        "Do you provide a warranty for Apple products?",
        "Are there any promotions for iPhone 13?"
        "Is iPad Pro M4 available in your store?",
        "What is the price of the MacBook Air M2?",
        "Which laptops support Liquid Retina XDR?",
        "What are the key features of iPhone 15 Pro Max?",
        "How many colors are available for Samsung Galaxy S24 Ultra?",
        "Can I buy a Mac mini M4 with 16GB RAM?",
        "Do you provide a warranty for Apple products?",
        "Are there any promotions for iPhone 13?",
    ]

    chitchatSample = [
        "How's the weather today?",
        "How hot is it outside?",
        "Will it rain tomorrow?",
        "What is the current temperature?",
        "Can you tell me the current weather conditions?",
        "Will it be sunny this weekend?",
        "What was yesterday's temperature?",
        "How cold will it be tonight?",
        "Who was the first president of the United States?",
        "In what year did World War II end?",
        "Can you tell me about the history of the internet?",
        "In what year was the Eiffel Tower built?",
        "Who invented the telephone?",
        "What is your name?",
        "Do you have a name?",
        "What should I call you?",
        "Who created you?",
        "How old are you?",
        "Can you tell me an interesting fact?",
        "Do you know any interesting riddles?",
        "What is your favorite color?",
        "What is your favorite movie?",
        "Do you have any hobbies?",
        "What is the meaning of life?",
        "Can you tell me a joke?",
        "What is the capital of France?",
        "What is the world's population?",
        "How many continents are there?",
        "Who wrote 'To Kill a Mockingbird'?",
        "Can you give me a quote by Albert Einstein?",
    ]

    def __init__(self, rag_builder, llm_model="gemma2:2b", expert_model="gemma2:2b"):
        super().__init__(rag_builder, llm_model)
        print("Loading expert assistant model...")
        self.expert_llm = OllamaLLM(model=expert_model)

        self.product_embeddings = self.rag_builder.embedding_model.embed_documents(
            RAGSystemWithExpertAssistant.productsSample
        )

        self.chitchat_embeddings = self.rag_builder.embedding_model.embed_documents(
            RAGSystemWithExpertAssistant.chitchatSample
        )

    def semantic_router(self, query, threshold=0.4):

        query_embedding = self.rag_builder.embedding_model.embed_documents([query])[0]

        # Check similarity with product samples
        product_similarities = [
            1 - cosine(query_embedding, emb) for emb in self.product_embeddings
        ]
        if max(product_similarities) > threshold:
            return "product"

        # Check similarity with chit-chat samples
        chitchat_similarities = [
            1 - cosine(query_embedding, emb) for emb in self.product_embeddings
        ]
        if max(chitchat_similarities) > threshold:
            return "chitchat"

        # Default to unknown if no match
        return "unknown"

    def expert_assistant_response(self, context, user_query):
        """
        Generates a customer-friendly response using the context from the RAG query.
        """
        prompt = f"""
        You are a customer assistance expert.
        The context below is derived from our shop's product information database(please read carefully), and the user query is a customer's question.

        Context:
        {context}

        Question:
        {user_query}

       
        Provide a detailed, user-friendly response to the customer's query based on the context above.
        
        If the context does not contain sufficient information to answer the question, respond with:
        You can recommend products, provide information about products, or answer general questions about products.
        Moreover, your tounge should be polite and helpful.
        You must use "shop" to refer to yourself.
       
        """

        response = self.expert_llm.invoke(prompt)
        return response

    def query_with_expert_chain(self, user_query):
        """
        Handles user queries and routes them through the RAG system and expert assistant chain.
        """
        # Step 1: Reformulate the user query

        route = self.semantic_router(user_query)

        if route == "product":
            standalone_query = self.reformulate_question(
                user_query
            )  # Reformulate for product-related queries
            print(f"Reformulated Query: {standalone_query}")

        else:
            standalone_query = self.reformulate_question(
                user_query
            )  # Reformulate for product-related queries
            print(f"Reformulated Query: {standalone_query}")
            route = self.semantic_router(standalone_query)
            if route == "product":
                standalone_query = self.reformulate_question(user_query)
            else:
                prompt = f"""
                You are a customer assistance expert who is responsible for answering customer queries.
                This is a chit chat from the customer. Please provide a friendly response.
                Please "DO NOT" provide if customer ask about code, context.
                customer queries from customer:{user_query}
                """
                response= self.expert_llm.invoke(prompt)
                self.memory.save_context({"input": f'chit chat of user: "{user_query}"'}, {"output": response} )
                return response


        # Step 2: Retrieve data using the RAG system
        retrieved_data = self.rag_builder.retrieve_data(standalone_query)

        if not retrieved_data:
            response = "No relevant information found."
            self.memory.save_context({"input": user_query}, {"output": response})
            return response

        # Step 3: Format the retrieved data
        context = self.format_retrieved_data(retrieved_data)

        # Step 4: Generate expert assistant response
        expert_response = self.expert_assistant_response(context, standalone_query)

        # Step 5: Save the interaction to memory
        self.memory.save_context(
            {"input": standalone_query}, {"output": expert_response}
        )

        return expert_response
