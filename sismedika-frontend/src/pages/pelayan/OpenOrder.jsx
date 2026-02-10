import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { getFoodsApi } from "../../api/food";
import { Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { openOrderApi, addItemApi, finishOrderApi } from "../../api/order";

export default function OpenOrder() {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("makanan");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getFoodsApi().then((res) => setFoods(res.data));
  }, []);

  const filteredFoods = foods.filter(
    (f) => f.category === category && f.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addItem = (food) => {
    const existing = items.find((i) => i.id === food.id);

    if (existing) {
      setItems(items.map((i) => (i.id === food.id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setItems([...items, { ...food, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decreaseQty = (id) => {
    setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0));
  };

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const confirmOrder = async () => {
    if (items.length === 0) return;

    try {
      const orderRes = await openOrderApi(tableId);
      const orderId = orderRes.data.order.id;

      for (const item of items) {
        await addItemApi({
          order_id: orderId,
          food_id: item.id,
          qty: item.qty,
        });
      }

      await finishOrderApi(orderId);

      alert("Order Successful.");

      navigate("/tables");
    } catch (err) {
      console.error(err);
      alert("Order Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8 min-h-screen bg-gray-100">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/tables")}
              className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-2xl font-bold">Table {tableId}</h2>
              <p className="text-gray-500">New Order</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-2/3">
            {/* CATEGORY */}
            <div className="flex gap-4 mb-4">
              {["makanan", "minuman"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-6 py-2 rounded ${category === c ? "bg-black text-white" : "bg-gray-200"}`}
                >
                  {c === "makanan" ? "Makanan" : "Minuman"}
                </button>
              ))}
            </div>

            <input
              className="border w-full px-4 py-3 mb-6 rounded"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              {filteredFoods.map((food) => (
                <div key={food.id} className="bg-white rounded-xl shadow p-4 flex gap-4">
                  <img src={food.image} alt={food.name} className="w-20 h-20 rounded object-cover" />

                  <div className="flex-1">
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-sm text-gray-500">Rp {food.price.toLocaleString()}</p>
                  </div>

                  <button onClick={() => addItem(food)} className="bg-black text-white px-4 rounded">
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 bg-white rounded-xl px-6 pt-4 pb-4 shadow flex flex-col h-[calc(100vh-140px)]">
            <div>
              <h3 className="font-semibold text-xl">Current Order</h3>
              <p className="text-sm text-gray-500">Table {tableId}</p>
            </div>

            <div className="mt-4 space-y-4 overflow-y-auto flex-1 pr-1">
              {items.length === 0 && <p className="text-gray-400 text-sm text-center mt-10">Belum ada menu dipilih</p>}

              {items.map((i) => (
                <div key={i.id} className="flex justify-between items-start border-b pb-3">
                  <div>
                    <p className="font-medium">{i.name}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => decreaseQty(i.id)} className="w-7 h-7 p-1.5 border rounded text-lg">
                        <Minus size={16} />
                      </button>

                      <span className="w-6 text-center">{i.qty}</span>

                      <button onClick={() => increaseQty(i.id)} className="w-7 h-7 p-1.5 border rounded text-lg">
                        <Plus size={16} />
                      </button>

                      <button onClick={() => removeItem(i.id)} className="text-gray-400 hover:text-red-500 ml-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="font-medium">Rp {(i.qty * i.price).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>

              <button
                onClick={confirmOrder}
                disabled={items.length === 0}
                className="w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-300"
              >
                Make an Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
