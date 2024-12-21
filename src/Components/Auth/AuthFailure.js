// Component that renders an error screen if the user is unauthorized

import { useNavigate } from "react-router-dom"


/**
 * Component which renders an error message if the user tries to access
 * a protected route.
 *
 * Has buttons allowing the user to go back, as well as register and/or log in
 */
export default function AuthFailure() {
  // Sets up navigation
  const navigate = useNavigate();

  // Handlers
  const backHandler = () => {
    navigate('..');
  }
  const loginHandler = () => {
    navigate('/login');
  }
  const registerHandler = () => {
    navigate('/register');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          This path cannot be accessed using a guest account. Please log in or create an account.
        </p>
        <div className="space-y-4">
          {/* Primary */}
          <button
            onClick={loginHandler}
            className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Log In
          </button>

          {/* Secondary */}
          <button
            onClick={registerHandler}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Create an Account
          </button>

          {/* Tertiary */}
          <button
            onClick={backHandler}
            className="w-full px-4 py-2 text-gray-500 font-medium rounded-lg hover:underline focus:outline-none"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
