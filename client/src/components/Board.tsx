
import Square from "./Square";



/* 
const useGameStore = create(
    combine({squares:Array(9).fill(null),xIsNext:true},(set)=>{
        return {
            setSquares:(nextSquares: Array<string | null> | ((squares: Array<string | null>) => Array<string | null>))=>{
                set((state)=>({
                    squares:typeof nextSquares ==='function'?nextSquares(state.squares):nextSquares,
                }))
            },

            setXIsNext:(nextXIsNext:boolean|((xIsNext:boolean)=>boolean))=>{
                set((state)=>(
                    {
                        xIsNext:typeof nextXIsNext === 'function'?nextXIsNext(state.xIsNext):nextXIsNext
                    }
                ))
            }
        }
    })
) */

type SquareProp = Array<string|null>


interface boardProps {
    squares:SquareProp,
    xIsNext: boolean,
    onPlay:(squares:SquareProp) => void;
}



type player = 'X'  | 'O';
type winner = player | null;
 const Board:React.FC<boardProps>=({xIsNext,squares,onPlay})=> {

    
    const winner = calculateWinner({ squares })
    const turns = calculateTurns({squares})
    const currentPlayer:player = xIsNext?'X':'O';
    const status = calculateStatus({ winner, turns, player: currentPlayer })
    
    


    
    const handleClick = (i: number)=>{
        if(squares[i]||winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = currentPlayer
        onPlay(nextSquares)
    
        
    }

    

    


  return (
    <><div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}
    >
      {squares.map((square,squareIndex)=>(
        <Square key={squareIndex} value={square} onSquareClick={()=>handleClick(squareIndex)}/>
      ))}
    </div>
    <div>
        Player {`${currentPlayer} turn`}</div>
        <div>{status && `${status}`}</div></>
    
  )
}

const calculateWinner = ({ squares }: { squares: Array<string | null> }): winner => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for(let i=0;i<lines.length;i++)
        {
            const [a,b,c] = lines[i];
            if (squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c])
                return squares[a] as winner;
        }

        return null;

    }
    const calculateTurns = ({squares}:{squares:Array<string|null>})=>{
        return squares.filter((square)=>!square).length
    }

    const calculateStatus=({winner,turns,player}:{winner:winner,turns:number,player:player})=>{
        if(!winner&&!turns) return 'Draw'
        if(winner) return `Winner ${winner}`
        return `Next player: ${player}`
    }


    export default Board;