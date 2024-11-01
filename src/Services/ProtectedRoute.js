// Wrapper around react-router-dom which supports protected routes

import { Navigate, useNavigate, Outlet } from "react-router-dom";
import Parse from 'parse';

/**
 * Uses react-router-dom to prevent users from accessing certain routes.
 */
export default function ProtectedRoute() {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("..");
  };
  const loginHandler = () => {
    navigate("/login");
  }
  const signupHandler = () => {
    navigate("/signup");
  }

  var user = Parse.User.current();

  return (
    <div>
      {user ? (
        <Outlet />
      ) : (
        <div class="authFailure">
          <p>This page cannot be accessed with a guest account</p>
          <button onClick={goBackHandler}>Go Back</button>
          <button onClick={loginHandler}>Log In</button>
          <button onClick={signupHandler}>Sign Up</button>
        </div>
      )}
    </div>
  )
}
