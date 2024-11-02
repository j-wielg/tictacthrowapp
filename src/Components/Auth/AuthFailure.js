// Component that renders an error screen if the user is unauthorized

import { useNavigate } from "react-router-dom"

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
    <div>
      <h1>Invalid Path</h1>
      <p>This path cannot be accessed using a guest account</p>
      <button onClick={backHandler}>Go Back</button>
      <button onClick={loginHandler}>Log In</button>
      <button onClick={registerHandler}>Create an Account</button>
    </div>
  )
}
