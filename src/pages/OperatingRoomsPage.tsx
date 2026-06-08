import React from "react";
import { colors } from "../styles/colors";
import { ORStatusCard } from "../components/ORStatusCard";
import { KPICard } from "../components/KPICard";
import { useApp } from "../context/AppContext";

export const OperatingRoomsPage: React.FC = () => {
  const { orRooms } = useApp();

  const occupied = orRooms.filter((or) => or.status === "occupied").length;
  const available = orRooms.filter((or) => or.status === "available").length;
  const cleaning = orRooms.filter((or) => or.status === "cleaning").length;
  const total = orRooms.length;

  const stats = [
    {
      title: "Total ORs",
      value: total,
      subtext: "In facility",
      icon: <img src="/surgitrackifyimages/operatingrooms.png" alt="OR" className="w-10 h-10 object-contain" />,
    },
    {
      title: "Currently Occupied",
      value: occupied,
      subtext: `${Math.round((occupied / total) * 100)}% utilization`,
      trend: 12,
      icon: <img src="/surgitrackifyimages/occupied.png" alt="Occupied" className="w-10 h-10 object-contain" />,
    },
    {
      title: "Available",
      value: available,
      subtext: "Ready for next case",
      icon: <img src="/surgitrackifyimages/available.png" alt="Available" className="w-10 h-10 object-contain" />,
    },
    {
      title: "Cleaning/Prep",
      value: cleaning,
      subtext: "Turnover in progress",
      icon: <img src="/surgitrackifyimages/cleaning.png" alt="Cleaning" className="w-10 h-10 object-contain" />,
    },
  ];

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          Operating Rooms Management
        </h1>
        <p className="text-gray-600">Monitor real-time status and room turnover</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <KPICard key={index} title={stat.title} value={stat.value} subtext={stat.subtext} trend={stat.trend} icon={stat.icon} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {orRooms.map((or) => (
          <ORStatusCard
            key={or.orNumber}
            orNumber={or.orNumber}
            status={or.status}
            patientName={or.patientName}
            duration={or.duration}
            nextPatient={or.nextPatient}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-6" style={{ color: colors.deepGreen }}>
            OR Utilization Trend
          </h3>
          <div className="space-y-4">
            {[
              { label: "Occupied", count: occupied, color: colors.deepGreen },
              { label: "Available", count: available, color: colors.mutedSage },
              { label: "Cleaning/Prep", count: cleaning, color: colors.warning },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold" style={{ color: item.color }}>
                    {((item.count / total) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full" style={{ backgroundColor: item.color, width: `${(item.count / total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
            Room Turnover Times
          </h3>
          <div className="space-y-3">
            {orRooms.map((or) => (
              <div key={or.orNumber} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-sm text-gray-900">OR {or.orNumber}</p>
                  <p className="text-xs text-gray-500 capitalize">{or.status}</p>
                </div>
                <span className="text-sm font-semibold" style={{ color: colors.deepGreen }}>
                  {or.turnoverTime || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingRoomsPage;
