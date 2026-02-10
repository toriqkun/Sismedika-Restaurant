import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { SquarePen } from "lucide-react";

export default function ProfileModal({ onClose }) {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(
    user?.avatarImage || "/avatar-default.png"
  );
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", name);
    if (avatar) form.append("avatar", avatar);

    try {
      const res = await api.post("/profile", form);
      setUser(res.data.user);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-100 p-6 relative">

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-6">
          Edit Profile
        </h2>

        <form onSubmit={submit} className="space-y-5">

          {/* AVATAR */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={preview}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-2"
              />

              {/* EDIT ICON */}
              <label className="absolute bottom-1 right-1 bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow">
                <SquarePen size={16} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setAvatar(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Lengkap"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-black disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
