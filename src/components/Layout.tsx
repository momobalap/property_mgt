import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Layout;