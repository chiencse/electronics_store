'use client';

import React, { useRef, useState, useEffect } from 'react';

type Supplier = {
  name: string;
  address: string;
};

type Variant = {
  id: string;
  ram: number;
  rom: number;
  cpu: string;
  color: string;
  quantity: number;
  price: number;
};

type ImageProduct = {
  id: string;
  imageUrl: string;
};

type Product = {
  name: string;
  description: string;
  manufacturer: string;
  screenSize: number;
  screenType: string;
  refreshRate: number;
  battery: number;
  camera: string;
  averageRating: number;
  supplier?: Supplier;
  variants?: Variant[];
  imageProducts?: ImageProduct[];
};

interface ViewDetailModalProps {
  product: Product | null;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ViewDetailModal: React.FC<ViewDetailModalProps> = ({
  product,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  if (!isModalOpen || !product) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl bg-base-100 shadow-xl rounded-lg" ref={modalRef}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button className="btn btn-sm btn-circle" onClick={() => setIsModalOpen(false)}>
            ✕
          </button>
        </div>

        {/* Carousel */}
        <div className="carousel carousel-center w-full rounded-box mb-6">
          {product.imageProducts?.map((image, index) => (
            <div key={image.id} className="carousel-item">
              <img src={image.imageUrl} alt={`Product Image ${index + 1}`} className="rounded-xl" />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <span className="font-bold">Manufacturer: </span>
              {product.manufacturer}
            </p>
            <p>
              <span className="font-bold">Screen Size: </span>
              {product.screenSize} inches
            </p>
            <p>
              <span className="font-bold">Screen Type: </span>
              {product.screenType}
            </p>
            <p>
              <span className="font-bold">Refresh Rate: </span>
              {product.refreshRate} Hz
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold">Battery: </span>
              {product.battery} mAh
            </p>
            <p>
              <span className="font-bold">Camera: </span>
              {product.camera}
            </p>
            <p>
              <span className="font-bold">Average Rating: </span>
              {product.averageRating}
            </p>
            <p>
              <span className="font-bold">Supplier: </span>
              {product.supplier?.name} ({product.supplier?.address})
            </p>
          </div>
        </div>

        {/* Tabs for Variants */}
        <div role="tablist" className="tabs tabs-boxed mb-4">
          {product.variants?.map((variant, index) => (
            <a
              key={variant.id}
              role="tab"
              className={`tab ${tabIndex === index ? 'tab-active' : ''}`}
              onClick={() => setTabIndex(index)}
            >
              Variant {index + 1}
            </a>
          ))}
        </div>

        {/* Variant Details */}
        <div className="bg-base-200 p-4 rounded-lg shadow-inner">
          {product.variants?.map((variant, index) => (
            <div
              key={variant.id}
              className={`variant-detail ${tabIndex === index ? 'block' : 'hidden'}`}
            >
              <p>
                <span className="font-bold">RAM: </span>
                {variant.ram} GB
              </p>
              <p>
                <span className="font-bold">ROM: </span>
                {variant.rom} GB
              </p>
              <p>
                <span className="font-bold">CPU: </span>
                {variant.cpu}
              </p>
              <p>
                <span className="font-bold">Color: </span>
                {variant.color}
              </p>
              <p>
                <span className="font-bold">Quantity: </span>
                {variant.quantity}
              </p>
              <p>
                <span className="font-bold">Price: </span>${variant.price}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailModal;
