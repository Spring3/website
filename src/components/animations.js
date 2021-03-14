import { getRandomIndex } from "../utils";

const randomFlicker = (seed = 0, duration) => ({
  from: {
    opacity: 0,
  },
  to: async (next) => {
    while (1) {
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
      while (1) {
        let targetLeft = getRandomIndex(100);
        let targetTop = getRandomIndex(100);
        await next({ left: `${targetLeft}%`, top: `${targetTop}%` });

        // targetLeft = getRandomIndex(100);
        // targetTop = getRandomIndex(100);
        // await next({ left: `${targetLeft}%`, top: `${targetTop}%` });
        initialLeft = targetLeft;
        initialTop = targetTop;
      }
    },
    config: {
      duration
    }
  }
};

export {
  randomFlicker,
  randomShift
};
