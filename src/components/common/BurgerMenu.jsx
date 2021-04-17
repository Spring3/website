import React, { useCallback, useState, useEffect, memo } from 'react';
import { css } from '@emotion/react';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import { Reference, Link } from './Reference';
import { SubHeader } from './Headers';
import { Flex } from './Flex';
import { SocialButtons } from './SocialButtons';
import { Logo } from './Logo';
import { revealRight } from '../../animations';
import { MARKERS } from '../../theme';
import { CookieManager } from './cookie/CookieManager';
import { useWindowSizeDef } from '../../hooks/useWindowSizeDef';

const styles = {
  buttonWrapper: css`
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
  `,
  button: css`
    background: transparent;
    user-select: none;
    &:hover {
      background: transparent;
      cursor: pointer;
    }

    &:focus {
      background: transparent;
      outline: normal;
    }
  `,
  panelWrapper: css`
    position: fixed;
    z-index: 4;
    max-width: 100%;
    right: 0;
    top: 0;
    padding-bottom: 4rem;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    border-left: 2px solid rgba(245, 245, 245, 0.9);
    box-shadow: 0px 0px 10px ${MARKERS.shadow};

    @media (max-width: 750px) {
      background: white;
    }
  `,
  panel: css`
    overflow: hidden;
    z-index: 4;
    max-height: 100vh;
    height: calc(100vh - 7.5rem);
    overflow-y: scroll;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  `,
  overlay: css`
    background: transparent;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 4;
  `,
  logoContainer: css`
    padding-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(245, 245, 245, 0.9);
  `,
  transparentLink: css`
    background: transparent;
  `,
  projectSection: css`
    flex-grow: 1
    overflow-y: scroll;
  `,
  utilitySection: css`
    width: 100%;
    padding-top: 1rem;
  `,
  marginless: css`
    margin: 0;
  `,
};

const BurgerMenu = memo(() => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const windowSize = useWindowSizeDef();

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
          setMenuOpen(false);
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
      // eslint-disable-next-line
      minWidth: isMenuOpen
        ? windowSize.isSmall
          ? `${windowSize.width}px`
          : '370px'
        : '0px',
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
      {windowSize.isSmall && isMenuOpen ? (
        <Helmet>
          <style type="text/css">
            {`
              body {
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
              }
            `}
          </style>
        </Helmet>
      ) : null}
      <animated.div
        css={styles.buttonWrapper}
        style={burgerMenuButtonAnimation}
      >
        <Reference
          css={styles.button}
          role="button"
          href="#"
          onClick={onIconClick}
        >
          <IconElement size={32} onMouseEnter={handleMouseEnter} />
        </Reference>
      </animated.div>
      <animated.div
        css={styles.overlay}
        style={overlayAnimation}
        onClick={onIconClick}
        // fix for scrolling on iphone
        onTouchStart={(e) => e.preventDefault()}
      />
      <animated.div
        css={styles.panelWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={expandAnimation}
      >
        <Flex
          css={styles.logoContainer}
          justifyContent="center"
          alignItems="center"
        >
          <Logo width="65px" height="32.5px" />
        </Flex>
        <Flex
          css={styles.panel}
          style={expandContentPanelAnimation}
          direction="column"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Flex
            css={styles.projectSection}
            direction="column"
            justifyContent="flex-start"
          >
            <h4 css={styles.marginless}>Projects</h4>
            <Link css={styles.transparentLink} to="/aurelins-website">
              <SubHeader css={styles.marginless}>Aurelins Website</SubHeader>
            </Link>
            <Link css={styles.transparentLink} to="/redshape">
              <SubHeader css={styles.marginless}>Redshape</SubHeader>
            </Link>
            <Link css={styles.transparentLink} to="/starbot">
              <SubHeader css={styles.marginless}>Starbot</SubHeader>
            </Link>
            <Link css={styles.transparentLink} to="/twitch-auto-points">
              <SubHeader css={styles.marginless}>Twitch Auto Points</SubHeader>
            </Link>
            <Link css={styles.transparentLink} to="/website">
              <SubHeader css={styles.marginless}>Website</SubHeader>
            </Link>
          </Flex>
          <Flex
            css={styles.utilitySection}
            direction="column"
            justifyContent="center"
          >
            <CookieManager />
            <Flex
              css={styles.utilitySection}
              justifyContent="space-between"
              alignItems="center"
            >
              <Link css={styles.transparentLink} to="/cv">
                <h4 css={styles.marginless}>CV Page</h4>
              </Link>
              <SocialButtons size={24} onlyImportant />
            </Flex>
          </Flex>
        </Flex>
      </animated.div>
    </>
  );
});

BurgerMenu.displayName = 'BurgerMenu';

export { BurgerMenu };
