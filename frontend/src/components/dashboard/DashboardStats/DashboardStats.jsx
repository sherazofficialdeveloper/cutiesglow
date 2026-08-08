import React from 'react';

const DashboardStats = ({ stats }) => {
  // Default dummy data if stats prop is not provided
  const defaultStats = {
    totalRevenue: '$12,345',
    totalOrders: 1,234,
    totalUsers: 567,
    totalProducts: 89,
  };

  const data = stats || defaultStats;

  const statItems = [
    { label: 'Total Revenue', value: data.totalRevenue, bgColor: 'bg-blue-500' },
    { label: 'Total Orders', value: data.totalOrders, bgColor: 'bg-green-500' },
    { label: 'Total Users', value: data.totalUsers, bgColor: 'bg-purple-500' },
    { label: 'Total Products', value: data.totalProducts, bgColor: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center text-white text-xl mb-4`}>
            {/* You can add icons here if you want */}
          </div>
          <p className="text-sm font-medium text-gray-500">{item.label}</p>
          <p className="text-2xl font-bold text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;