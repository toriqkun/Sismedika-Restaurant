import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import Tables from "./pages/Tables";
import OpenOrder from "./pages/pelayan/OpenOrder";
import OrderDetail from "./pages/OrderDetail";
import OrderList from "./pages/kasir/OrderList";
import FoodList from "./pages/pelayan/FoodList";

import ProtectedRoute from "./Components/ProtectedRoute";
import RoleGuard from "./Components/RoleGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tables" element={<Tables />} />

        {/* Pelayan */}
        <Route
          path="/pelayan/open/:tableId"
          element={
            <ProtectedRoute>
              <RoleGuard role="pelayan">
                <OpenOrder />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <RoleGuard role="pelayan">
                <FoodList />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Order Detail */}
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />

        {/* Kasir */}
        <Route
          path="/kasir/orders"
          element={
            <ProtectedRoute>
              <RoleGuard role="kasir">
                <OrderList />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
