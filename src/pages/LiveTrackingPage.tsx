import React, { useState, useEffect } from "react";
import { colors } from "../styles/colors";
import { ActivityFeed } from "../components/ActivityFeed";
import { FacilityMap } from "../components/FacilityMap";
import { StatusBadge } from "../components/StatusBadge";
import { useApp } from "../context/AppContext";
import { FACILITY_ZONES, RFID_READERS } from "../data/mockData";

export const LiveTrackingPage: React.FC = () => {
  const { patients, activities } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulseTimer = setInterval(() => setPulse((p) => !p), 1000);
    return () => clearInterval(pulseTimer);
  }, []);

  const activeReaders = RFID_READERS.filter((r) => r.status === "success").length;

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      <div className="mb-8 flex flex-wrap justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold" style={{ color: colors.deepGreen }}>
              Live RFID Tracking
            </h1>
            <span
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full text-white font-medium"
              style={{ backgroundColor: colors.deepGreen }}
            >
              <span
                className={`w-2 h-2 rounded-full bg-white ${pulse ? "opacity-100" : "opacity-40"} transition-opacity`}
              />
              LIVE
            </span>
          </div>
          <p className="text-gray-600">Real-time patient movement via RFID doorway readers</p>
          <p className="text-sm text-gray-500 mt-1">{currentTime.toLocaleString()}</p>
        </div>

        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-lg bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs text-gray-500">Active Readers</p>
            <p className="text-xl font-bold" style={{ color: colors.deepGreen }}>
              {activeReaders}/{RFID_READERS.length}
            </p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs text-gray-500">Tracked Patients</p>
            <p className="text-xl font-bold" style={{ color: colors.deepGreen }}>
              {patients.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
          Facility Map
        </h2>
        <FacilityMap zones={FACILITY_ZONES} patients={patients} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} maxItems={8} />
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-3 text-sm" style={{ color: colors.deepGreen }}>
              RFID Gate Readers
            </h3>
            <div className="space-y-2">
              {RFID_READERS.map((reader) => (
                <div key={reader.id} className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">{reader.name}</p>
                    <p className="text-gray-400">{reader.lastSync}</p>
                  </div>
                  <StatusBadge status={reader.status} label={reader.status === "success" ? "Online" : "Sync"} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-3 text-sm" style={{ color: colors.deepGreen }}>
              Patient Locations
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {patients.map((p) => (
                <div key={p.id} className="flex justify-between items-center text-xs py-1.5">
                  <div>
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-gray-400">{p.rfidTag} · {p.location}</p>
                  </div>
                  <StatusBadge status={p.status} label={p.stage} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;
