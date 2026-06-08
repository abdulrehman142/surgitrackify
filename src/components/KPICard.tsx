import React from "react";
import { colors } from "../styles/colors";

interface KPICardProps {
  title: string;
  value: number | string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: number;
  bgColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  icon,
  trend,
  bgColor = colors.softBg,
}) => {
  return (
    <div
      className="p-6 rounded-lg shadow-sm border border-gray-100"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <p
          className="text-3xl font-bold"
          style={{ color: colors.deepGreen }}
        >
          {value}
        </p>
        {trend !== undefined && (
          <span
            className={`text-sm font-medium ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      {subtext && (
        <p className="text-xs text-gray-500 mt-2">{subtext}</p>
      )}
    </div>
  );
};
