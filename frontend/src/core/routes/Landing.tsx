import { Navigate, useLocation } from "react-router-dom";
import { useAppConfig } from "@app/contexts/AppConfigContext";
import HomePage from "@app/pages/HomePage";
import Login from "@app/routes/Login";

/**
 * Landing component - Smart router based on authentication status for core version
 *
 * If login is enabled and user is unauthenticated: Show Login or redirect to /login
 * Otherwise: Show HomePage
 */
export default function Landing() {
  const { config, loading, isAuthenticated } = useAppConfig();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // If we know the user is unauthenticated AND the backend requires login
  if (config?.enableLogin && isAuthenticated === false) {
    const isHome = location.pathname === "/" || location.pathname === "";
    
    // If we're at home route ("/"), show login directly
    if (isHome) {
      return <Login />;
    }

    // For non-home routes without auth, navigate to login (preserves from location)
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Allow through to the standard HomePage if no login required or authenticated
  return <HomePage />;
}
