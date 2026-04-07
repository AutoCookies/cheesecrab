"""
integrations/cheese_langchain.py

Provides seamless interoperability with the LangChain ecosystem.
Wraps the PomaiDB/Cheeserag FastAPI endpoints into a LangChain `BaseRetriever`.

Example Usage:
```python
from cheese_langchain import PomaiDBRetriever
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

retriever = PomaiDBRetriever(
    api_url="http://127.0.0.1:9090",
    api_key="cheese-admin-key",
    top_k=5,
    min_score=0.75
)

qa_chain = RetrievalQA.from_chain_type(llm=OpenAI(), retriever=retriever)
print(qa_chain.run("What is PomaiDB?"))
```
"""

import requests
from typing import List, Optional
from pydantic import Field
from langchain_core.callbacks import CallbackManagerForRetrieverRun
from langchain_core.documents import Document
from langchain_core.retrievers import BaseRetriever

class PomaiDBRetriever(BaseRetriever):
    """LangChain BaseRetriever wrapper for the Cheeserag Enterprise API."""
    
    api_url: str = Field(default="http://127.0.0.1:9090", description="Base URL of the cheese_api server")
    api_key: str = Field(default="cheese-admin-key", description="API Key for Enterprise Auth")
    top_k: int = Field(default=5, description="Number of context chunks to retrieve")
    min_score: float = Field(default=0.0, description="Minimum similarity threshold for hits")

    def _get_relevant_documents(
        self, query: str, *, run_manager: CallbackManagerForRetrieverRun
    ) -> List[Document]:
        """
        Calls the /v1/retrieve PomaiDB endpoint and formats results as LangChain Documents.
        """
        headers = {"X-API-Key": self.api_key}
        payload = {
            "query": query,
            "top_k": self.top_k,
            "min_score": self.min_score
        }
        
        try:
            resp = requests.post(f"{self.api_url.rstrip('/')}/v1/retrieve", json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()
            
            docs = []
            for hit in data.get("hits", []):
                doc = Document(
                    page_content=hit.get("text", ""),
                    metadata={
                        "chunk_id": hit.get("chunk_id"),
                        "score": hit.get("score")
                    }
                )
                docs.append(doc)
            return docs
            
        except Exception as e:
            print(f"PomaiDBRetriever Error: {e}")
            return []
