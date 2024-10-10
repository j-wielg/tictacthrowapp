import './App.css';
import { useEffect, useState } from 'react';
import { Game, fetchGame } from './Game/Game';
import * as ENV from "./environments";
import Parse from 'parse';

// Starts parse
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;


function App() {
  // Manages state
  const [gamedata, setGamedata] = useState({});

  // Change the gamestate when request completes
  useEffect(() => {
    fetchGame().then((game) => {
      setGamedata(game);
      console.log("Received game data: ", game);
    });
  }, []);
  return (
    <Game gamestate={gamedata} />
  )
}

export default App;
