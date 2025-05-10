import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logoutUser, isUser } from '../../Services/AuthService';
import { createSession, getUserSessions } from '../../Services/GameStateService';
import ActiveGames from '../ActiveGames/ActiveGames';
import Parse from 'parse';


export default function Home() {
  // Manages state for game data
  const [user, setUser] = useState(Parse.User.current());
  const [sessions, setSessions] = useState([]);

  // Logs out the user
  const onLogoutClick = () => {
    logoutUser();
    setUser(new Parse.User());
  }
  // Creates a new local multiplayer game
  const onLocalClicked = () => {
    createSession(user, user);
  }
  useEffect(() => {
    if (isUser()) {
      getUserSessions(user).then((sessionList) => {
        var games = sessionList.map((x) => x.get('game'));
        Promise.all(games.map((x) => x.fetch())).then(() => {
          setSessions(sessionList);
        })
      })
    } else {
      setSessions([]);
    }
  }, [user])

  return (
    <div>
      {(isUser()) ? (
        <div>
          <button onClick={onLogoutClick}>Logout</button>
        </div>
      ) : (
        <div></div>
      )}
      <h1>Active Games</h1>
      {(isUser()) ? (
        <ActiveGames sessions={sessions}/>
      ) : (
        <div>
          <p>To see active games, please <Link to="login">log in</Link> or <Link to="register">sign up</Link></p>
        </div>
      )}
      <h1>New Game</h1>
      {(isUser()) ? (
        <div>
          <button onClick={onLocalClicked}>New Local Game</button>
        </div>
      ) : (
        <p>To play online multiplayer and to save progress between sessions, please <Link to="login">log in</Link> or <Link to="register">sign up</Link></p>
      )}
    </div>
  );
}
