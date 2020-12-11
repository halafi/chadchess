import React from 'react';

type Props = {
  size: number;
  variant: 'black' | 'white';
};

const Rook = ({ size, variant }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width={size} height="100%">
    <g
      fill={variant === 'white' ? '#fff' : undefined}
      fillRule="evenodd"
      stroke="#000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {variant === 'black' ? (
        <>
          <path
            d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z"
            strokeLinecap="butt"
          />
          <path d="M14 29.5v-13h17v13H14z" strokeLinecap="butt" strokeLinejoin="miter" />
          <path
            d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"
            strokeLinecap="butt"
          />
          <path
            d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23"
            fill="none"
            stroke="#fff"
            strokeWidth={1}
            strokeLinejoin="miter"
          />
        </>
      ) : (
        <>
          <path
            d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"
            strokeLinecap="butt"
          />
          <path d="M34 14l-3 3H14l-3-3" />
          <path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter" />
          <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
          <path d="M11 14h23" fill="none" strokeLinejoin="miter" />
        </>
      )}
    </g>
  </svg>
);

export default Rook;
