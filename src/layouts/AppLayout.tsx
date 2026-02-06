import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar futura */}
      <div className="flex-1">
        {/* Navbar futura */}
        <Outlet />
      </div>
    </div>
  );
}
