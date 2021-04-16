import React from 'react';
import { css } from '@emotion/react';
import DownloadOutlineIcon from 'mdi-react/DownloadOutlineIcon';
import { Reference } from '../Reference';

const styles = {
  anchor: css`
    vertical-align: middle;
    text-decoration: none;
    background: var(--marker-green) !important;
    padding: 7px !important;
    border-radius: 3px !important;

    &:hover {
      border-radius: 3px;
      opacity: 0.8;
    }

    &:focus {
      filter: brightness(0.9);
    }

    @media (max-width: 750px) {
      text-align: center;
    }
  `,
  icon: css`
    vertical-align: middle;
  `,
};

const ButtonDownload = ({ href, value }) => (
  <Reference
    css={styles.anchor}
    role="button"
    download="CV_dvasylenko.pdf"
    href={href}
  >
    <DownloadOutlineIcon css={styles.icon} /> {value}
  </Reference>
);

export { ButtonDownload };
