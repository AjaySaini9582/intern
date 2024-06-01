import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from './data.json'; // Your JSON data
import './App.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const App = () => {
  // Prepare data for different charts
  const severityData = data.reduce((acc, item) => {
    acc[item.alert.severity] = (acc[item.alert.severity] || 0) + 1;
    return acc;
  }, {});

  const severityChartData = Object.keys(severityData).map(key => ({
    name: `Severity ${key}`,
    count: severityData[key]
  }));

  const categoryData = data.reduce((acc, item) => {
    acc[item.alert.category] = (acc[item.alert.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryData).map(key => ({
    name: key,
    count: categoryData[key]
  }));

  const timeData = data.map(item => ({
    name: new Date(item.timestamp).toLocaleTimeString(),
    severity: item.alert.severity
  }));

  return (
    <div className="dashboard">
      <h1>Network Alert Dashboard</h1>
      <div className="chart-container">
        <h2>Severity Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie dataKey="count" isAnimationActive={false} data={severityChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {
                severityChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h2>Category Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h2>Alerts Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="severity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
