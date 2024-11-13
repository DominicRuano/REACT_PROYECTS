import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/square'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinerModal } from './components/winerModal'
import { Board } from './components/board'


function App() {
  const [board, setBoard] = useState( () => {
    const boardFromStorage = localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)  // null no hay win, True hay win, False hay empate

  const updateBoard = (index) => {
    // Si la casilla ya esta ocupada o ya hay un ganador, no hacer nada
    if (board[index] || winner) return
    // Actualizar el tablero con el nuevo movimiento
    const newBoard = [ ...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar en local storage
    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)

    // Verificar si hay un ganador
    const newWiner = checkWinner(newBoard)
    if (newWiner) {
      setWinner(newWiner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  
  const resetGame = () => {
    // Limpiar local storage
    localStorage.removeItem('board')
    localStorage.removeItem('turn')
    // Limpiar estado del juego
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <>
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        <Board board={board} updateBoard={updateBoard}/>
      </section>
      <section className='turn'>
        <Square isSelected={ turn==TURNS.X }>{TURNS.X}</Square>
        <Square isSelected={ turn==TURNS.O }>{TURNS.O}</Square>
      </section>
      <section>
        <WinerModal winner={winner} resetGame={resetGame}/>
      </section>
    </main>
    </>
  ) 
}

export default App
