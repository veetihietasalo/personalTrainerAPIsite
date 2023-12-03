import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export default function TrainingsGrid() {
    const [trainings, setTrainings] = useState([]);
    const [editingTraining, setEditingTraining] = useState(null);

    const formatDate = (params) => {
        // Parse the ISO string before formatting it
        return format(parseISO(params.value), "dd.MM.yyyy HH:mm");
    }

    const columns = [
        { headerName: "Date", field: "date", filter: true, sortable: true, valueFormatter: formatDate, flex: 1 },
        { headerName: "Duration (min)", field: "duration", filter: true, sortable: true, flex: 1 },
        { headerName: "Activity", field: "activity", filter: true, sortable: true, flex: 1 },
        // Combine first and last names for the customer column, handle possible null values
        { headerName: "Customer", valueGetter: (params) => params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : "No customer", filter: true, sortable: true, flex: 1 },
    ];

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
            <h1>Trainings</h1>
            <AgGridReact 
                columnDefs={columns} 
                rowData={trainings}
                onGridReady={onGridReady}
                animateRows={true}
            />
        </div>
    );
}