// Contains logic that manipulates the Gamestate parse object


/**
 * Takes a Gamestate object, and updates it with a move
 */
export default function updateGame(game, grid, square) {
  // Stores the move being made
  game.pastState.push([grid, square, game.free]);
  // Updates the board itself
  game.board[grid][square] = game.player;
  // Changes the current player
  game.player = -game.player;
  // Changes the grid
  game.grid = square;
  // Checks if the move is valid
  if (game.full[game.grid]) {
    game.free = true;
  }
  game.turn += 1
  // TODO: Check for three-in-a-rows and update stats accordingly
}
