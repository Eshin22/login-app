"use client";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function DarkLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", form);
      dispatch(setUser(res.data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-white">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((type) => (
            <div key={type}>
              <label className="block text-gray-300 mb-1 capitalize">{type}</label>
              <input
                type={type}
                placeholder={`Enter ${type}`}
                value={form[type as "email" | "password"]}
                onChange={(e) =>
                  setForm({ ...form, [type]: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-center text-red-500">{error}</p>}
        <p className="text-gray-400 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
