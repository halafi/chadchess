/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Chess from 'chess.js';
import clsx from 'clsx';

import Bishop from './pieces/Bishop';
import King from './pieces/King';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';

import './Game.css';
import useWindowSize from '../hooks/useWindowSize';

const breakpoint = 768;

interface Square {
  type: 'r' | 'n' | 'b' | 'k' | 'q' | 'p';
  color: 'b' | 'w';
}

type TileNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const squareToPiece = (square: Square | null, possibleMove: boolean, size: number) => {
  if (square) {
    const color = square.color === 'b' ? 'black' : 'white';
    const mapping = {
      p: <Pawn variant={color} size={size} />,
      n: <Knight variant={color} size={size} />,
      b: <Bishop variant={color} size={size} />,
      r: <Rook variant={color} size={size} />,
      q: <Queen variant={color} size={size} />,
      k: <King variant={color} size={size} />,
    };

    return mapping[square.type];
  }
  // if (possibleMove) {
  //   return <Move size={size} />;
  // }
  // placeholder
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width={size} height="100%" />;
};

const getSquare = (x: TileNumber, y: number): string => {
  const mapping = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h' };
  return `${mapping[x]}${8 - y}`;
};

const squareInMoves = (moves: string[], square: string): boolean => {
  const move = moves.find((m) => m.includes(square));
  return !!move;
};

const moveHistoryRef = React.createRef<HTMLDivElement>();

const Game = () => {
  // @ts-ignore
  const [chess] = useState(new Chess());

  const [activeSquare, setActiveSquare] = useState<string | null>(null);
  // force update hack
  const [_, updateState] = React.useState<any>();
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
  const { height, width } = useWindowSize();

  let tileSize = 0;
  if (height < width) {
    if (height < breakpoint) {
      tileSize = (height - 77) / 8;
    } else {
      tileSize = (height - 33) / 8;
    }
  } else if (width < breakpoint) {
    tileSize = (width - 77) / 8;
  } else {
    tileSize = (width - 33) / 8;
  }

  const darkSquareText = 'text-yellow-600';
  const lightSquareText = 'text-yellow-100';
  const darkSquareBg = 'bg-yellow-600';
  const lightSquareBg = 'bg-yellow-100';

  const isSmallerThanBreakpoint = width < breakpoint || height < breakpoint;

  const getSquareColor = (x: number, y: number, text: boolean) => {
    if (text && isSmallerThanBreakpoint) return 'black';

    const odd = x % 2;
    if (y % 2) {
      if (text) {
        return odd ? lightSquareText : darkSquareText;
      }
      return odd ? lightSquareBg : darkSquareBg;
    }
    if (text) {
      return odd ? darkSquareText : lightSquareText;
    }
    return odd ? darkSquareBg : lightSquareBg;
  };

  const labelDistance = isSmallerThanBreakpoint ? '-1.5rem' : '0.25rem';

  return (
    <div className="grid grid-cols-1 grid-rows-game-layout" style={{ maxWidth: 8 * tileSize }}>
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
      <div className="flex flex-col relative">
        {/* TODO: memoize */}
        <div
          className="absolute flex flex-col-reverse top-1 h-full z-10 w-3 text-xs md:text-sm select-none md:font-bold"
          style={{ right: labelDistance }}
        >
          {Array.from({ length: 8 }, (__, i) => i + 1).map((column) => (
            <div key={column} className={`flex flex-auto ${getSquareColor(8, column, true)}`}>
              {column}
            </div>
          ))}
        </div>
        <div
          className="absolute flex left-0 w-full z-10 h-4 text-left text-xs md:text-sm select-none md:font-bold"
          style={{ bottom: labelDistance }}
        >
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file, i) => (
            <div key={file} className={`flex flex-auto pl-1 ${getSquareColor(i, 8, true)}`}>
              {file}
            </div>
          ))}
        </div>
        {board.map((row: Square[], y: number) => (
          <div key={y} className="flex">
            {row.map((square, x) => {
              const sq: string = getSquare(x as TileNumber, y);
              const isMove: boolean = squareInMoves(moves, sq);
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  key={`${y}-${x}`}
                  className={`flex justify-center outline-none relative ${getSquareColor(
                    x,
                    y,
                    false,
                  )}`}
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
