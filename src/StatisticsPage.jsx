import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getTrainings } from './api';
import DemoNotice from './DemoNotice';

const StatisticsPage = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    // Falls back to the bundled demo data when the course API can't be reached
    getTrainings()
      .then(({ data, demo }) => {
        setDemo(demo);
        const groupedData = _(data)
          .groupBy('activity')
          .map((value, key) => ({
            activity: key,
            totalDuration: _.sumBy(value, 'duration')
          }))
          .value();
        setTrainingData(groupedData);
      })
      .catch(error => {
        console.error('Error fetching training data:', error);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <Link to="/">Go to Dashboard</Link>
      <h2>Training Activity Statistics</h2>
      {demo && <DemoNotice />}
      <ResponsiveContainer>
        <BarChart data={trainingData}>
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Total Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalDuration" fill="#82ca9d" name="Total Duration (minutes)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsPage;
