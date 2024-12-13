from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from src.NormalRag.NormalRag import RAGSystemWithExpertAssistant, RAGChainBuilder
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from src.fetchData import fetch_products_and_save_to_json
from dotenv import load_dotenv

# Load environment variables
dotenv_path = "./.env"
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
else:
    raise FileNotFoundError(f".env file not found at {dotenv_path}")


NEXT_PUBLIC_API_URL = os.getenv("NEXT_PUBLIC_API_URL")
TOKEN = os.getenv("TOKEN")

if not NEXT_PUBLIC_API_URL or not TOKEN:
    raise ValueError("Missing required environment variables: NEXT_PUBLIC_API_URL or TOKEN.")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

user_rag_systems = {}
shared_rag_builder = None

class UserSession(BaseModel):
    user_id: str

class Query(BaseModel):
    user_id: str
    user_query: str

def initialize_shared_rag_system():
    """
    Initialize a shared RAG system that is used by all users.
    """
    global shared_rag_builder
    persist_directory = "./shared_chroma_db"
    data_file = "./src/data/products.json"

    if shared_rag_builder is None:
        # Check if the shared Chroma DB exists
        if not os.path.exists(persist_directory):
            print("Building shared Chroma DB...")
            # Build Chroma DB if it doesn't exist
            shared_rag_builder = RAGChainBuilder(data_file=data_file, embedding_model="sentence-transformers/all-MiniLM-L6-v2")
            shared_rag_builder.load_and_index_data()
        else:
            print("Loading existing shared Chroma DB...")
            # Load the existing Chroma DB
            embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
            shared_rag_builder = RAGChainBuilder(data_file=data_file, embedding_model="sentence-transformers/all-MiniLM-L6-v2")
            shared_rag_builder.vector_store = Chroma(persist_directory=persist_directory, embedding_function=embedding_model)
    return shared_rag_builder

def initialize_rag_system_for_user(user_id: str):
    """
    Initialize the RAG system for a specific user.
    """
    if user_id in user_rag_systems:
        raise HTTPException(status_code=400, detail=f"RAG system already initialized for user {user_id}.")

    persist_directory = f"./chroma_db/{user_id}"  
    data_file = "./src/data/products.json"

   
    if not os.path.exists(data_file):
        print(f"Data file {data_file} not found. Fetching data...")
        fetch_products_and_save_to_json(data_file)

    
    print(f"Assigning shared Chroma DB to user {user_id}...")
   
    # Use the shared RAG system for all users
    shared_rag_builder = initialize_shared_rag_system()

   
    user_rag_systems[user_id] = RAGSystemWithExpertAssistant(shared_rag_builder)
    print(f"RAG system initialized for user {user_id}.")

@app.post("/open")
def open_user_session(session: UserSession):
    """
    Open a RAG system session for a user.
    """
    user_id = session.user_id
    try:
        initialize_rag_system_for_user(user_id)
        return {"message": f"RAG system initialized for user {user_id}.", "user_id": user_id}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query")
def handle_user_query(query: Query):
    """
    Handle user queries while maintaining user-specific RAG system sessions.
    """
    user_id = query.user_id
    user_query = query.user_query
    

    if user_id not in user_rag_systems:
        raise HTTPException(status_code=400, detail=f"RAG system not initialized for user {user_id}. Please call /open first.")

    # Retrieve the user's RAG system
    rag_system = user_rag_systems[user_id]

    # Process the query
    response = rag_system.query_with_expert_chain(user_query)
    return {"user_id": user_id, "response": response}

@app.post("/close")
def close_user_session(session: UserSession):
    """
    Close the RAG system session for a user and clean up resources.
    """
    user_id = session.user_id
    if user_id in user_rag_systems:
        del user_rag_systems[user_id]
        return {"message": f"RAG system for user {user_id} has been closed."}
    else:
        raise HTTPException(status_code=400, detail=f"No active RAG system for user {user_id}.")
