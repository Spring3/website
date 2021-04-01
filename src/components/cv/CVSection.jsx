import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useIntersection } from 'react-use';

const Section = styled(animated.section)`
  background: rgba(200, 200, 200, 0.1);
  padding: 1rem;
  border-radius: 5px;
  position: relative;

  grid-row: span ${(props) => props.span || '1'};

  @media (max-width: 750px) {
    margin: 0;
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
    <Section id={id} span={span} style={sectionAnimation} ref={ref}>
      {children}
    </Section>
  );
};

export { CVSection };
