# personalTrainerAPIsite

A React front end for a personal trainer's customers and trainings, with a calendar and a statistics chart. Built against the course's REST API at `traineeapp.azurewebsites.net`.

Live demo: https://veetihietasalo.github.io/personalTrainerAPIsite/

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

Data: the app tries the course API first. If it can't be reached, it uses made-up sample data from `src/demoData.js` (6 customers, 14 trainings dated around the current week) and each view shows a "Demo data" note. Add, edit and delete still call the API, so they don't save in demo mode.

Status: applied university course project, autumn 2023, handed in as four parts (commits 3 to 4 Dec 2023).

Fixed on 25 Oct 2026:
- The Pages build rendered a blank page because `BrowserRouter` had no `basename`. It uses `HashRouter` now (`#/customers` and so on), so links and reloads work on GitHub Pages.
- `src/App.jsx` imported `./customerGrid` but the file is `CustomerGrid.jsx`, so the build failed on Linux.
- Adding and deleting trainings used `http://`, which an https page blocks. Now https.
- Demo data fallback, see above.
- The home page skips the cube when the browser has no WebGL. Before, the whole page went blank.

Known issues:
- The course API is gone (`traineeapp.azurewebsites.net` no longer resolves, checked 25 Oct 2026), so the live demo runs on the sample data.
- `npm run lint` reports 44 problems, mostly missing prop-types. The rest of the code is as handed in.
