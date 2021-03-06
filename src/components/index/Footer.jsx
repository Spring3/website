import React from 'react';
import { css } from '@emotion/react';
import { Flex } from '../common/Flex';
import { MARKERS } from '../../theme';
import { Reference } from '../common/Reference';
import { useTheme } from '@emotion/react';

const styles = {
  footer: css`
    margin-top: 2rem;
    grid-column: 1 / -1;
  `,
  url: (theme) => css`
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-radius: 0px;
    background: ${theme?.marker || MARKERS.blue} !important;
  `,
};

const Footer = () => {
  const onClick = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  };

  const theme = useTheme();

  return (
    <Flex css={styles.footer} justifyContent="center" alignItems="center">
      <Reference
        css={styles.url(theme)}
        role="button"
        bold
        href="#"
        onClick={onClick}
      >
        Yaay, you&apos;ve reached the bottom! I can help you get back up.
      </Reference>
    </Flex>
  );
};

export { Footer };
