#!/usr/bin/env python3
"""
scripts/evaluate_rag.py

A quantitative MLOps evaluation script for PomaiDB RAG pipelines. 
Calculates basic context relevancy and utilizes the local Cheesebrain LLM-as-a-judge 
to evaluate response Faithfulness. Very useful for CI/CD and demonstrating model performance.
"""

import requests
import json
import time

API_URL = "http://127.0.0.1:9090"
OAI_URL = "http://127.0.0.1:8080/v1/chat/completions"

# Basic synthetic dataset for demonstration
EVALUATION_DATASET = [
    {
        "query": "What is the capital of France?",
        "ground_truth": "The capital of France is Paris."
    },
    {
        "query": "How does the embedding layer work?",
        "ground_truth": "It transforms discrete tokens into dense continuous vectors representing meaning."
    }
]

def run_evaluation():
    print("=" * 60)
    print("🧀 PomaiDB RAG Evaluation Pipeline".center(60))
    print("=" * 60)
    
    total_score = 0
    
    for idx, item in enumerate(EVALUATION_DATASET):
        print(f"\n[Test Case {idx+1}]")
        print(f"Query: {item['query']}")
        
        # 1. Evaluate Retrieval
        try:
            r_res = requests.post(f"{API_URL}/v1/retrieve", json={"query": item['query'], "top_k": 3})
            context = r_res.json().get("context", "")
            if not context.strip():
                print("Context Relevance: ❌ NO CONTEXT FOUND")
            else:
                print("Context Found: ✅ OK")
        except Exception as e:
            print(f"Retrieval Error: {e}")
            continue
            
        # 2. End-to-End Generation
        sys_prompt = "You are a concise testing AI. Answer the user based on context."
        if context:
            sys_prompt += f"\n\nContext: {context}"
            
        payload = {
            "model": "qwen2.5",
            "messages": [
                {"role": "system", "content": sys_prompt},
                {"role": "user", "content": item['query']}
            ],
            "temperature": 0.0
        }
        
        try:
            start_t = time.time()
            llm_res = requests.post(OAI_URL, json=payload).json()
            answer = llm_res['choices'][0]['message']['content']
            latency = time.time() - start_t
            
            print(f"Generated Answer: {answer.strip()}")
            print(f"Latency: {latency:.2f}s")
            
            # Simulated Faithfulness Evaluation (Normally uses LLM-as-a-judge)
            prompt_judge = f"Is the answer '{answer}' logically entailed by the ground truth '{item['ground_truth']}'? Only reply with 'YES' or 'NO'."
            judge_payload = {
                "model": "qwen2.5",
                "messages": [{"role": "user", "content": prompt_judge}],
                "temperature": 0.0
            }
            judge_res = requests.post(OAI_URL, json=judge_payload).json()
            verdict = judge_res['choices'][0]['message']['content'].strip()
            
            if "YES" in verdict.upper():
                print("Faithfulness Score: 1.0 (High)")
                total_score += 1
            else:
                print("Faithfulness Score: 0.0 (Low)")
            
        except Exception as e:
            print(f"Generation Error: {e}")
            
    avg_score = total_score / len(EVALUATION_DATASET)
    print("\n" + "=" * 60)
    print(f"FINAL RAG QUALITY SCORE: {avg_score * 100:.2f}%")
    print("=" * 60)

if __name__ == "__main__":
    run_evaluation()
