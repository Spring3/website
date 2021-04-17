import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { animated } from 'react-spring';

const styles = ({
  direction,
  justifyContent,
  alignItems,
  flexGrow,
  flexWrap,
  margined,
  gap,
}) => {
  let spacing = '';
  if (direction === 'column' || direction === 'column-reverse') {
    spacing = margined ? `margin-bottom: ${gap};` : `padding-bottom: ${gap};`;
  } else if (direction === 'row' || direction === 'row-reverse') {
    spacing = margined ? `margin-right: ${gap};` : `padding-right: ${gap};`;
  }

  return css([
    `
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      flex-grow: ${flexGrow};
      flex-wrap: ${flexWrap};

      & > *:not(:last-child) {
        ${spacing}
      }
    `,
  ]);
};

const Flex = ({ children, id, className, style, ...rest }) => (
  <animated.div id={id} className={className} css={styles(rest)} style={style}>
    {children}
  </animated.div>
);

Flex.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  flexGrow: PropTypes.string,
  margined: PropTypes.bool,
  direction: PropTypes.oneOf([
    'row',
    'column',
    'row-reverse',
    'column-reverse',
  ]),
  gap: PropTypes.string,
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  alignItems: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap']),
};

Flex.defaultProps = {
  children: null,
  flexGrow: '0',
  className: undefined,
  margined: false,
  id: undefined,
  direction: 'row',
  gap: '0px',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

export { Flex };
