import React from 'react';

const DashboardStats = ({ stats }) => {
  // Default dummy data - SAB STRINGS HAIN (comma allow hai)
  const defaultStats = {
    totalRevenue: '$12,345',
    totalOrders: '1,234',
    totalUsers: '567',
    totalProducts: '89',
  };

  const data = stats || defaultStats;

  const statItems = [
    { label: 'Total Revenue', value: data.totalRevenue, color: 'bg-blue-500' },
    { label: 'Total Orders', value: data.totalOrders, color: 'bg-green-500' },
    { label: 'Total Users', value: data.totalUsers, color: 'bg-purple-500' },
    { label: 'Total Products', value: data.totalProducts, color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div
            className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white text-2xl mb-4`}
          >
            {item.label === 'Total Revenue' && '💰'}
            {item.label === 'Total Orders' && '📦'}
            {item.label === 'Total Users' && '👤'}
            {item.label === 'Total Products' && '🛍️'}
          </div>
          <p className="text-sm font-medium text-gray-500">{item.label}</p>
          <p className="text-2xl font-bold text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;