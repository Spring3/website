import React, { useCallback, useState } from 'react';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Reference, Link } from './Reference';
import { Subheader } from './Headers';
import { Flex } from './Flex';
import { SocialButtons } from './SocialButtons';

const BurgerMenuWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 5;
`;

const Button = styled(Reference)`
  background: transparent;
  user-select: none;
  &:hover {
    background: transparent;
    cursor: pointer;
  }

  &:focus {
    outline: normal;
  }
`;

const BurgerMenuPanel = styled(Flex)`
  position: sticky;
  overflow: hidden;
  z-index: 4;
  max-height: 100vh;
  top: 4rem;
  height: calc(100vh - 6rem);
`;

const BurgetMenuPanelWrapper = styled(animated.div)`
  position: absolute;
  z-index: 4;
  right: 0;
  top: 0;
  min-width: 350px;
  padding: 4rem 2rem 2rem 1rem;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-left: 2px solid rgba(245, 245, 245, 0.9);
`;

const MarkerlessLink = styled(Link)`
  background: transparent;
`;

const ProjectsSection = styled(Flex)`
  flex-grow: 1
  overflow-y: scroll;
`;

const UtilitySection = styled(Flex)`
  width: 100%;
`;

const SpaceLessSectionHeader = styled.h4`
  margin: 0;
`;

const SpaceLessHeader = styled(Subheader)`
  margin: 0;
`;

const BurgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onIconClick = useCallback((e) => {
    e.preventDefault();
    setMenuOpen((isOpen) => !isOpen);
  }, []);

  const expandAnimation = useSpring({
    from: {
      minWidth: '0px',
      maxWidth: '0px',
      paddingLeft: '0rem',
      paddingRight: '0rem',
    },
    to: {
      minWidth: isMenuOpen ? '350px' : '0px',
      maxWidth: isMenuOpen ? 'auto' : '0px',
      paddingLeft: isMenuOpen ? '1rem' : '0rem',
      paddingRight: isMenuOpen ? '2rem' : '0rem',
    },
  });

  const IconElement = isMenuOpen ? CloseIcon : MenuIcon;

  return (
    <>
      <BurgerMenuWrapper>
        <Button role="button" onClick={onIconClick}>
          <IconElement size={32} />
        </Button>
      </BurgerMenuWrapper>
      <BurgetMenuPanelWrapper style={expandAnimation}>
        <BurgerMenuPanel direction="column" justifyContent="space-between">
          <ProjectsSection direction="column" justifyContent="flex-start">
            <SpaceLessSectionHeader>Projects</SpaceLessSectionHeader>
            <MarkerlessLink to="/aurelins-website">
              <SpaceLessHeader>Aurelins Website</SpaceLessHeader>
            </MarkerlessLink>
            <MarkerlessLink to="/redshape">
              <SpaceLessHeader>Redshape</SpaceLessHeader>
            </MarkerlessLink>
            <MarkerlessLink to="/starbot">
              <SpaceLessHeader>Starbot</SpaceLessHeader>
            </MarkerlessLink>
            <MarkerlessLink to="/twitch-auto-points">
              <SpaceLessHeader>Twitch Auto Points</SpaceLessHeader>
            </MarkerlessLink>
            <MarkerlessLink to="/website">
              <SpaceLessHeader>Website</SpaceLessHeader>
            </MarkerlessLink>
          </ProjectsSection>
          <UtilitySection justifyContent="space-between" alignItems="center">
            <MarkerlessLink to="/cv">
              <SpaceLessSectionHeader>CV</SpaceLessSectionHeader>
            </MarkerlessLink>
            <SocialButtons size={24} onlyImportant />
          </UtilitySection>
        </BurgerMenuPanel>
      </BurgetMenuPanelWrapper>
    </>
  );
};

export { BurgerMenu };
