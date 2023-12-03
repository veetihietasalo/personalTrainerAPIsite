import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  let navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Dashboard</h1>
      <p>Select the data you want to view:</p>
      <button
        style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}
        onClick={() => navigate('/customers')}
      >
        View Customers
      </button>
      <button
        style={{ padding: '10px', cursor: 'pointer' }}
        onClick={() => navigate('/trainings')}
      >
        View Trainings
      </button>
    </div>
  );
}

export default HomePage;
