import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../styles/colors";
import { useApp } from "../context/AppContext";

export const LoginPage: React.FC = () => {
  const { login, user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);
  const [email, setEmail] = useState("admin@surgitrackify.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password. Try admin@surgitrackify.com / admin123");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: colors.softBg }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: colors.deepGreen }}
          >
            ST
          </div>
          <h1 className="text-3xl font-bold" style={{ color: colors.deepGreen }}>
            SurgiTrackify
          </h1>
          <p className="text-gray-600 mt-2">RFID Surgical Center Tracking System</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl shadow-sm border border-gray-100"
          style={{ backgroundColor: "white" }}
        >
          <h2 className="text-lg font-semibold mb-6 text-gray-900">Staff Login</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                placeholder="admin@surgitrackify.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: colors.deepGreen }}
            className="w-full mt-6 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Demo: admin@surgitrackify.com / admin123
          </p>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          HIPAA-ready architecture · Encrypted · Role-based access
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
