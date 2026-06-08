export type PatientStatus = "success" | "warning" | "error" | "info";
export type ORStatus = "occupied" | "available" | "cleaning";
export type UserRole = "admin" | "surgeon" | "nurse" | "staff";

export interface TimelineEvent {
  id: string;
  stage: string;
  location: string;
  enteredAt: string;
  exitedAt?: string;
  duration?: string;
  status: PatientStatus;
}

export interface Patient {
  id: string;
  name: string;
  rfidTag: string;
  stage: string;
  location: string;
  timeInStage: string;
  status: PatientStatus;
  surgeon?: string;
  procedure?: string;
  checkInTime: string;
  timeline: TimelineEvent[];
}

export interface ActivityItem {
  id: string;
  patientName: string;
  patientId: string;
  action: string;
  status: PatientStatus;
  timestamp: string;
  location?: string;
  isNew?: boolean;
}

export interface ORRoom {
  orNumber: string;
  status: ORStatus;
  patientName?: string;
  duration?: string;
  nextPatient?: string;
  turnoverTime?: string;
  surgeon?: string;
}

export interface RFIDReader {
  id: string;
  name: string;
  location: string;
  zone: string;
  status: PatientStatus;
  lastSync: string;
}

export interface FacilityZone {
  id: string;
  name: string;
  patientCount: number;
  capacity: number;
  status: PatientStatus;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  casesToday: number;
  avgTurnover: string;
  efficiency: number;
  onTimeRate: number;
}

export interface Notification {
  id: string;
  type: "delay" | "room" | "info";
  title: string;
  message: string;
  timestamp: Date;
}

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}
