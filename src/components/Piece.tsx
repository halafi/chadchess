import React, { FC } from 'react';
import Bishop from './pieces/Bishop';
import King from './pieces/King';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';

interface IProps {
  type: 'r' | 'n' | 'b' | 'k' | 'q' | 'p';
  size: number;
  color: 'black' | 'white';
}

const Piece: FC<IProps> = ({ type, size, color }) => {
  let component = null;

  switch (type) {
    case 'p':
      component = <Pawn variant={color} size={size} />;
      break;
    case 'n':
      component = <Knight variant={color} size={size} />;
      break;
    case 'b':
      component = <Bishop variant={color} size={size} />;
      break;
    case 'r':
      component = <Rook variant={color} size={size} />;
      break;
    case 'q':
      component = <Queen variant={color} size={size} />;
      break;
    case 'k':
      component = <King variant={color} size={size} />;
      break;
    default:
      component = null;
  }

  return component;
};

export default Piece;
