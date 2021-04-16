import React from 'react';
import { animated } from 'react-spring';
import { useTheme, css } from '@emotion/react';

const styles = {
  container: css`
    list-style-type: none;
    position: relative;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  `,
  tag: (theme) => css`
    display: inline-block;
    font-weight: bold;
    border-radius: var(--border-radius);
    border: 2px solid ${theme?.marker};
    padding: 3px 5px;
    margin: 0.25rem;
    font-size: 0.8rem;
  `,
};

const Tags = ({ tags = [], className, ...rest }) => {
  const theme = useTheme();

  return (
    <animated.div className={className} css={styles.container} {...rest}>
      {tags.map((tag) => (
        <li css={styles.tag(theme)} key={tag}>
          {tag}
          &nbsp;
        </li>
      ))}
    </animated.div>
  );
};

export { Tags };
