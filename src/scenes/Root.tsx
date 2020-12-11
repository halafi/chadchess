import * as React from 'react';
import useResizeAware from 'react-resize-aware';
import Game from '../components/Game';

// import './Root.css';

const defaultLineup = [
  'R@a1',
  'P@a2',
  'p@a7',
  'r@a8',
  'N@b1',
  'P@b2',
  'p@b7',
  'n@b8',
  'B@c1',
  'P@c2',
  'p@c7',
  'b@c8',
  'Q@d1',
  'P@d2',
  'p@d7',
  'q@d8',
  'K@e1',
  'P@e2',
  'p@e7',
  'k@e8',
  'B@f1',
  'P@f2',
  'p@f7',
  'b@f8',
  'N@g1',
  'P@g2',
  'p@g7',
  'n@g8',
  'R@h1',
  'P@h2',
  'p@h7',
  'r@h8',
];

const Root = () => {
  const [resizeListener, sizes] = useResizeAware();
  console.log(sizes);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>WIP</h1>
      {resizeListener}
      <Game />
    </div>
  );
};

export default Root;
