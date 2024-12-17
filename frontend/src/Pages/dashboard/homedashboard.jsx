import React from 'react'
import StatsCards from './dashboardcomponents/StatsCards.jsx';
import ChartSection from './dashboardcomponents/ChartSection.jsx';
import ClientTable from './dashboardcomponents/ClientTable.jsx';

export default function Homedashboard() {
  return (
      <div className="min-h-screen bg-gray-100">
      <StatsCards />
      <ChartSection />
      <ClientTable />
    </div>
  );
};

