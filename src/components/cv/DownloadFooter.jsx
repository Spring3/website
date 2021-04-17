import React from 'react';
import { css } from '@emotion/react';

const styles = css`
  position: fixed;
  bottom: 0px;
  display: none;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  flex-direction: column;
  background: var(--background-color);
  align-items: center;
  z-index: 1;

  @media (max-width: 750px) {
    display: flex;
  }
`;

const DownloadFooter = ({ className, children }) => {
  return (
    <footer className={className} css={styles}>
      {children}
    </footer>
  );
};

export { DownloadFooter };
