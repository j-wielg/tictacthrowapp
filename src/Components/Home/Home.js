import { Game } from '../Game/Game'
import NameForm from '../Game/NameForm'
import { useState, useEffect } from 'react';
import { getDefaultGame } from '../../Services/GameStateService'

export default function Home() {
  // Manages state for game data
  const [gamedata, setGamedata] = useState({});


  // Change the gamestate when request completes
  useEffect(() => {
    getDefaultGame().then((game) => {
      setGamedata(game);
      console.log("Received game data: ", game);
    });
  }, []);

  return (
    <div>
      <NameForm />
      <Game gamestate={gamedata} />
    </div>
  );
}
