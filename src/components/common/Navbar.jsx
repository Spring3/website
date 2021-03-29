import styled from 'styled-components';
import { Flex } from './Flex';

const Navbar = styled(Flex)`
  position: sticky;
  top: 0;
  height: 2.5rem;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  @media (min-width: 750px) {
    top: .75rem;
    padding: 1rem 1.5rem 1rem 0rem;

    a {
      padding: 0;
      svg {
        vertical-align: bottom;
      }
    }
  }

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
    (max-width: 750px) {
    top: 0px;
    padding-top: 1.75rem;
    padding-bottom: 1rem;
    padding-right: 3rem;
    left: 0;

    a {
      display: block;
      margin: 0;
      padding: 0;
      svg {
        vertical-align: bottom;
      }

      &:hover {
        box-shadow: none !important;
      }
    }
  }

  @media (max-width: 750px) {
    #navbar-contents {
      display: none;
    }
    padding-top: 1.75rem;
    padding-bottom: 1rem;
    padding-right: 3rem;

    a {
      padding: 0;
    }
  }
`;

export {
  Navbar
};
