'use client';

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

type ImageProduct = {
  id?: string;
  imageUrl: string;
};

type Variant = {
  id?: string;
  ram: number;
  rom: number;
  cpu: string;
  color: string;
  price: number;
  quantity: number;
};

type Product = {
  name: string;
  baseprice: number;
  description: string;
  manufacturer: string;
  screenSize: number;
  screenType: string;
  refreshRate: number;
  cellular: boolean;
  battery: number;
  camera: string;
  imageProducts: ImageProduct[];
  variants: Variant[];
  categoryId: string;
  supplierId: string;
};

interface CreateProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    baseprice: 0,
    description: '',
    manufacturer: '',
    screenSize: 0,
    screenType: '',
    refreshRate: 0,
    cellular: false,
    battery: 0,
    camera: '',
    imageProducts: [],
    variants: [],
    categoryId: '',
    supplierId: '',
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category/getAllCategory`
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/supply/findAllSupplier`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    if (isModalOpen) {
      fetchCategories();
      fetchSuppliers();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploadedImageUrl = response.data.upload;

      setFormData((prev) => ({
        ...prev,
        imageProducts: [
          ...prev.imageProducts,
          { id: undefined, imageUrl: uploadedImageUrl },
        ],
      }));

      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: undefined,
          ram: 0,
          rom: 0,
          cpu: '',
          color: '',
          price: 0,
          quantity: 0,
        },
      ],
    }));
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };
  const handleDeleteImage = (index: number) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            imageProducts: prev.imageProducts.filter((_, i) => i !== index),
          }
        : null
    );
    toast.success('Image deleted successfully!');
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product/createProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setIsModalOpen(false);
      toast.success('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal modal-open">
      <div
        className="modal-box max-w-5xl bg-base-100 shadow-xl rounded-lg"
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create Product</h2>
          <button
            className="btn btn-sm btn-circle"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {/* Product Details */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Name</label>
              <input
                type="text"
                className="input input-sm input-bordered w-full"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Base Price</label>
              <input
                type="number"
                className="input input-sm input-bordered w-full"
                value={formData.baseprice}
                onChange={(e) =>
                  handleInputChange('baseprice', parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Manufacturer</label>
              <input
                type="text"
                className="input input-sm input-bordered w-full"
                value={formData.manufacturer}
                onChange={(e) =>
                  handleInputChange('manufacturer', e.target.value)
                }
              />
            </div>
            <div>
              <label className="block font-bold mb-1">
                Screen Size (inches)
              </label>
              <input
                type="number"
                className="input input-sm input-bordered w-full"
                value={formData.screenSize}
                onChange={(e) =>
                  handleInputChange('screenSize', parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Screen Type</label>
              <input
                type="text"
                className="input input-sm input-bordered w-full"
                value={formData.screenType}
                onChange={(e) =>
                  handleInputChange('screenType', e.target.value)
                }
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Refresh Rate (Hz)</label>
              <input
                type="number"
                className="input input-sm input-bordered w-full"
                value={formData.refreshRate}
                onChange={(e) =>
                  handleInputChange('refreshRate', parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Battery (mAh)</label>
              <input
                type="number"
                className="input input-sm input-bordered w-full"
                value={formData.battery}
                onChange={(e) =>
                  handleInputChange('battery', parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Camera</label>
              <input
                type="text"
                className="input input-sm input-bordered w-full"
                value={formData.camera}
                onChange={(e) => handleInputChange('camera', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block font-bold mb-1">Description</label>
              <textarea
                className="textarea textarea-sm textarea-bordered w-full"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Category</label>
              <select
                className="select select-sm select-bordered w-full"
                value={formData.categoryId}
                onChange={(e) =>
                  handleInputChange('categoryId', e.target.value)
                }
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Supplier</label>
              <select
                className="select select-sm select-bordered w-full"
                value={formData.supplierId}
                onChange={(e) =>
                  handleInputChange('supplierId', e.target.value)
                }
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <label className="block font-bold mb-1">Cellular</label>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={formData.cellular}
              onChange={(e) => handleInputChange('cellular', e.target.checked)}
            />
            </div>
            

            {/* Add other fields like manufacturer, description, etc. */}
          </div>
          {/* Variants */}
          <div className="relative">
            <h3 className="font-bold mb-2">Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {formData.imageProducts.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                   <button
                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                    onClick={(e) => handleDeleteImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center my-4">
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-40 h-40 bg-gray-200 hover:bg-gray-300 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
              >
                <span className="text-gray-500 text-sm text-center">
                  + Add Image
                </span>
              </label>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          {/* Variants Section */}
          <div>
            <h3 className="font-bold mb-2">Variants</h3>
            {formData.variants.map((variant, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg mb-2">
                <h3 className="font-bold mb-2">Variant {index + 1}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold mb-1">RAM (GB)</label>
                    <input
                      type="number"
                      className="input input-sm input-bordered"
                      value={variant.ram}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          'ram',
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">ROM (GB)</label>
                    <input
                      type="number"
                      className="input input-sm input-bordered"
                      value={variant.rom}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          'rom',
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">CPU</label>
                    <input
                      type="text"
                      className="input input-sm input-bordered"
                      value={variant.cpu}
                      onChange={(e) =>
                        handleVariantChange(index, 'cpu', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Color</label>
                    <input
                      type="text"
                      className="input input-sm input-bordered"
                      value={variant.color}
                      onChange={(e) =>
                        handleVariantChange(index, 'color', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Price</label>
                    <input
                      type="number"
                      className="input input-sm input-bordered"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          'price',
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Quantity</label>
                    <input
                      type="number"
                      className="input input-sm input-bordered"
                      value={variant.quantity}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          'quantity',
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="btn btn-sm btn-neutral mt-2"
              onClick={handleAddVariant}
            >
              + Add Variant
            </button>
          </div>

          {/* Images */}
          <button className="btn btn-neutral" onClick={handleSubmit}>
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
