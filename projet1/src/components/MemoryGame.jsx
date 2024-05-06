import React, { useState, useEffect } from 'react';
import '../Styles/MemoryGame.css';
import Card from './Card';
import { shuffleArray, checkForMatch } from './utils';
import { initialNumbers } from './data';
function MemoryGame() {
  const [gameState, setGameState] = useState({
    cards: [],
    flippedCards: [],
    foundPairs: 0,
    moves: 0,
  });

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      checkForMatch();
    }
  }, [gameState.flippedCards]);

  const shuffleCards = () => {
    const shuffledCards = shuffleArray([...initialNumbers, ...initialNumbers]);
    setGameState((prevState) => ({
      ...prevState,
      cards: shuffledCards.map((number) => ({ number, visible: false })),
    }));
  };

  const handleCardClick = (index) => {
    const { cards, flippedCards, moves, foundPairs } = gameState; // Destructure gameState
    if (
      flippedCards.length < 2 &&
      !cards[index].visible &&
      !cards[index].matched
    ) {
      setGameState((prevState) => ({
        ...prevState,
        flippedCards: [...flippedCards, index],
        cards: cards.map((card, i) =>
          i === index ? { ...card, visible: true } : card
        ),
        moves: moves + 1,
      }));
      if (flippedCards.length === 1) {
        // Pass gameState object to checkForMatch function
        checkForMatch(gameState, setGameState);
      }
    }
  };

  const { cards, moves, foundPairs } = gameState;
  const victoryMessage =
    foundPairs === 10 ? "You've won! Congratulations!" : '';

  return (
    <div className='memory-game'>
      <h1>Casino Memory Game</h1>
      <p>Moves: {moves}</p>
      <p>{victoryMessage}</p>
      <div className='card-grid'>
        {cards.map((card, index) => (
          <Card
            key={index}
            number={card.number}
            visible={card.visible}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
