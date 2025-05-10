import { useNavigate, useParams } from "react-router-dom";
import { TicTacThrow } from "ttt_gamelogic";
import { useState } from "react";
import { Game } from "../Game/Game";
import { getSession, saveGame } from "../../Services/GameStateService";
import { isUser } from "../../Services/AuthService";
import Parse from "parse";

/**
 * Component which renders the Play Game screen.
 */
export default function Play() {
  let { sessionId } = useParams();
  const [game, setGame] = useState(TicTacThrow.new());
  const [session, setSession] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const onUpdate = () => {
    if (loaded) {
      console.log('Saving game...');
      saveGame(game, session);
    }
  }

  // Case 1: Local game as guest
  if (!isUser() || sessionId === undefined) {
    return (
      <div>
        <h1>Playing as Guest</h1>
        <p>Progress will not be saved on page refresh</p>
        <Game gamestate={game} />
      </div>
    );
  }
  // Otherwise we need to fetch the session using the session id
  if (session === undefined) {
    getSession(sessionId).then((ret) => {
      if (ret === undefined) {
        console.error('Could not find the session');
        navigate('/play/');
        sessionId = undefined;
        return;
      }
      // Kicks the user if this isn't one of their games
      if ((Parse.User.current().id !== ret.get('player1').id)
      && (Parse.User.current().id !== ret.get('player2').id)) {
        navigate('/play/');
        sessionId = undefined;
        return;
      }
      setSession(ret);
      var gamestate = ret.get('game');
      gamestate.fetch().then(() => {
        var pastState = gamestate.get('pastState');
        console.log(pastState);
        for (const [wasFree, grid, pos] of pastState) {
          game.update(grid, pos);
        }
        setLoaded(true);
      })
    })
  }
  if (session === undefined || !loaded) {
    return <p>Waiting on server...</p>
  }
  // Case 2: Local multiplayer
  if (session.get('player1').id === session.get('player2').id) {
    return (
      <div>
        <Game gamestate={game} updateCallback={onUpdate}/>
      </div>
    );
  }
  // TODO: Case 3: LiveQuery remote multiplayer
}
