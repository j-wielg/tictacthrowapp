import { Board } from "../Game/Board";
import { TicTacThrow } from "ttt_gamelogic";
import { Stage, Layer, Rect } from "react-konva";
import { useNavigate } from 'react-router-dom';

/**
 * Component which renders all of the user's currently active games.
 *
 * @param {object} props
 * @param {Array} props.sessions - A list of sessions associated to this user
 */
export default function ActiveGames({ sessions }) {
  const navigate = useNavigate();
  const cols = 3;
  const rows = Math.ceil(sessions.length / cols);
  var games = [];
  var gameBoards = [];
  var ids = [];
  var rects = [];
  var row = 0;
  var col = 0;
  var i = 0;
  for (const session of sessions) {
    gameBoards.push(TicTacThrow.new());
    var gamestate = session.get('game');
    for (const [wasFree, grid, pos] of gamestate.get('pastState')) {
      gameBoards[i].update(grid, pos);
    }
    ids.push(session.id);
    games.push(
      <Board 
        gamestate={gameBoards[i]}
        size={10}
        x_off={140*col}
        y_off={140*row}
        hoverHandler={() => {}}
        key={session.id}
      />
    );
    rects.push(
      <Rect
        width={110}
        height={110}
        key={i}
        fill="rgba(0,0,0,0.2)"
        x={140 * col}
        y={140 * row}
        onClick={() => {
          var path = '/play/' + session.id;
          console.log(session.id);
          navigate(path);
        }}
      />
    );
    i += 1;
    col += 1;
    if (col === cols) {
      col = 0;
      row += 1;
    }
  }
  return (
    <div>
      <Stage 
        width={110 * cols + 30 * (cols-1)}
        height={110 * rows + 30 * (rows-1)}>
        <Layer>
          {games}
          {rects}
        </Layer>
      </Stage>
    </div>
  );
}
