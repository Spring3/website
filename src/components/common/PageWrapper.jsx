import styled from 'styled-components';

const PageWrapper = styled.main`
  padding: 2.5rem 6% 3.5rem 6%;

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
    padding: 0rem 6% 1.5rem 6%;
  }

  @media (max-width: 750px) {
    padding: 0rem 1.5rem 1.5rem 1.5rem;
  }
`;

export { PageWrapper };
