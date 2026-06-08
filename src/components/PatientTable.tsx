import React, { useState } from "react";
import { colors } from "../styles/colors";
import { StatusBadge } from "./StatusBadge";

interface PatientTableRow {
  id: string;
  name: string;
  rfidTag: string;
  stage: string;
  timeInStage: string;
  status: "success" | "warning" | "error" | "info";
}

interface PatientTableProps {
  patients: PatientTableRow[];
  onRowClick?: (patientId: string) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onRowClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.includes(searchTerm) ||
      patient.rfidTag.includes(searchTerm);

    const matchesFilter = !filterStatus || patient.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className="rounded-lg shadow-sm border border-gray-100 p-6"
      style={{ backgroundColor: colors.softBg }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
        Patients
      </h3>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, ID, or RFID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
        />
        <select
          value={filterStatus || ""}
          onChange={(e) => setFilterStatus(e.target.value || null)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
        >
          <option value="">All Statuses</option>
          <option value="success">Success</option>
          <option value="warning">Pending</option>
          <option value="error">Delayed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Patient Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Patient ID
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                RFID Tag
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Current Stage
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Time in Stage
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-gray-100 hover:bg-white cursor-pointer transition-colors"
                onClick={() => onRowClick?.(patient.id)}
              >
                <td className="py-3 px-4 text-gray-900">{patient.name}</td>
                <td className="py-3 px-4 text-gray-600">{patient.id}</td>
                <td className="py-3 px-4 text-gray-600">{patient.rfidTag}</td>
                <td className="py-3 px-4 text-gray-600">{patient.stage}</td>
                <td className="py-3 px-4 text-gray-600">{patient.timeInStage}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={patient.status} label={patient.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No patients found matching your search criteria.
        </div>
      )}
    </div>
  );
};
