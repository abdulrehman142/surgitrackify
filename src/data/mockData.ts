import type {
  ActivityItem,
  FacilityZone,
  ORRoom,
  Patient,
  RFIDReader,
  StaffMember,
} from "../types";

export const MOCK_USERS = [
  { email: "admin@surgitrackify.com", password: "admin123", name: "Admin User", role: "admin" as const },
  { email: "nurse@surgitrackify.com", password: "nurse123", name: "Sarah Nurse", role: "nurse" as const },
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    rfidTag: "RFID-001",
    stage: "Pre-Op",
    location: "Pre-Op Room 1",
    timeInStage: "45 mins",
    status: "success",
    surgeon: "Dr. Williams",
    procedure: "Appendectomy",
    checkInTime: "07:30 AM",
    timeline: [
      { id: "t1", stage: "Check-in", location: "Reception", enteredAt: "07:30 AM", exitedAt: "07:42 AM", duration: "12m", status: "success" },
      { id: "t2", stage: "Pre-Op", location: "Pre-Op Room 1", enteredAt: "07:42 AM", status: "success" },
    ],
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    rfidTag: "RFID-002",
    stage: "Operating Room",
    location: "OR 2",
    timeInStage: "1h 15m",
    status: "success",
    surgeon: "Dr. Chen",
    procedure: "Knee Arthroscopy",
    checkInTime: "06:45 AM",
    timeline: [
      { id: "t1", stage: "Check-in", location: "Reception", enteredAt: "06:45 AM", exitedAt: "06:55 AM", duration: "10m", status: "success" },
      { id: "t2", stage: "Pre-Op", location: "Pre-Op Room 2", enteredAt: "06:55 AM", exitedAt: "07:35 AM", duration: "40m", status: "success" },
      { id: "t3", stage: "Operating Room", location: "OR 2", enteredAt: "07:35 AM", status: "success" },
    ],
  },
  {
    id: "P003",
    name: "Michael Brown",
    rfidTag: "RFID-003",
    stage: "Pre-Op",
    location: "Pre-Op Room 3",
    timeInStage: "1h 45m",
    status: "warning",
    surgeon: "Dr. Patel",
    procedure: "Hernia Repair",
    checkInTime: "06:00 AM",
    timeline: [
      { id: "t1", stage: "Check-in", location: "Reception", enteredAt: "06:00 AM", exitedAt: "06:15 AM", duration: "15m", status: "warning" },
      { id: "t2", stage: "Pre-Op", location: "Pre-Op Room 3", enteredAt: "06:15 AM", status: "warning" },
    ],
  },
  {
    id: "P004",
    name: "Emma Davis",
    rfidTag: "RFID-004",
    stage: "Recovery",
    location: "Recovery 1",
    timeInStage: "30 mins",
    status: "success",
    surgeon: "Dr. Williams",
    procedure: "Gallbladder Removal",
    checkInTime: "05:30 AM",
    timeline: [
      { id: "t1", stage: "Check-in", location: "Reception", enteredAt: "05:30 AM", exitedAt: "05:40 AM", duration: "10m", status: "success" },
      { id: "t2", stage: "Pre-Op", location: "Pre-Op Room 1", enteredAt: "05:40 AM", exitedAt: "06:10 AM", duration: "30m", status: "success" },
      { id: "t3", stage: "Operating Room", location: "OR 1", enteredAt: "06:10 AM", exitedAt: "08:00 AM", duration: "1h 50m", status: "success" },
      { id: "t4", stage: "Recovery", location: "Recovery 1", enteredAt: "08:00 AM", status: "success" },
    ],
  },
  {
    id: "P005",
    name: "Robert Wilson",
    rfidTag: "RFID-005",
    stage: "Discharge",
    location: "Discharge Area",
    timeInStage: "15 mins",
    status: "info",
    surgeon: "Dr. Chen",
    procedure: "Cataract Surgery",
    checkInTime: "04:00 AM",
    timeline: [
      { id: "t1", stage: "Check-in", location: "Reception", enteredAt: "04:00 AM", exitedAt: "04:10 AM", duration: "10m", status: "success" },
      { id: "t2", stage: "Pre-Op", location: "Pre-Op Room 2", enteredAt: "04:10 AM", exitedAt: "04:30 AM", duration: "20m", status: "success" },
      { id: "t3", stage: "Operating Room", location: "OR 4", enteredAt: "04:30 AM", exitedAt: "05:15 AM", duration: "45m", status: "success" },
      { id: "t4", stage: "Recovery", location: "Recovery 2", enteredAt: "05:15 AM", exitedAt: "06:00 AM", duration: "45m", status: "success" },
      { id: "t5", stage: "Discharge", location: "Discharge Area", enteredAt: "06:00 AM", status: "info" },
    ],
  },
  {
    id: "P006",
    name: "Lisa Anderson",
    rfidTag: "RFID-006",
    stage: "Pre-Op",
    location: "Pre-Op Room 2",
    timeInStage: "2h 10m",
    status: "error",
    surgeon: "Dr. Patel",
    procedure: "Spinal Fusion",
    checkInTime: "05:00 AM",
    timeline: [
      { id: "t1", stage: "Check-in", location: "Reception", enteredAt: "05:00 AM", exitedAt: "05:20 AM", duration: "20m", status: "warning" },
      { id: "t2", stage: "Pre-Op", location: "Pre-Op Room 2", enteredAt: "05:20 AM", status: "error" },
    ],
  },
];

export const INITIAL_OR_ROOMS: ORRoom[] = [
  { orNumber: "1", status: "occupied", patientName: "Alice Cooper", duration: "1h 15m", surgeon: "Dr. Williams", turnoverTime: "22m" },
  { orNumber: "2", status: "occupied", patientName: "Sarah Johnson", duration: "1h 15m", surgeon: "Dr. Chen", turnoverTime: "18m" },
  { orNumber: "3", status: "cleaning", turnoverTime: "12m" },
  { orNumber: "4", status: "available", nextPatient: "Jennifer Lee", turnoverTime: "15m" },
  { orNumber: "5", status: "occupied", patientName: "David Miller", duration: "2h 30m", surgeon: "Dr. Patel", turnoverTime: "25m" },
  { orNumber: "6", status: "available", turnoverTime: "14m" },
  { orNumber: "7", status: "occupied", patientName: "Catherine White", duration: "1h 5m", surgeon: "Dr. Chen", turnoverTime: "20m" },
  { orNumber: "8", status: "cleaning", turnoverTime: "10m" },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: "1", patientName: "John Smith", patientId: "P001", action: "Entered Pre-Op via RFID gate", status: "success", timestamp: "2 mins ago", location: "Pre-Op Room 1" },
  { id: "2", patientName: "Sarah Johnson", patientId: "P002", action: "Entered Operating Room", status: "success", timestamp: "5 mins ago", location: "OR 2" },
  { id: "3", patientName: "Michael Brown", patientId: "P003", action: "Delayed — awaiting anesthetist", status: "warning", timestamp: "12 mins ago", location: "Pre-Op Room 3" },
  { id: "4", patientName: "Emma Davis", patientId: "P004", action: "Recovery room admission", status: "success", timestamp: "18 mins ago", location: "Recovery 1" },
  { id: "5", patientName: "Robert Wilson", patientId: "P005", action: "Ready for discharge", status: "info", timestamp: "25 mins ago", location: "Discharge Area" },
];

export const RFID_READERS: RFIDReader[] = [
  { id: "D001", name: "Gate Reader — OR 1", location: "Operating Room 1", zone: "or", status: "success", lastSync: "2 mins ago" },
  { id: "D002", name: "Gate Reader — Pre-Op", location: "Pre-Op Area", zone: "preop", status: "success", lastSync: "1 min ago" },
  { id: "D003", name: "Gate Reader — Recovery", location: "Recovery Room", zone: "recovery", status: "warning", lastSync: "12 mins ago" },
  { id: "D004", name: "Gate Reader — Discharge", location: "Discharge Area", zone: "discharge", status: "success", lastSync: "3 mins ago" },
  { id: "D005", name: "Gate Reader — Check-in", location: "Reception", zone: "checkin", status: "success", lastSync: "30 secs ago" },
  { id: "D006", name: "Gate Reader — OR 2", location: "Operating Room 2", zone: "or", status: "success", lastSync: "4 mins ago" },
];

export const FACILITY_ZONES: FacilityZone[] = [
  { id: "checkin", name: "Check-in / Reception", patientCount: 0, capacity: 10, status: "success" },
  { id: "preop", name: "Pre-Op", patientCount: 3, capacity: 6, status: "warning" },
  { id: "or", name: "Operating Rooms", patientCount: 4, capacity: 8, status: "success" },
  { id: "recovery", name: "Recovery / PACU", patientCount: 1, capacity: 4, status: "success" },
  { id: "discharge", name: "Discharge", patientCount: 1, capacity: 6, status: "info" },
];

export const STAFF_EFFICIENCY: StaffMember[] = [
  { id: "S001", name: "Dr. Williams", role: "Surgeon", casesToday: 4, avgTurnover: "18m", efficiency: 92, onTimeRate: 88 },
  { id: "S002", name: "Dr. Chen", role: "Surgeon", casesToday: 5, avgTurnover: "15m", efficiency: 95, onTimeRate: 94 },
  { id: "S003", name: "Dr. Patel", role: "Surgeon", casesToday: 3, avgTurnover: "25m", efficiency: 78, onTimeRate: 72 },
  { id: "S004", name: "Nurse Adams", role: "OR Nurse", casesToday: 8, avgTurnover: "12m", efficiency: 90, onTimeRate: 91 },
  { id: "S005", name: "Nurse Garcia", role: "PACU Nurse", casesToday: 6, avgTurnover: "20m", efficiency: 85, onTimeRate: 86 },
];

export const SIMULATED_RFID_EVENTS = [
  { patientId: "P001", patientName: "John Smith", action: "RFID scan — moving to OR hallway", location: "OR Corridor", status: "success" as const },
  { patientId: "P003", patientName: "Michael Brown", action: "RFID alert — extended Pre-Op dwell time", location: "Pre-Op Room 3", status: "warning" as const },
  { patientId: "P006", patientName: "Lisa Anderson", action: "RFID scan — anesthetist arrived", location: "Pre-Op Room 2", status: "info" as const },
  { patientId: "P004", patientName: "Emma Davis", action: "RFID scan — preparing for discharge", location: "Recovery 1", status: "success" as const },
  { patientId: "P002", patientName: "Sarah Johnson", action: "RFID scan — surgery in progress", location: "OR 2", status: "success" as const },
];

export const DAILY_SUMMARY = {
  patientsToday: 24,
  inOR: 4,
  inPreOp: 3,
  delayedCases: 2,
  avgSurgeryTime: "1h 42m",
  orUtilization: 75,
  casesCompleted: 8,
  casesScheduled: 12,
  avgWaitTime: "23m",
  avgTurnoverTime: "18m",
};
