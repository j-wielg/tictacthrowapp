import './App.css';
import * as ENV from "./environments";
import Parse from 'parse';
import Components from './Components/Components'

// Starts parse
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;
// Tells parse that it's OK to cache the current user
// By default this is blocked in React
// Parse.User.enableUnsafeCurrentUser();

/**
  * The main entry point for the React web application
  */
function App() {
  return <Components />
}

export default App;
