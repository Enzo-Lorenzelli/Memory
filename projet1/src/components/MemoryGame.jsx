import React, { useState, useEffect } from 'react';
import '../Styles/MemoryGame.css';
import Card from './Card';
import { initialNumbers } from './data';
import { shuffleArray } from './utils';
import { checkForMatch } from './Card';

const INITIAL_GAME_STATE = {
  cards: [],
  flippedCards: [],
  foundPairs: [],
  moves: 0,
};

const TIMEOUT_DELAY = 1000;

function MemoryGame() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [firstCard, secondCard] = gameState.flippedCards;

      if (
        gameState.cards[firstCard].number !== gameState.cards[secondCard].number
      ) {
        setTimeout(() => {
          setGameState((prevState) => ({
            ...prevState,
            flippedCards: [],
            cards: prevState.cards.map((card, index) =>
              index === firstCard || index === secondCard
                ? { ...card, visible: false }
                : card
            ),
          }));
        }, TIMEOUT_DELAY);
      }
    }
  }, [gameState.flippedCards]);

  const shuffleCards = () => {
    const shuffledCards = shuffleArray([...initialNumbers, ...initialNumbers]);
    setGameState((prevState) => ({
      ...prevState,
      cards: shuffledCards.map((number) => ({
        number,
        visible: false,
        pairFound: false,
      })),
    }));
    console.log('Cards shuffled');
  };

  const handleCardClick = (index) => {
    const { cards, flippedCards, moves } = gameState;

    if (
      flippedCards.length < 2 &&
      !cards[index].visible &&
      !cards[index].pairFound
    ) {
      console.log('Clicked card index:', index);

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
      const updatedGameStateAfterMatch = checkForMatch(updatedGameState);

      setGameState(updatedGameStateAfterMatch);

      if (updatedGameStateAfterMatch.flippedCards.length === 2) {
        setTimeout(() => {
          if (
            updatedGameStateAfterMatch.foundPairs.length ===
            gameState.foundPairs.length
          ) {
            // Aucune paire n'a été trouvée, réinitialiser les cartes retournées
            console.log('No pair found. Resetting flipped cards.');
            setGameState((prevState) => ({
              ...prevState,
              flippedCards: [],
              cards: prevState.cards.map((card) => ({
                ...card,
                visible: false,
              })),
            }));
          }
        }, TIMEOUT_DELAY);
      }
    }
  };

  const { cards, moves, foundPairs } = gameState;
  const totalPairs = initialNumbers.length;
  const victoryMessage =
    foundPairs.length === totalPairs ? "You've won! Congratulations!" : '';

  return (
    <div className='memory-game'>
      <h1>Casino Memory Game</h1>
      <p>Moves: {moves}</p>
      <p>
        Pairs found: {foundPairs.length} / {totalPairs}
      </p>
      <p>{victoryMessage}</p>
      <div className='card-grid'>
        {cards.map((card, index) => (
          <Card
            key={index}
            number={card.number}
            visible={card.visible || card.pairFound}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
