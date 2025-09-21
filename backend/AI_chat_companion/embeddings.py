from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings

def load_chroma_db():
    """
    Load ChromaDB with LangChain wrapper for retrieval.
    """
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    
    # Local Chroma persistence directory
    vectordb = Chroma(
        persist_directory="chroma_db",
        embedding_function=embeddings
    )
    return vectordb
