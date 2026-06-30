# HelpDesk — Employee Ticketing System

A complete, offline-first Employee Help Desk Ticketing System built with **React + Vite**, **Tailwind CSS**, and **browser Local Storage**. No backend, no database, no server — every ticket lives entirely in the browser and survives page refreshes.

Two workspaces live in the same app:

- **Employee** — create tickets, track their status, and chat with the help desk through comments.
- **Admin** — triage every ticket, assign technicians, change status, close tickets, and view analytics.

Since this is a frontend-only demo with no real authentication, switching between the two workspaces is done with a visible **Employee / Admin** switch (top-right on desktop, inside the menu on mobile) rather than a login form.

---

## Tech Stack

| Concern | Library |
|---|---|
| UI framework | React 18 (Vite) |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Forms | React Hook Form |
| Validation | Zod |
| Icons | lucide-react |
| Charts | Recharts |
| Toasts | Sonner |
| Persistence | Browser Local Storage (no backend) |

Pure JavaScript (ES6+) — no TypeScript, no `.ts`/`.tsx` files.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# Vite will print a local URL, typically http://localhost:5173
```

Other available scripts:

```bash
npm run build     # Production build into /dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

On first launch, the app seeds Local Storage with 10 sample tickets so the dashboard, table, and charts have something to show immediately. After that, everything you create, edit, comment on, or delete persists across refreshes — and the app works fully offline once `npm install` has completed.

---

## Features

### Employee workspace
- **Dashboard** — total / open / in progress / resolved / closed ticket counts, plus a recent-activity table.
- **Create Ticket** — validated form (employee name, employee ID, department, priority, subject, description). New tickets get a sequential id like `TKT-1001`, `TKT-1002`, ...
- **My Tickets** — search by ticket id, subject, or employee name; filter by status/priority; sort newest/oldest; paginated, responsive table.
- **Ticket Details** — full ticket info, status timeline, assigned technician, comment thread, created/updated timestamps.

### Admin workspace
- **Admin Dashboard** — the same counts as the employee dashboard, plus a **High Priority** count and a recently-updated queue.
- **Manage Tickets** — the same search/filter/sort table, scoped for triage, with an "unassigned tickets" callout.
- **Analytics** — three Recharts visualizations: tickets by status, tickets by priority, and tickets by department.
- From any **Ticket Details** page, an admin can change status, (re)assign a technician, add comments, close the ticket, or permanently delete it.

### Across the app
- Sidebar navigation — sticky at full viewport height on desktop, collapsible to an icon-only rail (toggle on its right edge), and a slide-over drawer on mobile
- Sticky header with page title, quick actions, role switch, and dark mode toggle
- Loading skeletons, empty states, and toast notifications for every action
- Full dark mode, persisted across sessions
- Fully responsive: tables collapse into cards on small screens

---

## Project Structure

```
employee-helpdesk/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/      # Button, Input, Select, Textarea, Badge, Card, Modal, ConfirmDialog, Skeleton, EmptyState...
│   │   ├── dashboard/    # StatCard, StatsGrid
│   │   ├── forms/        # CreateTicketForm, CommentForm, ManageTicketForm
│   │   ├── layout/       # Sidebar, Header, MobileNav, Footer, AppLayout
│   │   ├── tables/       # TicketTable, TicketFilters, Pagination
│   │   ├── ticket/       # StatusBadge, PriorityBadge, StatusTimeline, CommentList, TicketStub, TicketIdPill
│   │   ├── charts/       # StatusChart, PriorityChart, DepartmentChart
│   │   └── ui/           # ThemeToggle, RoleSwitcher
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── CreateTicket.jsx
│   │   ├── Tickets.jsx
│   │   ├── TicketDetails.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageTickets.jsx
│   │   ├── Analytics.jsx     # extra page: the Recharts dashboards live here
│   │   └── NotFound.jsx      # extra page: catch-all 404
│   ├── hooks/            # useTickets, useAuth, useTheme, useLocalStorage, useDebounce, useFilteredTickets
│   ├── utils/            # constants.js, helpers.js, validators.js
│   ├── services/         # ticketService.js — the Local Storage CRUD layer
│   ├── context/          # ThemeContext, AuthContext, TicketContext
│   ├── data/              # seedData.js — sample tickets for first run
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

> Note: the brief's structure lists six page files explicitly. Two extra pages were added — `Analytics.jsx` (so the three Recharts dashboards have a dedicated route, `/admin/analytics`) and `NotFound.jsx` (a 404 catch-all) — since both are needed for a complete, production-ready router setup.

---

## Local Storage Layer

All persistence goes through `src/services/ticketService.js`, which is the single place that talks to `window.localStorage`:

- `getTickets()` — read every ticket
- `saveTickets(tickets)` — overwrite the full list
- `createTicket(formData)` — generate the next `TKT-####` id and insert a new ticket
- `updateTicket(id, updates)` — generic partial update
- `deleteTicket(id)` — permanently remove a ticket
- `changeTicketStatus(id, status, note)` — update status + append a timeline entry
- `assignTechnician(id, technician)` — reassign ownership
- `addComment(id, comment)` — append to the comment thread
- `resetToSeedData()` — wipe and reseed with the original sample tickets

`src/context/TicketContext.jsx` wraps this service in React state so every component reading from `useTickets()` re-renders consistently whenever any ticket changes.

---

## Design Notes

The visual language is built around the literal idea of a help-desk **ticket**: ticket ids are set in monospace type, and the Ticket Details page (plus the "ticket submitted" confirmation) renders the ticket id inside a stub with a perforated tear-line, the way a physical ticket would look. The rest of the interface — a dark, fixed sidebar; a signal-blue primary color; amber/mint/coral accents for priority and status — stays quiet so that motif gets to stand out.

Fonts default to the system UI stack so the app needs zero network access to render correctly offline. If you'd like the exact display/mono pairing referenced in the Tailwind config (`Sora` for headings, `JetBrains Mono` for ticket ids), self-host those font files (or add a Google Fonts `<link>` to `index.html`) — just know that adds a network dependency on first load.

---

## Deployment

This is a static site after `npm run build` — it can be hosted anywhere that serves static files.

### Vercel
```bash
npm install -g vercel
npm run build
vercel --prod
```
Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

### Netlify
```bash
npm run build
```
Drag the generated `dist/` folder into Netlify, or connect the repo with:
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# then push the contents of /dist to a `gh-pages` branch,
# or use a tool like `gh-pages` / `vite-plugin-gh-pages`
```

### Any static host (S3, Cloudflare Pages, Firebase Hosting, etc.)
Run `npm run build` and upload the contents of `dist/` — there is nothing server-side to configure since all data lives in the visitor's own browser.

---

## Credits

**Sivaranjani T**
sivaranjanithiyagarajan12@gmail.com

Built for Digital Heroes — https://digitalheroesco.com
