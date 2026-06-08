import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DAILY_SUMMARY,
  INITIAL_ACTIVITIES,
  INITIAL_OR_ROOMS,
  INITIAL_PATIENTS,
  MOCK_USERS,
  SIMULATED_RFID_EVENTS,
} from "../data/mockData";
import type {
  ActivityItem,
  AuthUser,
  Notification,
  ORRoom,
  Patient,
} from "../types";

interface AppContextValue {
  user: AuthUser | null;
  patients: Patient[];
  activities: ActivityItem[];
  orRooms: ORRoom[];
  notifications: Notification[];
  dailySummary: typeof DAILY_SUMMARY;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  dismissNotification: (id: string) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  showTimeline: boolean;
  setShowTimeline: (show: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = sessionStorage.getItem("surgitrackify_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [patients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [orRooms, setOrRooms] = useState<ORRoom[]>(INITIAL_OR_ROOMS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [eventIndex, setEventIndex] = useState(0);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const login = useCallback((email: string, password: string) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    const authUser: AuthUser = { name: found.name, email: found.email, role: found.role };
    setUser(authUser);
    sessionStorage.setItem("surgitrackify_user", JSON.stringify(authUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("surgitrackify_user");
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const event = SIMULATED_RFID_EVENTS[eventIndex % SIMULATED_RFID_EVENTS.length];
      const newActivity: ActivityItem = {
        id: `live-${Date.now()}`,
        patientName: event.patientName,
        patientId: event.patientId,
        action: event.action,
        status: event.status,
        timestamp: "Just now",
        location: event.location,
        isNew: true,
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 19)]);
      setEventIndex((i) => i + 1);

      if (event.status === "warning") {
        const notification: Notification = {
          id: `notif-${Date.now()}`,
          type: "delay",
          title: "Delay Alert",
          message: `${event.patientName}: ${event.action}`,
          timestamp: new Date(),
        };
        setNotifications((prev) => [notification, ...prev].slice(0, 5));
      }

      if (eventIndex % 4 === 3) {
        setOrRooms((prev) =>
          prev.map((room) =>
            room.status === "cleaning"
              ? { ...room, status: "available" as const, turnoverTime: `${10 + Math.floor(Math.random() * 10)}m` }
              : room
          )
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [user, eventIndex]);

  return (
    <AppContext.Provider
      value={{
        user,
        patients,
        activities,
        orRooms,
        notifications,
        dailySummary: DAILY_SUMMARY,
        login,
        logout,
        dismissNotification,
        selectedPatientId,
        setSelectedPatientId,
        showTimeline,
        setShowTimeline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
