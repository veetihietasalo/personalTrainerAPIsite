import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddCustomerForm from './AddCustomerForm';
import EditCustomer from './EditCustomer';
import { Link } from 'react-router-dom';

export default function CustomerGrid({ handleUpdateCustomer }) {
    
    const [editingCustomer, setEditingCustomer] = useState(null);

    // Call this function when you want to add a new customer
    const handleAddCustomer = () => {
        setEditingCustomer({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
        
    };

    // Call this function to save the new or edited customer
    const saveNewCustomer = (customer) => {
        handleAddCustomer(customer);
        fetchData();
    };

    // Call this function to cancel editing
    const handleCancelEdit = () => {
        setEditingCustomer(null);
    };

    const editButtonRenderer = (props) => {
        const handleUpdateAndFetch = () => {
            handleUpdateCustomer();
            fetchData();
        };
    
        return <EditCustomer customer={props.data} handleUpdateAndFetch={handleUpdateAndFetch} />;
    };
    
    const DeleteButton = (params, fetchData) => {
        const handleDelete = () => {
            // Find the 'self' link which should be used for the DELETE request
            const selfLink = params.data.links.find(link => link.rel === 'self');
            if (!selfLink) {
                console.error('No self link found for deletion');
                return;
            }
    
            if (window.confirm(`Are you sure you want to delete ${params.data.firstname} ${params.data.lastname}?`)) {
                fetch(selfLink.href, { method: 'DELETE' })
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
    

    const columns = [
        { headerName: "First Name", field: "firstname", filter: true },
        { headerName: "Last Name", field: "lastname", filter: true },
        { headerName: "Street Address", field: "streetaddress", filter: true },
        { headerName: "Postcode", field: "postcode", filter: true },
        { headerName: "City", field: "city", filter: true },
        { headerName: "Email", field: "email", filter: true },
        { headerName: "Phone number", field: "phone", filter: true },
        { headerName:"Edit", cellRenderer: editButtonRenderer },
        {
            headerName: "Delete",
            cellRenderer: params => DeleteButton(params, fetchData),
            filter: false,
            sortable: false
        },
    ];

    useEffect(() => fetchData(), []);
    
    const [customers, setCustomers] = useState([]);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setCustomers(data.content))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    return (
        <div className="ag-theme-alpine" style={{height: 700, width: "100%"}}>
            <Link to="/trainings">Go to Trainings</Link>
            <div></div>
            <Link to="/">Go to Dashboard</Link>
            <h1>Customers</h1>
            {editingCustomer && (
                <AddCustomerForm
                    customer={editingCustomer}
                    onSave={saveNewCustomer}
                    onCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleAddCustomer}>Add Customer</button>
            <AgGridReact columnDefs={columns} rowData={customers} frameworkComponents={{ editButtonRenderer: editButtonRenderer }}/>
        </div>
    );
}