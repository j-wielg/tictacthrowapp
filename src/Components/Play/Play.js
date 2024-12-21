import { useParams } from "react-router-dom";
import { TicTacThrow } from "ttt_gamelogic";
import { useState } from "react";
import { Game } from "../Game/Game";

/**
 * Component which renders the Play Game screen.
 */
export default function Play() {
  let { sessionId } = useParams();
  const [game, setGame] = useState(TicTacThrow.new());

  if (sessionId === undefined) {
    return (
      <div>
        <h1>Playing as Guest</h1>
        <p>Progress will not be saved on page refresh</p>
        <Game gamestate={game} />
      </div>
    );
  }
}
