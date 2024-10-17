import { Board } from './Board';
import Parse from 'parse';


/**
  * An async function that fetches gamestate data from the server.
  * Returns undefined in the event of a failure.
  *
  * @returns {Promise<(Object|undefined)>} The result of the request, wrapped in a Promise
  */
export async function fetchGame() {
  const gameState = Parse.Object.extend('gameState');
  const query = new Parse.Query(gameState);
  query.equalTo("objectId", "Ugyx8Ld4QO");

  try {
    const results = await query.find();
    for (const object of results) {
      return object;
    }

  } catch (e) {
    console.error("Failed to fetch game data!");
    return undefined;
  }
}


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
