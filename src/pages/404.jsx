import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { useSpring } from 'react-spring';
import { useWindowSize } from 'react-use';
import { GlobalStyles, OGP } from '../components/GlobalStyle';
import { randomFlicker, randomShift } from '../animations';
import {
  Rectangle,
  Circle,
  Decorations,
} from '../components/common/Decorations';
import { Flex } from '../components/common/Flex';
import { Link } from '../components/common/Reference';
import { Subheading } from '../components/project/Header';
import { getRandomIndex } from '../utils';

const RelativeDecorations = styled(Decorations)`
  position: relative !important;
  height: ${(props) => props.height} !important;
  width: ${(props) => props.width} !important;
`;

const OverflowDecorations = styled(Decorations)`
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
`;

const FullHeightFlex = styled(Flex)`
  height: 100vh;
  max-height: 100%;
`;

const LinkWithLargerText = styled(Link)`
  font-size: 1.2rem;
`;

const MessageSection = styled(Flex)`
  z-index: 3;
`;

const colorThemes = [
  ['#9DB09C', '#EEF0F0', '#D6D9D0', '#B7BDB0'],
  ['#FCC4C9', '#FDF6F0', '#F8E2CF', '#F5C6AA'],
  ['#E3BCBC', '#F4F4F4', '#E0E0E0', '#C4C6C8'],
  ['#E75A5F', '#FAFADC', '#FEE698', '#FDB15D'],
  ['#415A80', '#A5D4DC', '#F2F4F8', '#D7E2E9'],
  ['#A9A9C4', '#D0D1E1', '#EBECEF', '#908DB9'],
  ['#5F6874', '#C2C2CC', '#F5F3EB', '#ECDEB0'],
];

const ColorThemedRectangle = memo(({ colorTheme, ...rest }) => {
  const [seed, setSeed] = useState(0);
  const [color, setColor] = useState();

  const animation = useSpring(randomFlicker(seed, seed));

  useEffect(() => {
    const getRandomColor = () => {
      const index = getRandomIndex(colorTheme.length);
      return colorTheme[index];
    };

    setColor(getRandomColor());
    setSeed(getRandomIndex(colorThemes.length) + 1);
  }, [colorTheme]);

  if (!seed) {
    return null;
  }

  return <Rectangle style={animation} {...rest} background={color} />;
});

const NotFoundPage = () => {
  const [colorTheme, setColorTheme] = useState([]);
  const { width: windowWidth } = useWindowSize();

  const firstCircleAnimation = useSpring(
    randomShift({ left: '40%', top: '15%' }, 10000)
  );
  const secondCircleAnimation = useSpring(
    randomShift({ left: '95%', top: '95%' }, 16700)
  );
  const thirdCircleAnimation = useSpring(
    randomShift({ left: '10%', top: '15%' }, 14700)
  );

  useEffect(() => {
    const theme = colorThemes[getRandomIndex(colorThemes.length)];
    setColorTheme(theme);
  }, []);

  let radius = 3;
  let size = 15;
  const gap = 5;

  if (windowWidth <= 750) {
    radius = 3;
    size = 15;
  } else if (windowWidth <= 1024) {
    radius = 5;
    size = 20;
  } else {
    radius = 5;
    size = 25;
  }

  const width = (size + gap) * 4;
  const height = (size + gap) * 7;

  const radiusPx = `${radius}px`;
  const sizePx = `${size}px`;

  return (
    <>
      <GlobalStyles />
      <OGP
        title="404 - Page Not Found"
        description="It looks like you have discovered the edge"
      />
      <FullHeightFlex
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <OverflowDecorations margined={false} layer="back">
          <Circle
            style={firstCircleAnimation}
            size="300px"
            radius="80% 75% 85% 90% / 80% 90% 85% 90%"
            background="#FEC7C3"
            flat
            sticky={width > 850}
          />
          <Circle
            style={secondCircleAnimation}
            size="350px"
            radius="80% 70% 85% 90% / 80% 90% 80% 90%"
            background="#D4A6D1"
            flat
            sticky={width > 850}
          />
          <Circle
            style={thirdCircleAnimation}
            size="320px"
            radius="80% 70% 85% 90% / 80% 90% 80% 90%"
            background="#FCC07E"
            flat
            sticky={width > 850}
          />
        </OverflowDecorations>
        <FullHeightFlex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap="2rem"
          margined
        >
          <Flex justifyContent="center" alignItems="center" gap="2rem" margined>
            <RelativeDecorations height={`${height}px`} width={`${width}px`}>
              <ColorThemedRectangle
                right="0px"
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${size + gap}px`}
                top={`${size + gap}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${(size + gap) * 2}px`}
                top={`${(size + gap) * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${(size + gap) * 3}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${(size + gap) * 2}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${size + gap}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${size + gap}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 4}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 5}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 6}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
            </RelativeDecorations>
            <RelativeDecorations width={`${width}px`}>
              <ColorThemedRectangle
                flat
                left={gap * 2}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
              />
              <ColorThemedRectangle
                left={`${size + gap + gap * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 2 + gap * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                top={`${size + gap}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                top={`${(size + gap) * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                top={`${(size + gap) * 4}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                top={`${(size + gap) * 5}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 3 + gap * 2}px`}
                top={`${(size + gap) * 6}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${(size + gap) * 2 + gap * 2}px`}
                top={`${(size + gap) * 6}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={`${size + gap + gap * 2}px`}
                top={`${(size + gap) * 6}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={gap * 2}
                top={`${size + gap}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={gap * 2}
                top={`${(size + gap) * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={gap * 2}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={gap * 2}
                top={`${(size + gap) * 4}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={gap * 2}
                top={`${(size + gap) * 5}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                left={gap * 2}
                top={`${(size + gap) * 6}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
            </RelativeDecorations>
            <RelativeDecorations width={`${width}px`}>
              <ColorThemedRectangle
                right="0px"
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${size + gap}px`}
                top={`${size + gap}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${(size + gap) * 2}px`}
                top={`${(size + gap) * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${(size + gap) * 3}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${(size + gap) * 2}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right={`${size + gap}px`}
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${size + gap}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 2}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 3}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 4}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 5}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
              <ColorThemedRectangle
                right="0px"
                top={`${(size + gap) * 6}px`}
                size={sizePx}
                radius={radiusPx}
                colorTheme={colorTheme}
                flat
              />
            </RelativeDecorations>
          </Flex>
          <MessageSection direction="column" alignItems="center">
            <Subheading>This page does not exist</Subheading>
            <LinkWithLargerText to="/">Back To Main Page</LinkWithLargerText>
          </MessageSection>
        </FullHeightFlex>
      </FullHeightFlex>
    </>
  );
};

export default NotFoundPage;
