import React, { memo, useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';

const useLogoAnimation = (isReady) => {
  if (!isReady) {
    return null;
  }
};

const LogoImage = memo(({ width = '80px', height = '40px' }) => {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  useLogoAnimation(isReady);
  return (
    <>
      <Logo width={width} height={height} fill="white" />
    </>
  );
});

export { LogoImage as Logo };
