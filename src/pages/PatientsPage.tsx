import React from "react";
import { colors } from "../styles/colors";
import { PatientTable } from "../components/PatientTable";
import { PatientTimeline } from "../components/PatientTimeline";
import { useApp } from "../context/AppContext";

export const PatientsPage: React.FC = () => {
  const {
    patients,
    selectedPatientId,
    setSelectedPatientId,
    showTimeline,
    setShowTimeline,
  } = useApp();

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const handleViewTimeline = () => {
    if (selectedPatient) setShowTimeline(true);
  };

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          Patient Management
        </h1>
        <p className="text-gray-600">Track and manage all patients in the surgical center</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PatientTable patients={patients} onRowClick={setSelectedPatientId} />
        </div>

        <div>
          {selectedPatient ? (
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6" style={{ backgroundColor: "white" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
                Patient Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Patient ID</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedPatient.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">RFID Tag</p>
                  <p className="font-mono text-sm text-gray-900">{selectedPatient.rfidTag}</p>
                </div>
                {selectedPatient.surgeon && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Surgeon</p>
                    <p className="text-sm text-gray-900">{selectedPatient.surgeon}</p>
                  </div>
                )}
                {selectedPatient.procedure && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Procedure</p>
                    <p className="text-sm text-gray-900">{selectedPatient.procedure}</p>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Current Location</p>
                  <p className="text-lg font-semibold" style={{ color: colors.mutedSage }}>
                    {selectedPatient.stage} — {selectedPatient.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Time in Current Stage</p>
                  <p className="text-2xl font-bold" style={{ color: colors.deepGreen }}>
                    {selectedPatient.timeInStage}
                  </p>
                </div>

                <button
                  onClick={handleViewTimeline}
                  style={{ backgroundColor: colors.deepGreen, color: "white" }}
                  className="w-full mt-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  View Full Timeline
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500" style={{ backgroundColor: "white" }}>
              <p>Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>

      {showTimeline && selectedPatient && (
        <PatientTimeline patient={selectedPatient} onClose={() => setShowTimeline(false)} />
      )}
    </div>
  );
};

export default PatientsPage;
