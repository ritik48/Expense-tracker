import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}
