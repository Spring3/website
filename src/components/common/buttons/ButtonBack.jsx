import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'gatsby';
import { animated, useSpring } from 'react-spring';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import { styles } from '../Reference';
import { MARKERS } from '../../../theme';
import { revealLeft } from '../../../animations';

const bounceLeftAnimation = keyframes`
  0% {
    left: 0px;
  }
  10% {
    left: -5px;
  }
  20% {
    left: -5px;
  }
  30% {
    left: 0px;
  }
  100% {
    left: 0px;
  }
`;

const LinkButton = styled(Link)`
  ${styles}
  display: flex;
  text-decoration: none;
  gap: 5px;
  font-size: 1.1rem;
  padding: 0.25rem 0.5rem;
  background: transparent;
  cursor: pointer;
  border-radius: 3px;

  &:visited {
    background: transparent;
  }

  &:hover {
    svg {
      position: relative;
      animation: ${bounceLeftAnimation} 2.5s ease-in infinite;
    }
  }
`;

const BackButtonContainer = styled(animated.div)`
  position: relative;
  background: ${(props) =>
    props.withColorfulBackground
      ? props.theme.marker || MARKERS.blue
      : 'transparent'};
  border-radius: 3px;
  padding: 0.1rem 0.6rem 0.1rem 0rem;

  &:hover {
    background: ${(props) =>
      props.withColorfulBackground
        ? props.theme.marker || MARKERS.blue
        : 'transparent'};
  }
`;

const ButtonBack = ({ href, value, withColorfulBackground }) => {
  const revealAnimation = useSpring(revealLeft({ delay: 1000 }));

  return (
    <BackButtonContainer
      style={revealAnimation}
      withColorfulBackground={withColorfulBackground}
    >
      <LinkButton to={href}>
        <ArrowLeftIcon /> {value}
      </LinkButton>
    </BackButtonContainer>
  );
};

export { ButtonBack };
