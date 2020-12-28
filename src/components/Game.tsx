/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Chess from 'chess.js';
import clsx from 'clsx';
import useResizeAware from 'react-resize-aware';

import Bishop from './pieces/Bishop';
import King from './pieces/King';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';

import './Game.css';

type Square = {
  type: 'r' | 'n' | 'b' | 'k' | 'q' | 'p';
  color: 'b' | 'w';
};

const lightSquareColor = 'yellow-100';
const darkSquareColor = 'yellow-600';

const getSquareColor = (x: number, y: number, prefix: string = 'bg-') => {
  // const { lightSquareColor, darkSquareColor } = this.props;
  const odd = x % 2;
  if (y % 2) {
    return `${prefix}${odd ? lightSquareColor : darkSquareColor}`;
  }
  return `${prefix}${odd ? darkSquareColor : lightSquareColor}`;
};

const squareToPiece = (square: Square | null, possibleMove: boolean, size: number) => {
  if (square) {
    const color = square.color === 'b' ? 'black' : 'white';
    if (square.type === 'p') {
      return <Pawn variant={color} size={size} />;
    }
    if (square.type === 'n') {
      return <Knight variant={color} size={size} />;
    }
    if (square.type === 'b') {
      return <Bishop variant={color} size={size} />;
    }
    if (square.type === 'r') {
      return <Rook variant={color} size={size} />;
    }
    if (square.type === 'q') {
      return <Queen variant={color} size={size} />;
    }
    if (square.type === 'k') {
      return <King variant={color} size={size} />;
    }
  }
  // if (possibleMove) {
  //   return <Move size={size} />;
  // }
  // placeholder
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width={size} height="100%" />;
};

const getSquare = (x: number, y: number): string => {
  let letter = 'a';
  if (x === 1) letter = 'b';
  if (x === 2) letter = 'c';
  if (x === 3) letter = 'd';
  if (x === 4) letter = 'e';
  if (x === 5) letter = 'f';
  if (x === 6) letter = 'g';
  if (x === 7) letter = 'h';
  return `${letter}${8 - y}`;
};

const squareInMoves = (moves: string[], square: string): boolean => {
  const move = moves.find((m) => m.includes(square));
  if (move) return true;
  return false;
};

const MAX_WIDTH = 1128;
const MAX_HEIGHT = 1128;

const moveHistoryRef = React.createRef<HTMLDivElement>();

const Game = () => {
  // @ts-ignore
  const [chess, setChess] = useState(new Chess());
  const [resizeListener, sizes] = useResizeAware();

  const [activeSquare, setActiveSquare] = useState<string | null>(null);
  // force update hack
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const board = chess.board();
  const moves = chess.moves({ square: activeSquare });

  const makeMove = (to: string) => {
    chess.move({ from: activeSquare, to });
    forceUpdate();
    setTimeout(() => {
      if (moveHistoryRef && moveHistoryRef.current) {
        moveHistoryRef.current.scrollLeft += 1000;
      }
    }, 50);
  };

  const history = chess.history({ verbose: true });

  if (!sizes || !sizes.width || !sizes.height) return <div>{resizeListener}</div>;

  let tileSize = sizes.height / 8;
  if (sizes.height > sizes.width) {
    if (sizes.width >= MAX_WIDTH) {
      tileSize = MAX_WIDTH / 8;
    } else {
      tileSize = sizes.width / 8;
    }
  } else if (sizes.width >= MAX_WIDTH) {
    tileSize = MAX_WIDTH / 8;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-game-layout">
      <div
        className="whitespace-nowrap shadow-inner min-h-6 bg-gray-200 px-2 overflow-x-auto no-scrollbar"
        ref={moveHistoryRef}
      >
        {history.map((move: any, i: number) => (
          <span
            key={i}
            className={clsx('inline-block px-1 font-bold', {
              'bg-gray-300': i === history.length - 1,
              'text-gray-400': i < history.length - 1,
              'text-gray-800': i === history.length - 1,
            })}
          >
            {i % 2 === 0 && <span className="font-normal">{Math.floor(i / 2) + 1}. </span>}
            {move.san}
          </span>
        ))}
      </div>
      {resizeListener}
      <div className="flex flex-col board-shadow relative">
        {/* TODO: memoize */}
        <div className="absolute flex flex-col-reverse top-1 right-0 h-full z-10 w-3 text-xs md:text-sm select-none md:font-bold">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((column) => (
            <div key={column} className={`flex flex-auto ${getSquareColor(8, column, 'text-')}`}>
              {column}
            </div>
          ))}
        </div>
        <div className="absolute flex bottom-1 left-0 w-full z-10 h-4 text-left text-xs md:text-sm select-none md:font-bold">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file, i) => (
            <div key={file} className={`flex flex-auto pl-1 ${getSquareColor(i, 8, 'text-')}`}>
              {file}
            </div>
          ))}
        </div>
        {board.map((row: Square[], y: number) => (
          <div key={y} className="flex">
            {row.map((square, x) => {
              const sq: string = getSquare(x, y);
              const isMove: boolean = squareInMoves(moves, sq);
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  key={`${y}-${x}`}
                  className={`flex justify-center outline-none relative ${getSquareColor(x, y)}`}
                  onClick={() => (!isMove ? setActiveSquare(sq) : makeMove(sq))}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={clsx('absolute top-0 left-0 w-full h-full', {
                      'move-dest': isMove && !square,
                      'move-take': isMove && square,
                    })}
                  />
                  {squareToPiece(square, isMove, tileSize as number)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

Game.defaultProps = {
  tileSize: 46,
};

export default Game;
