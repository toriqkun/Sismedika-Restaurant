export default function FoodCard({ food, onAdd }) {
  return (
    <div className="bg-white rounded shadow p-4 flex justify-between">
      <div>
        <p className="font-medium">{food.name}</p>
        <p className="text-sm text-gray-500">
          Rp {food.price}
        </p>
      </div>
      <button
        onClick={onAdd}
        className="bg-primary text-white px-3 rounded"
      >
        +
      </button>
    </div>
  );
}
