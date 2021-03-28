import styled from 'styled-components';

const DownloadFooter = styled.footer`
  position: fixed;
  bottom: 0px;
  display: none;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  flex-direction: column;
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--shadow-color);
  align-items: center;
  z-index: 1;
  a {
    svg {
      vertical-align: bottom;
    }
  }

  @media (max-width: 750px) {
    display: flex;
  }
`;

export { DownloadFooter };
