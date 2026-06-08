import React, { useState } from "react";
import { colors } from "../styles/colors";
import { StatusBadge } from "../components/ui/StatusBadge";

interface RFIDDevice {
  id: string;
  name: string;
  location: string;
  status: "success" | "warning" | "error";
  lastSync: string;
}

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "general" | "roles" | "devices" | "notifications" | "security"
  >("general");

  const [rfidDevices] = useState<RFIDDevice[]>([
    {
      id: "D001",
      name: "Door Reader - OR 1",
      location: "Operating Room 1",
      status: "success",
      lastSync: "2 mins ago",
    },
    {
      id: "D002",
      name: "Door Reader - Pre-Op",
      location: "Pre-Op Area",
      status: "success",
      lastSync: "1 min ago",
    },
    {
      id: "D003",
      name: "Door Reader - Recovery",
      location: "Recovery Room",
      status: "warning",
      lastSync: "12 mins ago",
    },
    {
      id: "D004",
      name: "Door Reader - Discharge",
      location: "Discharge Area",
      status: "success",
      lastSync: "3 mins ago",
    },
  ]);

  const tabItems = [
    { id: "general", label: "General Settings" },
    { id: "roles", label: "User Roles" },
    { id: "devices", label: "RFID Devices" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
  ];

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          Settings
        </h1>
        <p className="text-gray-600">
          Configure system settings, roles, and integrations
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-300 flex gap-4 overflow-x-auto">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(
                tab.id as
                  | "general"
                  | "roles"
                  | "devices"
                  | "notifications"
                  | "security"
              )
            }
            style={{
              borderBottomColor:
                activeTab === tab.id ? colors.deepGreen : "transparent",
              color: activeTab === tab.id ? colors.deepGreen : "#999",
            }}
            className="pb-4 px-2 border-b-2 font-medium text-sm hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div
          className="p-6 rounded-lg shadow-sm border border-gray-100"
          style={{ backgroundColor: "white" }}
        >
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: colors.deepGreen }}
          >
            General System Settings
          </h3>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                defaultValue="City Medical Center"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Time Format
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500">
                <option>24-Hour (HH:MM:SS)</option>
                <option>12-Hour (AM/PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention Period
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500">
                <option>30 days</option>
                <option>90 days</option>
                <option>1 year</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="autoBackup"
                defaultChecked
                className="w-4 h-4"
              />
              <label htmlFor="autoBackup" className="text-sm text-gray-700">
                Enable automatic daily backups
              </label>
            </div>

            <button
              style={{
                backgroundColor: colors.deepGreen,
                color: "white",
              }}
              className="mt-6 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* User Roles */}
      {activeTab === "roles" && (
        <div
          className="p-6 rounded-lg shadow-sm border border-gray-100"
          style={{ backgroundColor: "white" }}
        >
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: colors.deepGreen }}
          >
            User Roles & Permissions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Permissions
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Users
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    role: "Administrator",
                    permissions:
                      "Full access to all features and settings",
                    users: 2,
                  },
                  {
                    role: "Surgeon",
                    permissions:
                      "View patient data, OR status, reports",
                    users: 12,
                  },
                  {
                    role: "Nurse",
                    permissions:
                      "View patient tracking, update status",
                    users: 18,
                  },
                  {
                    role: "Staff",
                    permissions: "View-only access to dashboard",
                    users: 8,
                  },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {item.role}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.permissions}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.users}</td>
                    <td className="py-3 px-4">
                      <button className="text-sm font-medium hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFID Devices */}
      {activeTab === "devices" && (
        <div
          className="p-6 rounded-lg shadow-sm border border-gray-100"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.deepGreen }}
            >
              RFID Device Management
            </h3>
            <button
              style={{
                backgroundColor: colors.deepGreen,
                color: "white",
              }}
              className="px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              + Add Device
            </button>
          </div>

          <div className="space-y-4">
            {rfidDevices.map((device) => (
              <div
                key={device.id}
                className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{device.name}</h4>
                  <p className="text-sm text-gray-600">{device.location}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last sync: {device.lastSync}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge
                    status={device.status}
                    label={device.status === "success" ? "Online" : "Warning"}
                    size="sm"
                  />
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div
          className="p-6 rounded-lg shadow-sm border border-gray-100"
          style={{ backgroundColor: "white" }}
        >
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: colors.deepGreen }}
          >
            Notification Settings
          </h3>

          <div className="space-y-4 max-w-2xl">
            {[
              {
                title: "Surgery Delays",
                description: "Notify when cases are delayed by more than 15 mins",
              },
              {
                title: "Patient Movement",
                description: "Alert on major patient milestones (Pre-Op, OR, Recovery)",
              },
              {
                title: "System Issues",
                description: "Notify about RFID device disconnections or errors",
              },
              {
                title: "OR Availability",
                description: "Alert when operating rooms become available",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <input
                  type="checkbox"
                  id={`notif-${index}`}
                  defaultChecked
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`notif-${index}`}
                    className="block text-sm font-medium text-gray-900"
                  >
                    {item.title}
                  </label>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            style={{
              backgroundColor: colors.deepGreen,
              color: "white",
            }}
            className="mt-6 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Save Preferences
          </button>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div
          className="p-6 rounded-lg shadow-sm border border-gray-100"
          style={{ backgroundColor: "white" }}
        >
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: colors.deepGreen }}
          >
            Security Settings
          </h3>

          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue={30}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Policy
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500">
                <option>Standard (8+ characters)</option>
                <option>Strong (12+ characters, special chars)</option>
                <option>Very Strong (16+ characters, mixed case)</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="twoFactor"
                defaultChecked
                className="w-4 h-4"
              />
              <label htmlFor="twoFactor" className="text-sm text-gray-700">
                Require two-factor authentication for all users
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ipWhitelist"
                className="w-4 h-4"
              />
              <label htmlFor="ipWhitelist" className="text-sm text-gray-700">
                Enable IP whitelist restriction
              </label>
            </div>

            <button
              style={{
                backgroundColor: colors.deepGreen,
                color: "white",
              }}
              className="mt-6 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Update Security Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
