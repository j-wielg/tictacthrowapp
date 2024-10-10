import './App.css';
import { useEffect, useState } from 'react';
import { Game, fetchGame } from './Game/Game';
import * as ENV from "./environments";
import Parse from 'parse';
import NameForm from './Game/NameForm';

// Starts parse
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;


/**
  * The main entry point for the React web application
  */
function App() {
  // Manages state for game data
  const [gamedata, setGamedata] = useState({});


  // Change the gamestate when request completes
  useEffect(() => {
    fetchGame().then((game) => {
      setGamedata(game);
      console.log("Received game data: ", game);
    });
  }, []);

  return (
    <div>
      {/* Name form rendering */}
      <NameForm />
    {/* Game component rendering */}
    <Game gamestate={gamedata} />
    </div>
  );
}

export default App;
