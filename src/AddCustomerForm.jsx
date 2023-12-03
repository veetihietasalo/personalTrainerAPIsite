import React, { useState } from 'react';
import './CustomerForm.css';

const AddCustomerForm = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState(customer || {
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the POST request
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        onSave(data); // Pass the new customer data up to the parent component
        onCancel(); // Close the form assuming onCancel is meant to handle this
      })
    .catch(error => {
      console.error('Error adding new customer:', error);
    });
  };

  return (
    <div className="customer-form-container">
      <form onSubmit={handleSubmit} className="customer-form">
        <h2>Add New Customer</h2>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input name="firstname" value={formData.firstname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input name="lastname" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="streetaddress">Street Address</label>
          <input name="streetaddress" value={formData.streetaddress} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="postcode">Postcode</label>
          <input name="postcode" value={formData.postcode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
