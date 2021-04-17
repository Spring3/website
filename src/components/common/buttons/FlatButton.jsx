import React from 'react';
import { css } from '@emotion/react';
import { Button } from './Button';

const styles = css`
  background: transparent;
  border: none;
`;

const FlatButton = ({ className, children, ...rest }) => {
  return (
    <Button className={className} css={styles} {...rest}>
      {children}
    </Button>
  );
};

export { FlatButton };
