# RAG ChatBot

RAG ChatBot is a Retrieval-Augmented Generation (RAG) Chat Application that leverages the power of large language models (LLMs) for customer services.

---



## Features

- Retrieval-Augmented Generation for enhanced responses.
- GPU acceleration for high-performance inference.
- Easy deployment using Docker.
- Exposed FastAPI on customizable ports.

---

## Prerequisites

Before starting, ensure the following:

- **Docker**: Installed on your system. [Install Docker](https://docs.docker.com/get-docker/)
### **GPU Support**

To enable GPU acceleration, ensure the following:

- **NVIDIA GPU**: A compatible NVIDIA GPU installed on your system.
- **NVIDIA Drivers**: Correctly installed drivers for your GPU. [Driver Downloads](https://www.nvidia.com/Download/index.aspx)
- **NVIDIA CUDA Toolkit** (on Win): Installed for deep learning support. [CUDA Installation Guide](https://developer.nvidia.com/cuda-toolkit)
- **NVIDIA Container Toolkit**: Enables GPU support in Docker. [Installation Guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)


---

## Setup

### 1. Build the Docker Image

To build the Docker image locally:

```bash
docker build -t duydnguyen/rag-chatapp .
```
or

```bash
docker pull duydnguyen/rag-chatapp
```
### 2. Run the container

```bash
docker run -d --gpus all -p 3005:3005 -p 11434:11434 --name rag-chatapp duydnguyen/rag-chatapp
```

### 3.API

API is in localhost:3005/doc#


