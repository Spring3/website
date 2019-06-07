import React from 'react';
import styled from 'styled-components';

const Content = styled.main`
  @media (min-width: 1000px) {
    padding-left: 18rem;
  }

  @media (min-width: 750px) {
    padding-left: 16.5rem;
  }
`;

const PaddedFlexBox = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default ({ children }) => (
  <Content>
    <PaddedFlexBox>
      {children}
    </PaddedFlexBox>
  </Content>
);
