import { useState, useEffect } from 'react';
import { Card as CardComponent } from './components/Card';
import GameControls from './components/GameControls';
import type { GameState } from './types.ts';
import { createDeck, calculateHandValue } from './gameLogic.ts';

function App() {
  const initialState: GameState = {
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameStatus: 'betting',
    chips: 1000,
    currentBet: 0,
    canDouble: false,
  };

  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    setGameState((prev) => ({ ...prev, deck: createDeck() }));
  }, []);

  const dealInitialCards = () => {
    const newDeck = [...gameState.deck];
    const playerCards = [newDeck.pop()!, newDeck.pop()!];
    const dealerCards = [newDeck.pop()!, { ...newDeck.pop()!, hidden: true }];

    setGameState((prev) => ({
      ...prev,
      deck: newDeck,
      playerHand: playerCards,
      dealerHand: dealerCards,
      playerScore: calculateHandValue(playerCards),
      dealerScore: calculateHandValue([dealerCards[0]]),
      gameStatus: 'playing',
      canDouble: true,
    }));
  };

  const hit = () => {
    const newDeck = [...gameState.deck];
    const newCard = newDeck.pop()!;
    const newHand = [...gameState.playerHand, newCard];
    const newScore = calculateHandValue(newHand);

    setGameState((prev) => ({
      ...prev,
      deck: newDeck,
      playerHand: newHand,
      playerScore: newScore,
      canDouble: false,
      gameStatus: newScore > 21 ? 'playerBust' : 'playing',
    }));
  };

  const getGameResult = (
    dealerScore: number,
    playerScore: number
  ): GameState['gameStatus'] => {
    if (dealerScore > 21) return 'dealerBust';
    if (dealerScore < playerScore) return 'playerWin';
    if (dealerScore === playerScore) return 'push';
    return 'dealerWin';
  };

  const calculateWinnings = (
    gameStatus: GameState['gameStatus'],
    currentBet: number
  ): number => {
    if (gameStatus === 'playerWin') return currentBet * 2;
    if (gameStatus === 'push') return currentBet;
    return 0;
  };

  const dealerPlay = () => {
    let newDeck = [...gameState.deck];
    let newDealerHand = gameState.dealerHand.map((card) => ({
      ...card,
      hidden: false,
    }));
    let dealerScore = calculateHandValue(newDealerHand);

    while (dealerScore < 17) {
      const newCard = newDeck.pop()!;
      newDealerHand = [...newDealerHand, newCard];
      dealerScore = calculateHandValue(newDealerHand);
    }

    const playerScore = calculateHandValue(gameState.playerHand);
    const gameStatus = getGameResult(dealerScore, playerScore);
    const winnings = calculateWinnings(gameStatus, gameState.currentBet);

    setGameState((prev) => ({
      ...prev,
      deck: newDeck,
      dealerHand: newDealerHand,
      dealerScore,
      gameStatus,
      chips: prev.chips + winnings,
    }));
  };

  const stand = () => {
    dealerPlay();
  };

  const double = () => {
    if (!gameState.canDouble) return;

    setGameState((prev) => ({
      ...prev,
      chips: prev.chips - prev.currentBet,
      currentBet: prev.currentBet * 2,
    }));

    hit();
    if (gameState.gameStatus === 'playing') {
      dealerPlay();
    }
  };

  const placeBet = (amount: number) => {
    if (gameState.chips < amount) return;

    setGameState((prev) => ({
      ...prev,
      chips: prev.chips - amount,
      currentBet: prev.currentBet + amount,
    }));
  };

  const startNewGame = () => {
    setGameState((prev) => ({
      ...initialState,
      deck: createDeck(),
      chips: prev.chips,
    }));
  };

  const getGameStatusMessage = (status: GameState['gameStatus']): string => {
    const messages = {
      playerBust: 'Bust! You lose!',
      dealerBust: 'Dealer busts! You win!',
      playerWin: 'You win!',
      dealerWin: 'Dealer wins!',
      push: 'Push!',
      betting: '',
      playing: '',
    };
    return messages[status];
  };

  const isGameOver = [
    'playerBust',
    'dealerBust',
    'playerWin',
    'dealerWin',
    'push',
  ].includes(gameState.gameStatus);

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-8">
      <div className="bg-green-900 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Blackjack</h1>
          <p className="text-green-300">
            Chips: ${gameState.chips} | Current Bet: ${gameState.currentBet}
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Dealer's Hand ({gameState.dealerScore})
            </h2>
            <div className="flex justify-center gap-4">
              {gameState.dealerHand.map((card, i) => (
                <CardComponent
                  key={`dealer-${i}-${card.suit}-${card.rank}`}
                  card={card}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Your Hand ({gameState.playerScore})
            </h2>
            <div className="flex justify-center gap-4">
              {gameState.playerHand.map((card, i) => (
                <CardComponent
                  key={`player-${i}-${card.suit}-${card.rank}`}
                  card={card}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          {isGameOver ? (
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-4">
                {getGameStatusMessage(gameState.gameStatus)}
              </p>
              <button
                onClick={startNewGame}
                className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
              >
                New Game
              </button>
            </div>
          ) : (
            <GameControls
              onHit={hit}
              onStand={stand}
              onDouble={double}
              onDeal={dealInitialCards}
              gameStatus={gameState.gameStatus}
              canDouble={gameState.canDouble}
              currentBet={gameState.currentBet}
              onPlaceBet={placeBet}
              chips={gameState.chips}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
