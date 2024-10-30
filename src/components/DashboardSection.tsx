import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface DashboardSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  isExpanded,
  onToggle,
  children
}) => {
  return (
    <div className="bg-white shadow rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <span className="font-medium">{title}</span>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isExpanded && children && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardSection;