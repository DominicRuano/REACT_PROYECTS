import { useEffect, useState } from "react"
import { Circle } from "./components/circle"

function App() {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enable) {
      window.addEventListener('mousemove', handleMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [enable])

  return (
    <main>
      <Circle position={position} />
    <button onClick={() => {setEnable(!enable)}}>
      { enable ? 'Desactivar' : 'Activar'}
    </button>
    </main>
  )
}

export default App
