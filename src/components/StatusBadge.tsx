import React from "react";
import { colors } from "../styles/colors";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  label: string;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = "md",
}) => {
  const statusColors = {
    success: { bg: colors.success, text: "white" },
    warning: { bg: colors.warning, text: "white" },
    error: { bg: colors.error, text: "white" },
    info: { bg: colors.info, text: "white" },
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const selectedColor = statusColors[status];

  return (
    <span
      className={`inline-block rounded-full font-medium ${sizeClasses[size]}`}
      style={{
        backgroundColor: selectedColor.bg,
        color: selectedColor.text,
      }}
    >
      {label}
    </span>
  );
};
