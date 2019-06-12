import React from 'react';
import styled from 'styled-components';

import SocialButtons from './SocialButtons';

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentPanel = styled.div`
  font-size: 26px;
  box-sizing: border-box;
  text-align: justify;
  max-width: 35em;
  padding: 2rem;
  color: var(--text-color-primary);
  border-radius: 5px;

  div {
    em {
      font-style: normal;
      font-weight: bold;
      background: var(--marker-primary);
    }

    strong {
      background: var(--marker-secondary);
    }
  }

  span, p:last-child {
    color: var(--text-color-secondary);
  }
`;

const InlinedSocialButtons = styled(SocialButtons) `
  display: inline-block;
  margin: 0px;
`

export default ({ children }) => (
  <Section>
    <ContentPanel>
      <h1>Hello and Welcome!</h1>
      {children}
      <span>Reach out to me here: </span><InlinedSocialButtons />
    </ContentPanel>
  </Section>
)
