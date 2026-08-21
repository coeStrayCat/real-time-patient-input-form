# Real-Time Patient Input Form

A responsive, real-time patient input form and staff monitoring system. Patients fill in their details at `/form`; staff watch the data populate live at `/staff`, with per-session status (submitted / actively filling / inactive) — no page refresh required on either side.

Built for the Agnos front-end developer take-home assignment.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, JavaScript) on a custom [`server.js`](server.js) (Node `http` server) so Socket.IO can attach alongside the Next.js request handler
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4
- **Real-Time Communication**: [Socket.IO](https://socket.io/) — client in [`lib/socket/socketClient.js`](lib/socket/socketClient.js), server in [`lib/socket/socketServer.js`](lib/socket/socketServer.js)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) — separate stores for the patient side ([`usePatientStore`](lib/store/usePatientStore.js)) and staff side ([`useStaffStore`](lib/store/useStaffStore.js)), plus a locale store
- **Validation**: [Zod](https://zod.dev/) — schema in [`lib/validation/patientFormSchema.js`](lib/validation/patientFormSchema.js)
- **Session storage**: in-memory store on the server ([`lib/inMemoryStore.js`](lib/inMemoryStore.js)) — no database; data lives for the lifetime of the server process

## Project Structure

Components follow atomic design under [`components/`](components/README.md):

```
components/
├── atoms/       # smallest building blocks (Button, Badge, Select, StatusDot, ...)
├── molecules/    # small combinations (SessionListItem, MobileBackHeader, StatusBadge, ...)
├── organisms/    # feature-level, store-aware sections (PatientForm, StaffDashboard, StaffSessionList, ...)
└── templates/    # page-level layout composition (StaffViewLayout)
```

Routes:

| Route      | Description                                                              |
| ---------- | ------------------------------------------------------------------------- |
| `/`        | Landing page — choose Patient or Staff                                    |
| `/form`    | Patient-facing input form, syncs to staff in real time as the patient types |
| `/staff`   | Staff dashboard — live list of patient sessions + detail panel            |

## Getting Started

Requires Node.js (LTS) and npm.

```bash
git clone <this-repo-url>
cd real-time-patient-input-form
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To try the real-time sync, open `/form` in one tab and `/staff` in another — edits in the form tab appear live in the staff tab.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build (NODE_ENV=production node server.js)
npm run lint    # eslint
```

## Feature Bonus

- **Connection status indicator** — a live badge + dot showing `connected` / `reconnecting` / `offline` status, with a 20s grace period after a disconnect before a session is actually marked offline ([`statusEngine.js`](lib/statusEngine.js), [`ConnectionStatusBadge.jsx`](components/molecules/ConnectionStatusBadge.jsx))
- **Activity status (active / inactive / submitted)** — a session automatically switches to "inactive" after 45s of no typing, and shows a "submitted" checkmark once the form is submitted ([`statusEngine.js`](lib/statusEngine.js), [`StatusBadge.jsx`](components/molecules/StatusBadge.jsx))
- **Live-update flash** — on the staff side, whenever a field updates in real time it briefly flashes amber and fades out over 0.9s, making it obvious at a glance what just changed ([`SessionDetailField.jsx`](components/molecules/SessionDetailField.jsx))
- **Persistent patient identity** — the `patient-id` is stored in `localStorage`, so reloading the page resumes the same session instead of starting a new one ([`patientId.js`](lib/utils/patientId.js))
- **i18n / Thai-English toggle** — a language switch available on both the patient and staff sides ([`LanguageSwitcher.jsx`](components/organisms/LanguageSwitcher.jsx), [`lib/i18n/`](lib/i18n))
- **Status filter on the staff page** — filters the session list by status, still sorted by active → submitted → inactive, then by most recently updated within each group ([`StaffSessionList.jsx`](components/organisms/StaffSessionList.jsx))

