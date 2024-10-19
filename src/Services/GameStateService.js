// Grabs gamestate from the server
import Parse from "parse";

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
    console.log("Got gamestate: ", result)
    return result
  } catch (e) {
    console.error("Failed to fetch game data!");
    return undefined;
  }
}
