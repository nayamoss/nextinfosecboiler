
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const AccessDenied = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
            <Shield className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Access Denied
        </h1>
        
        <p className="mb-6 text-base text-gray-600 dark:text-gray-400">
          You don't have permission to access this page. This area requires additional privileges.
        </p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Button asChild variant="default">
            <Link to="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to homepage
            </Link>
          </Button>
          
          {user ? (
            <Button asChild variant="outline">
              <Link to="/account" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to account
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link to="/auth" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
