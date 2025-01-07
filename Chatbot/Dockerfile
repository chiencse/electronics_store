# Use an official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies required for Ollama and system utilities
RUN apt-get update && apt-get install -y \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama CLI
RUN curl -fsSL https://ollama.com/install.sh | bash

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download Gemma 2B model


# Copy the rest of the application files into the container
COPY . .

# Expose the ports for FastAPI and Ollama
EXPOSE 3005 11434

# Command to start both FastAPI and Ollama (if Ollama server is required in the same container)
CMD ["sh", "-c", "ollama serve & sleep 10 && ollama pull gemma2:2b && uvicorn app:app --host 0.0.0.0 --port 3005"]

