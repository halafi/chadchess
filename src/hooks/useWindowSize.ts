import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({ height: window.innerHeight, width: window.innerWidth });
  useEffect(() => {
    const handleResize = () => {
      setSize({ height: window.innerHeight, width: window.innerWidth });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return size;
};

export default useWindowSize;
