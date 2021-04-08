import React, { memo } from 'react';
import { cx, css, keyframes } from '@emotion/css';
import { animated, useSpring } from 'react-spring';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import { Link } from '../Reference';
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

const styles = {
  container: ({ theme }) => css`
    position: relative;
    background: ${theme?.marker || MARKERS.blue};
    border-radius: 3px;
    padding: 0.1rem 0.6rem 0.1rem 0rem;

    &:hover {
      background: ${theme?.marker || MARKERS.blue};
    }
  `,
  transparentBg: css`
    background: transparent;
    &:hover {
      background: transparent;
    }
  `,
  animatedLink: css`
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
  `,
};

const ButtonBack = memo(({ href, value, withColorfulBackground }) => {
  const revealAnimation = useSpring(revealLeft({ delay: 1000 }));

  return (
    <animated.div
      className={cx(styles.container({}), {
        [styles.transparentBg]: !withColorfulBackground,
      })}
      style={revealAnimation}
    >
      <Link className={styles.animatedLink} to={href}>
        <ArrowLeftIcon /> {value}
      </Link>
    </animated.div>
  );
});

ButtonBack.displayName = 'ButtonBack';

export { ButtonBack };
