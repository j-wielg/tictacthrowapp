import { Game } from '../Game/Game'
import { useState, useEffect } from 'react';
import { getDefaultGame } from '../../Services/GameStateService'
import { logoutUser, isUser } from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";


export default function Home() {
  // Manages state for game data
  const [gamedata, setGamedata] = useState({});

  // Manage user session state
  var [user, setUser] = useState(isUser());
  const navigate = useNavigate();

  // Change the gamestate when request completes
  useEffect(() => {
    getDefaultGame().then((game) => {
      setGamedata(game);
      console.log("Received game data: ", game);
    });
  }, []);

  // Logs out the user
  const onLogoutClick = () => {
    logoutUser().then(() => {
      setUser(isUser());
    })
  }

  // Handle log in
  const loginHandler = () => {
    navigate('/login');
  }

  // Display log out button if user is logged in
  return (
    <div>
      {user ? (
        <div>
          <button onClick={onLogoutClick}>Logout</button>
          <Game gamestate={gamedata} />
        </div>
      ) : (
        <div>
          <button onClick={loginHandler}>Login</button>
          <Game gamestate={gamedata} />
        </div>
      )
      }
    </div>
  );
}
