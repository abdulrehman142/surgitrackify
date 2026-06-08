import React from "react";
import { colors } from "../styles/colors";
import type { Notification } from "../types";

interface NotificationToastProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, onDismiss }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="p-4 rounded-lg shadow-lg border border-gray-100 animate-in slide-in-from-right"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex justify-between items-start gap-3">
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm"
                style={{
                  backgroundColor:
                    notif.type === "delay" ? colors.error : notif.type === "room" ? colors.warning : colors.mutedSage,
                }}
              >
                {notif.type === "delay" ? "!" : notif.type === "room" ? "OR" : "i"}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {notif.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(notif.id)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
