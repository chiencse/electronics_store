import json
import networkx as nx
import plotly.graph_objects as go
from langchain.prompts import PromptTemplate
class GraphBuilder:
    def __init__(self, data_file):
        self.data_file = data_file
        self.graph = nx.DiGraph()

    def load_data(self):
        """Load data from a JSON file."""
        with open(self.data_file, "r", encoding="utf-8") as f:
            self.products_data = json.load(f)

    def build_graph(self):
        """Build the graph from the loaded data."""
        for product in self.products_data:
            # Add Product node
            product_id = product["id"]
            self.graph.add_node(
                product_id,
                label=f'{product["name"]} by {product["manufacturer"]}',
                name=product["name"],
                manufacturer=product["manufacturer"],
                inventory=product["inventory"],
                price=product["baseprice"],
                screenSize=product["screenSize"],
                refreshRate=product["refreshRate"],
                battery=product["battery"],
                camera=product["camera"],
               
            )

            # Add Category
            if "category" in product:
                category_id = product["category"]["id"]
                self.graph.add_node(
                    category_id,
                    label=f'Category {product["category"]["title"]}',
                    title=product["category"]["title"],
                    
                )
                self.graph.add_edge(product_id, category_id, relation="belongsTo")

            # Add Supplier
            if "supplier" in product:
                supplier_id = product["supplier"]["id"]
                self.graph.add_node(
                    supplier_id,
                    label=f'Supplier {product["supplier"]["name"]}',
                    name=product["supplier"]["name"],
                   
                )
                self.graph.add_edge(product_id, supplier_id, relation="suppliedBy")

            # Add Variants
            if "variants" in product:
               for index, variant in enumerate(product["variants"], start=1):
                    variant_id = variant["id"]
                    self.graph.add_node(
                        variant_id,
                        label=f'Variant {index} of {product["name"]}',
                      
                        ram=variant["ram"],
                        rom=variant["rom"],
                        cpu=variant["cpu"],
                        quantity=variant["quantity"],
                        price=variant["price"],
                    )
   

                    self.graph.add_edge(product_id, variant_id, relation="hasVariant")

    def visualize(self):
        """Visualize the graph in 3D using Plotly."""
        pos = nx.spring_layout(self.graph, dim=3)
        node_x, node_y, node_z = [], [], []
        node_labels, node_colors = [], []

        for node, coords in pos.items():
            node_x.append(coords[0])
            node_y.append(coords[1])
            node_z.append(coords[2])  # 3D position
            node_labels.append(
                self.graph.nodes[node].get("name", self.graph.nodes[node].get("label", "Unknown"))
            )
            node_colors.append(self.graph.nodes[node].get("color", "blue"))

        edge_x, edge_y, edge_z = [], [], []
        for edge in self.graph.edges():
            x0, y0, z0 = pos[edge[0]]
            x1, y1, z1 = pos[edge[1]]
            edge_x.extend([x0, x1, None])
            edge_y.extend([y0, y1, None])
            edge_z.extend([z0, z1, None])

        fig = go.Figure()

        # Add edges
        fig.add_trace(
            go.Scatter3d(
                x=edge_x,
                y=edge_y,
                z=edge_z,
                mode="lines",
                line=dict(color="gray", width=1),
                hoverinfo="none",
            )
        )

        # Add nodes
        fig.add_trace(
            go.Scatter3d(
                x=node_x,
                y=node_y,
                z=node_z,
                mode="markers+text",
                marker=dict(size=10, color=node_colors, opacity=0.8),  # Node color
                text=node_labels,
                textposition="top center",
                hoverinfo="text",
            )
        )

        fig.update_layout(
            title="Interactive 3D Graph of Product Relationships",
            scene=dict(xaxis_title="X", yaxis_title="Y", zaxis_title="Z"),
            showlegend=False,
        )

        fig.show()

# Example Usage
if __name__ == "__main__":
    graph_builder = GraphBuilder("products.json")
    graph_builder.load_data()
    graph_builder.build_graph()
    graph_builder.visualize()
