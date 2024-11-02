// Wrapper around react-router-dom which supports protected routes

import { Navigate, Outlet } from "react-router-dom";
import Parse from 'parse';

/**
 * Uses react-router-dom to prevent users from accessing certain routes.
 *
 * @param path - The path to redirect to for an unauthorized user
 */
export default function ProtectedRoute({path}) {
  var user = Parse.User.current();

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
