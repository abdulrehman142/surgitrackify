import React from "react";
import { colors } from "../styles/colors";
import { StatusBadge } from "./StatusBadge";
import type { ActivityItem } from "../types";

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  maxItems = 5,
}) => {
  const displayItems = activities.slice(0, maxItems);

  return (
    <div
      className="rounded-lg p-6 shadow-sm border border-gray-100"
      style={{ backgroundColor: colors.softBg }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.deepGreen }}>
        Live Activity Feed
      </h3>
      <div className="space-y-4">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0 transition-colors ${
              item.isNew ? "bg-green-50 -mx-2 px-2 rounded-lg" : ""
            }`}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-semibold" style={{ color: colors.deepGreen }}>
                {item.patientName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-gray-900">{item.patientName}</p>
                <span className="text-xs text-gray-500">({item.patientId})</span>
              </div>
              <p className="text-sm text-gray-600">{item.action}</p>
              {item.location && (
                <p className="text-xs text-gray-500">{item.location}</p>
              )}
            </div>
            <div className="flex-shrink-0 text-right">
              <StatusBadge status={item.status} label={item.status} size="sm" />
              <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
