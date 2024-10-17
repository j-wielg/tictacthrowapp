import Home from './Home/Home'
import Rules from './Rules/Rules'

// Imports routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules/" element={<Rules />} />
      </Routes>
    </Router>
  );
}
