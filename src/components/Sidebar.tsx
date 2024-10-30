import { FaTachometerAlt, FaCalendarAlt, FaKey, FaHome, FaUsers, 
         FaCalculator, FaTools, FaChartBar, FaEnvelope, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', icon: FaTachometerAlt, href: '/' },
  { name: 'Calendar', icon: FaCalendarAlt, href: '/calendar' },
  { name: 'Leasing', icon: FaKey, href: '/leasing' },
  { name: 'Properties', icon: FaHome, href: '/properties' },
  { name: 'People', icon: FaUsers, href: '/people' },
  { name: 'Accounting', icon: FaCalculator, href: '/accounting' },
  { name: 'Maintenance', icon: FaTools, href: '/maintenance' },
  { name: 'Reporting', icon: FaChartBar, href: '/reporting' },
  { name: 'Communication', icon: FaEnvelope, href: '/communication' },
  { name: "What's New", icon: FaBell, href: '/whats-new', badge: 9 },
];

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <div className="fixed inset-y-0 flex w-64 flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-blue-900">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-white">Property Manager</h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;