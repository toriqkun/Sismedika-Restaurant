import { useState } from "react";
import { loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await loginApi(form);
    login(res.data);
    navigate("/tables");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={submit}
        className="bg-gray-100 p-10 rounded-2xl shadow w-96 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full px-5 py-3 rounded-full border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-5 py-3 rounded-full border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-black text-white py-3 rounded-full">
          Sign In
        </button>
      </form>
    </div>
  );
}
