// Grabs gamestate from the server
import Parse from "parse";
// Gets game logic from rust package
import { TicTacThrow } from 'ttt_gamelogic';


/**
 * Creates a new session associated to a specific user.
 *
 * @param {String} player1 - User object representing the user playing as player 1
 * @param {String} player2 - User object representing the user playing as player 2
 */
export async function createSession(player1, player2) {
  // Creates a gamestate object
  const newGame = new Parse.Object('Gamestate');
  var ttt = JSON.parse(TicTacThrow.new().jsonify());
  for (var [key, value] of Object.entries(ttt)) {
    if (key === 'past_state') key = 'pastState';
    newGame.set(key, value);
  }
  // Creates a session object
  const newSession = new Parse.Object('Session');
  newSession.set('player1', player1);
  newSession.set('player2', player2);
  newSession.set('game', newGame);
  try {
    await newSession.save();
  } catch (e) {
    console.error(`Failed to create new session with error {e}`);
  }
}


/**
 * Gets the sessions associated to a specific user.
 *
 * @param user - The user whose sessions should be fetched
 */
export async function getUserSessions(user) {
  const p1Query = new Parse.Query('Session');
  p1Query.equalTo('player1', user);
  const p2Query = new Parse.Query('Session');
  p2Query.equalTo('player2', user);

  const userQuery = Parse.Query.or(p1Query, p2Query);
  try {
    const sessions = await userQuery.findAll();
    return sessions;
  } catch (e) {
    console.error(`Error fetching user sessions: {e}`);
  }
}


/**
 * Gets a session by its session id
 *  
 * @param {String} id - The session's id
 */
export async function getSession(id) {
  const session = new Parse.Object('Session');
  const query = new Parse.Query(session);
  query.equalTo(id);
  try {
    const results = await query.find();
    return results[0];
  } catch (e) {
    console.error(`Failed to get session`, id, ':', e);
  }
}

/**
 * Saves a game to the server. Takes a TicTacThrow object.
 *
 * @param {TicTacThrow} game - An object containing the game state
 * @param {Object} session - The session associated to the game
 * 
 * @returns {boolean} Whether or not the request succeeded
 */
export async function saveGame(game, session) {
  const gameState = session.get('game');
  // Gets most of the values by converting from json
  var obj = JSON.parse(game.jsonify());
  // Sets the parse object
  for (let [key, value] of Object.entries(obj)) {
    if (key === 'past_state') key = 'pastState';
    gameState.set(key, value);
  }
  try {
    await gameState.save();
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes an active session. Also deletes the game associated to the session
 *
 * @param {Object} session - The session to delete
 */
export async function deleteSession(session) {
  try {
    await session.destroy();
  } catch (e) {
    console.error(`Failed to delete the session: {e}`);
  }
}

