import styled from 'styled-components';

const paddingStyles = `
  padding-left: 6%;
  padding-right: 6%;

  padding: 2.5rem 6% 3.5rem 6%;

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
    padding-left: 6%;
    padding-right: 6%;
  }

  @media (max-width: 750px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const PageWrapper = styled.main`
  ${paddingStyles}
  padding: 2.5rem 6% 3.5rem 6%;

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
    padding-top: 0rem;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 750px) {
    padding-top: 0rem;
    padding-bottom: 1.5rem;
  }
`;

export { PageWrapper, paddingStyles };
