export default function TableCard({ table, user, onClick }) {
  const color = {
    available: "bg-gray-700",
    occupied: "bg-gray-500",
    reserved: "bg-gray-400",
    inactive: "bg-gray-300",
  }[table.status];

  return (
    <div
      onClick={onClick}
      className={`${color} text-white rounded-lg p-6 text-center cursor-pointer`}
    >
      {table.table_number}
    </div>
  );
}
