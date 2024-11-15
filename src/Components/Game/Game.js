import { Board } from './Board';
import { Stage, Text, Layer } from 'react-konva';


/**
  * Component that renders the Tic Tac Throw game.
  *
  * @param {Object} gamestate A gameState object fetched using Parse.
  */
export function Game(gamestate) {
  // Converts the player
  var convert_player = (p) => {
    if (p === 1) return "1";
    else return "2";
  };

  gamestate = gamestate.gamestate;
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
            <Board pieces={gamestate.get("board")} y_off={80} />
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
