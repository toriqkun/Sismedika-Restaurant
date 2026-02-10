export default function Modal({
  open,
  title = "Informasi",
  message,
  onClose,
  type = "info",
}) {
  if (!open) return null;

  const typeStyle = {
    info: "bg-blue-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
    success: "bg-green-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        
        {/* HEADER */}
        <div className={`px-5 py-3 text-white rounded-t-lg ${typeStyle[type]}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* BODY */}
        <div className="px-5 py-4">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            OK
          </button>
        </div>

      </div>
    </div>
  );
}
