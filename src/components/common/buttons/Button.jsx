import React from 'react';
import { css } from '@emotion/react';
import { genericStyles } from '../Reference';

const styles = (theme) => css`
  ${genericStyles(theme)}
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:active {
    filter: brightness(0.9);
    box-shadow: none;
  }
`;

const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={className}
      css={(theme) => styles(rest.theme || theme)}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };
