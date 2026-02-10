import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import FoodModal from "../../Components/FoodModal";
import MenuDropdown from "../../Components/MenuDropDown";
import { getFoodsApi, deleteFood } from "../../api/food";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const res = await getFoodsApi();
    setFoods(res.data);
  };

  const openAdd = () => setModal({ open: true, mode: "add", data: null });

  const openEdit = (food) => setModal({ open: true, mode: "edit", data: food });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    await deleteFood(id);
    loadFoods();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold">List Menu</h2>
          <button onClick={openAdd} className="bg-black text-white px-6 py-2 rounded">
            + Add Menu
          </button>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {foods.map((food) => (
            <div key={food.id} className="bg-white rounded-xl shadow relative">
              <img src={food.image} alt={food.name} className="h-50 w-full object-cover rounded-t-xl" />

              {/* DROPDOWN */}
              <div className="absolute top-2 right-2">
                <MenuDropdown onEdit={() => openEdit(food)} onDelete={() => handleDelete(food.id)} />
              </div>

              <div className="p-4">
                <p className="font-semibold">{food.name}</p>
                <p className="text-sm text-gray-500 capitalize">{food.category}</p>
                <p className="font-bold mt-2">Rp {food.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal.open && (
        <FoodModal
          mode={modal.mode}
          data={modal.data}
          onClose={() => setModal({ open: false })}
          onSuccess={loadFoods}
        />
      )}
    </div>
  );
}
