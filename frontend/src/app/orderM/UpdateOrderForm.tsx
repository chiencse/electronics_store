import React, { useState } from 'react';

interface UpdateOrderFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  order: {
    id: string;
    shippedDate: string | null;
    status: 'pending' | 'completed' | 'cancelled';
  };
  updateOrderList: (updatedOrder: any) => void;
}

const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  order,
  updateOrderList,
}) => {
  const [shippedDate, setShippedDate] = useState<string>(order.shippedDate || '');
  const [status, setStatus] = useState<'pending' | 'completed' | 'cancelled'>(order.status);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          shippedDate: shippedDate || null,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Update the order list with the updated order
      updateOrderList({ ...order, shippedDate, status });

      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Order</h3>

            {/* Shipped Date */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Shipped Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={shippedDate}
                onChange={(e) => setShippedDate(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'cancelled')}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Action Buttons */}
            <div className="modal-action">
              <button
                className={`btn ${loading ? 'loading' : ''}`}
                onClick={handleUpdate}
                disabled={loading}
              >
                Update
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateOrderForm;
