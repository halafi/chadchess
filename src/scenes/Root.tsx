import * as React from 'react';
import useResizeAware from 'react-resize-aware';
import Game from '../components/Game';

const Root = () => {
  const [resizeListener, sizes] = useResizeAware();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {resizeListener}
      {sizes && sizes.width && sizes.height && (
        <Game
          tileSize={sizes.width > sizes.height ? (sizes.height - 20) / 8 : (sizes.width - 20) / 8}
        />
      )}
    </div>
  );
};

export default Root;
