import { config } from 'react-spring';
import { getRandomIndex } from './utils';

const randomFlicker = (seed = 0, duration) => ({
  from: {
    opacity: 0,
  },
  to: async (next) => {
    while (true) {
      await next({ opacity: 1 });
      await next({ opacity: 0.5 });
    }
  },
  config: {
    mass: duration,
  },
  immediate: false,
  delay: seed ? seed * 100 : undefined,
});

const randomShift = ({ left, top }, duration) => {
  let initialLeft = left;
  let initialTop = top;
  return {
    from: {
      left: initialLeft,
      top: initialTop,
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
      duration,
    },
  };
};

const reveal = ({ delay, ref, duration, slow = true }) => {
  const animation = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: slow ? config.slow : undefined,
  };

  if (ref) {
    animation.ref = ref;
  }

  if (!slow && duration) {
    animation.config = {
      duration,
    };
  }

  if (delay) {
    animation.immediate = false;
    animation.delay = delay;
  }

  return animation;
};

const revealLeft = ({ delay, ref, left = '0rem' }) => {
  const animation = reveal({ delay, ref });
  const initial = {
    opacity: 0,
    left: '-5rem',
  };
  animation.initial = initial;
  animation.from = initial;
  animation.to.left = left;
  return animation;
};

const revealRight = ({ delay, ref, right = '0rem' }) => {
  const animation = reveal({ delay, ref });
  const initial = {
    opacity: 0,
    right: '-5rem',
  };
  animation.initial = initial;
  animation.from = initial;
  animation.to.right = right;
  return animation;
};

const revealTop = ({ delay, ref, top = '0rem' }) => {
  const animation = reveal({ delay, ref });
  const initial = {
    opacity: 0,
    top: '-5rem',
  };
  animation.initial = initial;
  animation.from = initial;
  animation.to.top = top;
  return animation;
};

const revealBottom = ({ delay, ref, bottom = '0rem' }) => {
  const animation = reveal({ delay, ref });
  const initial = {
    opacity: 0,
    bottom: '-5rem',
  };
  animation.initial = initial;
  animation.from = initial;
  animation.to.bottom = bottom;
  return animation;
};

export {
  randomFlicker,
  randomShift,
  reveal,
  revealLeft,
  revealRight,
  revealTop,
  revealBottom,
};
