// Made-up sample data, used when the course API can't be reached.
// Same shape as the API: /api/customers returns { content: [...] } with
// links on each customer, /gettrainings returns trainings with the customer inline.
import { addDays, startOfWeek, setHours, setMinutes } from 'date-fns';

const API = 'https://traineeapp.azurewebsites.net/api';

const people = [
    { id: 1, firstname: 'Alex', lastname: 'Example', streetaddress: 'Example Street 1', postcode: '00100', city: 'Helsinki', email: 'alex.example@example.com', phone: '040 000 0001' },
    { id: 2, firstname: 'Sam', lastname: 'Sample', streetaddress: 'Sample Road 12', postcode: '02100', city: 'Espoo', email: 'sam.sample@example.com', phone: '040 000 0002' },
    { id: 3, firstname: 'Robin', lastname: 'Demo', streetaddress: 'Demo Lane 3 B', postcode: '33100', city: 'Tampere', email: 'robin.demo@example.com', phone: '040 000 0003' },
    { id: 4, firstname: 'Jamie', lastname: 'Placeholder', streetaddress: 'Test Avenue 45', postcode: '20100', city: 'Turku', email: 'jamie.placeholder@example.com', phone: '040 000 0004' },
    { id: 5, firstname: 'Kim', lastname: 'Testinen', streetaddress: 'Mock Street 7', postcode: '00500', city: 'Helsinki', email: 'kim.testinen@example.com', phone: '040 000 0005' },
    { id: 6, firstname: 'Noa', lastname: 'Fictional', streetaddress: 'Dummy Road 9', postcode: '90100', city: 'Oulu', email: 'noa.fictional@example.com', phone: '040 000 0006' },
];

export const demoCustomers = people.map(({ id, ...customer }) => ({
    ...customer,
    links: [
        { rel: 'self', href: `${API}/customers/${id}` },
        { rel: 'customer', href: `${API}/customers/${id}` },
        { rel: 'trainings', href: `${API}/customers/${id}/trainings` },
    ],
}));

// [days from the start of this week, hour, minute, duration, activity, customer id]
// Dates are relative to today so the calendar's week view has something in it.
const sessions = [
    [1, 8, 0, 60, 'Gym training', 1],
    [1, 17, 30, 45, 'Spinning', 2],
    [2, 7, 0, 30, 'Jogging', 3],
    [2, 18, 0, 60, 'Zumba', 4],
    [3, 12, 0, 45, 'Yoga', 5],
    [3, 16, 0, 90, 'Gym training', 6],
    [4, 9, 30, 60, 'Boxing', 1],
    [4, 19, 0, 45, 'Spinning', 3],
    [5, 10, 0, 30, 'Jogging', 2],
    [5, 15, 0, 60, 'Yoga', 4],
    [6, 11, 0, 60, 'Zumba', 5],
    [8, 8, 0, 60, 'Gym training', 2],
    [9, 17, 0, 45, 'Boxing', 6],
    [10, 18, 30, 60, 'Spinning', 1],
];

const weekStart = startOfWeek(new Date());

export const demoTrainings = sessions.map(([day, hour, minute, duration, activity, customerId], index) => ({
    id: index + 1,
    date: setMinutes(setHours(addDays(weekStart, day), hour), minute).toISOString(),
    duration,
    activity,
    customer: people.find(person => person.id === customerId),
}));
