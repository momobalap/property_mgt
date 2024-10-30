import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    { name: 'Calendar', link: '/calendar', icon: '📅' },
    { name: 'View Calendar', link: '/calendar/view' },
    { name: 'Property', link: '/properties', icon: '🏠' },
    { name: 'New Property', link: '/properties/new' },
    { name: 'People', link: '/people', icon: '👥' },
    { name: 'Move In Tenant', link: '/people/tenants/move-in' },
    { name: 'Tenant Receipt', link: '/people/tenants/receipt' },
    { name: 'Homeowner Receipt', link: '/people/owners/receipt' },
    { name: 'Enter Bill', link: '/accounting/bills/new' },
    { name: 'New Owner', link: '/people/owners/new' },
    { name: 'New Vendor', link: '/people/vendors/new' },
    { name: 'Rent Increase', link: '/leasing/rent-increase' },
    { name: 'Reports', link: '/reports', icon: '📊' },
    { name: 'Delinquency', link: '/reports/delinquency' },
    { name: 'Homeowner Delinquency', link: '/reports/homeowner-delinquency' },
    { name: 'Tenant Ledger', link: '/reports/tenant-ledger' },
    { name: 'Income Statement', link: '/reports/income-statement' },
  ];

  return (
    <div className="fixed right-0 top-24 bg-white p-4 shadow-lg w-64 space-y-2">
      {actions.map((action, index) => (
        <div key={index} className="flex items-center">
          {action.icon && (
            <span className="mr-2 w-6">{action.icon}</span>
          )}
          <Link
            to={action.link}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {action.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;