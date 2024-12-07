'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ViewDetailModal from './ViewDetail';
import UpdateProductModal from './UpdateProduct';
import CreateProductModal from './CreateProduct';
import { toast } from 'react-toastify';
type Supplier = {
  name: string;
  address: string;
  email: string;
  phone: string;
};

type Review = {
  id: string;
  reviewerName: string;
  comment: string;
  rating: number;
  createdAt: string;
};
type Product = {
  id: string;
  name: string;
  baseprice: number;
  description: string;
  category?: {
    id: string;
    title: string;
  };
  imageProducts?: {
    imageUrl: string;
  }[];
  inventory: string;
  variants?: {
    quantity: number;
  }[];
  supplier?: Supplier;
  reviews?: Review[];
};

type Meta = {
  page: number;
  take: number;
  totalItems: number;
  totalPages: number;
};

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewDetailOpen, setIsViewDetailOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const fetchProducts = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Product[]; meta: Meta }>(
        `${process.env.NEXT_PUBLIC_API_URL}/product/getAllProduct`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
          params: { page: currentPage, take: itemsPerPage },
        }
      );

      const { data, meta } = response.data;

      // Fetch full details for consistency
      const detailedProducts = await Promise.all(
        data.map(async (product) => {
          const detailResponse = await fetchProductDetail(product.id);
          return {
            ...product,
            category: detailResponse.category,
            inventory:
              calculateTotalStock(detailResponse.variants) > 0
                ? 'In Stock'
                : 'Out of Stock',

            supplier: detailResponse.supplier,
            reviews: detailResponse.reviews,
          };
        })
      );

      setProducts(detailedProducts);
      setPage(meta.page);
      setTotalPages(meta.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetail = async (id: string): Promise<Product> => {
    try {
      const response = await axios.get<Product>(
        `${process.env.NEXT_PUBLIC_API_URL}/product/getDetailProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        }
      );

      setSelectedProduct(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product details for ID: ${id}`, error);
      throw error;
    }
  };

  const calculateTotalStock = (variants?: { quantity: number }[]) => {
    return (
      variants?.reduce((total, variant) => total + variant.quantity, 0) || 0
    );
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page, itemsPerPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) {
    return <span className="loading loading-bars loading-xs"></span>;
  }

  const handleViewDetail = async (product: Product) => {
    try {
      const productData = await fetchProductDetail(product.id);
      setSelectedProduct(productData);
      setIsViewDetailOpen(true);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const productData = await fetchProductDetail(product.id);
      setSelectedProduct(productData);
      setIsUpdateModalOpen(true);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      });
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  }


  return (
    <div className="p-4">
      <div className="flex bg-white justify-between items-center mb-4 p-4 rounded-lg shadow-lg">
        <div className="join">
          <input
            className="input input-bordered w-64 join-item"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <div className="indicator">
            <button className="btn join-item">Search</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm bg-green-600 text-white" onClick={()=>setIsCreateModalOpen(true)}>
            + Add Product
          </button>
        </div>
      </div>

      <div className="bg-white justify-between items-center mb-4 p-4 rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              
              <th>Suplier</th>
              <th>Inventory</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center">
                    <div className="stack w-16 h-16">
                      {product.imageProducts &&
                        product.imageProducts
                          .slice(0, Math.min(product.imageProducts.length, 3))
                          .map((image, index) => (
                            <img
                              key={index}
                              src={image.imageUrl}
                              alt={product.name}
                              className="rounded"
                            />
                          ))}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{product.name}</p>
                      <div
                        className="tooltip tooltip-right"
                        data-tip={product.description}
                      >
                        <p className="truncate w-40 text-sm text-gray-500">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                <td>{product.category?.title || 'N/A'}</td>
                <td>${product.baseprice}</td>
                <td>{product.supplier?.name || 'N/A'}</td>
                <td>
                  <div
                    className={`badge ${product.inventory === 'In Stock' ? 'badge-success' : 'badge-error'} badge-success text-white`}
                  >
                    {product.inventory}
                  </div>
                </td>
                <td className="">
                  <div className="join">
                    <button
                      className="btn btn-xs btn-outline join-item"
                      onClick={() => handleViewDetail(product)}
                    >
                      View Detail
                    </button>
                    <button
                      className="btn btn-xs btn-outline join-item"
                      onClick={() => handleUpdateProduct(product)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-xs btn-outline join-item"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-500">
              Showing {filteredProducts.length} of {products.length} Results
            </span>
            <select
              className="ml-4 select select-bordered select-sm"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={page <= 1}
              onClick={handlePreviousPage}
            >
              «
            </button>
            <span className="join-item btn btn-sm">Page {page}</span>
            <button
              className="join-item btn btn-sm"
              disabled={page >= totalPages}
              onClick={handleNextPage}
            >
              »
            </button>
          </div>
        </div>
      </div>
      <ViewDetailModal
        product={selectedProduct}
        isModalOpen={isViewDetailOpen}
        setIsModalOpen={setIsViewDetailOpen}
      />
      <UpdateProductModal
        product={selectedProduct}
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
      />
      <CreateProductModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      />
    </div>
  );
};

export default ProductTable;
