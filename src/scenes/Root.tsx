import * as React from 'react';
import Game from '../components/Game';

const Root = () => {
  return (
    <div className="h-screen flex flex-col justify-center md:items-center">
      <Game />
    </div>
  );
};

export default Root;
