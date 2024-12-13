import spacy
import json
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from langchain.chains import GraphQAChain
from langchain_community.graphs import NetworkxEntityGraph
from langchain_ollama import OllamaLLM
from graphBuild import GraphBuilder
import networkx as nx
from langchain.prompts import PromptTemplate
from sentence_transformers import SentenceTransformer, util
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
class GraphChainBuilder:
    def __init__(self, data_file, llm_model="gemma2:2b",embedding_model="all-MiniLM-L6-v2"):
        """
        Initialize the GraphChainBuilder with the data file and LLM model.
        """
        self.data_file = data_file
        self.llm = OllamaLLM(model=llm_model)
        self.graph = nx.DiGraph()
        self.history = []  
        self.graph_info = None  
        self.nlp = spacy.load("en_core_web_sm")  
        self.embedding_model = SentenceTransformer(embedding_model)
         # Load NER pipeline
        ner_model="dslim/bert-base-NER"
        self.tokenizer = AutoTokenizer.from_pretrained(ner_model)
        self.ner_model = AutoModelForTokenClassification.from_pretrained(ner_model)
        self.ner_pipeline = pipeline("ner", model=self.ner_model, tokenizer=self.tokenizer)
        

    def build_graph(self):
        """
        Build the graph using the GraphBuilder class.
        """
        graph_builder = GraphBuilder(self.data_file)
        graph_builder.load_data()
        graph_builder.build_graph()
        self.graph = graph_builder.graph

        # Serialize the graph to node-link format (LangChain-compatible)
        self.graph_info = json.dumps(nx.node_link_data(self.graph))  # Convert to node-link format

    def create_entity_graph(self):
        """
        Create a LangChain-compatible entity graph from the NetworkX graph.
        """
        self.entity_graph = NetworkxEntityGraph(graph=self.graph)

    def create_chain(self):
        """
        Create the GraphQAChain for querying the graph.
        """
        try:
            # Create the QA Chain with the graph and the LLM
           
            # Create the GraphQAChain with the provided LLM, graph, and prompt template
            self.qa_chain = GraphQAChain.from_llm(
                llm=self.llm,
                graph=self.entity_graph,
               
                verbose=True  
            )

        except Exception as e:
            print(f"Error creating QA Chain: {e}")
            raise

    def calculate_similarity(self, text1, text2):
        """
        Calculate similarity between two pieces of text using token overlap.
        """
        if not text1 or not text2:
            return 0  # Handle cases where one of the inputs is empty

        # Tokenize both texts
        tokens1 = set(token.lower() for token in text1.split() if token.isalnum())
        tokens2 = set(token.lower() for token in text2.split() if token.isalnum())

        # Calculate the Jaccard similarity: Intersection / Union
        intersection = tokens1.intersection(tokens2)
        union = tokens1.union(tokens2)

        similarity = len(intersection) / len(union) if union else 0
        return similarity

    def retrieve_relevant_context(self, question):
        """
        Retrieve relevant context (triplets) from the graph based on the question.
        Uses token overlap for matching.
        """
        relevant_context = []

        # Step 1: Extract entities from the question
        entities = self.extract_entities(question)
        print(f"Entities: {entities}")

        # Step 2: Search for nodes in the graph that match the entity
        for entity in entities:
            for node, attrs in self.graph.nodes(data=True):
                node_name = attrs.get('name', '')
                node_label = attrs.get('label', '')

                # Compute similarity using token overlap
                name_similarity = self.calculate_similarity(entity, node_name)
                label_similarity = self.calculate_similarity(entity, node_label)

                if name_similarity > 0.1 or label_similarity > 0.5:  
                    relevant_context.append(f"Entity: {entity}, Node: {node_name}, Attributes: {attrs}")

        # Return formatted context
        return " ".join(relevant_context) if relevant_context else "No relevant context found."

    def extract_entities(self, question):
        """
        Extract and join relevant tokens from the question into meaningful phrases.
        """
        doc = self.nlp(question)
        phrases = []
        current_phrase = []

        for token in doc:
            # Filter out stop words, punctuation, and spaces
            if not token.is_stop and not token.is_punct and not token.is_space:
                current_phrase.append(token.text)
            else:
                if current_phrase:
                    # Join the collected tokens into a phrase
                    phrases.append(" ".join(current_phrase))
                    current_phrase = []

        # Append the last phrase if it exists
        if current_phrase:
            phrases.append(" ".join(current_phrase))

        return phrases


     

    def query(self, question):
        """
        Query the graph, retrieve relevant context, and feed it to the LLM.
        """
        if not hasattr(self, "qa_chain"):
            raise RuntimeError("QA Chain is not initialized. Call create_chain() first.")

        try:
            # Extract relevant knowledge triplets based on the question
            relevant_context = self.retrieve_relevant_context(question)
            print(f"Relevant Context: {relevant_context}")

            # Prepare the full input dictionary with the retrieved context
            query_input = f'Question: {question} Contexts: {relevant_context}'

            # Invoke the chain with the full input
            response = self.qa_chain.invoke(query_input)
            
            # Record the interaction
            self.history.append({
                "question": question, 
                "response": response.get("result", "No response")
            })
            
            return response.get("result", "No response")
        
        except Exception as e:
            print(f"Comprehensive error in query method: {e}")
            return f"Error during query: {str(e)}"

# Example Usage
if __name__ == "__main__":
    # Initialize GraphChainBuilder
    chain_builder = GraphChainBuilder(data_file="products.json")

    # Build the graph
    chain_builder.build_graph()

    # Create the entity graph
    chain_builder.create_entity_graph()

    # Create the QA chain
    chain_builder.create_chain()

    # Query the chain with relevant context from the graph
    print(chain_builder.query("is Ipad in stock ?"))
    print(chain_builder.query("What is the price of Ipad Pro M4?"))
    print(chain_builder.query("What is the color of Ipad Pro M4?"))
    print(chain_builder.query("What is screen size of iphone ?"))
    