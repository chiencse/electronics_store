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
  id: string;
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

interface UpdateProductModalProps {
  product: Product | null;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onUpdateSuccess: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  product,
  isModalOpen,
  setIsModalOpen,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<Product | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/category/getAllCategory`
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get<Supplier[]>(
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
    if (product) {
      setFormData(product);
    }
  }, [product]);

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
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleImageChange = async (index: number, imageId: string | undefined, file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const uploadedImageUrl = response.data.upload;
  
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              imageProducts: prev.imageProducts.map((img, i) =>
                i === index ? { ...img, imageUrl: uploadedImageUrl } : img
              ),
            }
          : null
      );
      console.log("Image uploaded successfully:", uploadedImageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);

      toast.error("Failed to upload image");
    }
  };

  const handleDeleteImage = async (imageId: string | undefined) => {
    if (!formData || !imageId) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/deleteProductImage/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              imageProducts: prev.imageProducts.filter(
                (image) => image.id !== imageId
              ),
            }
          : null
      );
      toast.success('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: any
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            variants: prev.variants.map((variant, i) =>
              i === index ? { ...variant, [field]: value } : variant
            ),
          }
        : null
    );
  };

  const handleAddVariant = () => {
    setFormData((prev) =>
      prev
        ? {
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
          }
        : null
    );
  };

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/updateProduct/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setIsModalOpen(false);
      toast.success('Product updated successfully! 🎉');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

      setFormData((prev) =>
        prev
          ? {
              ...prev,
              imageProducts: [
                ...prev.imageProducts,
                { id: undefined, imageUrl: uploadedImageUrl }, // Add the new image
              ],
            }
          : null
      );

      console.log('Image uploaded successfully:', uploadedImageUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error('Failed to add image');
    }
  };
  if (!isModalOpen || !formData) return null;

  return (
    <div className="modal modal-open">
      <div
        className="modal-box max-w-5xl bg-base-100 shadow-xl rounded-lg"
        ref={modalRef}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <button
            className="btn btn-sm btn-circle"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Form */}
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
              <label className="block font-bold mb-1">Cellular</label>
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary"
                checked={formData.cellular}
                onChange={(e) =>
                  handleInputChange('cellular', e.target.checked)
                }
              />
            </div>
          </div>

          {/* Images */}
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
                    onClick={(e) => handleDeleteImage(image.id)}
                  >
                    ✕
                  </button>
                  <label className="block font-bold mb-1">Image URL</label>

                  <div className="relative">
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="flex flex-col items-center justify-center   bg-gray-200 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-300 transition-all"
                    >
                      <span className="text-sm text-gray-600">
                        Change Image
                      </span>
                      
                    </label>
                    <input
                      id={`file-upload-${index}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageChange(index, image.id, e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center my-4">
              <div className="flex flex-col items-center gap-2">
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
                  onChange={handleAddImage} // Trigger file upload on selection
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 className="font-bold mb-2">Variants</h3>
            {formData.variants.map((variant, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg mb-2">
                <h3 className="font-bold mb-2">Variants {index}</h3>
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
              className="btn btn-sm btn-secondary mt-2"
              onClick={handleAddVariant}
            >
              Add Variant
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
          <button className="btn" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
