import './App.css';
import * as ENV from "./environments";
import Parse from 'parse';
import Components from './Components/Components'
import initWasm from 'ttt_gamelogic';

// Starts parse
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;
// Starts the WASM vm
await initWasm();

/**
  * The main entry point for the React web application
  */
function App() {
  return <Components />
}

export default App;
