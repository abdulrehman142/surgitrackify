import React from "react";
import { colors } from "../styles/colors";

interface TopNavbarProps {
  title?: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ 
  title = "RFID Surgical Tracking System" 
}) => {
  return (
    <div
      className="h-16 px-6 flex items-center justify-between shadow-sm border-b"
      style={{ 
        backgroundColor: "white",
        borderBottomColor: colors.border 
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">🏥</div>
        <h1 className="text-xl font-semibold" style={{ color: colors.deepGreen }}>
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: colors.softBg }}>
          <div 
            className="w-8 h-8 rounded-full" 
            style={{ backgroundColor: colors.mutedSage }} 
          />
          <span className="text-sm font-medium text-gray-700">Administrator</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
