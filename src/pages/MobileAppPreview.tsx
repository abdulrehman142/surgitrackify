import React, { useState } from "react";
import { colors } from "../styles/colors";
import { useApp } from "../context/AppContext";
import { StatusBadge } from "../components/StatusBadge";

export const MobileAppPreview: React.FC = () => {
  const { patients, orRooms, activities, notifications } = useApp();
  const [activeTab, setActiveTab] = useState<"status" | "alerts" | "rooms">("status");

  const delayedPatients = patients.filter((p) => p.status === "warning" || p.status === "error");
  const occupiedORs = orRooms.filter((or) => or.status === "occupied");

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          iPhone Admin App Preview
        </h1>
        <p className="text-gray-600">
          Prototype preview of the mobile admin experience (React Native in production)
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <div className="w-[320px] h-[640px] rounded-[3rem] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden">
            <div className="h-6 bg-gray-900 flex justify-center items-end pb-0.5">
              <div className="w-20 h-4 bg-black rounded-full" />
            </div>

            <div className="h-[calc(100%-1.5rem)] flex flex-col" style={{ backgroundColor: colors.softBg }}>
              <div className="px-4 py-3 flex justify-between items-center" style={{ backgroundColor: colors.deepGreen }}>
                <div>
                  <p className="text-white text-xs opacity-80">SurgiTrackify</p>
                  <p className="text-white font-semibold text-sm">Admin Mobile</p>
                </div>
                <div className="relative">
                  <span className="text-white text-lg">🔔</span>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex border-b border-gray-200 bg-white">
                {(["status", "alerts", "rooms"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 py-2 text-xs font-medium capitalize"
                    style={{
                      color: activeTab === tab ? colors.deepGreen : "#999",
                      borderBottom: activeTab === tab ? `2px solid ${colors.deepGreen}` : "2px solid transparent",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {activeTab === "status" &&
                  patients.slice(0, 5).map((p) => (
                    <div key={p.id} className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.id} · {p.rfidTag}</p>
                        </div>
                        <StatusBadge status={p.status} label={p.status} size="sm" />
                      </div>
                      <p className="text-xs mt-1" style={{ color: colors.mutedSage }}>
                        {p.stage} · {p.location}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.timeInStage} in stage</p>
                    </div>
                  ))}

                {activeTab === "alerts" && (
                  <>
                    {delayedPatients.length > 0 ? (
                      delayedPatients.map((p) => (
                        <div key={p.id} className="p-3 rounded-lg bg-white border-l-4 shadow-sm" style={{ borderLeftColor: colors.error }}>
                          <p className="font-medium text-sm text-gray-900">Delay: {p.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{p.timeInStage} in {p.stage}</p>
                          <p className="text-xs text-gray-400">{p.location}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-400 py-8">No active alerts</p>
                    )}
                    {activities.slice(0, 3).map((a) => (
                      <div key={a.id} className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500">{a.timestamp}</p>
                        <p className="text-sm text-gray-800">{a.action}</p>
                      </div>
                    ))}
                  </>
                )}

                {activeTab === "rooms" &&
                  occupiedORs.map((or) => (
                    <div key={or.orNumber} className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
                      <div className="flex justify-between">
                        <p className="font-medium text-sm">OR {or.orNumber}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: colors.deepGreen }}>
                          Occupied
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{or.patientName}</p>
                      <p className="text-xs text-gray-400">{or.duration} · Turnover: {or.turnoverTime}</p>
                    </div>
                  ))}
              </div>

              <div className="p-3 border-t border-gray-200 bg-white">
                <button
                  style={{ backgroundColor: colors.deepGreen }}
                  className="w-full py-2 text-white text-sm rounded-lg font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppPreview;
