import React, { memo } from 'react';
import Logo from '../../assets/logo.svg';

const LogoImage = memo(({ width = '80px', height = '40px' }) => (
  <Logo width={width} height={height} fill="white" />
));

LogoImage.displayName = 'LogoImage';

export { LogoImage as Logo };
