import { Link } from "react-router-dom";
import { LayoutGrid, Utensils, Receipt } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-black/10">
      
      <main className="grow flex items-center justify-center px-6">
        <div className="max-w-6xl w-full">

          <div className="text-center mb-20">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Restaurant <br />
              <span className="text-gray-700">Point of Sale System</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A clean, fast, and modern POS system to manage tables,
              orders, and billing in your restaurant.
            </p>

            <div className="flex justify-center gap-4 mt-10">
              <Link
                to="/login"
                className="px-8 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Get Started
              </Link>

              <Link
                to="/tables"
                className="px-8 py-3 rounded-xl border border-gray-500 text-gray-800 hover:bg-gray-200 transition"
              >
                View Tables
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<LayoutGrid size={32} />}
              title="Table Management"
              description="Monitor table status in real time: available, occupied, reserved, or inactive."
            />

            <FeatureCard
              icon={<Utensils size={32} />}
              title="Order Management"
              description="Create and manage orders quickly, and send them directly to the kitchen."
            />

            <FeatureCard
              icon={<Receipt size={32} />}
              title="Billing & Receipt"
              description="Automatically calculate totals and generate receipts instantly."
            />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-md text-gray-500">
        © {new Date().getFullYear()} Sismedika POS. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="w-12 h-12 rounded-xl bg-gray-200 text-gray-800 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}
