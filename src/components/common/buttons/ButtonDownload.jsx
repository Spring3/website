import React from 'react';
import styled from 'styled-components';
import DownloadOutlineIcon from 'mdi-react/DownloadOutlineIcon';
import { FlatButton } from './FlatButton';

const StyledDownloadButton = styled(FlatButton)`
  vertical-align: middle;
  text-decoration: none;
  background: var(--marker-green) !important;
  padding: 7px !important;
  border-radius: 3px;

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
  <StyledDownloadButton role="button" id="download-button" href={href}>
    <DownloadOutlineIcon /> {value}
  </StyledDownloadButton>
);

export { ButtonDownload };
