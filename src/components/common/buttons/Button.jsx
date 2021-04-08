import React from 'react';
import { css, cx } from '@emotion/css';
import { genericStyles } from '../Reference';
import { useTheme } from '@emotion/react';

const styles = css`
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
  const theme = useTheme();
  const providedTheme = rest.theme || theme;
  return (
    <button
      className={cx(genericStyles(providedTheme), styles, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };
