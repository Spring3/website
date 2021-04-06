import { useWindowSize } from 'react-use';

const useWindowSizeDef = () => {
  const { width, height } = useWindowSize();

  return {
    // will be true even with medium screen, I know. This was just to unite these numbers somewhere.
    isSmall: width <= 750,
    isMedium: width <= 1050,
    isLarge: width > 1050,
    width,
    height,
  };
};

export { useWindowSizeDef };
