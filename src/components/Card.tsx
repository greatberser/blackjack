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
      : 'text-gray-800';
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
        className={`w-24 h-36 bg-blue-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-white ${className}`}
      >
        <div className="w-16 h-24 rounded bg-blue-700 flex items-center justify-center">
          <span className="text-2xl text-blue-500">♠♣♥♦</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-24 h-36 bg-white rounded-lg shadow-lg flex flex-col p-2 border-2 border-gray-200 ${className}`}
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
