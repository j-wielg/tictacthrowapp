// Component imports
import Home from './Home/Home'
import Rules from './Rules/Rules'
import Navbar from './Navbar/Navbar'
import Settings from './Settings/Settings'
import AuthFailure from './Auth/AuthFailure'

// Imports routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../Services/ProtectedRoute'


/**
 * Renders the app. Handles routing for the webapp
 */
export default function Components() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules/" element={<Rules />} />
        <Route path="/unauthorized" element={<AuthFailure />} />
        <Route element={<ProtectedRoute path='/unauthorized' />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
