import React from 'react';
import { memo } from 'react';
import { cx, css } from '@emotion/css';
import { Flex } from './Flex';

const styles = css`
  position: sticky;
  top: 0;
  height: 2.5rem;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  pointer-events: none;

  & > * {
    pointer-events: all;
  }

  @media (min-width: 750px) {
    top: 0.75rem;
    padding: 1rem 1.5rem 1rem 0rem;
  }

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
    (max-width: 750px) {
    top: 0px;
    padding-top: 1.75rem;
    padding-bottom: 1rem;
    padding-right: 3rem;
    left: 0;
  }

  @media (max-width: 750px) {
    padding-top: 1.75rem;
    padding-bottom: 1rem;
    padding-right: 3rem;
  }
`;

const Navbar = memo(({ className, children, ...rest }) => {
  return (
    <Flex className={cx(styles, className)} {...rest}>
      {children}
    </Flex>
  );
});

Navbar.displayName = 'Navbar';

export { Navbar };
