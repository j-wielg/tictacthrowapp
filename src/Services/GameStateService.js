// Grabs gamestate from the server
import Parse from "parse";
// Gets game logic from rust package
import { TicTacThrow } from 'ttt_gamelogic';

/**
  * Async function which returns the default starting game
  *
  * @returns {Promise<(Object|undefined)>} The result of the request, wrapped in a Promise
  */
export async function getDefaultGame() {
  const gameState = Parse.Object.extend('Gamestate');
  const query = new Parse.Query(gameState);

  try {
    const result = await query.get("j8AA2tJY9s");
    console.log("Got gamestate: ", result);
    return result;
  } catch (e) {
    console.error("Failed to fetch game data!");
    return undefined;
  }
}


/**
 * Saves a game to the server. Takes a TicTacThrow object.
 *
 * @param {TicTacThrow} game - An object containing the game state
 * @param {String} id - The id of the game in Parse
 * 
 * @returns {boolean} Whether or not the request succeeded
 */
export async function saveGame(game, id) {
  const gameState = Parse.Object.extend("Gamestate");
  // Gets most of the values by converting from json
  var obj = JSON.parse(game.jsonify());
  // Sets the parse object
  for (const [key, value] of Object.entries(obj)) {
    gameState.set(key, value);
  }
  gameState.set("id", id);
  try {
    const response = await gameState.save();
    return true;
  } catch {
    return false;
  }
}
