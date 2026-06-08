import React from "react";
import { colors } from "../styles/colors";
import { StatusBadge } from "./StatusBadge";
import type { Patient } from "../types";

interface PatientTimelineProps {
  patient: Patient;
  onClose: () => void;
}

const STAGE_ORDER = ["Check-in", "Pre-Op", "Operating Room", "Recovery", "Discharge"];

export const PatientTimeline: React.FC<PatientTimelineProps> = ({ patient, onClose }) => {
  const totalVisit = patient.timeline.length > 1
    ? calculateTotalTime(patient)
    : patient.timeInStage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl border border-gray-100"
        style={{ backgroundColor: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold" style={{ color: colors.deepGreen }}>
              Patient Journey Timeline
            </h2>
            <p className="text-gray-600 mt-1">
              {patient.name} · {patient.id} · {patient.rfidTag}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 uppercase">Check-in</p>
            <p className="font-semibold">{patient.checkInTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Current Stage</p>
            <p className="font-semibold">{patient.stage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Total Visit</p>
            <p className="font-semibold">{totalVisit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Procedure</p>
            <p className="font-semibold text-sm">{patient.procedure || "—"}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {STAGE_ORDER.map((stageName) => {
                const event = patient.timeline.find((t) => t.stage === stageName);
                const isCurrent = patient.stage === stageName;
                const isPast = event && event.exitedAt;
                const isFuture = !event && !isCurrent;

                if (isFuture) {
                  return (
                    <div key={stageName} className="relative pl-10 opacity-40">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
                      <p className="font-medium text-gray-400">{stageName}</p>
                      <p className="text-sm text-gray-400">Pending</p>
                    </div>
                  );
                }

                return (
                  <div key={stageName} className="relative pl-10">
                    <div
                      className="absolute left-2.5 w-3 h-3 rounded-full border-2 border-white"
                      style={{
                        backgroundColor: isCurrent ? colors.deepGreen : isPast ? colors.mutedSage : colors.warning,
                      }}
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-900">{stageName}</p>
                      {isCurrent && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: colors.deepGreen }}>
                          Current
                        </span>
                      )}
                      {event && <StatusBadge status={event.status} label={event.status} size="sm" />}
                    </div>
                    {event && (
                      <>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <div className="flex gap-4 mt-1 text-sm text-gray-500">
                          <span>Entered: {event.enteredAt}</span>
                          {event.exitedAt && <span>Exited: {event.exitedAt}</span>}
                          {event.duration && (
                            <span className="font-medium" style={{ color: colors.deepGreen }}>
                              Duration: {event.duration}
                            </span>
                          )}
                          {isCurrent && !event.exitedAt && (
                            <span className="font-medium" style={{ color: colors.deepGreen }}>
                              In progress: {patient.timeInStage}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateTotalTime(patient: Patient): string {
  const first = patient.timeline[0];
  if (!first) return patient.timeInStage;
  const checkIn = first.enteredAt;
  return `Since ${checkIn}`;
}

export default PatientTimeline;
