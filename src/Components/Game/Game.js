import { Board } from './Board';
import Parse from 'parse';


/**
  * Component that renders the Tic Tac Throw game.
  *
  * @param {Object} gamestate A gameState object fetched using Parse.
  */
export function Game(gamestate) {
  // Converts the player
  var convert_player = (p) => {
    if (p === 1) return "1";
    else return "2";
  };

  gamestate = gamestate.gamestate;
  try {
    return (
      <div>
        <p>Turn: {gamestate.get("turn")}</p>
        <p>Player: {convert_player(gamestate.get("player"))}</p>
        <Board pieces={gamestate.get("board")} />
      </div>
    );
  } catch (e) {
    return (
      <div>
        <p>Waiting on server...</p>
      </div>
    )
  }
}
