import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import TrainingForm from './TrainingForm';
import moment from 'moment';

const AddTrainingButtonRenderer = (props) => {
    return (
        <button onClick={() => props.context.onAddTrainingClick(props.data)}>
            Add Training
        </button>
    );
};


export default function TrainingsGrid() {
    
    const onAddTrainingClick = (trainingData) => {
        setSelectedCustomer(trainingData.customer);
        setShowForm(true);
    };
    
    const [trainings, setTrainings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const formatDate = (params) => {
        // Check if params.value is a valid date string
        if (params.value && !isNaN(Date.parse(params.value))) {
            // Parse the ISO string before formatting it
            return format(parseISO(params.value), "dd.MM.yyyy HH:mm");
        } else {
            return 'Invalid date'; // Or any other placeholder text
        }
    };

    
    const handleAddTraining = (trainingData) => {
        // Assuming trainingData has date, activity, and duration
        // and trainingData.customer.id is the ID of the customer
    
        const customerId = trainingData.customer.id;
        const trainingDate = moment(trainingData.date).toISOString(); // Using moment.js to format the date
    
        const requestBody = {
            date: trainingDate,
            activity: trainingData.activity,
            duration: trainingData.duration,
            customer: `https://traineeapp.azurewebsites.net/api/customers/${customerId}`
        };
    
        // Making the POST request to add the new training
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(`${response.status} - ${text}`) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Training added:', data);
            fetchData();
        })
        .catch(error => {
            console.error('Error adding training:', error);
        });
    
        setShowForm(false);
    };
    
    const columns = [
        {
            headerName: "Add Training to: ",
            field: "addTraining",
            cellRenderer: AddTrainingButtonRenderer,
            flex: 1
        },
        { headerName: "Customer", valueGetter: (params) => params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : "No customer", filter: true, sortable: true, flex: 1 },
        { headerName: "Date", field: "date", filter: true, sortable: true, valueFormatter: formatDate, flex: 1 },
        { headerName: "Duration (min)", field: "duration", filter: true, sortable: true, flex: 1 },
        { headerName: "Activity", field: "activity", filter: true, sortable: true, flex: 1 },
        // Combine first and last names for the customer column, handle possible null values
        {
            headerName: "Action",
            cellRenderer: params => DeleteButton(params, fetchData),
            filter: false,
            sortable: false
        },
        
    ];

    const DeleteButton = (params, fetchData) => {
        console.log('DeleteButton params:', params); // Add this line for debugging

        const handleDelete = () => {
            // Assuming 'id' is the property that contains the unique identifier for deletion
            const trainingId = params.data.id;
            if (!trainingId) {
                console.error('No training ID found for deletion');
                return;
            }
    
            if (window.confirm(`Are you sure you want to delete this training?`)) {
                fetch(`http://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    fetchData();
                })
                .catch(err => console.error(err));
            }
        };
    
        return <button onClick={handleDelete}>Delete</button>;
    };

    const context = {
        onAddTrainingClick
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    useEffect(() => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    }, [trainings]); 
    

    const [gridApi, setGridApi] = useState(null);
    
    const onGridReady = (params) => {
        setGridApi(params.api);
    }
    
    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    return (
        <div className="ag-theme-alpine" style={{ height: 700, width: "100%" }}>
            <Link to="/customers">Go to Customers</Link>
            <div></div>
            <Link to="/">Go to Dashboard</Link>
            <div></div>
            <Link to="/calendarview">Go to Calendar</Link>
            <h1>Trainings</h1>
            {showForm && <TrainingForm 
            customer={selectedCustomer} 
            onSubmit={handleAddTraining} />}
            <AgGridReact 
                columnDefs={columns} 
                rowData={trainings}
                onGridReady={onGridReady}
                animateRows={true}
                context={context}
            />
        </div>
    );
}