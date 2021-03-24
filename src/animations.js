import { config } from 'react-spring';
import { getRandomIndex } from "./utils";

const randomFlicker = (seed = 0, duration) => ({
  from: {
    opacity: 0,
  },
  to: async (next) => {
    while (true) {
      await next({ opacity: 1 });
      await next({ opacity: .5 });
    }
  },
  config: {
    mass: duration
  },
  immediate: false,
  delay: seed ? seed * 100 : undefined
});

const randomShift = ({ left, top }, duration) => {
  let initialLeft = left;
  let initialTop = top;
  return {
    from: {
      left: initialLeft,
      top: initialTop
    },
    to: async (next) => {
      while (true) {
        const targetLeft = getRandomIndex(100);
        const targetTop = getRandomIndex(100);
        await next({ left: `${targetLeft}%`, top: `${targetTop}%` });
        initialLeft = targetLeft;
        initialTop = targetTop;
      }
    },
    config: {
      duration
    }
  };
};

const reveal = ({ delay, ref }, slow = true) => {
  return {
    ref,
    immediate: false,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: slow ? config.slow : undefined,
    delay
  };
}

export {
  randomFlicker,
  randomShift,
  reveal
};
