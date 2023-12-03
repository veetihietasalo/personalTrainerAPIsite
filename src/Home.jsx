import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDCube from './ThreeDCube';

function HomePage() {
  let navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // 100% of the viewport height
      textAlign: 'center'
    }}>
      <h1>Welcome to the Dashboard</h1>

      <ThreeDCube />

      <p>Select the data you want to view:</p>
      <div style={{ marginTop: '20px' }}>
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
        <button
          style={{ marginLeft: '10px', padding: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/calendarview')}
        >
          View Calendar
        </button>
        <button
          style={{ marginLeft: '10px', padding: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/statistics')}
        >
          View Statistics
        </button>
      </div>
    </div>
  );
}

export default HomePage;
