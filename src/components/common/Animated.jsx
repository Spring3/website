import { cloneElement, useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import { randomFlicker } from '../../animations';
import { getRandomIndex } from '../../utils';

const Flickering = ({ duration, children }) => {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const randomNumber = getRandomIndex(10);
    setSeed(randomNumber + 1);
  }, []);

  const animation = useSpring(randomFlicker(seed, duration || seed));

  if (!seed) {
    return null;
  }

  return cloneElement(children, { style: animation });
};

export { Flickering };
