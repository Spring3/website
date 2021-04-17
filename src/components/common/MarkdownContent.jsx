import React from 'react';
import { css } from '@emotion/react';
import { genericStyles } from './Reference';

const defaultStyles = (marker) => css`
  a {
    ${genericStyles({ marker })}
  }

  @media (min-width: 750px) {
    h2 {
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    p,
    ul {
      font-size: 1.1rem;
    }
  }

  ul {
    line-height: 2;
    padding: 0rem 1rem;
  }

  @media (min-width: 1050px) {
    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.6rem;
    }

    p,
    ul {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1024px) and (max-height: 800px) {
    h2 {
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    p,
    ul {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 1200px) {
    p,
    ul {
      font-size: 1.3rem;
    }
  }

  h2 {
    display: inline-block;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 60%,
      ${marker || 'var(--marker-yellow)'} 60%,
      ${marker || 'var(--marker-yellow)'} 100%
    );
  }

  text-align: justify;
`;

const MarkdownContent = ({ className, children, marker, ...rest }) => {
  return (
    <div className={className} css={defaultStyles(marker)} {...rest}>
      {children}
    </div>
  );
};

export { MarkdownContent };
