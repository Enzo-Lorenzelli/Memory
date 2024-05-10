export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function checkForMatch(gameState) {
  const { cards, flippedCards } = gameState;
  const flippedCardIndices = flippedCards.map((card) => cards.indexOf(card));
  const pairsFound = flippedCardIndices.reduce((acc, curr, index, arr) => {
    if (
      index % 2 === 1 &&
      cards[curr] &&
      cards[arr[index - 1]] &&
      cards[curr].number === cards[arr[index - 1]].number
    ) {
      return [...acc, curr, arr[index - 1]];
    }
    return acc;
  }, []);

  // Update pairFound state of cards and foundPairs
  const updatedCards = cards.map((card, index) => {
    if (pairsFound.includes(index)) {
      return { ...card, pairFound: true };
    }
    return card;
  });

  // Return the updated state 
  return {
    ...gameState,
    foundPairs: [...gameState.foundPairs, ...pairsFound],
    flippedCards: [], // Reset flippedCards
    cards: updatedCards,
  };
}

export const initialNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
