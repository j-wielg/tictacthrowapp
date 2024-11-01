// Wrapper around react-router-dom which supports protected routes

import { Navigate, useNavigate } from "react-router-dom";

/**
 * Creates a protected route using react-router-dom. By default,
 * 'go back' navigates one directory up from the current path.
 *
 * @param element - The JSX element corresponding to the protected route
 * @param {boolean} flag - Whether or not the user has permission to see the route
 * @param {string} path - The path to the route
 */
export default function ProtectedRoute({
  element,
  flag,
  path
}) {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("..");
  };

  return (
    <div>
      {flag ? (
        <Navigate to={path} replace />
      ) : (
        <div class="authFailure">
          <p>Unauthorized</p>
          <button onClick={goBackHandler}>Go Back</button>
        </div>
      )}
    </div>
  )
}
