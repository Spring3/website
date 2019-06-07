import React from 'react';
import styled from 'styled-components';

const Aside = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  @media (min-width: 1000px) {
    width: 18rem;
  }
  @media (min-width: 750px) {
    width: 16.5rem;
  }
`;

export default ({ children }) => (
  <Aside>
    {children}
  </Aside>
);
