import React, { useState } from 'react';
import DashboardSection from './DashboardSection';
import InfoAlert from './InfoAlert';
import PortalAdoption from './PortalAdoption';
import QuickActions from './QuickActions';

const Dashboard = () => {
  const [moveInsExpanded, setMoveInsExpanded] = useState(false);
  const [moveOutsExpanded, setMoveOutsExpanded] = useState(false);
  const [paymentsExpanded, setPaymentsExpanded] = useState(true);

  const financialMessage = (
    <>
      Have you checked your Financial Diagnostics Page recently?{' '}
      <a href="#" className="font-medium underline">Click here</a>{' '}
      to check up on your Financial Health.{' '}
      <a href="#" className="font-medium underline">Remind me in 7 days</a>{' '}|{' '}
      <a href="#" className="font-medium underline">I'm fine... don't show this message again</a>
    </>
  );

  const paymentPlatformMessage = (
    <>
      You are currently not set up to take advantage of AppFolio's Payment Platform. 
      To learn how this service can optimize your AppFolio investment{' '}
      <a href="#" className="font-medium underline">click here</a>.
    </>
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2">View By</span>
              <select className="form-select rounded-md border-gray-300">
                <option>All</option>
              </select>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              Customize
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Smart Tasks
            </button>
          </div>
        </div>

        <div className="mt-4">
          <InfoAlert message={financialMessage} />

          <div className="mt-4">
            <DashboardSection
              title="Move Ins"
              isExpanded={moveInsExpanded}
              onToggle={() => setMoveInsExpanded(!moveInsExpanded)}
            />

            <DashboardSection
              title="Move Outs"
              isExpanded={moveOutsExpanded}
              onToggle={() => setMoveOutsExpanded(!moveOutsExpanded)}
            />

            <DashboardSection
              title="Online Payments"
              isExpanded={paymentsExpanded}
              onToggle={() => setPaymentsExpanded(!paymentsExpanded)}
            >
              <InfoAlert message={paymentPlatformMessage} />
              <PortalAdoption />
            </DashboardSection>
          </div>
        </div>
      </div>
      <QuickActions />
    </div>
  );
};

export default Dashboard;