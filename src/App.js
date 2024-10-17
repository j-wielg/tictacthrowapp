import './App.css';
import * as ENV from "./environments";
import Parse from 'parse';
import Components from './Components/Components'

// Starts parse
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;


/**
  * The main entry point for the React web application
  */
function App() {
  return <Components />
}

export default App;
