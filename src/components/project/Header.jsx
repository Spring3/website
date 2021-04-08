import React from 'react';
import { cx, css } from '@emotion/css';
import { useTheme } from '@emotion/react';

const styles = {
  header: (marker) => css`
    @media (min-width: 750px) {
      font-size: 2.5rem;
    }

    display: inline-block;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 60%,
      ${marker} 60%,
      ${marker} 100%
    );
  `,
  subheading: css`
    @media (min-width: 750px) {
      font-size: 2rem;
    }
  `,
};

const Header = ({ className, children, marker }) => {
  const theme = useTheme();
  return (
    <h1 className={cx(styles.header(marker || theme.marker), className)}>
      {children}
    </h1>
  );
};

const Subheading = ({ className, children, marker }) => {
  const theme = useTheme();
  return (
    <h2
      className={cx(
        styles.header(marker || theme.marker),
        styles.subheading,
        className
      )}
    >
      {children}
    </h2>
  );
};

export { Header, Subheading };
