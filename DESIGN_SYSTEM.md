# RFID Surgical Tracking System - Design System & Documentation

## 🎨 Color Palette

The system uses a **medical-grade color palette** for clarity and professionalism:

- **Deep Green** (`#4F633D`): Primary buttons, active states, key highlights
- **Muted Sage** (`#8BA194`): Secondary elements, icons, status indicators
- **Soft Background** (`#FFF7E2`): Page backgrounds, card backgrounds
- **White/Dark Gray**: Text contrast

## 📁 Project Structure

```
src/
├── pages/
│   ├── Dashboard.tsx              # Main dashboard with KPIs
│   ├── PatientsPage.tsx           # Patient management & table
│   ├── LiveTrackingPage.tsx       # Real-time RFID tracking
│   ├── OperatingRoomsPage.tsx     # OR status & utilization
│   ├── ReportsAnalyticsPage.tsx   # Analytics & reports
│   ├── AIInsightsPage.tsx         # AI chatbot & insights
│   └── SettingsPage.tsx           # System settings & config
├── components/
│   ├── Navbar.tsx                 # Navigation bar
│   └── ui/
│       ├── KPICard.tsx            # Key Performance Indicator cards
│       ├── StatusBadge.tsx        # Status indicator badges
│       ├── ActivityFeed.tsx       # Live activity stream
│       ├── PatientTable.tsx       # Searchable patient table
│       └── ORStatusCard.tsx       # Operating room status cards
├── styles/
│   └── colors.ts                  # Color palette constants
└── App.tsx                        # Main app component with routing
```

## 🧩 Reusable Components

### KPICard
Displays key performance indicators with trends

```tsx
<KPICard
  title="Patients Today"
  value={24}
  subtext="Total admitted"
  trend={8}
  icon="👥"
/>
```

### StatusBadge
Status indicator with predefined colors

```tsx
<StatusBadge status="success" label="Completed" size="md" />
<StatusBadge status="warning" label="Pending" size="sm" />
<StatusBadge status="error" label="Delayed" size="lg" />
```

### ActivityFeed
Live activity stream display

```tsx
<ActivityFeed activities={activityItems} maxItems={5} />
```

### PatientTable
Searchable and filterable patient table

```tsx
<PatientTable
  patients={patientList}
  onRowClick={(patientId) => console.log(patientId)}
/>
```

### ORStatusCard
Operating room status display

```tsx
<ORStatusCard
  orNumber="1"
  status="occupied"
  patientName="John Smith"
  duration="1h 15m"
/>
```

## 📄 Page Descriptions

### 1. **Dashboard**
- KPI cards showing key metrics
- Live activity feed
- Operating room status overview
- Daily summary statistics

### 2. **Patients Page**
- Patient table with search and filter
- Real-time status tracking
- Patient detail sidebar
- Quick action buttons

### 3. **Live Tracking Page**
- RFID event stream
- Current patient locations
- Patient journey timeline
- Real-time position tracking

### 4. **Operating Rooms Page**
- Individual OR status cards
- Utilization metrics
- Progress indicators for current cases
- Room availability overview

### 5. **Reports & Analytics**
- OR utilization charts
- Patient throughput metrics
- Surgery duration analysis
- Wait time analytics
- Export options (PDF, CSV)

### 6. **AI Insights**
- Chat-based interface
- Smart query suggestions
- AI-generated recommendations
- Key insights summary sidebar

### 7. **Settings**
- General system configuration
- User role management
- RFID device management
- Notification preferences
- Security settings

## 🎯 Design Principles

1. **Medical-Grade UI**: Clean, minimal design for hospital professionals
2. **Real-Time Feel**: Dashboard appearance for active monitoring
3. **High Contrast**: Text is highly readable for long shifts
4. **Intuitive Navigation**: Clear menu structure and page flow
5. **Mobile Responsive**: Adapts to tablet and mobile devices
6. **Accessibility**: Large clickable areas, clear status indicators

## 🚀 Usage

Navigate between pages using the navigation menu at the top of the app. All components are fully functional with mock data for demonstration purposes.

### To Add React Router (Future Enhancement)

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/patients" element={<PatientsPage />} />
    {/* ... other routes ... */}
  </Routes>
</BrowserRouter>
```

## 📊 Data Flow

- **Mock data** is currently used throughout all pages
- Ready to integrate with real RFID device APIs
- RFID events flow through live tracking and activity feeds
- Patient location updates are real-time capable

## 🔧 Customization

To customize colors, edit `/src/styles/colors.ts`:

```tsx
export const colors = {
  deepGreen: "#4F633D",      // Change primary color
  mutedSage: "#8BA194",      // Change secondary color
  softBg: "#FFF7E2",         // Change background
  // ... other colors
};
```

All components automatically use the updated palette.

## 📱 Mobile Responsiveness

All pages are responsive with:
- Grid layouts that adapt to screen size
- Horizontal scroll for tables on mobile
- Stacked layouts on smaller screens
- Touch-friendly button sizes

## 🎨 Component Styling

All styling uses:
- Tailwind CSS utilities
- Inline styles for dynamic colors (from color palette)
- Rounded corners (8-12px radius)
- Subtle shadows for depth
- Clean spacing and alignment

---

**Version**: 1.0
**Last Updated**: June 2026
