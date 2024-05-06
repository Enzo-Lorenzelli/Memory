export const checkForMatch = (gameState, setGameState) => {
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

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
