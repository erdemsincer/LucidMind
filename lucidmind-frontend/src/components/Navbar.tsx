import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#8c7051] text-white px-6 py-4 shadow-md flex justify-between items-center rounded-b-2xl">
      <Link to="/" className="font-bold text-2xl tracking-wide">
        LucidMind
      </Link>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Giriş</Link>
            <Link to="/register" className="hover:underline">Kayıt</Link>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Ana Sayfa</Link>
            <Link to="/dreams" className="hover:underline">Rüyalarım</Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-[#ffcccc] font-semibold"
            >
              Çıkış Yap
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
