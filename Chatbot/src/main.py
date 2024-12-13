import os
from NormalRag.NormalRag import RAGSystemWithExpertAssistant, RAGChainBuilder
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma

def main():
    # Path to the Chroma persistence directory
    persist_directory = "./chroma_db"
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Check if Chroma persistence directory exists
    if not os.path.exists(persist_directory):
        print("Chroma database not found. Building the RAG chain...")
        rag_builder = RAGChainBuilder(data_file="./data/products.json", embedding_model="sentence-transformers/all-MiniLM-L6-v2")
        rag_builder.load_and_index_data()
    else:
        print("Chroma database found. Skipping the build process...")
        rag_builder = RAGChainBuilder(data_file="./data/products.json", embedding_model="sentence-transformers/all-MiniLM-L6-v2")
        rag_builder.vector_store = Chroma(persist_directory=persist_directory,
                                           embedding_function=embedding_model)

    # Initialize the extended RAG system with expert assistant
    expert_rag_system = RAGSystemWithExpertAssistant(rag_builder)

    # Example query
    # user_query = "What is the price of iPad ?"
    # print("User Query: ", user_query)
    # response = expert_rag_system.query_with_expert_chain(user_query)
    # print(response)

    # user_query = "Ipad pro M4"
    # print("User Query: ", user_query)
    # response = expert_rag_system.query_with_expert_chain(user_query)
    # print(response)

    # user_query = "battery life"
    # print("User Query: ", user_query)
    # response = expert_rag_system.query_with_expert_chain(user_query)
    # print(response)
    
    # user_query = "What is the price of iPhone 16 ?"
    # print("User Query: ", user_query)
    # response = expert_rag_system.query_with_expert_chain(user_query)
    # print(response)

if __name__ == "__main__":
    main()
