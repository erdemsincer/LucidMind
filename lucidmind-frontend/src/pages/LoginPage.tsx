import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(email, password);
      setToken(result.token);
      navigate("/");
    } catch {
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f4f1ea] text-[#5e4b3c]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 py-6 border border-[#ccc]">
        <h2 className="text-3xl font-bold mb-6 text-center">Giriş Yap</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c7051] bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şifre</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c7051] bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8c7051] text-white py-2 rounded-lg font-semibold hover:bg-[#745e45] transition"
          >
            Giriş Yap
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center font-medium">{error}</p>
        )}

        <p className="mt-5 text-center text-sm">
          Hesabın yok mu?{" "}
          <Link to="/register" className="text-[#8c7051] font-medium hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
