import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

const StatisticsPage = () => {
  const [trainingData, setTrainingData] = useState([]);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => {
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
      <h2>Training Activity Statistics</h2>
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
