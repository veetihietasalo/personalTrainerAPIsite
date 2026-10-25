# personalTrainerAPIsite

A React front end for a personal trainer's customers and trainings, with a calendar and a statistics chart. All data came from the course's REST API at `traineeapp.azurewebsites.net`.

Stack: React 18, Vite 5, React Router 6, AG Grid 31, MUI 5, FullCalendar 6, Recharts, three.js, gh-pages.

What it does:
- Customers: AG Grid table with column filters, add form, edit dialog, delete with a confirm, CSV export
- Trainings: table of date, duration, activity and customer, an Add Training button on each row for that row's customer, delete
- Calendar: trainings as events in month, week and day views (FullCalendar)
- Statistics: bar chart of total minutes per activity (Recharts)
- Home: a rotating three.js cube and buttons to the four views

Run:

```bash
npm install
npm run dev
```

`npm run build` builds into `dist`. `npm run deploy` builds and publishes `dist` to the `gh-pages` branch.

Status: applied university course project, autumn 2023, handed in as four parts (commits 3 to 4 Dec 2023). Known issues:
- The course API is gone (`traineeapp.azurewebsites.net` no longer resolves, checked 25 Oct 2026), so the app shows no data today.
- The GitHub Pages build renders a blank page: `BrowserRouter` has no `basename`, so no route matches `/personalTrainerAPIsite/`.
- `src/App.jsx` imports `./customerGrid` but the file is `CustomerGrid.jsx`, so the import fails on a case-sensitive file system such as Linux.
