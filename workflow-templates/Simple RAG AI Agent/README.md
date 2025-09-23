🔍 What This Workflow Does

This RAG Pipeline in n8n automates document ingestion from Google Drive, vectorizes it using OpenAI embeddings, stores it in Pinecone, and enables chat-based retrieval using LangChain agents.

Main Functions:

📂 Auto-detects new files uploaded to a specific Google Drive folder.
🧠 Converts the file into embeddings using OpenAI.
📦 Stores them in a Pinecone vector database.
💬 Allows a user to query the knowledge base through a chat interface.
🤖 Uses a GPT-4o-mini model with LangChain to generate intelligent responses using retrieved context.
⚙️ Setup Instructions

Connect Accounts
Ensure these services are connected in n8n:
✅ Google Drive (OAuth2)
✅ OpenAI
✅ Pinecone
You can do this in n8n > Credentials > New and use the matching names from the file:

Google Drive: "Google Drive account 2"
OpenAI: "OpenAi success"
Pinecone: "PineconeApi account 2"
2. Folder Setup
Upload your documents to this folder in Google Drive:

📁 Power Folder

The workflow is triggered every minute when a new file is uploaded.

Workflow Overview
A. File Ingestion Path
Google Drive Trigger — detects new file.
Google Drive (Download) — downloads the new file.
Recursive Text Splitter — splits text into chunks.
Default Data Loader — loads content as LangChain documents.
OpenAI Embeddings — converts text chunks into embeddings.
Pinecone Vector Store — stores them in "ragfile" index.
B. Chat Retrieval Path

When chat message received —
AI Agent — LangChain agent managing tools.
OpenAI Chat Model (GPT-4o-mini) — generates replies.
Pinecone Vector Store (retrieval) — retrieves matching content.
Embeddings OpenAI1 — helps match queries to document chunks.