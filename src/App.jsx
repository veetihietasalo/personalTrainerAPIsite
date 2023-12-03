import { useState } from 'react';
import CustomerGrid from './customerGrid';
import TrainingsGrid from './TrainingsGrid';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomerGrid />} />
        <Route path="/trainings" element={<TrainingsGrid />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  let navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/customers')}>Go to Customers</button>
      <button onClick={() => navigate('/trainings')}>Go to Trainings</button>
    </div>
  );
}

export default App;