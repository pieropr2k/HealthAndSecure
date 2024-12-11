import { Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard";

export default function DoctorLayout() {
  return (
    <div className="flex">
      <Dashboard/>
      <div className="ml-[255px] flex-1 bg-gray-100 p-10">
        <Outlet />
      </div>
    </div>
  );
}
