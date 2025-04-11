import { useEffect, useState } from "react"
import './app.css'

const CAT_FACT_ENDPOINT = 'https://catfact.ninja/fact'


export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    fetch(CAT_FACT_ENDPOINT)
      .then( res => res.json())
      .then( data => {
        const {fact} = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const words = fact.trim().split(' ', 4).join(' ')

    fetch(`https://cataas.com/cat/says/${words}?Size=50&fontColor=red&json=true`)
      .then( res => res.json())
      .then( response => {
          const { id } = response
          const url = `cat/${id}/says/${words}`
          setImage(`https://cataas.com/${url}`)
        })

  }, [ fact ])

  return (
    <main>
      <h1>App de gatitos!</h1>
      <section>
      { fact && <p>{fact}</p>}
      { image && <img src={image} alt={`An image that contains the first three words of ${fact}`} />}
      </section>
    </main>
  )
}