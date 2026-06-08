import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../styles/colors";
import { useApp } from "../context/AppContext";

import dashboardIcon from "/surgitrackifyimages/dashboard.png";
import patientIcon from "/surgitrackifyimages/patient.png";
import trackingIcon from "/surgitrackifyimages/livetracking.png";
import roomsIcon from "/surgitrackifyimages/operatingrooms.png";
import reportsIcon from "/surgitrackifyimages/reports.png";
import aiIcon from "/surgitrackifyimages/aiinsights.png";
import settingsIcon from "/surgitrackifyimages/settings.png";
import surgitrackify from "/surgitrackifyimages/surgitrackify.png";
import profileIcon from "/surgitrackifyimages/profile.png";

const menuItems = [
  { path: "/", label: "Dashboard", icon: dashboardIcon },
  { path: "/patients", label: "Patients", icon: patientIcon },
  { path: "/tracking", label: "Live Tracking", icon: trackingIcon },
  { path: "/rooms", label: "Operating Rooms", icon: roomsIcon },
  { path: "/reports", label: "Reports", icon: reportsIcon },
  { path: "/ai", label: "AI Insights", icon: aiIcon },
  { path: "/mobile", label: "Mobile App", icon: patientIcon },
  { path: "/settings", label: "Settings", icon: settingsIcon },
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useApp();

  return (
    <div
      className={`h-full flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={{ backgroundColor: colors.deepGreen }}
    >
      {/* HEADER */}
      <div className="p-6 border-b border-white/20 flex justify-between items-center">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src={surgitrackify} className="w-8 h-8" />
            <div>
              <h1 className="text-white font-bold text-sm">SurgiTrackify</h1>
              <p className="text-white/70 text-xs">RFID System</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white px-2 py-1 rounded hover:bg-white/20 hover:text-black transition"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* MENU */}
      <nav className="mt-6 flex-1 space-y-2 px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-lg
                transition-all duration-150
                outline-none
                border-0
                focus:outline-none
                active:outline-none

                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                }
              `}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <img src={item.icon} className="w-6 h-6" />

              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* USER */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3">
          <img src={profileIcon} className="w-8 h-8 rounded-full" />

          {!isCollapsed && (
            <div>
              <p className="text-white text-xs font-medium">
                {user?.name || "User"}
              </p>
              <p className="text-white/70 text-xs capitalize">
                {user?.role || "staff"}
              </p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={logout}
            className="mt-3 w-full text-xs text-white border border-white/30 rounded py-1 hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;