import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth"; // API fonksiyonu

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await register(username, email, password);
      localStorage.setItem("token", result.token);
      navigate("/"); // Kayıttan sonra anasayfaya yönlendir
    } catch (err) {
      setError("Kayıt başarısız. E-posta kullanılıyor olabilir.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6 border">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Kayıt Ol</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
            <input
              type="text"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="erdem"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Kayıt Ol
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}

        <p className="mt-4 text-center text-sm text-gray-600">
          Zaten hesabın var mı?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
