import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">LucidMind</Link>
      <div className="space-x-4">
        <Link to="/login" className="hover:underline">Giriş</Link>
        <Link to="/register" className="hover:underline">Kayıt</Link>
      </div>
    </nav>
  );
}
