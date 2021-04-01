import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { animated, useSpring } from 'react-spring';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import { styles } from '../Reference';
import { MARKERS } from '../../../theme';
import { revealLeft } from '../../../animations';

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
    <BackButtonContainer style={revealAnimation} withColorfulBackground={withColorfulBackground}>
      <LinkButton to={href}>
        <ArrowLeftIcon /> {value}
      </LinkButton>
    </BackButtonContainer>
  );
};

export { ButtonBack };
