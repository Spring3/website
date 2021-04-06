import React from 'react';
import styled from 'styled-components';
import DownloadOutlineIcon from 'mdi-react/DownloadOutlineIcon';
import { Reference } from '../Reference';

const StyledDownloadButton = styled(Reference)`
  vertical-align: middle;
  text-decoration: none;
  background: var(--marker-green) !important;
  padding: 7px !important;
  border-radius: 3px !important;

  &:hover {
    border-radius: 3px;
    opacity: 0.8;
  }

  & > svg {
    vertical-align: middle;
  }

  @media (max-width: 750px) {
    text-align: center;
  }
`;

const ButtonDownload = ({ href, value }) => (
  <StyledDownloadButton role="button" download="CV_dvasylenko.pdf" href={href}>
    <DownloadOutlineIcon /> {value}
  </StyledDownloadButton>
);

export { ButtonDownload };
