import React, { useMemo } from 'react';
import { css, cx } from '@emotion/css';

import { useAnchorTracker } from '../../hooks/useAnchorTracker';
import { Link, Reference } from './Reference';
import { Flex } from './Flex';
import { slugToTitle } from '../../utils';
import { useWindowSizeDef } from '../../hooks/useWindowSizeDef';
import { useTheme } from '@emotion/react';

const styles = {
  menuContainer: css`
    position: sticky;
    bottom: 3rem;
    width: 100%;
    z-index: 3;
    left: 0;

    @media (max-width: 750px) {
      position: static;
      margin-top: 1rem;
      flex-direction: columnn;
    }

    @media (min-width: 750px) and (orientation: landscape) {
      bottom: 1.5rem;
    }
  `,
  small: css`
    color: var(--text-color-secondary);
  `,
  slugMenuContainer: css`
    position: static;

    @media (min-width: 751px) {
      position: fixed !important;
    }
  `,
  defaultStyles: (theme) => css`
    background: transparent;
    color: var(--text-color-secondary);
    border-bottom: 2px solid transparent;
    padding: 0px 0.5rem;
    font-size: 0.8rem;
    text-decoration: none;

    &:visited {
      background: transparent;
      color: var(--text-color-secondary);
      border-bottom: 2px solid transparent;
      padding: 0px 0.5rem;
      font-size: 0.8rem;
      text-decoration: none;
    }

    &:hover,
    &:focus {
      border-bottom: 2px solid ${theme?.marker || 'var(--marker-blue)'}
      background: transparent;
    }
  `,
  activeStyles: (theme) => css`
    transition: all ease 0.2s;
    color: var(--text-color-primary);
    background: ${theme?.marker || 'var(--marker-blue)'};

    &:visited {
      color: var(--text-color-primary) !important;
      background: ${theme?.marker || 'var(--marker-blue)'};
    }

    &:hover,
    &:focus {
      border-bottom: 2px solid ${theme?.marker || 'var(--marker-blue)'};
      background: ${theme?.marker || 'var(--marker-blue)'};
    }
  `,
  anchorMenuItem: css`
    display: inline-flex;
    white-space: nowrap;
  `,
  slugMenuItem: css`
    white-space: nowrap;

    &:visited,
    &:focus,
    &:hover {
      border-radius: 0px;
    }
  `,
  activeSlugMenu: css`
    border-radius: 3px;
  `,
};

const AnchorListMenu = ({ nodes, onClick }) => {
  const theme = useTheme();
  const windowSize = useWindowSizeDef();
  const anchors = useMemo(() => nodes.map((node) => node.anchor), []);
  const activeAnchor = useAnchorTracker(anchors);
  const menuItems = useMemo(
    () =>
      nodes.map((node) => {
        const isActive = activeAnchor === node.anchor;
        return (
          <Reference
            className={cx(
              styles.defaultStyles(theme),
              { [styles.activeStyles(theme)]: isActive },
              styles.anchorMenuItem
            )}
            bold={isActive}
            onClick={onClick}
            href={node.anchor}
            data-anchor={node.anchor}
            key={node.anchor}
          >
            {node.name}
          </Reference>
        );
      }),
    [activeAnchor]
  );

  return (
    <Flex
      className={styles.menuContainer}
      direction={windowSize.isSmall ? 'column' : 'row'}
      gap={windowSize.isSmall ? '1rem' : '0rem'}
      margined
      justifyContent="center"
      alignItems="center"
    >
      <small className={styles.small}>Projects:&nbsp;</small>
      {menuItems}
    </Flex>
  );
};

const SlugListMenu = ({ slugs, active, onClick }) => {
  const windowSize = useWindowSizeDef();
  const theme = useTheme();

  return (
    <Flex
      className={cx(styles.menuContainer, styles.slugMenuContainer)}
      direction={windowSize.isSmall ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      margined
      gap={windowSize.isSmall ? '1rem' : '0rem'}
    >
      <small>Projects:&nbsp;</small>
      {slugs.map((slug) => {
        const isActive = active === slug;
        return (
          <Link
            className={cx(
              styles.defaultStyles(theme),
              {
                [styles.activeStyles(theme)]: isActive,
                [styles.activeSlugMenu]: isActive,
              },
              styles.slugMenuItem
            )}
            key={slug}
            onClick={onClick}
            to={slug}
          >
            {slugToTitle(slug)}
          </Link>
        );
      })}
    </Flex>
  );
};

export { AnchorListMenu, SlugListMenu };
