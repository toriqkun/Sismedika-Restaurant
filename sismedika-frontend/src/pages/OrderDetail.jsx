import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderApi, closeOrderApi } from "../api/order";
import Navbar from "../Components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function OrderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const res = await getOrderApi(id);
    setOrder(res.data);
  };

  const closeOrder = async () => {
    if (user.role !== "kasir") {
      alert("Only cashier can close the order");
      return;
    }

    await closeOrderApi(order.id);
    alert("Order closed");
    load();
  };

  if (!order) return <p className="p-8">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black/10 flex justify-center p-8">
        <div className="bg-white w-full max-w-sm p-6 shadow-xl rounded">
          <h2 className="text-xl font-bold mb-6">Order #{order.id}</h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.food.name} x{item.qty}
                </span>
                <span>Rp {(item.qty * item.price).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>Rp {order.total_price.toLocaleString()}</span>
          </div>

          {order.status !== "closed" && (
            <button onClick={closeOrder} className="mt-6 w-full bg-black text-white py-2 rounded">
              Close Order
            </button>
          )}
        </div>
      </div>
    </>
  );
}
