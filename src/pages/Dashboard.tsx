import React, { useState, useEffect } from "react";
import { colors } from "../styles/colors";
import { KPICard } from "../components/KPICard";
import { ActivityFeed } from "../components/ActivityFeed";
import { ORStatusCard } from "../components/ORStatusCard";
import { useApp } from "../context/AppContext";
import patientsIcon from "/surgitrackifyimages/patient.png";
import orIcon from "/surgitrackifyimages/operatingrooms.png";
import preOpIcon from "/surgitrackifyimages/preop.png";
import warningIcon from "/surgitrackifyimages/warning.png";

export const Dashboard: React.FC = () => {
  const { activities, orRooms, dailySummary } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const kpiData = [
    {
      title: "Patients Today",
      value: dailySummary.patientsToday,
      subtext: "Total admitted",
      trend: 8,
      icon: <img src={patientsIcon} alt="patients" className="w-6 h-6" />,
    },
    {
      title: "In Operating Rooms",
      value: dailySummary.inOR,
      subtext: "Currently operating",
      trend: 2,
      icon: <img src={orIcon} alt="OR" className="w-6 h-6" />,
    },
    {
      title: "In Pre-Op",
      value: dailySummary.inPreOp,
      subtext: "Preparing for surgery",
      trend: -1,
      icon: <img src={preOpIcon} alt="pre-op" className="w-6 h-6" />,
    },
    {
      title: "Delayed Cases",
      value: dailySummary.delayedCases,
      subtext: "Require attention",
      trend: -3,
      icon: <img src={warningIcon} alt="warning" className="w-6 h-6" />,
    },
  ];

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          RFID Surgical Tracking Dashboard
        </h1>
        <p className="text-gray-600">Real-time patient tracking and OR management system</p>
        <p className="text-sm text-gray-500 mt-1">Current time: {currentTime.toLocaleTimeString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} title={kpi.title} value={kpi.value} subtext={kpi.subtext} trend={kpi.trend} icon={kpi.icon} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} maxItems={5} />
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
            Today's Summary
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Surgery Time</p>
              <p className="text-2xl font-bold" style={{ color: colors.deepGreen }}>{dailySummary.avgSurgeryTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">OR Utilization</p>
              <p className="text-2xl font-bold" style={{ color: colors.deepGreen }}>{dailySummary.orUtilization}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Cases Completed</p>
              <p className="text-2xl font-bold" style={{ color: colors.deepGreen }}>
                {dailySummary.casesCompleted} / {dailySummary.casesScheduled}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Wait Time</p>
              <p className="text-2xl font-bold" style={{ color: colors.deepGreen }}>{dailySummary.avgWaitTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Turnover Time</p>
              <p className="text-2xl font-bold" style={{ color: colors.deepGreen }}>{dailySummary.avgTurnoverTime}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: colors.deepGreen }}>
          Operating Rooms Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orRooms.slice(0, 6).map((or) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
