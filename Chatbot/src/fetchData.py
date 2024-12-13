import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables from a .env file
dotenv_path = './.env'
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
else:
    print(f"Error: .env file not found at {dotenv_path}")
    exit(1)

# Check for required environment variables
NEXT_PUBLIC_API_URL = os.getenv("NEXT_PUBLIC_API_URL")
TOKEN = os.getenv("TOKEN")

if not NEXT_PUBLIC_API_URL or not TOKEN:
    print("Error: Missing required environment variables. Ensure NEXT_PUBLIC_API_URL and TOKEN are set in .env.")
    exit(1)

print(f"NEXT_PUBLIC_API_URL: {NEXT_PUBLIC_API_URL}")

# Fetch product details
def fetch_product_detail(product_id):
    try:
        print(f"Fetching details for product {product_id}...")
        response = requests.get(
            f"{NEXT_PUBLIC_API_URL}/product/getDetailProduct/{product_id}",
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Accept": "application/json",
            },
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching details for product {product_id}: {e}")
        return None

# Calculate total stock
def calculate_total_stock(variants):
    return sum(variant.get("quantity", 0) for variant in variants)

# Fetch products and save to a JSON file
def fetch_products_and_save_to_json(datafile,current_page=1, items_per_page=20):
    try:
        print("Fetching products...")
        response = requests.get(
            f"{NEXT_PUBLIC_API_URL}/product/getAllProduct",
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Accept": "application/json",
            },
            params={"page": current_page, "take": items_per_page},
        )
        response.raise_for_status()
        data = response.json()

        # Extract products and meta data with error handling
        products = data.get("data", [])
        meta = data.get("meta", {})

        detailed_products = []
        for product in products:
            try:
                detail_response = fetch_product_detail(product["id"])
                if detail_response:
                    product.update(
                        {
                            "category": detail_response.get("category"),
                            "inventory": "In Stock"
                            if calculate_total_stock(detail_response.get("variants", [])) > 0
                            else "Out of Stock",
                            "supplier": detail_response.get("supplier"),
                            "reviews": detail_response.get("reviews"),
                            "variants": detail_response.get("variants", []),
                        }
                    )
                detailed_products.append(product)
            except Exception as e:
                print(f"Error fetching details for product {product.get('id', 'unknown')}: {e}")
                detailed_products.append(product)

        # Save the output to a JSON file
        
        with open(datafile, "w", encoding="utf-8") as f:
            json.dump(detailed_products, f, indent=2, ensure_ascii=False)

        print(f"Products saved to {datafile}")
        return {"products": detailed_products, "meta": meta}

    except requests.RequestException as e:
        print(f"Error fetching products: {e}")
        raise

# Main Execution
if __name__ == "__main__":
    try:
        current_page = 1
        items_per_page = 20
        fetch_products_and_save_to_json(current_page, items_per_page)
    except Exception as e:
        print(f"Failed to fetch and save products: {e}")
