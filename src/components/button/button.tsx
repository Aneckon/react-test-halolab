import React, { FC } from 'react';

import './button.css';

interface Button {
  click?(): void;
  children: string;
  className: string;
}

export const Button: FC<Button> = ({ click, children, className }) => {
  return (
    <button className={className} onClick={click}>
      {children}
    </button>
  );
};
