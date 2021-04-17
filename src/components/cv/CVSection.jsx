import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { animated, useSpring } from 'react-spring';
import { useIntersection } from 'react-use';

const styles = ({ span }) => css`
  background: rgba(200, 200, 200, 0.1);
  padding: 1rem;
  border-radius: 5px;
  position: relative;

  grid-row: span ${span || '1'};

  @media (max-width: 750px) {
    margin: 0;
    &:not(:first-child) {
      margin-top: 2rem;
    }
  }
`;

const CVSection = ({ id, children, span }) => {
  const ref = useRef();
  const [hasIntersected, setIntersected] = useState(false);
  const [sectionAnimation, animate] = useSpring(() => ({
    opacity: 0,
    top: '5rem',
  }));

  const intersection = useIntersection(ref, {
    threshold: 0,
  });

  useEffect(() => {
    if (intersection?.isIntersecting && !hasIntersected) {
      setIntersected(true);
      animate({
        opacity: 1,
        top: '0rem',
        delay: 500,
      });
    }
  }, [intersection, hasIntersected]);

  return (
    <animated.section
      css={styles({ span })}
      id={id}
      style={sectionAnimation}
      ref={ref}
    >
      {children}
    </animated.section>
  );
};

export { CVSection };
