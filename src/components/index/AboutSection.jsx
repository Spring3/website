import React, { useRef } from 'react';
import styled from 'styled-components';
import { animated, useChain, useSpring } from 'react-spring';

import { Header } from '../common/Headers';
import { SocialButtons } from '../common/SocialButtons';
import { Flex } from '../common/Flex';
import { Square, Decorations } from '../common/Decorations';
import { Flickering } from '../common/Animated';
import { reveal } from '../../animations';

const HugeHeader = styled(Header)`
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
`;

const ContentPanel = styled(Flex)`
  box-sizing: border-box;
  text-align: justify;
  color: var(--text-color-primary);
  border-radius: var(--border-radius);
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 750px) {
    width: 800px;
  }

  div {
    line-height: 1.7;
  }
`;

const AboutSection = ({ children }) => {
  const headerAnimationRef = useRef();
  const bodyAnimationRef = useRef();

  const headerAnimation = useSpring(reveal({ ref: headerAnimationRef }));
  const springAnimation = useSpring(reveal({ ref: bodyAnimationRef }));

  useChain([headerAnimationRef, bodyAnimationRef], [0.5, 1]);

  return (
    <ContentPanel direction="column" justifyContent="center">
      <Decorations layer="back">
        <Flickering duration={1}>
          <Square top="1.7rem" left="6.5rem" background="#FBD3C4" size="53px" />
        </Flickering>
        <Flickering duration={2}>
          <Square top="1rem" left="1rem" background="#BED5AE" size="75px" />
        </Flickering>
        <Flickering duration={1.5}>
          <Square
            top="6.5rem"
            left="1.25rem"
            background="#FBBC58"
            size="65px"
          />
        </Flickering>
        <Flickering duration={2}>
          <Square bottom="1rem" right="1rem" background="#F57B51" size="65px" />
        </Flickering>
        <Flickering duration={1.5}>
          <Square
            bottom="calc(65px + 2rem)"
            right="1.4rem"
            background="#BED5AE"
            size="55px"
          />
        </Flickering>
        <Flickering duration={1}>
          <Square
            bottom="1rem"
            right="calc(65px + 2rem)"
            background="#FBD3C4"
            size="60px"
          />
        </Flickering>
        <Flickering duration={2}>
          <Square
            bottom="1rem"
            right="calc(65px + 60px + 3rem)"
            background="#FBBC58"
            size="50px"
          />
        </Flickering>
      </Decorations>
      <animated.div style={headerAnimation}>
        <HugeHeader>Hello and Welcome!</HugeHeader>
      </animated.div>
      <animated.div style={springAnimation}>
        {children}
        <SocialButtons />
      </animated.div>
    </ContentPanel>
  );
};

export { AboutSection };
