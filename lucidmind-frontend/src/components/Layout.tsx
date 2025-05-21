import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f1ea] text-[#5e4b3c]">
      <Navbar />
      <main className="flex-1 max-w-3xl w-full mx-auto p-4">
        <Outlet />
      </main>
      <footer className="text-center text-sm py-4 text-[#8c7051]">
        © 2025 LucidMind
      </footer>
    </div>
  );
}
