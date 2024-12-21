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
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-center">
        {/* Logout Button for Logged-in Users */}
        {isUser() && (
          <div className="mb-6">
            <button
              onClick={onLogoutClick}
              className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        )}

        {/* Active Games Section */}
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Active Games</h1>
        {isUser() ? (
          <ActiveGames sessions={sessions} />
        ) : (
          <p className="text-gray-600">
            To see active games, please{" "}
            <Link
              to="login"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              log in
            </Link>{" "}
            or{" "}
            <Link
              to="register"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              sign up
            </Link>
            .
          </p>
        )}

        {/* New Game Section */}
        <h1 className="text-xl font-semibold text-gray-800 mt-6 mb-4">New Game</h1>
        {isUser() ? (
          <button
            onClick={onLocalClicked}
            className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            New Local Game
          </button>
        ) : (
          <p className="text-gray-600">
            To play online multiplayer and save progress between sessions, please{" "}
            <Link
              to="login"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              log in
            </Link>{" "}
            or{" "}
            <Link
              to="register"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              sign up
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
  // return (
  //   <div>
  //     {(isUser()) ? (
  //       <div>
  //         <button onClick={onLogoutClick}>Logout</button>
  //       </div>
  //     ) : (
  //       <div></div>
  //     )}
  //     <h1>Active Games</h1>
  //     {(isUser()) ? (
  //       <ActiveGames sessions={sessions}/>
  //     ) : (
  //       <div>
  //         <p>To see active games, please <Link to="login">log in</Link> or <Link to="register">sign up</Link></p>
  //       </div>
  //     )}
  //     <h1>New Game</h1>
  //     {(isUser()) ? (
  //       <div>
  //         <button onClick={onLocalClicked}>New Local Game</button>
  //       </div>
  //     ) : (
  //       <p>To play online multiplayer and to save progress between sessions, please <Link to="login">log in</Link> or <Link to="register">sign up</Link></p>
  //     )}
  //   </div>
  // );
}
