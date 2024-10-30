import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface InfoAlertProps {
  message: React.ReactNode;
  type?: 'info' | 'warning';
}

const InfoAlert: React.FC<InfoAlertProps> = ({ message, type = 'info' }) => {
  const bgColor = type === 'info' ? 'bg-blue-50' : 'bg-yellow-50';
  const borderColor = type === 'info' ? 'border-blue-400' : 'border-yellow-400';
  const textColor = type === 'info' ? 'text-blue-700' : 'text-yellow-700';
  const iconColor = type === 'info' ? 'text-blue-400' : 'text-yellow-400';

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <FaInfoCircle className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="ml-3">
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;