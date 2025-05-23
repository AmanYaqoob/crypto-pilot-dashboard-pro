
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Cpu,
  PieChart,
  TrendingUp,
  Bell,
  CreditCard,
  Settings,
  User,
} from 'lucide-react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Agents',
    href: '/agents',
    icon: Cpu,
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: PieChart,
  },
  {
    name: 'Market Insights',
    href: '/insights',
    icon: TrendingUp,
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: CreditCard,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  // Check for stored sidebar state in localStorage
  const storedSidebarState = localStorage.getItem('sidebarCollapsed');
  const [collapsed, setCollapsed] = useState(storedSidebarState === 'true');
  const location = useLocation();

  // Update localStorage whenever collapsed state changes
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
  };

  // When component loads, ensure we check localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="font-bold text-xl text-sidebar-primary">
              <span className="sr-only">Crypto Pilot</span>
              <span className="inline-block">🚀</span>
            </div>
            <span className="text-sidebar-foreground font-bold font-heading">Crypto Pilot</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto font-bold text-xl text-sidebar-primary">
            <span className="sr-only">Crypto Pilot</span>
            <span className="inline-block">🚀</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-primary"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === item.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "justify-center"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground opacity-70">
            Crypto Pilot v1.0
          </div>
        )}
      </div>
    </div>
  );
}
