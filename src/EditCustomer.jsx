import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
      id: null,
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: '',
  })

  const handleClickOpen = () => {
    if (!props.customer || !props.customer.links) {
        console.error('Customer data is missing or does not contain links');
        return;
    }

    const customerId = getCustomerIdFromLinks(props.customer.links);
    if (!customerId) {
        console.error('Customer ID could not be extracted from links');
        return;
    }

    setCustomer({
        id: customerId,
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city,
        email: props.customer.email,
        phone: props.customer.phone,
    });
    setOpen(true);
};

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    };

    const saveUpdatedCustomer = (customer) => {
      updateCustomer(customer, customer.id);
      // Additional logic for updated customer, if any
  };

  const getCustomerIdFromLinks = (links) => {
    const selfLink = links.find(link => link.rel === 'self');
    if (selfLink && selfLink.href) {
        const urlParts = selfLink.href.split('/');
        return urlParts[urlParts.length - 1]; // The ID should be the last part of the URL
    } else {
        console.error('No self link found');
        return null;
    }
};

  // Function to update customer details
  const updateCustomer = (customer) => {
    // Check if the customer ID is present
    if (!customer.id) {
      console.error('No customer ID provided');
      return;
    }
  
    // Construct the URL for the PUT request using the customer ID
    const updateUrl = `https://traineeapp.azurewebsites.net/api/customers/${customer.id}`;
  
    // Make the PUT request
    fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
      }),
    })
    .then(response => {
      if (!response.ok) {
        // If the response is not 2xx, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON returned by the server
    })
      .then(updatedCustomer => {
        // Optimistic update
        fetchData();
      console.log('Customer updated successfully:', updatedCustomer);
      setOpen(false); // Close the dialog
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error updating customer:', error);
    });
    fetchData();
  };  
  
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
    return(
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit customer</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={e => handleInputChange(e)}
                label="First Name"
                fullWidth
              />
              <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={e => handleInputChange(e)}
                label="Last Name"
                fullWidth
              />
              <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={e => handleInputChange(e)}
                label="Street Address"
                fullWidth
              />
              <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={e => handleInputChange(e)}
                label="Postcode"
                fullWidth
              />
              <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={e => handleInputChange(e)}
                label="City"
                fullWidth
              />
              <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={e => handleInputChange(e)}
                label="Email"
                fullWidth
              />
              <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={e => handleInputChange(e)}
                label="Phone"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => saveUpdatedCustomer(customer, customer.id)}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        );
    }