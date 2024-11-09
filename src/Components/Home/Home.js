import { Game } from '../Game/Game'
import { useState, useEffect } from 'react';
import { getDefaultGame } from '../../Services/GameStateService'
import { logoutUser } from '../../Services/AuthService';

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

  // Logs out the user
  const onLogoutClick = () => {
    logoutUser();
  }

  return (
    <div>
      <button onClick={onLogoutClick}>Logout</button>
      <Game gamestate={gamedata} />
    </div>
  );
}
