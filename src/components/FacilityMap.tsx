import React from "react";
import { colors } from "../styles/colors";
import type { FacilityZone, Patient } from "../types";

interface FacilityMapProps {
  zones: FacilityZone[];
  patients: Patient[];
}

export const FacilityMap: React.FC<FacilityMapProps> = ({ zones, patients }) => {
  const getPatientsInZone = (zoneName: string) => {
    const zoneMap: Record<string, string[]> = {
      "Check-in / Reception": ["Discharge"],
      "Pre-Op": ["Pre-Op"],
      "Operating Rooms": ["Operating Room"],
      "Recovery / PACU": ["Recovery"],
      "Discharge": ["Discharge"],
    };
    const stages = zoneMap[zoneName] || [];
    return patients.filter((p) => stages.some((s) => p.stage.includes(s) || p.stage === s));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {zones.map((zone) => {
        const zonePatients = getPatientsInZone(zone.name);
        const utilization = Math.round((zone.patientCount / zone.capacity) * 100);

        return (
          <div
            key={zone.id}
            className="p-4 rounded-lg border border-gray-100 shadow-sm"
            style={{ backgroundColor: "white" }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-sm" style={{ color: colors.deepGreen }}>
                {zone.name}
              </h4>
              <span
                className="text-xs px-2 py-0.5 rounded-full text-white"
                style={{
                  backgroundColor:
                    zone.status === "warning" ? colors.warning : zone.status === "error" ? colors.error : colors.deepGreen,
                }}
              >
                {zone.patientCount}/{zone.capacity}
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  backgroundColor: utilization > 80 ? colors.warning : colors.deepGreen,
                  width: `${Math.min(utilization, 100)}%`,
                }}
              />
            </div>

            <div className="space-y-1.5">
              {zonePatients.length > 0 ? (
                zonePatients.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.deepGreen }} />
                    <span className="text-gray-700">{p.name}</span>
                    <span className="text-gray-400">({p.location})</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">No patients in zone</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FacilityMap;
