import type { Patient, StaffMember } from "../types";
import { STAFF_EFFICIENCY } from "../data/mockData";

export const exportToCSV = (filename: string, headers: string[], rows: string[][]) => {
  const csv = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const exportDailyReportCSV = (patients: Patient[]) => {
  exportToCSV(
    `surgitrackify-daily-report-${new Date().toISOString().split("T")[0]}.csv`,
    ["Patient ID", "Name", "RFID Tag", "Stage", "Location", "Time in Stage", "Status", "Surgeon", "Procedure"],
    patients.map((p) => [p.id, p.name, p.rfidTag, p.stage, p.location, p.timeInStage, p.status, p.surgeon || "", p.procedure || ""])
  );
};

export const exportStaffEfficiencyCSV = (staff: StaffMember[] = STAFF_EFFICIENCY) => {
  exportToCSV(
    `surgitrackify-staff-efficiency-${new Date().toISOString().split("T")[0]}.csv`,
    ["ID", "Name", "Role", "Cases Today", "Avg Turnover", "Efficiency %", "On-Time Rate %"],
    staff.map((s) => [s.id, s.name, s.role, String(s.casesToday), s.avgTurnover, String(s.efficiency), String(s.onTimeRate)])
  );
};

export const exportToPDF = () => {
  window.print();
};
