import streamlit as st
import requests
import json
import os

API_URL = "http://127.0.0.1:9090"
OAI_URL = "http://127.0.0.1:8080/v1/chat/completions"

st.set_page_config(page_title="CheeseUI - Powered by PomaiDB", page_icon="🧀", layout="wide")

st.title("🧀 CheeseUI")
st.markdown("**Powered by PomaiDB & Cheesebrain** — The Local AI Operating System.")

if "messages" not in st.session_state:
    st.session_state.messages = []

# Sidebar for Ingestion
with st.sidebar:
    st.header("Upload Knowledge")
    st.info("Upload documents to PomaiDB's high-speed memory membrane.")
    uploaded_file = st.file_uploader("Choose a file (PDF, TXT, MD)", type=["pdf", "txt", "md"])
    if st.button("Ingest Document") and uploaded_file is not None:
        with st.spinner("Chunking & embedding..."):
            files = {"file": (uploaded_file.name, uploaded_file.getvalue())}
            data = {"doc_id": 1, "max_chunk_bytes": 512, "overlap_bytes": 64}
            try:
                headers = {"X-API-Key": os.environ.get("CHEESE_API_KEY", "cheese-admin-key")}
                res = requests.post(f"{API_URL}/v1/ingest", data=data, files=files, headers=headers)
                if res.status_code == 200:
                    st.success(f"Ingested {res.json().get('chunks_added', 0)} chunks successfully!")
                else:
                    st.error(f"Ingest failed: {res.text}")
            except Exception as e:
                st.error(f"Connection error: {e}")

# Main Chat Interface
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Ask about your documents..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        
        # 1. Retrieve RAG Context
        context = ""
        try:
            headers = {"X-API-Key": os.environ.get("CHEESE_API_KEY", "cheese-admin-key")}
            r_res = requests.post(f"{API_URL}/v1/retrieve", json={"query": prompt, "top_k": 3}, headers=headers)
            if r_res.status_code == 200:
                context = r_res.json().get("context", "")
        except Exception:
            pass
            
        sys_prompt = "You are a helpful assistant powered by PomaiDB. Answer based on the provided context. Cite sources format [Source Info: Chunk ID X] if used."
        if context:
            sys_prompt += f"\n\nContext:\n{context}"
            message_placeholder.markdown(f"*Searching PomaiDB... found context.*")
            
        # 2. Call local Cheesebrain LLM
        payload = {
            "model": "qwen2.5",
            "messages": [
                {"role": "system", "content": sys_prompt},
            ] + st.session_state.messages,
            "stream": True
        }
        
        full_response = ""
        try:
            with requests.post(OAI_URL, json=payload, stream=True) as r:
                for line in r.iter_lines():
                    if line:
                        line = line.decode('utf-8').removeprefix("data: ")
                        if line == "[DONE]":
                            break
                        try:
                            chunk = json.loads(line)
                            if "choices" in chunk and len(chunk["choices"]) > 0:
                                delta = chunk["choices"][0].get("delta", {}).get("content", "")
                                full_response += delta
                                message_placeholder.markdown(full_response + "▌")
                        except:
                            pass
            message_placeholder.markdown(full_response)
        except Exception as e:
            message_placeholder.markdown(f"**Error:** Could not reach local LLM at {OAI_URL}")
            full_response = "Error."
            
    st.session_state.messages.append({"role": "assistant", "content": full_response})
