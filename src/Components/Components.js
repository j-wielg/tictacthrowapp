// Component imports
import Home from './Home/Home'
import Rules from './Rules/Rules'
import Navbar from './Navbar/Navbar'
import Settings from './Settings/Settings'
import AuthFailure from './Auth/AuthFailure'
import AuthRegister from './Auth/AuthRegister'
import AuthLogin from './Auth/AuthLogin'
import Play from './Play/Play'

// Imports routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Routes/ProtectedRoute'
import GuestRoute from './Routes/GuestRoute'


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
        <Route path="/play/:sessionId" element={<Play />} />
        <Route path="/play/" element={<Play />} />
        <Route path="/unauthorized" element={<AuthFailure />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute path='/unauthorized' />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        {/* Routes which are only accessible if not logged in */}
        <Route element={<GuestRoute path='/' />}>
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
