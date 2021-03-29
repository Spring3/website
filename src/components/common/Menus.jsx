import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { useWindowSize } from 'react-use';
import { useAnchorTracker } from '../../hooks/useAnchorTracker';
import { Link, Reference } from './Reference';
import { Flex } from './Flex';
import { slugToTitle } from '../../utils';

const MenuContainer = styled(Flex)`
  position: sticky;
  bottom: 3rem;
  width: 100%;
  z-index: 3;
  left: 0;

  small {
    color: var(--text-color-secondary);
  }

  @media (max-width: 750px) {
    position: static;
    margin-top: 1rem;
    flex-direction: columnn;
  }

  @media (min-width: 750px) and (orientation: landscape) {
    bottom: 1.5rem;
  }
`;

const SlugMenuContainer = styled(MenuContainer)`
  position: fixed;

  @media (max-width: 750px) {
    position: static;
  }
`;

const styles = css`
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
    ${(props) => css`
      border-bottom: 2px solid ${props.theme.marker || 'var(--marker-blue)'};
      background: transparent;
    `}
  }
`;

const activeStyles = css`
  transition: all ease 0.2s;
  background: transparent;
  color: var(--text-color-secondary);
  border-bottom: 2px solid transparent;
  padding: 0px 0.5rem;
  font-size: 0.8rem;
  text-decoration: none;

  font-weight: bold;
  color: var(--text-color-primary) !important;
  background: ${(props) => props.theme.marker || 'var(--marker-blue)'};

  &:visited {
    background: transparent;
    color: var(--text-color-secondary);
    border-bottom: 2px solid transparent;
    padding: 0px 0.5rem;
    font-size: 0.8rem;
    text-decoration: none;

    font-weight: bold;
    color: var(--text-color-primary) !important;

    background: ${(props) => props.theme.marker || 'var(--marker-blue)'};
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid
      ${(props) => props.theme.marker || 'var(--marker-blue)'};
    background: ${(props) =>
      props.active
        ? props.theme.marker || 'var(--marker-blue)'
        : 'transparent'};
  }
`;

const AnchorMenuItem = styled(Reference)`
  ${styles}
  display: inline-flex;
`;

const ActiveAnchorMenuItem = styled(Reference)`
  ${activeStyles};
  display: inline-flex;
`;

const SlugMenuItem = styled(Link)`
  ${styles}

  &:visited,
  &:focus,
  &:hover {
    border-radius: 0px;
  }
`;

const ActiveSlugMenuItem = styled(Link)`
  ${activeStyles}

  border-radius: 3px;

  &:visited,
  &:focus,
  &:hover {
    border-radius: 0px;
  }
`;

const AnchorListMenu = ({ nodes, onClick }) => {
  const { width } = useWindowSize();
  const anchors = useMemo(() => nodes.map((node) => node.anchor), []);
  const activeAnchor = useAnchorTracker(anchors);
  const isSmallScreen = width <= 750;
  const menuItems = useMemo(
    () =>
      nodes.map((node) => {
        const MenuItem =
          activeAnchor === node.anchor ? ActiveAnchorMenuItem : AnchorMenuItem;
        return (
          <MenuItem
            onClick={onClick}
            href={node.anchor}
            data-anchor={node.anchor}
            key={node.anchor}
          >
            {node.name}
          </MenuItem>
        );
      }),
    [activeAnchor]
  );

  return (
    <MenuContainer
      direction={isSmallScreen ? 'column' : 'row'}
      gap={isSmallScreen ? '1rem' : '0rem'}
      margined
      justifyContent="center"
      alignItems="center"
    >
      <small>Projects:&nbsp;</small>
      {menuItems}
      <AnchorMenuItem href="/cv" key="cv">
        CV
      </AnchorMenuItem>
    </MenuContainer>
  );
};

const SlugListMenu = ({ slugs, active, onClick }) => {
  const { width } = useWindowSize();
  const isSmallScreen = width <= 750;

  return (
    <SlugMenuContainer
      direction={isSmallScreen ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      margined
      gap={isSmallScreen ? '1rem' : '0rem'}
    >
      <small>Projects:&nbsp;</small>
      {slugs.map((slug) => {
        const MenuItem = active === slug ? ActiveSlugMenuItem : SlugMenuItem;
        return (
          <MenuItem key={slug} onClick={onClick} to={slug}>
            {slugToTitle(slug)}
          </MenuItem>
        );
      })}
      <SlugMenuItem onClick={onClick} to="/cv" key="cv">
        CV
      </SlugMenuItem>
    </SlugMenuContainer>
  );
};

export { AnchorListMenu, SlugListMenu };
