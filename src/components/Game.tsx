/* eslint-disable react/no-array-index-key */
import React from 'react';
import Chess from 'chess.js';

import Bishop from './pieces/Bishop';
import King from './pieces/King';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';

type Square = {
  type: 'r' | 'n' | 'b' | 'k' | 'q' | 'p';
  color: 'b' | 'w';
};

const SIZE = 46;

const lightSquareColor = 'bg-yellow-100';
const darkSquareColor = 'bg-yellow-600';

const getSquareColor = (x: number, y: number) => {
  // const { lightSquareColor, darkSquareColor } = this.props;
  const odd = x % 2;

  if (y % 2) {
    return odd ? lightSquareColor : darkSquareColor;
  }

  return odd ? darkSquareColor : lightSquareColor;
};

const squareToPiece = (square: Square | null) => {
  if (square) {
    const color = square.color === 'b' ? 'black' : 'white';
    if (square.type === 'p') {
      return <Pawn variant={color} size={SIZE} />;
    }
    if (square.type === 'n') {
      return <Knight variant={color} size={SIZE} />;
    }
    if (square.type === 'b') {
      return <Bishop variant={color} size={SIZE} />;
    }
    if (square.type === 'r') {
      return <Rook variant={color} size={SIZE} />;
    }
    if (square.type === 'q') {
      return <Queen variant={color} size={SIZE} />;
    }
    if (square.type === 'k') {
      return <King variant={color} size={SIZE} />;
    }
  }
  return '';
};

const Game = () => {
  // @ts-ignore
  const chess = new Chess();
  const board = chess.board();
  console.log(board);

  return (
    <div className="flex flex-col w-96 border-2 border-gray-900">
      {board.map((row: Square[], y: number) => (
        <div key={y} className="flex">
          {row.map((square, x) => (
            <div key={x} className={`w-full flex justify-center h-12 ${getSquareColor(x, y)}`}>
              {squareToPiece(square)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
