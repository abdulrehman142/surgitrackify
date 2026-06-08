import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NotificationToast } from "./NotificationToast";
import { useApp } from "../context/AppContext";

export const Layout: React.FC = () => {
  const { notifications, dismissNotification } = useApp();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <NotificationToast notifications={notifications} onDismiss={dismissNotification} />
    </div>
  );
};

export default Layout;
