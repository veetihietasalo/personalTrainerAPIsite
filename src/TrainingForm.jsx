import React, { useState } from 'react';

export default function TrainingForm({ customer, onSubmit }) {
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [activity, setActivity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ customer, date, duration, activity });
    };

    console.log(customer)

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Training for {customer.firstname} {customer.lastname}</h2>
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
            <input type="number" placeholder="Duration in minutes" value={duration} onChange={e => setDuration(e.target.value)} required />
            <input type="text" placeholder="Activity" value={activity} onChange={e => setActivity(e.target.value)} required />
            <button type="submit">Add Training</button>
        </form>
    );
}