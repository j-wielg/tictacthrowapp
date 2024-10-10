
/**
  * Child component of Game which renders the Tic Tac Throw board.
  *
  * @param {Array<number>} pieces An array containing the location of each player's pieces
  */
export function Board(pieces) {
  pieces = pieces.pieces;
  // Prints the default board
  if (!pieces) {
    return (
      <div style={{fontFamily: "monospace"}}>
        <p>
          _|_|_ _|_|_ _|_|_<br />
          _|_|_ _|_|_ _|_|_<br />
          _|_|_ _|_|_ _|_|_
        </p>
        <p>
          _|_|_ _|_|_ _|_|_<br />
          _|_|_ _|_|_ _|_|_<br />
          _|_|_ _|_|_ _|_|_
        </p>
        <p>
          _|_|_ _|_|_ _|_|_<br />
          _|_|_ _|_|_ _|_|_<br />
          _|_|_ _|_|_ _|_|_
        </p>
      </div>
    )
  }

  // Turns piece information into string
  var sp = pieces.map((arr) => {
    return arr.map((piece) => {
      if (piece == 0) return "_";
      else if (piece == 1) return "X";
      else return "O";
    })
  })

  // Returns an ASCII art version of the board
  // This is not coded cleanly, but it's just for the demo
  return (
    <div style={{fontFamily: "monospace"}}>
      <p>
        {sp[0][0]}|{sp[0][1]}|{sp[0][2]}
        {" " + sp[1][0]}|{sp[1][1]}|{sp[1][2]}
        {" " + sp[2][0]}|{sp[2][1]}|{sp[2][2]} <br />
        {sp[0][3]}|{sp[0][4]}|{sp[0][5]} 
        {" " + sp[1][3]}|{sp[1][4]}|{sp[1][5]} 
        {" " + sp[2][3]}|{sp[2][4]}|{sp[2][5]} <br />
        {sp[0][6]}|{sp[0][7]}|{sp[0][8]} 
        {" " + sp[1][6]}|{sp[1][7]}|{sp[1][8]} 
        {" " + sp[2][6]}|{sp[2][7]}|{sp[2][8]} <br />
      </p>
      <p>
        {sp[3][0]}|{sp[3][1]}|{sp[3][2]} 
        {" " + sp[4][0]}|{sp[4][1]}|{sp[4][2]} 
        {" " + sp[5][0]}|{sp[5][1]}|{sp[5][2]} <br />
        {sp[3][3]}|{sp[3][4]}|{sp[3][5]} 
        {" " + sp[4][3]}|{sp[4][4]}|{sp[4][5]} 
        {" " + sp[5][3]}|{sp[5][4]}|{sp[5][5]} <br />
        {sp[3][6]}|{sp[3][7]}|{sp[3][8]} 
        {" " + sp[4][6]}|{sp[4][7]}|{sp[4][8]} 
        {" " + sp[5][6]}|{sp[5][7]}|{sp[5][8]} <br />
      </p>
      <p>
        {sp[6][0]}|{sp[6][1]}|{sp[6][2]} 
        {" " + sp[7][0]}|{sp[7][1]}|{sp[7][2]} 
        {" " + sp[8][0]}|{sp[8][1]}|{sp[8][2]} <br />
        {sp[6][3]}|{sp[6][4]}|{sp[6][5]} 
        {" " + sp[7][3]}|{sp[7][4]}|{sp[7][5]} 
        {" " + sp[8][3]}|{sp[8][4]}|{sp[8][5]} <br />
        {sp[6][6]}|{sp[6][7]}|{sp[6][8]} 
        {" " + sp[7][6]}|{sp[7][7]}|{sp[7][8]} 
        {" " + sp[8][6]}|{sp[8][7]}|{sp[8][8]} <br />
      </p>
    </div>
  )
}
