import { Group, Circle, Line, Rect } from 'react-konva';

// Stores the previous cursor position. Used to filter out mouse events
// that don't matter
var previousPos = {grid: -1, pos: -1}


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
 * @param {number} x_off - Offset in the x direction
 * @param {number} y_off - Offset in the y direction
 */
function EmptyBoard({distance = 30, x_off, y_off}) {
  return (
    [0, 4, 8].map((x) => {
      return [0, 4, 8].map((y) => {
        return <Grid 
          x={x_off + x * distance}
          y={y_off + y * distance}
          distance={distance}
          key={x + "," + y} />
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
 * @param {number} x_off - Offset in the x direction
 * @param {number} y_off - Offset in the y direction
 */
function Piece({grid, pos, space, type, x_off, y_off}) {
  if (type === 0) return;
  var x = ((grid % 3) * space * 4) + ((pos % 3) * space)
  var y = (Math.floor(grid / 3) * space * 4) + (Math.floor(pos / 3) * space)
  if (type === 1) {
    var padding = Math.floor(space * 0.2)
    return (
      <Group>
        <Line
          x={x + x_off}
          y={y + y_off}
          points={[padding, padding, space - padding, space - padding]}
          stroke="red"/>
        <Line
          x={x + x_off}
          y={y + y_off}
          points={[padding, space - padding, space - padding, padding]}
          stroke="red"/>
      </Group>
    )
  } else if (type === -1) {
    var radius = Math.floor(space * 0.7 * 0.5)
    return (
      <Circle
        x={x + space/2 + x_off}
        y={y + space/2 + y_off}
        radius={radius}
        stroke="blue" />
    )
  }
}

/**
 * Helper function that converts mouse coordinates into the
 * (grid, pos) configuration that can interact with tic tac throw.
 */
function convertCoords(mousePos, x_off, y_off, size) {
  let x = Math.floor((mousePos.x - x_off) / size);
  let y = Math.floor((mousePos.y - y_off) / size);
  // Eliminates moves to a bad square
  if (
    (x === 3 || x === 7 || y === 3 || y === 7) ||
    (x < 0 || x > 10) ||
    (y < 0 || y > 10)
  )
  {
    return {grid: -1, pos: -1};
  }
  // Normalize x, y to be from 0 to 8
  x = x - Math.floor(x / 4)
  y = y - Math.floor(y / 4)
  // Convert to grid and pos
  let p = (x % 3) + 3 * (y % 3);
  let g = (Math.floor(x / 3)) + 3 * (Math.floor(y / 3));
  return {grid: g, pos: p};
}

/**
  * Child component of Game which renders the Tic Tac Throw board.
  *
  * @param {Array<number>} pieces An array containing the location of each player's pieces
  * @param {number} x_off - The x offset of the board
  * @param {number} size - Distance between gridlines
  * @param {number} y_off - The y offset of the board
  */
export function Board({pieces, size=30, x_off=0, y_off=0, ...rest}) {
  // Creates a default hover handler if one isn't provided
  if (rest.hoverHandler === undefined) {
    rest.hoverHandler = (g, p) => {
      console.log('Registered hover:', g, ',', p);
    }
  }
  // Creates a default click handler if one isn't provided
  if (rest.clickHandler === undefined) {
    rest.clickHandler = (g, p) => {
      console.log('Registered click:', g, ',', p);
    }
  }
  // Converts mouse position to (grid, pos) format, and then calls the
  // external hover handler if the coordinates have changed from the last
  // call
  const moveHandler = (e) => {
    const mousePos = e.target.getStage().getPointerPosition();
    var newPos = convertCoords(mousePos, x_off, y_off, size);
    if (newPos.grid !== previousPos.grid || newPos.pos !== previousPos.pos) {
      previousPos = newPos;
      rest.hoverHandler(newPos.grid, newPos.pos);
    }
  }
  // Converts mouse position to (grid, pos) format, and calls the external
  // click handler
  const clickHandler = (e) => {
    const mousePos = e.target.getStage().getPointerPosition();
    var newPos = convertCoords(mousePos, x_off, y_off, size);
    rest.clickHandler(newPos.grid, newPos.pos);
  }
  // Prints the default board
  if (!pieces) {
    return (
      <EmptyBoard distance={size} x_off={x_off} y_off={y_off} />
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
          x_off={x_off}
          y_off={y_off}
          key={grid + "," + pos}/>
      )
    }
  }
  return (
    <Group>
      <EmptyBoard distance={size} x_off={x_off} y_off={y_off} />
      {piecesArray}
      <Rect
        x={x_off}
        y={y_off}
        width={11 * size}
        height={11 * size}
        onMouseMove={moveHandler}
        onClick={clickHandler}
        />
    </Group>
  )
}
