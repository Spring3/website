import React, { useCallback, useState, useEffect } from 'react';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Reference, Link } from './Reference';
import { Subheader } from './Headers';
import { Flex } from './Flex';
import { SocialButtons } from './SocialButtons';
import { Logo } from './Logo';
import { revealRight } from '../../animations';
import { useWindowSize } from 'react-use';

const BurgerMenuWrapper = styled(animated.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 5;

  @media (max-width: 750px) {
    right: 1rem;
  }

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
    right: 1.5rem;
  }
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
  overflow: hidden;
  z-index: 4;
  max-height: 100vh;
  height: calc(100vh - 7.5rem);
  overflow-y: scroll;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Overlay = styled(animated.div)`
  background: transparent;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 4;
}
`;

const BurgetMenuPanelWrapper = styled(animated.div)`
  position: fixed;
  z-index: 4;
  max-width: 100%;
  right: 0;
  top: 0;
  padding-bottom: 4rem;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-left: 2px solid rgba(245, 245, 245, 0.9);

  @media (max-width: 750px) {
    background: white;
  }
`;

const LogoContainer = styled(Flex)`
  padding-top: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(245, 245, 245, 0.9);
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
  padding-top: 1rem;
`;

const SpaceLessSectionHeader = styled.h4`
  margin: 0;
`;

const SpaceLessHeader = styled(Subheader)`
  margin: 0;
`;

const BurgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const { width } = useWindowSize();

  const isSmallScreen = width <= 750;

  const onIconClick = useCallback((e) => {
    e.preventDefault();
    setMenuOpen((isOpen) => !isOpen);
    setHovering((hovering) => !hovering);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
  }, []);

  useEffect(() => {
    let timeout;
    if (isMenuOpen) {
      if (isHovering) {
        clearTimeout(timeout);
      } else {
        timeout = setTimeout(() => {
          // setMenuOpen(false);
        }, 2000);
      }
    } else {
      setHovering(false);
    }
    return () => clearTimeout(timeout);
  }, [isMenuOpen, isHovering]);

  const expandAnimation = useSpring({
    from: {
      minWidth: '0px',
      maxWidth: '0px',
      opacity: 1,
    },
    to: {
      minWidth: isMenuOpen ? isSmallScreen ? `${width}px` : '370px' : '0px',
      opacity: isMenuOpen ? 1 : 0,
    },
  });

  const expandContentPanelAnimation = useSpring({
    from: {
      paddingLeft: '0rem',
      paddingRight: '0rem',
    },
    to: {
      paddingLeft: isMenuOpen ? '1rem' : '0rem',
      paddingRight: isMenuOpen ? '1rem' : '0rem',
    },
  });

  const overlayAnimation = useSpring({
    from: {
      width: '0%',
    },
    to: {
      width: isMenuOpen ? '100%' : '0%',
    },
  });

  const burgerMenuButtonAnimation = useSpring(
    revealRight({ delay: 1000, right: '2rem' })
  );

  const IconElement = isMenuOpen ? CloseIcon : MenuIcon;

  return (
    <>
      <BurgerMenuWrapper style={burgerMenuButtonAnimation}>
        <Button role="button" onClick={onIconClick}>
          <IconElement size={32} onMouseEnter={handleMouseEnter} />
        </Button>
      </BurgerMenuWrapper>
      <Overlay style={overlayAnimation} onClick={onIconClick} />
      <BurgetMenuPanelWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={expandAnimation}
      >
        <LogoContainer justifyContent="center" alignItems="center">
          <Logo width="65px" height="32.5px" />
        </LogoContainer>
        <BurgerMenuPanel
          style={expandContentPanelAnimation}
          direction="column"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
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
