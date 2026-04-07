import asyncio
import sys
sys.path.insert(0, "/home/autocookie/pomaieco/cheeserag")
from cheese_api.server import app, ingest
from fastapi import UploadFile
import os

os.environ["RAG_DB_PATH"] = "/home/autocookie/pomaieco/cheeserag/rag_db"

async def test_ingestion():
    with open('/home/autocookie/Downloads/Quan-Van-TopCV.vn-290326.00635.pdf', 'rb') as f:
        file_obj = UploadFile(filename="Quan-Van-TopCV.vn-290326.00635.pdf", file=f)
        try:
            res = await ingest(
                doc_id=123,
                text=None,
                max_chunk_bytes=512,
                overlap_bytes=64,
                file=file_obj,
                api_key="cheese-admin-key"
            )
            print(res)
        except Exception as e:
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_ingestion())
