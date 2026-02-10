import { useEffect, useState } from "react";
import { getTablesApi } from "../api/table";
import Navbar from "../Components/Navbar";
import { useAuth } from "../context/AuthContext";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    getTablesApi().then((res) => setTables(res.data));
  }, []);

  const handleActionClick = (type) => {
    if (!user) {
      return setModal({
        open: true,
        message: "Authorized personnel only.",
      });
    }

    if (type === "addMenu") {
      if (user.role !== "pelayan") {
        return setModal({
          open: true,
          message: "Access denied. Only waiters can add menu items.",
        });
      }
      navigate("/foods");
    }

    if (type === "listView") {
      if (user.role !== "kasir") {
        return setModal({
          open: true,
          message: "Access denied. Only cashiers can view the order list.",
        });
      }
      navigate("/kasir/orders");
    }

    if (type === "floorPlan") {
      navigate("/tables");
    }
  };

  const onTableClick = (table) => {
    if (!user) {
      alert("Authorized personnel only.");
      return;
    }

    if (table.status === "reserved") {
      alert("This table is reserved.");
      return;
    }

    if (table.status === "inactive") {
      alert("This table is under maintenance.");
      return;
    }

    if (table.status === "available") {
      if (user.role !== "pelayan") {
        alert("Only waiters can open a new order.");
        return;
      }
      navigate(`/pelayan/open/${table.id}`);
    }

    if (table.status === "occupied") {
      navigate(`/orders/${table.active_order_id}`);
    }
  };

  const color = {
    available: "bg-gray-800",
    occupied: "bg-gray-600",
    reserved: "bg-gray-500",
    inactive: "bg-gray-400",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-10">Table Management</h2>

          <div className="flex gap-3 pb-10">
            <button
              onClick={() => handleActionClick("addMenu")}
              className="border border-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white"
            >
              Add Menu
            </button>

            <button onClick={() => handleActionClick("floorPlan")} className="bg-black text-white px-4 py-2 rounded">
              Floor Plan
            </button>

            <button
              onClick={() => handleActionClick("listView")}
              className="border border-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white"
            >
              List View
            </button>
          </div>
        </div>

        {/* STATUS FILTER */}
        <p className="text-xl mb-3 font-semibold">Table Status</p>
        <div className="flex gap-7 mb-6 text-md">
          {["available", "occupied", "reserved", "inactive"].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded ${color[s]}`} />
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-6">
          {/* FLOOR PLAN */}
          <div className="grid grid-cols-6 gap-5">
            {tables.map((table) => (
              <div
                key={table.id}
                onClick={() => onTableClick(table)}
                className={`cursor-pointer rounded-lg p-6 w-50 text-white text-center shadow-lg ${color[table.status]}`}
              >
                {table.table_number}
              </div>
            ))}
          </div>

          {/* QUICK STATS */}
          <div className="w-105 space-y-3">
            <p className="text-2xl font-semibold">Quick Stats</p>
            {["available", "occupied", "reserved", "inactive"].map((s) => (
              <div key={s} className="bg-white p-4 rounded shadow-lg">
                <p className="text-2xl font-bold">{tables.filter((t) => t.status === s).length}</p>
                <p className="text-sm capitalize">{s} Tables</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ open: false, title: "", message: "", type: "info" })}
      />
    </div>
  );
}
