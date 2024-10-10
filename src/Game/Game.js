import { Board } from './Board';
import Parse from 'parse';


// Helper function which fetches game data
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


// Component that renders the game
export function Game(gamestate) {
  // Converts the player
  var convert_player = (p) => {
    if (p == 1) return "1";
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
      <div>
        <p>Waiting on server...</p>
      </div>
  }
}
