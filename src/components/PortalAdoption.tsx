import React from 'react';

const PortalAdoption = () => {
  const stats = [
    {
      percentage: '0%',
      label: 'ACTIVATED',
      link: 'View Tenants',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      labelColor: 'text-green-800'
    },
    {
      percentage: '83%',
      label: 'NON-ACTIVATED',
      link: 'Send Activation Emails',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      labelColor: 'text-yellow-800'
    },
    {
      percentage: '17%',
      label: 'NO EMAIL',
      link: 'View Tenants',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      labelColor: 'text-red-800'
    }
  ];

  return (
    <div>
      <h3 className="font-medium mb-4">Online Portal Adoption</h3>
      <div className="flex">
        {stats.map((stat, index) => (
          <div key={index} className={`w-1/3 ${stat.bgColor} p-4`}>
            <div className={`text-4xl font-bold ${stat.textColor}`}>
              {stat.percentage}
            </div>
            <div className={`text-sm ${stat.labelColor}`}>{stat.label}</div>
            <a href="#" className="text-blue-600 text-sm hover:underline block mt-2">
              {stat.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortalAdoption;