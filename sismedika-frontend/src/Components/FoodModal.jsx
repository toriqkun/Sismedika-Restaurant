import { useState } from "react";
import { createFood, updateFood } from "../api/food";

export default function FoodModal({ mode, data, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: data?.name || "",
    category: data?.category || "makanan",
    price: data?.price || "",
    image: null,
  });

  const [preview, setPreview] = useState(data?.image || null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.price) {
      alert("Name and price are required");
      return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("category", form.category);
    payload.append("price", form.price);

    if (form.image) payload.append("image", form.image);

    try {
      if (mode === "add") {
        await createFood(payload);
        alert("Menu has been successfully added");
      } else {
        await updateFood(data.id, payload);
        alert("Menu has been successfully updated");
      }

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-100 p-6">
        <h2 className="text-xl font-semibold mb-4">{mode === "add" ? "Add Menu" : "Update Menu"}</h2>

        <div className="space-y-4">
          <input
            placeholder="Food Name"
            className="border w-full px-4 py-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="border w-full px-4 py-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            className="border w-full px-4 py-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          {preview && <img src={preview} className="w-full h-36 object-cover rounded" />}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setForm({ ...form, image: file });
              setPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : mode === "add" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
