import { Board } from './Board';
import { Stage, Text, Layer, Rect } from 'react-konva';
import { useState } from 'react';



/**
 * Helper component that renders a green rectangle that shows where the player
 * is allowed to move
 *
 * @param gamestate - The gamestate object received from Parse
 * @param config - An object that configures the rendering of the board
 */
function CurrentGrid({gamestate, config}) {
  const color = "rgba(50, 200, 50, 1)"
  // Handles the case where the game is free
  if (gamestate.get("free")) {
    return <Rect
      x={config.x_off - 0.5 * config.size}
      y={config.y_off - 0.5 * config.size}
      width={config.size * 12}
      height={config.size * 12}
      stroke={color}
    />
  }
  var grid = gamestate.get("grid");
  var x = 4 * (grid % 3) * config.size;
  var y = 4 * Math.floor(grid / 3) * config.size;
  return <Rect
    x={x + config.x_off - 0.5 * config.size}
    y={y + config.y_off - 0.5 * config.size}
    width={config.size * 4}
    height={config.size * 4}
    stroke={color}
  />

}



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
  // Holds the configuration settings for game objects
  const renderConfig = {
    x_off: 20,
    y_off: 80,
    size: 30
  }
  // Converts the player
  var convert_player = (p) => {
    if (p === 1) return "1";
    else return "2";
  };
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
    setHoverSquare({x: x * renderConfig.size, y: y * renderConfig.size, render: true});
  }

  try {
    return (
      <div>
        <Stage width={500} height={500}>
          <Layer>
            <CurrentGrid gamestate={gamestate} config={renderConfig} />
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
              hoverHandler={hoverHandler}
              {...renderConfig}
            />
            <Rect
              x={hoverSquare.x + renderConfig.x_off}
              y={hoverSquare.y + renderConfig.y_off}
              width={renderConfig.size}
              height={renderConfig.size}
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
