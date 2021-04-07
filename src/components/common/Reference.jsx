import React from 'react';
import { css, cx } from '@emotion/css';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MARKERS } from '../../theme';

const genericStyles = ({ bold, theme }) => css`
  transition: background ease 0.2s;
  transition: border ease 0.2s;
  text-decoration: none;
  color: var(--text-color-primary);
  font-weight: ${bold ? 'bold' : 500};
  padding: 2px;
  ${theme?.marker
    ? `background: linear-gradient(to bottom, transparent 0%, transparent 60%, ${theme.marker} 60%, ${theme.marker} 100%);`
    : 'background: linear-gradient(to bottom, transparent 0%, transparent 60%, var(--marker-blue) 60%,  var(--marker-blue) 100%);'}

  &:visited {
    font-weight: ${bold ? 'bold' : 500};
    padding: 2px;
    ${theme?.marker
      ? `background: linear-gradient(to bottom, transparent 0%, transparent 60%, ${theme.marker} 60%, ${theme.marker} 100%);`
      : 'background: linear-gradient(to bottom, transparent 0%, transparent 60%, var(--marker-blue) 60%,  var(--marker-blue) 100%);'}
  }

  &:hover,
  &:focus {
    color: black;
    background: ${theme?.marker || 'var(--marker-blue)'};
    border-radius: 3px;
  }
`;

const styles = {
  reference: css`
    border-radius: 3px;

    &:hover,
    &:focus {
      border-radius: 0px;
    }
  `,
};

const Reference = ({
  className,
  href,
  onClick,
  newTab,
  bold,
  children,
  ...rest
}) => {
  const additionalProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <a
      className={cx(genericStyles({ bold }), styles.reference, className)}
      bold={bold}
      onClick={onClick}
      href={href}
      {...rest}
      {...additionalProps}
    >
      {children}
    </a>
  );
};

Reference.defaultProps = {
  color: MARKERS.blue,
  newTab: false,
  bold: false,
};

Reference.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
  bold: PropTypes.bool,
};

const StyledLink = ({ bold, className, children, ...rest }) => {
  return (
    <Link className={cx(genericStyles({ bold }), className)} {...rest}>
      {children}
    </Link>
  );
};

export { Reference, StyledLink as Link, genericStyles };
