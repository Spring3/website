import React from 'react';
import { css, cx } from '@emotion/css';
import { Button } from './Button';

const styles = css`
  background: transparent;
  border: none;
`;

const FlatButton = ({ className, children, ...rest }) => {
  return (
    <Button className={cx(styles, className)} {...rest}>
      {children}
    </Button>
  );
};

export { FlatButton };
