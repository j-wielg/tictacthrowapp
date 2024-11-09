// Component imports
import Home from './Home/Home'
import Rules from './Rules/Rules'
import Navbar from './Navbar/Navbar'
import Settings from './Settings/Settings'
import AuthFailure from './Auth/AuthFailure'
import AuthRegister from './Auth/AuthRegister'
import AuthLogin from './Auth/AuthLogin'

// Imports routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Routes/ProtectedRoute'


/**
 * Renders the app. Handles routing for the webapp
 */
export default function Components() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/rules/" element={<Rules />} />
        <Route path="/unauthorized" element={<AuthFailure />} />
        <Route element={<ProtectedRoute path='/unauthorized' />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
