import { Board } from './Board';
import { Stage, Text, Layer, Rect } from 'react-konva';
import { useState } from 'react';


/**
  * Component that renders the Tic Tac Throw game.
  *
  * @param {Object} gamestate A gameState object fetched using Parse.
  */
export function Game({gamestate}) {
  // State
  const [hoverSquare, setHoverSquare] = useState({
    x: 0,
    y: 0,
    render: false
  })
  // Converts the player
  var convert_player = (p) => {
    if (p === 1) return "1";
    else return "2";
  };
  // Size of the board
  const size = 30;
  // Runs the hover handler
  const hoverHandler = (grid, pos) => {
    // Handles bad placements
    if (grid === -1 || gamestate.get("board")[grid][pos] !== 0) {
      setHoverSquare({...hoverSquare, render: false});
      return;
    }
    var x = 3 * (grid % 3) + (pos % 3);
    var y = 3 * Math.floor(grid / 3) + Math.floor(pos / 3);
    x += Math.floor(x / 3);
    y += Math.floor(y / 3);
    setHoverSquare({x: x * size, y: y * size, render: true});
  }

  try {
    return (
      <div>
        <Stage width={500} height={500}>
          <Layer>
            <Text 
              text={"Turn: " + gamestate.get("turn")}
              fontSize={16}
              y={30}/>
            <Text 
              text={"Player: " + convert_player(gamestate.get("player"))}
              fontSize={16}
              x={250}
              y={30}/>
            <Board 
              pieces={gamestate.get("board")}
              y_off={80} 
              size={size}
              hoverHandler={hoverHandler}
            />
            <Rect
              x={hoverSquare.x}
              y={hoverSquare.y + 80}
              width={size}
              height={size}
              fill={"rgba(10, 10, 10, 0.1)"}
              opacity={(hoverSquare.render) ? 1 : 0}
              listening={false}
            />
          </Layer>
        </Stage>
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
