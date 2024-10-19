// Contains the code for the navbar
import { Link } from 'react-router-dom';

/**
 * React component that creates a navbar. Should be at the top of each webpage
 */
export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rules/">Rules</Link>
        </li>
      </ul>
    </div>
  );
}
