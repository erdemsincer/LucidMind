import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}
