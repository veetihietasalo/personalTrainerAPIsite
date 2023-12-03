import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Calendar component
const TrainingCalendar = ({ trainings }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={trainings}
        />
    );
};

// Page component
const TrainingCalendarPage = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                const events = data.map(training => {
                    const startDate = moment(training.date);
                    const endDate = moment(startDate).add(training.duration, 'minutes');
                    return {
                        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                        start: startDate.toISOString(),
                        end: endDate.toISOString(),
                    };
                });
                setTrainings(events);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Link to="/customers">Go to Customers</Link>
            <div></div>
            <Link to="/">Go to Dashboard</Link>
            <div></div>
            <Link to="/trainings">Go to Trainings</Link>
            <h1>Training Schedule</h1>
            <TrainingCalendar trainings={trainings} />
        </div>
    );
};

export default TrainingCalendarPage;