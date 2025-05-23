import React, { useEffect, useState } from 'react'
import './App.css'
import SingleCart from './components/SingleCart'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {

        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);
  const allMatched = cards.length > 0 && cards.every(card => card.matched);


  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  }
  useEffect(()=>{
    shuffleCards();
  },[])

  return (
    <div className='App' >
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      
    {allMatched && (
      <div className="victory-message">
        <h2>🎉 All cards matched!</h2>
        <button onClick={shuffleCards}>Play Again</button>
      </div>
    )}
    
      <div className="card-grid">
        {
          cards.map(card => (
            <SingleCart
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
