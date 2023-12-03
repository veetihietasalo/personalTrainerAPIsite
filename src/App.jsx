import CustomerGrid from './customerGrid';
import TrainingsGrid from './TrainingsGrid';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Home';
import TrainingCalendarPage from './CalendarView'
import StatisticsPage from './StatisticsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomerGrid />} />
        <Route path="/trainings" element={<TrainingsGrid />} />
        <Route path="/calendarview" element={<TrainingCalendarPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
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
      <button onClick={() => navigate('/calendarview')}>Go to Calendar</button>
      <button onClick={() => navigate('/statistics')}>Go to Statistics Page</button>
      <div>
      
      </div>
    </div>
    
  );
}

export default App;