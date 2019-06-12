import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Animated } from 'react-animated-css';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';

import SocialButtons from './SocialButtons';

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
    font-size: smaller;
  }
`;

const InlinedSocialButtons = styled(SocialButtons) `
  display: inline-block;
  margin: 0px;
`;

const verticalSlideAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }

  10% {
    transform: translateY(15px);
  }

  20% {
    transform: translateY(0px);
  }
`;

const ScrollDownSign = styled.div`
  text-align: center;
  position: absolute;
  bottom: 32px;
  left: 49%;
  svg {
    vertical-align: middle;
    animation: ${verticalSlideAnimation} ease-in 3s infinite;
    animation-delay: 4s;
  }
`;


export default ({ children }) => (
  <Animated animationIn="fadeIn" animationOut="fadeOut">
    <ContentPanel>
      <h1>Hello and Welcome!</h1>
      {children}
      <InlinedSocialButtons />
    </ContentPanel>
    
    <ScrollDownSign>
      <Animated animationIn="fadeInDown" animationOut="fadeOutUp" animationInDelay={2000}>
        <small>Scroll</small>
      </Animated>
      <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDelay={1000}>
        <ArrowDownIcon size={40} />
      </Animated>
    </ScrollDownSign>
  </Animated>
)
