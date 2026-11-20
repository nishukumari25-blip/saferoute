# SafeRoute — Women's Safety Companion 🛡️

**SafeRoute** is a modern, responsive, production-quality web application designed to act as a personal safety companion for women and solo travelers. It provides real-time emergency tools, automated journey check-ins, trusted contact circles, verified 24x7 emergency helplines, and on-demand browser geolocation sharing with zero invasive background tracking.

---

## 🌟 Key Features

### 1. 🔐 Authentication & Session Protection
- **Registration & Login**: Full client-side authentication with validation for name, email, phone, passwords, and medical emergency details.
- **Demo Mode**: One-click quick autofill button for instant demo evaluation (`ananya@example.com` / `password123`).
- **Protected Routes**: Dashboard and safety tools are guarded; unauthenticated visits are redirected to login.
- **Local Persistence**: User sessions and profile details persist safely in browser `localStorage`.

### 2. 🚨 Instant Emergency SOS Panic
- **High-Visibility SOS Button**: Large, clearly accessible emergency trigger with pulse animation.
- **5-Second Countdown Confirmation**: Prevents accidental triggers while providing an immediate override option.
- **Audible Siren Alarm**: Integrated Web Audio API synthesizer that produces a loud, piercing high-low siren tone to deter aggressors without needing external audio files.
- **Simulated Multi-Contact Broadcast**: Automatically attaches current GPS coordinates and dispatches simulated alerts to all saved contacts.
- **Cancel Alert**: Clear "I Am Safe" action stops the alarm, logs resolution, and clears active alert banners.
- **Honest Safety Notice**: Transparently informs users that SafeRoute is a client companion that simulates contact broadcasts and provides 1-tap direct dials to official authorities (112 / 1091).

### 3. 👥 Trusted Emergency Contacts Circle
- **Full CRUD Operations**: Add, edit, delete, and prioritize emergency contacts.
- **Validation**: Enforces mobile phone formatting and international dial codes.
- **Primary Contact Designation**: Mark top responders who appear first on emergency broadcast lists.
- **1-Tap Actions**: Direct phone dialing (`tel:`) and pre-composed SMS alert links (`sms:`) containing current GPS location.

### 4. ⏱️ Automated Safety Check-Ins
- **Journey Countdown Timers**: Set estimated travel times (15m, 30m, 45m, 60m, or custom) when taking late taxis, auto-rickshaws, or walking home.
- **Active Trip Monitoring**: Real-time MM:SS countdown timer with trip details (e.g., cab number / driver details).
- **Overdue Flagging**: Prominently highlights expired journeys so you can confirm your safety or extend the timer.
- **"I Arrived Safely"**: One-click completion playing a pleasant confirmation chime.
- **Journey Audit History**: Persistent history of completed and past check-in trips.

### 5. 📍 On-Demand Location Sharing
- **HTML5 Geolocation API**: Direct access to browser GPS coordinates, altitude, and accuracy radius.
- **Zero Background Tracking Guarantee**: Only activates on explicit user request; ceases immediately upon closing the browser tab to preserve battery and privacy.
- **One-Click Share & Copy**: Instant clipboard copy with coordinates and direct Google Maps link.
- **Map Visualizer**: Dynamic OpenStreetMap preview centered on current coordinates.

### 6. 📞 Verified Emergency Helplines & Playbooks
- **Verified Official Numbers**:
  - `112`: National All-in-One Emergency Response Support System (Police, Fire, Ambulance)
  - `1091`: Women's Helpline (Immediate Police Dispatch)
  - `181`: National Commission for Women (NCW) Distress & Counseling
  - `100`: Police Emergency
  - `108`: Ambulance & Trauma Care
  - `1930`: National Cyber Crime & Harassment Helpline
  - `1098`: Childline
  - `911` / `999`: International emergency numbers (US, UK)
- **Direct Dial Links**: Clickable `tel:` links on every card.
- **Safety Guides**: Practical advice on night commuting, digital privacy, de-escalation, and legal rights (such as **Zero FIR** provisions).

### 7. ⚙️ Profile & Custom Preferences
- **Medical & Emergency Profile**: Blood group, medical allergies, inhaler notes, home address.
- **Audio Siren Toggle**: Mute or enable sound alarm with volume and live tone testing.
- **Theme Modes**: Modern Light theme + Dark Mode for late-night commute comfort.
- **Data Backup & Reset**: Export your entire safety circle and logs as JSON, or reset all data cleanly.

---

## 🎨 UI/UX Design System

- **Primary Color**: `#6C4CE3` (Royal Violet)
- **Secondary Color**: `#FCE7F3` (Rose Blush)
- **Background**: `#F8F7FC` (Off-white / Lavender tint)
- **Surfaces**: `#FFFFFF` (Pure white cards with soft shadows)
- **Emergency Accent**: `#EF4444` / `#DC2626` (Urgent Red)
- **Typography**: Inter & Plus Jakarta Sans
- **Responsiveness**: Mobile bottom navigation drawer, responsive desktop sidebar, touch-friendly touch targets.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Declarative Component-driven UI |
| **Vite 6** | Ultra-fast build tool and local dev server |
| **React Router DOM 6** | Client-side SPA routing and protected layouts |
| **Lucide React** | Accessible, clean iconography |
| **Web Audio API** | Pure browser synthetic audio alarms (no external mp3 files) |
| **Geolocation API** | HTML5 accurate device positioning |
| **LocalStorage** | 100% client-side privacy-first persistence |
| **Pure CSS3** | Custom properties, responsive flexbox/grid, animations |

---

## 📁 Project Structure

```
SafeRoute/
├── index.html                  # HTML entry with metadata and fonts
├── package.json                # Dependencies and build scripts
├── vite.config.js              # Vite React configuration
├── vercel.json                 # Vercel SPA routing rewrite rules
├── public/
│   └── _redirects              # Netlify SPA redirect rules
└── src/
    ├── assets/                 # Brand logo and graphics
    ├── components/
    │   ├── checkin/            # Check-in modals and countdown cards
    │   ├── common/             # Button, Card, Badge, Modal, Navbar, Sidebar, Toast, EmptyState
    │   ├── contacts/           # Contact cards and add/edit modal form
    │   ├── dashboard/          # Welcome banner, SOS card, Location widget, Helplines
    │   ├── location/           # Geolocation status card and controls
    │   └── sos/                # Emergency confirmation modal and active banners
    ├── context/
    │   ├── AuthContext.jsx     # User authentication, demo account seeding, profile
    │   ├── EmergencyContext.jsx# Contacts CRUD, SOS trigger, Check-in timer, settings
    │   └── ToastContext.jsx    # Floating notification stack
    ├── hooks/
    │   ├── useAuth.js          # Authentication hook
    │   ├── useEmergency.js     # SOS and contacts hook
    │   ├── useGeolocation.js   # Browser Geolocation API hook
    │   └── useToast.js         # Toast trigger hook
    ├── layouts/
    │   ├── AuthLayout.jsx      # Split branding layout for Login/Register
    │   ├── MainLayout.jsx      # Sidebar, top navbar, mobile bottom nav, active SOS banner
    │   └── ProtectedRoute.jsx  # Route guard for authenticated users
    ├── pages/
    │   ├── LandingPage.jsx     # Public landing page with features showcase
    │   ├── LoginPage.jsx       # Login form with demo autofill
    │   ├── RegisterPage.jsx    # Registration with medical info
    │   ├── DashboardPage.jsx   # Central control center
    │   ├── ContactsPage.jsx    # Emergency contacts manager
    │   ├── SosPage.jsx         # Full SOS emergency page with direct helplines
    │   ├── LocationPage.jsx    # Geolocation controls and map preview
    │   ├── CheckInPage.jsx     # Safety check-in timer and journey history
    │   ├── ResourcesPage.jsx   # Verified helplines and safety guides
    │   ├── ProfilePage.jsx     # User profile and medical notes
    │   ├── SettingsPage.jsx    # Siren preferences, theme mode, export/reset
    │   └── NotFoundPage.jsx    # 404 page
    ├── styles/
    │   └── index.css           # Design tokens, reset, utilities, component styles
    └── utils/
        ├── audio.js            # Web Audio API emergency synthesizer
        ├── constants.js        # Helplines, default seed data, safety guides
        ├── formatters.js       # Phone validation, coordinates, date/time helpers
        └── storage.js          # LocalStorage helper functions
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd SafeRoute
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.
*(Note: `vercel.json` is already included in this repository to handle SPA route rewrites).*

### Deploy to Netlify

1. Log in to [Netlify](https://www.netlify.com) and select **"Add new site"** > **"Import an existing project"**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy SafeRoute**.
*(Note: `public/_redirects` is already included in this repository to ensure smooth client-side routing).*

---

## 🔒 Privacy & Safety Notice

- **Demo / Simulation Mode**: SafeRoute does not contact real police squads automatically. It sends simulated alerts to your saved emergency contacts and offers direct click-to-dial links for official hotlines.
- In any active physical danger or emergency, always dial **112** (or local emergency services) immediately.
- **Data Privacy**: All data is stored in the user's browser `localStorage` and never transmitted to external telemetry servers.

---

## 📄 License
This project is open-source under the MIT License.
