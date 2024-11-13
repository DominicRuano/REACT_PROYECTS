import { Square } from "./square"

export function WinerModal({ winner, resetGame }) {
    if (winner == null) return null

    const whoWins = winner == false ? 'Empate' : `Ganador: ${winner}`

    return (
        <section className='winner'>
          <div className='text'>
            <h2>{ whoWins }</h2>
            
            <header className='win'>
              { winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>

          </div>
        </section>
    )
}