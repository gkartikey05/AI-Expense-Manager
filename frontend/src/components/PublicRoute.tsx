import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  user: any; // Replace with your user type
}

const PublicRoute = ({ children, user }: PublicRouteProps) => {
  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not authenticated, render the public component
  return <>{children}</>;
};

export default PublicRoute;
