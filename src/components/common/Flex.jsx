import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const FlexContainer = styled(animated.div).attrs((props) => ({
  style: {
    flexDirection: props.direction,
    justifyContent: props.justifycontent,
    alignItems: props.alignitems,
    flexGrow: props.flexgrow,
    flexWrap: props.flexwrap,
  },
}))`
  display: flex;
  ${(props) => css`
    & > *:not(:last-child) {
      ${props.direction === 'column'
        ? css`
            padding-bottom: ${props.margined === 'true' ? '' : props.gap};
            margin-bottom: ${props.margined === 'true' ? props.gap : ''};
          `
        : css`
            padding-right: ${props.margined === 'true' ? '' : props.gap};
            margin-right: ${props.margined === 'true' ? props.gap : ''};
          `};
    }
  `}
`;

const Flex = ({
  children,
  direction,
  gap,
  margined,
  id,
  justifyContent,
  alignItems,
  flexGrow,
  flexWrap,
  className,
  style,
  ...rest
}) => (
  <FlexContainer
    id={id}
    style={style}
    direction={direction}
    gap={gap}
    margined={String(margined)}
    justifycontent={justifyContent}
    alignitems={alignItems}
    flexgrow={flexGrow}
    flexwrap={flexWrap}
    className={className}
    {...rest}
  >
    {children}
  </FlexContainer>
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
