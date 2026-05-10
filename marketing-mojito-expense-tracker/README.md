# SpendNova

SpendNova is a React-based expense intelligence app for the Marketing Mojito Web Developer Intern assignment.

## Features

- Demo sign-in with email/password validation, password visibility, terms acceptance, and 24-hour remembered session support.
- Separate landing, login, dashboard, and profile/settings views with React Router navigation.
- Add, edit, delete, and undo-delete expenses with name, amount, category, date, and optional notes.
- View and edit stored profile details, base currency, monthly budget, password, and account data controls.
- Persist expenses/profile data in localStorage for refresh-safe demo usage.
- Search, filter by category/date/amount, and sort by date, amount, or category.
- See a running total, monthly budget progress, category percentages, and top spending categories.
- Convert the total into another currency using live public APIs with manual refresh, 60-second auto-refresh, loading, and fallback states.
- Export expenses as a printable PDF report.
- Day mode and night mode with persisted preference.
- Responsive layout targeted for 1600px x 900px and 414px x 749px.

## Tech Stack

- React
- Create React App / react-scripts
- React Router
- Tailwind CSS
- open.er-api.com and Frankfurter API for live exchange rates

## Run Locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Brief Note

I built SpendNova, a polished personal expense tracker that opens with a landing page and moves into a secure demo workspace for logging, reviewing, and exporting expenses. The interface is split into reusable components for the landing page, auth screen, form, summary, category breakdown, list, filters, and currency converter, with all state managed through React hooks.

For currency conversion, I used public no-key exchange-rate endpoints, trying open.er-api.com first and Frankfurter as a fallback. The app calls live rates on load, on manual refresh, and every 60 seconds, while keeping the last known rate only as a backup if the network fails.

The main challenge was balancing the assignment's simple mini-app scope with the PRD's production-style requirements. I added route-aware views, local persistence, edit flows, filters, PDF export, day/night mode, and a lightweight sign-in screen without adding Redux or prebuilt UI kits. With more time, I would connect Firebase authentication/storage and add richer charting.
