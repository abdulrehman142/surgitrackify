import React, { useState } from "react";
import { colors } from "../styles/colors";
import { KPICard } from "../components/KPICard";
import { useApp } from "../context/AppContext";
import { STAFF_EFFICIENCY } from "../data/mockData";
import { exportDailyReportCSV, exportStaffEfficiencyCSV, exportToPDF } from "../utils/export";

export const ReportsAnalyticsPage: React.FC = () => {
  const { patients, dailySummary } = useApp();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [exportMessage, setExportMessage] = useState("");

  const showMessage = (msg: string) => {
    setExportMessage(msg);
    setTimeout(() => setExportMessage(""), 3000);
  };

  const handleExportPDF = () => {
    exportToPDF();
    showMessage("Opening print dialog for PDF export...");
  };

  const handleExportCSV = () => {
    exportDailyReportCSV(patients);
    showMessage("Daily report exported as CSV");
  };

  const handleExportExcel = () => {
    exportStaffEfficiencyCSV();
    showMessage("Staff efficiency report exported as CSV (Excel-compatible)");
  };

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          Reports & Analytics
        </h1>
        <p className="text-gray-600">Performance metrics, insights, and exportable reports</p>
      </div>

      {exportMessage && (
        <div className="mb-4 p-3 rounded-lg text-sm text-green-800 bg-green-50 border border-green-100">
          {exportMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="OR Utilization"
          value={`${dailySummary.orUtilization}%`}
          subtext="Average today"
          trend={5}
          icon={<img src="/surgitrackifyimages/dashboard.png" alt="Chart" className="w-10 h-10 object-contain" />}
        />
        <KPICard
          title="Patient Throughput"
          value={dailySummary.patientsToday}
          subtext="Cases today"
          trend={12}
          icon={<img src="/surgitrackifyimages/patient.png" alt="Patients" className="w-10 h-10 object-contain" />}
        />
        <KPICard
          title="Avg Wait Time"
          value={dailySummary.avgWaitTime}
          subtext="Pre-Op to OR"
          trend={-8}
          icon={<img src="/surgitrackifyimages/clock.png" alt="Clock" className="w-10 h-10 object-contain" />}
        />
        <KPICard
          title="Avg Turnover"
          value={dailySummary.avgTurnoverTime}
          subtext="Room prep time"
          trend={-2}
          icon={<img src="/surgitrackifyimages/cleaning.png" alt="Turnover" className="w-10 h-10 object-contain" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-6" style={{ color: colors.deepGreen }}>
            OR Utilization by Hour
          </h3>
          <div className="flex items-end justify-around h-64 gap-2">
            {[65, 72, 68, 81, 75, 88, 79, 74].map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-500 mb-1">{value}%</div>
                <div className="w-full rounded-t" style={{ backgroundColor: colors.deepGreen, height: `${value * 2}px` }} />
                <div className="text-xs text-gray-500 mt-2">{8 + index}:00</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-6" style={{ color: colors.deepGreen }}>
            Patient Throughput (This Week)
          </h3>
          <div className="flex items-end justify-around h-64 gap-2">
            {[
              { day: "Mon", value: 18 },
              { day: "Tue", value: 22 },
              { day: "Wed", value: 20 },
              { day: "Thu", value: 25 },
              { day: "Fri", value: 24 },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-500 mb-1">{item.value}</div>
                <div className="w-full rounded-t" style={{ backgroundColor: colors.mutedSage, height: `${item.value * 8}px` }} />
                <div className="text-xs text-gray-500 mt-2">{item.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
            Staff / Surgeon Efficiency
          </h3>
          <div className="space-y-4">
            {STAFF_EFFICIENCY.map((staff) => (
              <div key={staff.id} className="pb-4 border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900">{staff.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{staff.role}</span>
                  </div>
                  <span className="font-semibold" style={{ color: colors.deepGreen }}>
                    {staff.efficiency}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full" style={{ backgroundColor: colors.deepGreen, width: `${staff.efficiency}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{staff.casesToday} cases today</span>
                  <span>Turnover: {staff.avgTurnover}</span>
                  <span>On-time: {staff.onTimeRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
            Delay Report
          </h3>
          <div className="space-y-4">
            {patients
              .filter((p) => p.status === "warning" || p.status === "error")
              .map((p) => (
                <div key={p.id} className="p-3 rounded-lg" style={{ backgroundColor: colors.softBg }}>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <span className="text-xs font-medium text-red-600 uppercase">{p.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{p.stage} — {p.timeInStage} (target exceeded)</p>
                  <p className="text-xs text-gray-500">{p.location} · {p.surgeon}</p>
                </div>
              ))}
            {patients.filter((p) => p.status === "warning" || p.status === "error").length === 0 && (
              <p className="text-sm text-gray-500">No delays reported today</p>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-4 mt-8" style={{ color: colors.deepGreen }}>
            Wait Time Analysis
          </h3>
          <div className="space-y-3">
            {[
              { stage: "Check-in to Pre-Op", time: "12m", target: "10m", ok: false },
              { stage: "Pre-Op to OR", time: "23m", target: "20m", ok: false },
              { stage: "OR to Recovery", time: "5m", target: "5m", ok: true },
              { stage: "Recovery to Discharge", time: "45m", target: "60m", ok: true },
            ].map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.stage}</span>
                <span style={{ color: item.ok ? colors.deepGreen : colors.warning }}>
                  {item.time} / {item.target} {item.ok ? "✓" : "⚠"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: "white" }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
          Export Reports
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExportPDF}
            style={{ backgroundColor: colors.deepGreen, color: "white" }}
            className="px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Export Daily Report (PDF)
          </button>
          <button
            onClick={handleExportCSV}
            style={{ backgroundColor: colors.mutedSage, color: "white" }}
            className="px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Export as CSV
          </button>
          <button
            onClick={handleExportExcel}
            style={{ backgroundColor: colors.mutedSage, color: "white" }}
            className="px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Export Staff Report (Excel)
          </button>
          <button
            onClick={() => setScheduleOpen(true)}
            style={{ border: `2px solid ${colors.deepGreen}`, color: colors.deepGreen, backgroundColor: "white" }}
            className="px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Schedule Report
          </button>
        </div>
      </div>

      {scheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setScheduleOpen(false)}>
          <div className="w-full max-w-md p-6 rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>Schedule Daily Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Delivery Time</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>6:00 PM daily</option>
                  <option>8:00 AM daily</option>
                  <option>End of shift</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Recipients</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" defaultValue="admin@surgitrackify.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Format</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>PDF + CSV</option>
                  <option>PDF only</option>
                  <option>CSV only</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setScheduleOpen(false); showMessage("Daily report scheduled for 6:00 PM"); }}
                style={{ backgroundColor: colors.deepGreen, color: "white" }}
                className="flex-1 py-2 rounded-lg font-medium"
              >
                Schedule
              </button>
              <button onClick={() => setScheduleOpen(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalyticsPage;
