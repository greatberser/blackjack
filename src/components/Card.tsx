import React from 'react';
import { Card as CardType } from '../types.ts';

interface CardProps {
  card: CardType;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ card, className = '' }) => {
  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds'
      ? 'text-red-500'
      : 'text-black-800';
  };

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts':
        return '♥';
      case 'diamonds':
        return '♦';
      case 'clubs':
        return '♣';
      case 'spades':
        return '♠';
      default:
        return '';
    }
  };

  if (card.hidden) {
    return (
      <div
        className={`w-24 h-36 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg border-2 border-white/20 transform transition-transform hover:scale-105 ${className}`}
      >
        <div className="w-full h-full rounded-lg bg-pattern flex items-center justify-center p-3">
          <div className="w-full h-full rounded-lg border-2 border-white/10 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-white/20 text-xl">
                  {['♠', '♣', '♥', '♦'][i]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-24 h-36 bg-white rounded-xl shadow-lg flex flex-col p-3 border border-gray-200 transform transition-transform hover:scale-105 ${className}`}
    >
      <div className="flex justify-between items-center">
        <span className={`text-xl font-bold ${getSuitColor(card.suit)}`}>
          {card.rank}
        </span>
        <span className={`text-xl ${getSuitColor(card.suit)}`}>
          {getSuitSymbol(card.suit)}
        </span>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <span className={`text-4xl ${getSuitColor(card.suit)}`}>
          {getSuitSymbol(card.suit)}
        </span>
      </div>
      <div className="flex justify-between items-center transform rotate-180">
        <span className={`text-xl font-bold ${getSuitColor(card.suit)}`}>
          {card.rank}
        </span>
        <span className={`text-xl ${getSuitColor(card.suit)}`}>
          {getSuitSymbol(card.suit)}
        </span>
      </div>
    </div>
  );
};
