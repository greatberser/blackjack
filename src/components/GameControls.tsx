import { Coins, HandMetal, RotateCw, Square } from 'lucide-react';

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  onDeal: () => void;
  gameStatus: string;
  canDouble: boolean;
  currentBet: number;
  chips: number;
  onPlaceBet: (amount: number) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  onHit,
  onStand,
  onDouble,
  onDeal,
  gameStatus,
  canDouble,
  currentBet,
  chips,
  onPlaceBet,
}) => {
  const betAmounts = [10, 50, 100];

  if (gameStatus === 'betting') {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-2">
          {betAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => onPlaceBet(amount)}
              disabled={chips < amount}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Coins size={16} />${amount}
            </button>
          ))}
        </div>
        <button
          onClick={onDeal}
          disabled={currentBet === 0}
          className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Deal Cards
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={onHit}
        disabled={gameStatus !== 'playing'}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HandMetal size={20} />
        Hit
      </button>
      <button
        onClick={onStand}
        disabled={gameStatus !== 'playing'}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Square size={20} />
        Stand
      </button>
      <button
        onClick={onDouble}
        disabled={!canDouble || gameStatus !== 'playing'}
        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RotateCw size={20} />
        Double
      </button>
    </div>
  );
};

export default GameControls;
