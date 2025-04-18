
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Moon, Sun, FileText, Mail, Users, Settings, Palette, LogOut
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import DashboardPostList from '@/components/DashboardPostList';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-700">
          <Link to="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
              isActive('/dashboard')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
            }`}
          >
            <FileText size={20} />
            <span>Posts</span>
          </Link>
          <Link
            to="/dashboard/newsletters"
            className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
              isActive('/dashboard/newsletters')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
            }`}
          >
            <Mail size={20} />
            <span>Newsletters</span>
          </Link>
          <Link
            to="/dashboard/authors"
            className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
              isActive('/dashboard/authors')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
            }`}
          >
            <Users size={20} />
            <span>Authors</span>
          </Link>
          <Link
            to="/dashboard/settings"
            className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
              isActive('/dashboard/settings')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <Link
            to="/dashboard/theme"
            className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
              isActive('/dashboard/theme')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
            }`}
          >
            <Palette size={20} />
            <span>Theme</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });
  };

  // Show specific content based on route
  const showDashboardContent = location.pathname === '/dashboard';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex flex-1 flex-col">
        <header className="z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {theme.mode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <span>Sign Out</span>
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {showDashboardContent ? (
            <DashboardPostList />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
