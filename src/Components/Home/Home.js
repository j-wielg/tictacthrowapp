import { Game } from '../Game/Game'
import { useState, useEffect } from 'react';
import { getDefaultGame } from '../../Services/GameStateService'
import { logoutUser } from '../../Services/AuthService';
import { TicTacThrow } from 'ttt_gamelogic';

export default function Home() {
  // Manages state for game data
  const [gamedata, setGameData] = useState(TicTacThrow.new());

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
