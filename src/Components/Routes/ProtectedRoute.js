// Wrapper around react-router-dom which supports protected routes

import { Navigate, Outlet } from "react-router-dom";
import { isUser } from '../../Services/AuthService';

/**
 * Uses react-router-dom to prevent users from accessing certain routes.
 *
 * @param path - The path to redirect to for an unauthorized user
 */
export default function ProtectedRoute({path}) {
  var user = isUser();

  return (
    <div>
      {user ? (
        <Outlet />
      ) : (
        <Navigate to={path} replace />
      )}
    </div>
  )
}
