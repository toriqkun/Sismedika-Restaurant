import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <img src="/sismedika.jpeg" alt="" className="w-10 h-10" />
          <p>
            <span className="text-blue-400 text-lg font-medium">SIS</span>
            <span className="text-orange-400 text-lg font-medium">MEDIKA</span>
          </p>
        </div>

        {/* RIGHT */}
        {user && (
          <div className="relative">
            <div className="flex items-center justify-between gap-5">
              <img
                src={user?.avatarImage || "/avatar-default.png"}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover cursor-pointer border"
                onClick={() => setOpenMenu((prev) => !prev)}
              />
              <p className="font-medium text-md">{user?.name}</p>
            </div>
            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                <button
                  onClick={() => {
                    setOpenProfile(true);
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>

                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* PROFILE MODAL */}
      {openProfile && <ProfileModal onClose={() => setOpenProfile(false)} />}
    </>
  );
}
