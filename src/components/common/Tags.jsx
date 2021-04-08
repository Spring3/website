import React from 'react';
import { cx, css } from '@emotion/css';
import { animated } from 'react-spring';
import { useTheme } from '@emotion/react';

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
    <animated.div className={cx(styles.container, className)} {...rest}>
      {tags.map((tag) => (
        <li className={styles.tag(theme)} key={tag}>
          {tag}
          &nbsp;
        </li>
      ))}
    </animated.div>
  );
};

export { Tags };
