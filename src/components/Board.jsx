import { useState } from "react";

export default function Board({
  activePlayerIndex,
  isGameOver,
  onSquareClick,
}) {
  const _mark = activePlayerIndex === 0 ? "X" : "O";

  const coordinates = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3],
  ];
  const initialSquares = coordinates.map((coordinate, index) => ({
    mark: "",
    id: index + 1,
    x: coordinate[0],
    y: coordinate[1],
  }));
  const [squares, setSquares] = useState(initialSquares);

  const onPlayerClick = ({ id, mark, x, y }) => {
    let markedSquares;
    let isContinue = true;
    let isTie = false;

    // !mark: if square was marked, then player can't mark it again.
    // !isGameOver: if game is over, then player can't mark empty square.
    if (!mark && !isGameOver) {
      const newSquares = squares.map((square) =>
        square.id === id ? { ...square, mark: _mark } : square
      );
      setSquares(newSquares);

      // someone win, game over
      if (isSomeoneWin({ x, y, mark: _mark })) {
        isContinue = false;
        onSquareClick({ isContinue, isTie });
        return;
      }

      // is step9, game over
      markedSquares = newSquares.filter((square) => square.mark).length;
      if (markedSquares === 9) {
        isContinue = false;
        isTie = true;
      }

      // is step1-8, continue
      onSquareClick({ isContinue, isTie });
    }
  };

  const isSomeoneWin = ({ x, y, mark }) => {
    const inXLineSquares = squares.filter(
      (square) => square.x === x && square.y !== y
    );

    if (inXLineSquares[0].mark === mark && inXLineSquares[1].mark === mark) {
      return true;
    }

    const inYLineSquares = squares.filter(
      (square) => square.y === y && square.x !== x
    );

    if (inYLineSquares[0].mark === mark && inYLineSquares[1].mark === mark) {
      return true;
    }

    return false;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        justifyContent: "center",
        margin: "1rem auto",
      }}
    >
      {squares.map((square) => (
        <div
          key={square.id}
          style={{
            border: "1px solid black",
            width: "3rem",
            height: "3rem",
            textAlign: "center",
          }}
          onClick={() => onPlayerClick(square)}
        >
          <span style={{ lineHeight: "3rem", fontSize: "2rem" }}>
            {square.mark}
          </span>
        </div>
      ))}
    </div>
  );
}
