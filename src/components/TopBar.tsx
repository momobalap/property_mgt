import { FaSearch, FaPlus, FaQuestionCircle, FaUser } from 'react-icons/fa';
import { Menu } from '@headlessui/react';

interface TopBarProps {
  setSidebarOpen: (open: boolean) => void;
}

const TopBar = ({ setSidebarOpen }: TopBarProps) => {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-blue-800 shadow">
      <button
        className="px-4 border-r border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <FaSearch className="h-6 w-6" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <div className="w-full flex md:ml-0">
            <div className="relative w-full text-white focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5" />
              </div>
              <input
                className="w-full h-full pl-8 pr-3 py-2 border-transparent text-white bg-blue-700 placeholder-white focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm rounded-md"
                placeholder="Search AppFolio"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <button className="text-white hover:text-gray-200 flex items-center">
            <FaPlus className="h-5 w-5 mr-1" />
            <span>Add Functionality</span>
          </button>
          <button className="text-white hover:text-gray-200 flex items-center">
            <FaQuestionCircle className="h-5 w-5 mr-1" />
            <span>Help & Training</span>
          </button>
          <Menu as="div" className="relative">
            <Menu.Button className="text-white hover:text-gray-200 flex items-center">
              <FaUser className="h-5 w-5 mr-1" />
              <span>Karen Chu</span>
            </Menu.Button>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;