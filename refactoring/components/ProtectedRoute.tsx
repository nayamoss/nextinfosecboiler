
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
  isAuthenticated?: boolean;
}

/**
 * A reusable Protected Route component that can be used in React and Next.js projects
 * 
 * @param children - The components to render if access is granted
 * @param requiredRoles - Optional array of roles required to access the route
 * @param redirectTo - Optional redirect path if access is denied (defaults to "/access-denied")
 * @param isAuthenticated - Optional boolean to check if user is authenticated (defaults to true in this demo)
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  redirectTo = "/access-denied",
  isAuthenticated = true, // In a real app, this would be determined from authentication state
}) => {
  // This would be replaced with actual authentication logic in a real app
  console.log("ProtectedRoute - Checking authentication and roles:", { requiredRoles });
  
  // Simple role checking logic (to be replaced with actual role checking in a real app)
  const hasRequiredRole = () => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    
    // Mock user role - in a real app, this would come from your auth context/state
    const userRoles = ['admin']; // Simulated user roles
    
    return requiredRoles.some(role => userRoles.includes(role));
  };
  
  // If authentication check fails, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // If role check fails, redirect to access denied page
  if (requiredRoles && !hasRequiredRole()) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
