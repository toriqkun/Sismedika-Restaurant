import { useEffect, useState } from "react";
import { getOrdersApi } from "../../api/order";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrdersApi().then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/10 p-8">
        <h2 className="text-2xl font-semibold mb-6">Order List</h2>

        <div className="bg-white rounded shadow">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Order</th>
                <th>Status</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">#{order.id}</td>
                  <td>{order.status}</td>
                  <td>Rp {order.total_price}</td>
                  <td>
                    <button onClick={() => navigate(`/orders/${order.id}`)} className="text-blue-600">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
