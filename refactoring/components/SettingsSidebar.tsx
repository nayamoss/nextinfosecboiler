
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRoles } from '@/hooks/use-roles';
import { 
  Globe, 
  Search, 
  Palette, 
  Settings as SettingsIcon,
  Mail,
  CreditCard,
  Shield
} from 'lucide-react';

const SettingsSidebar = () => {
  const location = useLocation();
  const { checkRole } = useRoles();
  const isAdmin = checkRole('admin');
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      name: 'Site Settings',
      path: '/dashboard/settings',
      icon: <Globe className="h-5 w-5" />
    },
    {
      name: 'SEO Settings',
      path: '/dashboard/settings/seo',
      icon: <Search className="h-5 w-5" />
    },
    {
      name: 'Theme Settings',
      path: '/dashboard/settings/theme',
      icon: <Palette className="h-5 w-5" />
    },
    // Only show Role Management to admins
    ...(isAdmin ? [{
      name: 'Role Management',
      path: '/dashboard/settings/roles',
      icon: <Shield className="h-5 w-5" />
    }] : []),
    {
      name: 'Integrations',
      path: '/dashboard/settings/integrations',
      icon: <CreditCard className="h-5 w-5" />,
      adminOnly: true
    },
    {
      name: 'Advanced Settings',
      path: '/dashboard/settings/advanced',
      icon: <SettingsIcon className="h-5 w-5" />,
      adminOnly: true
    }
  ];
  
  // Filter out admin-only items if the user is not an admin
  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin);
  
  return (
    <div className="w-64 border-r border-border bg-card overflow-y-auto h-full">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <nav className="space-y-1">
          {filteredNavItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive(item.path) 
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;
