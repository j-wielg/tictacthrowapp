// Route which requires that the user be *not* logged in
// Essentially the opposite of a protected route

import { Navigate, Outlet } from "react-router-dom";
import { isUser } from '../../Services/AuthService';

/**
 * Uses react-router-dom to prevent users from accessing certain routes.
 *
 * @param path - The path to redirect to for an unauthorized user
 */
export default function GuestRoute({path}) {
  var user = isUser();

  return (
    <div>
      {user ? (
        <Navigate to={path} replace />
      ) : (
        <Outlet />
      )}
    </div>
  )
}
