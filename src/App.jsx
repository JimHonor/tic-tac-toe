import { useState } from "react";
import Board from "./components/Board";
import Player from "./components/Player";

const App = () => {
  const [players, setPlayers] = useState([
    {
      name: "X",
      score: 0,
    },
    {
      name: "O",
      score: 0,
    },
  ]);

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const activePlayer = players[activePlayerIndex].name;

  const initialGame = {
    isOver: false,
    isTie: false,
  };
  const [game, setGame] = useState(initialGame);

  const [boardKey, setBoardKey] = useState(0);
  const restartGame = () => {
    setActivePlayerIndex(0);
    setGame(initialGame);
    setBoardKey(boardKey + 1);
  };

  const handleGame = (gameState) => {
    const { isContinue, isTie } = gameState;

    // continue game
    if (isContinue) {
      setActivePlayerIndex(activePlayerIndex === 0 ? 1 : 0);
      return;
    }

    // game over and is tie
    if (isTie) {
      setGame({ isOver: true, isTie: true });
      return;
    }

    // game over and someone win
    setGame({ ...game, isOver: true });
    setPlayers(
      players.map((player, index) =>
        index === activePlayerIndex
          ? { ...player, score: player.score + 1 }
          : player
      )
    );
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Tic Tac Toe</h1>
      <Player players={players} activePlayerIndex={activePlayerIndex} />
      <Board
        key={boardKey}
        activePlayerIndex={activePlayerIndex}
        isGameOver={game.isOver}
        onSquareClick={handleGame}
      />
      {game.isOver ? (
        game.isTie ? (
          <div>Game over! Tie!</div>
        ) : (
          <div>Game over! {activePlayer} win!</div>
        )
      ) : (
        ""
      )}
      <button style={{ marginTop: "1rem" }} onClick={restartGame}>
        Restart game
      </button>
    </div>
  );
};

export default App;
