import { create } from "zustand";
import { combine } from "zustand/middleware";
import Board from "./Board";

const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null) as Array<string | null>],
      currentMove: 0,
      xIsNext: true,
    },
    (set) => {
      return {
        setReset: () => {
          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
          });
        },
        setHistory: (
          nextHistory:
            | Array<Array<string | null>>
            | ((
                history: Array<Array<string | null>>
              ) => Array<Array<string | null>>)
        ) => {
          set((state) => ({
            history:
              typeof nextHistory === "function"
                ? nextHistory(state.history)
                : nextHistory,
          }));
        },
        setCurrentMove: (
          nextCurrentMove: number | ((currentMove: number) => number)
        ) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === "function"
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }));
        },
        setXIsNext: (
          nextXIsNext: boolean | ((xIsNext: boolean) => boolean)
        ) => {
          set((state) => ({
            xIsNext:
              typeof nextXIsNext === "function"
                ? nextXIsNext(state.xIsNext)
                : nextXIsNext,
          }));
        },
      };
    }
  )
);

function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[history.length - 1];

  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  const handlePlay = (nextSquares: Array<string | null>) => {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    console.log(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  function jumpTo(nextMove: number) {
    // TODO
    setCurrentMove(nextMove);
    setHistory(history.slice(0, nextMove + 1));

    console.log(nextMove);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
      }}
    >
      <div>
        <Board
          size="large"
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div
        style={{
          marginLeft: "1rem",
          display: "flex",
          flexDirection: "column",
          maxHeight: "71vh",
          overflowY: "auto",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <ol style={{ listStyle: "none", maxHeight: "100%" }}>
          {history.map((squares, historyIndex) => {
            const description = (
              <Board
                squares={squares}
                xIsNext={historyIndex % 2 === 0}
                onPlay={() => {}}
                size="small"
              />
            );
            return (
              <li
                key={historyIndex}
                style={{
                  border: "1px solid #eeeeee",
                  paddingTop: "1rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  backgroundColor:
                    historyIndex === currentMove ? "#f2f2f2" : "white",
                  display: historyIndex > 0 ? "flex" : "none",
                }}
              >
                <div onClick={() => jumpTo(historyIndex)}>{description}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Game;
