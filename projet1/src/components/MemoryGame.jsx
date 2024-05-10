import React, { useState, useEffect } from 'react';
import '../Styles/MemoryGame.css';
import Card from './Cardgame';
import { initialNumbers, checkForMatch } from './utils'; // Import checkForMatch from utils.jsx

const TOTAL_PAIRS = initialNumbers.length;

function MemoryGame() {
  const [gameState, setGameState] = useState({
    cards: initialNumbers.map((number) => ({
      number,
      visible: false, // Set all cards to invisible initially
      pairFound: false,
    })),
    flippedCards: [],
    foundPairs: [],
    moves: 0,
  });

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = shuffleArray([...initialNumbers, ...initialNumbers]);
    setGameState({
      cards: shuffledCards.map((number) => ({
        number,
        visible: false, // Set all cards to invisible initially
        pairFound: false,
      })),
      flippedCards: [],
      foundPairs: [],
      moves: 0,
    });
  };

  const handleCardClick = (index) => {
    const { cards, flippedCards, moves, foundPairs } = gameState;

    if (!cards[index].visible && flippedCards.length < 2) {
      const updatedFlippedCards = [...flippedCards, index];
      const updatedCards = cards.map((card, i) =>
        i === index ? { ...card, visible: true } : card
      );

      const updatedGameState = {
        ...gameState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards,
        moves: moves + 1,
      };

      if (updatedFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = updatedFlippedCards;
        const firstNumber = cards[firstIndex].number;
        const secondNumber = cards[secondIndex].number;

        if (firstNumber === secondNumber) {
          const updatedFoundPairs = [...foundPairs, firstNumber];
          const updatedCardsWithPairsFound = updatedCards.map((card, i) =>
            updatedFlippedCards.includes(i)
              ? { ...card, pairFound: true }
              : card
          );

          setGameState({
            ...updatedGameState,
            foundPairs: updatedFoundPairs,
            cards: updatedCardsWithPairsFound,
          });
        } else {
          setTimeout(() => {
            setGameState((prevState) => ({
              ...prevState,
              cards: prevState.cards.map((card, i) =>
                prevState.flippedCards.includes(i)
                  ? { ...card, visible: false }
                  : card
              ),
              flippedCards: [],
            }));
          }, 1000);
        }
      } else {
        setGameState(updatedGameState);
      }
    }
  };

  const { cards, moves, foundPairs } = gameState;
  const victoryMessage =
    foundPairs.length === TOTAL_PAIRS ? "You've won! Congratulations!" : '';

  return (
    <div className='memory-game'>
      <h1>Casino Memory Game</h1>
      <p>Moves: {moves}</p>
      <p>
        Pairs found: {foundPairs.length} / {TOTAL_PAIRS}
      </p>
      <p>{victoryMessage}</p>
      <div className='card-grid'>
        {cards.map((card, index) => (
          <Card
            key={index}
            number={card.number}
            visible={card.visible || card.pairFound}
            pairFound={card.pairFound}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;

// utils.jsx (Pas de changements)
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
