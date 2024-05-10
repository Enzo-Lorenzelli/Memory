export const initialNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
export function checkForMatch(gameState) {
  console.log('Checking for match with gameState:', gameState);

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
