import Home from './Home/Home'
import Rules from './Rules/Rules'
import Navbar from './Navbar/Navbar'

// Imports routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
      </Routes>
    </Router>
  );
}
