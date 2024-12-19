import { Board } from './Board';
import { Group, Stage, Text, Layer, Rect } from 'react-konva';
import { useState } from 'react';
import { TicTacThrow } from 'ttt_gamelogic';


/**
 * Helper component that renders a green rectangle that shows where the player
 * is allowed to move
 *
 * @param {object} props
 * @param {TicTacThrow} props.gamestate - The gamestate object received from Parse
 * @param {object} props.config - An object that configures the rendering of the board
 */
function CurrentGrid({gamestate, config}) {
  const color = "rgba(50, 200, 50, 1)"
  // Handles the case where the game is free
  if (gamestate.free) {
    return <Rect
      x={config.x_off - 0.5 * config.size}
      y={config.y_off - 0.5 * config.size}
      width={config.size * 12}
      height={config.size * 12}
      stroke={color}
    />
  }
  var grid = gamestate.grid;
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
 * Helper component that renders a game over screen.
 *
 * @param {object} props
 * @param {TicTacThrow} props.gamestate - The gamestate object received from Parse
 * @param {object} props.config - An object that configures the rendering of the board
 */
function GameOver({gamestate, config}) {
  if (gamestate.active) {
    return;
  }
  var wintext = "It's a tie";
  if (gamestate.winner === 1) {
    wintext = "Player 1 wins!";
  } else if (gamestate.winner === -1) {
    wintext = "Player 2 wins!";
  }
  return (
    <Group>
      <Rect 
        x={config.x_off - config.size/2}
        y={config.y_off - config.size/2}
        width={12 * config.size}
        height={12 * config.size}
        fill={"rgba(0, 0, 0, 0.5)"}
      />
      <Text 
        align="center"
        text={"Game Over"}
        fontSize={40}
        y={config.y_off + config.size * 2.8}
        x={config.x_off}
        width={11 * config.size}
        fill="white"
        stroke="black"
        strokeWidth={1}
      />
      <Text 
        align="center"
        text={wintext}
        fontSize={35}
        y={config.y_off + config.size * 6.8}
        x={config.x_off}
        width={11 * config.size}
        fill="white"
        stroke="black"
        strokeWidth={1}
      />
    </Group>
  )
}


/**
  * Component that renders the Tic Tac Throw game.
  *
  * @param {object} props
  * @param {TicTacThrow} props.gamestate A gameState object fetched using Parse.
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
    if (grid === -1 || !gamestate.is_valid_move(grid, pos)) {
      setHoverSquare({...hoverSquare, render: false});
      return;
    }
    var x = 3 * (grid % 3) + (pos % 3);
    var y = 3 * Math.floor(grid / 3) + Math.floor(pos / 3);
    x += Math.floor(x / 3);
    y += Math.floor(y / 3);
    setHoverSquare({x: x * renderConfig.size, y: y * renderConfig.size, render: true});
  }
  // Runs the click handler
  const clickHandler = (grid, pos) => {
    if (grid === -1) {
      return;
    } else if (gamestate.is_valid_move(grid, pos)) {
      gamestate.update(grid, pos);
    }
    console.log('clicked');
  }

  try {
    return (
      <div>
        <Stage width={500} height={500}>
          <Layer>
            <CurrentGrid gamestate={gamestate} config={renderConfig} />
            <Text 
              text={"Turn: " + gamestate.turn}
              fontSize={16}
              y={-40 + renderConfig.y_off}
              x={0 + renderConfig.x_off}
            />
            <Text 
              text={"Player: " + convert_player(gamestate.player)}
              fontSize={16}
              x={250 + renderConfig.x_off}
              y={-40 + renderConfig.y_off}/>
            <Board 
              gamestate={gamestate}
              hoverHandler={hoverHandler}
              clickHandler={clickHandler}
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
            <GameOver gamestate={gamestate} config={renderConfig} />
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
