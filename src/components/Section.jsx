import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  height: 100vh;
  padding: 1.5rem;
`;

export default ({ children }) => (
  <StyledSection>{children}</StyledSection>
);
