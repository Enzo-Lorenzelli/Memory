import React, { useState, useEffect } from 'react';
import Card from './Card';
import { shuffleArray } from './utils';
import { initialNumbers } from './data';

function EndlessMemoryGame() {
  const [gameState, setGameState] = useState({
    cards: [],
    flippedCards: [],
    foundPairs: [],
    moves: 0,
  });

  useEffect(() => {
    generateNewNumbers();
  }, []);

  useEffect(() => {
    const { foundPairs, cards } = gameState;
    if (foundPairs.length === cards.length / 2) {
      setTimeout(() => {
        generateNewNumbers();
        setGameState((prevState) => ({
          ...prevState,
          flippedCards: [],
          foundPairs: [],
          moves: prevState.moves + 1,
        }));
      }, 1000);
    }
  }, [gameState.foundPairs]);

  const checkForMatch = () => {
    const { cards, flippedCards, foundPairs } = gameState;
    const flippedCardIndices = flippedCards.map((card) => cards.indexOf(card));
    const pairsFound = flippedCardIndices.reduce((acc, curr, index, arr) => {
      if (
        index % 2 === 1 &&
        cards[curr].number === cards[arr[index - 1]].number
      ) {
        return [...acc, curr, arr[index - 1]];
      }
      return acc;
    }, []);

    setGameState((prevState) => ({
      ...prevState,
      foundPairs: [...prevState.foundPairs, ...pairsFound],
      flippedCards: prevState.flippedCards.filter(
        (card) => !pairsFound.includes(cards.indexOf(card))
      ),
    }));

    if (flippedCards.length > 2) {
      setTimeout(() => {
        setGameState((prevState) => ({ ...prevState, flippedCards: [] }));
      }, 1000);
    }
  };

  const handleCardClick = (index) => {
    const { flippedCards, foundPairs, cards } = gameState;
    if (!flippedCards.includes(cards[index]) && !foundPairs.includes(index)) {
      setGameState((prevState) => ({
        ...prevState,
        flippedCards: [...prevState.flippedCards, cards[index]],
      }));
      if (flippedCards.length === 1) {
        checkForMatch();
      }
    }
  };

  const generateNewNumbers = () => {
    const newNumbers = shuffleArray([...initialNumbers, ...initialNumbers]);
    setGameState((prevState) => ({
      ...prevState,
      cards: newNumbers.map((number) => ({ number, visible: false })),
    }));
  };

  const { cards, moves, foundPairs } = gameState;

  return (
    <div className='memory-game'>
      <h1>Endless Casino Memory Game</h1>
      <p>Moves: {moves}</p>
      <div className='card-grid'>
        {cards.map((card, index) => (
          <Card
            key={index}
            number={card.number}
            visible={
              gameState.flippedCards.includes(card) ||
              foundPairs.includes(index)
            }
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default EndlessMemoryGame;
