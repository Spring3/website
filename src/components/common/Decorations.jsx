import React, { memo } from 'react';
import { css } from '@emotion/react';
import { animated } from 'react-spring';

const styles = {
  decorations: ({ top, width, height, layer, position }) => css`
    left: 0;
    width: ${width || '100%'};
    top: ${top};
    height: ${height};
    max-height: calc(100% - ${top});
    z-index: ${layer === 'back' ? '-1' : '1'};
    pointer-events: ${layer === 'back' ? 'all' : 'none'};
    position: ${position};
  `,
  geometricObject: ({
    sticky,
    position,
    width,
    size,
    height,
    top,
    left,
    right,
    bottom,
    background,
    flat,
  }) => css`
    transition: background ease 0.3s;
    will-change: opacity, background;
    opacity: 0.9;
    pointer-events: none;
    position: ${sticky ? 'sticky' : position};
    width: ${width || size};
    height: ${height || size};
    top: ${top};
    left: ${left};
    right: ${right};
    bottom: ${bottom};
    background: ${background};
    box-shadow: ${flat ? 'none' : `0px 0px 20px 0px ${background}`};
  `,
};

const Decorations = memo(({ className, children, style, ...rest }) => {
  return (
    <animated.div
      className={className}
      css={styles.decorations(rest)}
      style={style}
    >
      {children}
    </animated.div>
  );
});

Decorations.defaultProps = {
  top: '0px',
  height: '100%',
  layer: 'back',
  flat: false,
  position: 'absolute',
};
Decorations.displayName = 'Decorations';

const GeometricObject = memo(({ className, style, ...rest }) => {
  return (
    <animated.div
      className={className}
      css={styles.geometricObject(rest)}
      style={style}
    />
  );
});

GeometricObject.defaultProps = {
  sticky: false,
  position: 'absolute',
};
GeometricObject.displayName = 'GeometricObject';

const Rectangle = ({ className, radius, ...rest }) => {
  return (
    <GeometricObject
      {...rest}
      className={className}
      css={css`
        border-radius: ${radius || '15px'};
      `}
    />
  );
};

const Circle = ({ className, radius, ...rest }) => {
  return (
    <GeometricObject
      {...rest}
      className={className}
      css={css`
        border-radius: ${radius || '50%'};
      `}
    />
  );
};

export { Decorations, Rectangle, Circle };

export default Decorations;
