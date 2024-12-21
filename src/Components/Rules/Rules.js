// Lists the rules for a game of Tic Tac Throw


export default function Rules() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded">
      <div className="text-left max-w-3xl p-4 bg-white shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-4">Rules:</h1>
        <h2 className="text-xl font-semibold mb-2">Terminology:</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>Piece: Refers to one of the Xs or Os on the board</li>
          <li>Grid: One of the 9 tic-tac-toe boards on the screen</li>
          <li>Square/Position: One of 91 positions on the board</li>
          <li>
            Free: The game is called 'free' if the player can move on any grid
          </li>
          <li>
            Owned: A grid is owned by the first player to make a three-in-a-row
            in said grid
          </li>
          <li>Move: Refers to putting a piece somewhere on the board</li>
          <li>Sending/Throwing: Forcing a player to play in a certain grid</li>
          <li>Full: A grid is full if all 9 squares are filled</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Available moves:</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>
            The player must move in the grid corresponding to the last player's
            move
            <ul className="list-disc pl-5">
              <li>
                For instance, if the previous player moved in an upper left
                square, the current player must play in the upper left grid
              </li>
            </ul>
          </li>
          <li>
            Unless no other moves are possible, a player cannot send the
            opponent to the grid they just came from
          </li>
          <li>
            If a player sends the opponent to a full grid, the next move is free
          </li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Winning:</h2>
        <ul className="list-disc pl-5">
          <li>A player wins if they own more grids than the opponent</li>
          <li>
            A player can win before all grids are owned, provided that they own
            more than half the available grids
          </li>
          <li>
            If both players own the same number of grids when all squares are
            filled, the game results in a draw
          </li>
        </ul>
      </div>
    </div>
  );
}