import React from "react";
import { colors } from "../styles/colors";
import { StatusBadge } from "./StatusBadge";

interface ORStatusCardProps {
  orNumber: string;
  status: "occupied" | "available" | "cleaning";
  patientName?: string;
  duration?: string;
  nextPatient?: string;
}

export const ORStatusCard: React.FC<ORStatusCardProps> = ({
  orNumber,
  status,
  patientName,
  duration,
  nextPatient,
}) => {
  const statusConfig = {
    occupied: { badge: "success" as const, label: "Occupied", bgClass: "bg-green-50" },
    available: { badge: "info" as const, label: "Available", bgClass: "bg-blue-50" },
    cleaning: { badge: "warning" as const, label: "Cleaning", bgClass: "bg-yellow-50" },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`p-6 rounded-lg shadow-sm border border-gray-100 ${config.bgClass}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: colors.deepGreen }}>
          OR {orNumber}
        </h3>
        <StatusBadge status={config.badge} label={config.label} size="sm" />
      </div>

      {status === "occupied" && patientName && (
        <>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Current Patient:</span> {patientName}
          </p>
          {duration && (
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Duration:</span> {duration}
            </p>
          )}
          <div
            className="h-1 rounded-full"
            style={{ backgroundColor: colors.mutedSage }}
          >
            <div
              className="h-1 rounded-full"
              style={{
                backgroundColor: colors.deepGreen,
                width: "65%",
              }}
            />
          </div>
        </>
      )}

      {status === "available" && nextPatient && (
        <p className="text-sm text-gray-600">
          <span className="font-medium">Next Patient:</span> {nextPatient}
        </p>
      )}

      {status === "cleaning" && (
        <p className="text-sm text-gray-600">Preparing for next case...</p>
      )}
    </div>
  );
};
