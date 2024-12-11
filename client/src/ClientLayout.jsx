import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export default function ClientLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto px-10 md:px-0 mt-1">
        <Outlet />
      </main>
    </div>
  );
}
