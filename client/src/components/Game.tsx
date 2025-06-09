import React from 'react'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import Board from './Board';



const useGameStore = create(
  combine(
    { history: [Array(9).fill(null) as Array<string | null>],currentMove:0, xIsNext: true },
    (set) => {
      return {
        setHistory: (
          nextHistory:
            | Array<Array<string | null>>
            | ((history: Array<Array<string | null>>) => Array<Array<string | null>>)
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
              typeof nextCurrentMove === 'function'
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

    const history = useGameStore((state)=>state.history)
    const setHistory = useGameStore((state)=>state.setHistory)
    const currentMove = useGameStore((state)=>state.currentMove)
    const xIsNext = currentMove %2 ===0
    
    const currentSquares = history[history.length-1]
    
    const setCurrentMove = useGameStore((state)=>state.setCurrentMove)

    const handlePlay = (nextSquares: Array<string | null>) => {
        const nextHistory = history.slice(0,currentMove+1).concat([nextSquares])
        console.log(nextSquares)
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length-1)
      
    }

    
  function jumpTo(nextMove:number) {
    // TODO
    setCurrentMove(nextMove)
    
    console.log(nextMove)
  }

    return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>
            {history.map((_,historyIndex)=>{
                const description = historyIndex > 0?`Go to movie #${historyIndex}`:`Go to game start`
                return (
                    <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
                )
            })}
        </ol>
      </div>
    </div>
  )
}

export default Game