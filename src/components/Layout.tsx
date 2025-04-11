import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";
import { SyncLoader } from "./SyncLoader";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
      <SyncLoader />
    </div>
  );
}
