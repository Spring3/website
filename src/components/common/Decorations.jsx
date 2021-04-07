import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const Decorations = styled(animated.div).attrs((props) => ({
  style: {
    top: props.top || '0',
    height: props.height || '100%',
    maxHeight: `calc(100% - ${props.top || '0px'})`,
    zIndex: props.layer === 'back' ? '-1' : '1',
    pointerEvents: props.layer === 'back' ? 'all' : 'none',
    position: props.position || 'absolute',
  },
}))`
  left: 0;
  width: 100%;
`;

const DecorationsComponent = memo(
  ({ className, children, top, height, layer, position }) => {
    return (
      <Decorations
        className={className}
        top={top}
        height={height}
        layer={layer}
        position={position}
      >
        {children}
      </Decorations>
    );
  }
);

DecorationsComponent.displayName = 'DecorationsComponent';

const GeometricObject = styled(animated.div).attrs((props) => ({
  style: {
    position:
      String(props.sticky) === 'true' ? 'sticky' : props.position || 'absolute',
    width: props.width || props.size,
    height: props.height || props.size,
    top: props.top,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
    background: props.background,
    boxShadow:
      props.flat === 'true' ? 'none' : `0px 0px 20px 0px ${props.background}`,
    ...(props.style || {}),
  },
}))`
  transition: background ease 0.3s;
  will-change: opacity, background;
  opacity: 0.9;
  pointer-events: none;
`;

const GeometricObjectComponent = memo(
  ({
    className,
    flat,
    sticky,
    position,
    width,
    height,
    size,
    top,
    left,
    right,
    bottom,
    background,
    style,
  }) => {
    return (
      <GeometricObject
        className={className}
        sticky={String(sticky)}
        flat={String(flat)}
        position={position}
        width={width}
        height={height}
        size={size}
        top={top}
        left={left}
        right={right}
        bottom={bottom}
        background={background}
        style={style}
      />
    );
  }
);

GeometricObjectComponent.displayName = 'GeometricObjectComponent';

const Rectangle = styled(GeometricObjectComponent)`
  ${(props) => css`
    border-radius: ${props.radius || '15px'};
  `}
`;

const Circle = styled(GeometricObjectComponent)`
  border-radius: ${(props) => props.radius || '50%'};
`;

export { DecorationsComponent as Decorations, Rectangle, Circle };

export default DecorationsComponent;
