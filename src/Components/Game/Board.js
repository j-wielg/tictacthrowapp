import React from 'react';
import { Stage, Layer, Group, Text, Circle, Line } from 'react-konva';

/**
 * Helper function that renders a single grid
 * @param {number} x - The x offset of the grid
 * @param {number} y - The y offset of the grid 
 * @param {number} distance - Number of pixels between gridlines
 */
function Grid({x, y, distance=30}) {
  return (
    <Group>
      <Line
        x={x}
        y={y}
        points={[0, distance, 3*distance, distance]}
        closed
        stroke="black"/>
      <Line
        x={x}
        y={y}
        points={[0, 2*distance, 3*distance, 2*distance]}
        closed
        stroke="black"/>
      <Line
        x={x}
        y={y}
        points={[distance, 0, distance, 3*distance]}
        closed
        stroke="black"/>
      <Line
        x={x}
        y={y}
        points={[2*distance, 0, 2*distance, 3*distance]}
        closed
        stroke="black"/>
    </Group>
  );
}

/**
 * Helper function that renders an empty board
 * @param {number} distance - Distance between gridlines
 */
function EmptyBoard({distance = 30}) {
  return (
    [0, 4, 8].map((x) => {
      return [0, 4, 8].map((y) => {
        return <Grid x={x * distance} y={y * distance} distance={distance} key={x + "," + y} />
      })
    })
  )
}

/**
 * Helper function which renders an X at position x, y
 * on the game board.
 * @param {number} grid - Grid position of the piece
 * @param {number} pos - Square position of the piece
 * @param {number} space - The space between gridlines
 * @param {number} type - The type of piece (1 for X, 2 for O) 
 */
function Piece({grid, pos, space, type}) {
  if (type === 0) return;
  var x = ((grid % 3) * space * 4) + ((pos % 3) * space)
  var y = (Math.floor(grid / 3) * space * 4) + (Math.floor(pos / 3) * space)
  if (type === 1) {
    var padding = Math.floor(space * 0.2)
    return (
      <Group>
        <Line
          x={x}
          y={y}
          points={[padding, padding, space - padding, space - padding]}
          stroke="red"/>
        <Line
          x={x}
          y={y}
          points={[padding, space - padding, space - padding, padding]}
          stroke="red"/>
      </Group>
    )
  } else if (type === -1) {
    var radius = Math.floor(space * 0.7 * 0.5)
    return (
      <Circle
        x={x + space/2}
        y={y + space/2}
        radius={radius}
        stroke="blue" />
    )
  }
}


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
      <Stage width={500} height={500}>
        <Layer>
          <EmptyBoard />
        </Layer>
      </Stage>
    )
  }

  // Returns a GUI representation of the gamestate
  var piecesArray = [];
  for (let grid=0; grid < 9; grid++) {
    for (let pos=0; pos < 9; pos++) {
      if (pieces[grid][pos] === 0) continue;
      piecesArray.push(
        <Piece
          grid={grid}
          pos={pos} 
          space={30}
          type={pieces[grid][pos]}
          key={grid + "," + pos}/>
      )
    }
  }
  return (
    <div style={{fontFamily: "monospace"}}>
      <Stage width={500} height={500}>
        <Layer>
          <EmptyBoard distance={30} />
          {piecesArray}
        </Layer>
      </Stage>
    </div>
  )
}
