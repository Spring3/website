import React, { useEffect, useMemo, useState, memo } from 'react';
import { css } from '@emotion/react';
import CookieOutlineIcon from 'mdi-react/CookieIcon';
import CaretDownIcon from 'mdi-react/CaretDownOutlineIcon';
import CaretUpIcon from 'mdi-react/CaretUpOutlineIcon';
import { useSpring, animated } from 'react-spring';
import { useLocation, useTimeout, useTimeoutFn } from 'react-use';
import { Button, FlatButton } from '../buttons';
import { Flex } from '../Flex';
import { MARKERS } from '../../../theme';
import { Reference } from '../Reference';
import { useCookieConsent } from '../../../context/CookieConsentContext';
import { useWindowSizeDef } from '../../../hooks/useWindowSizeDef';

const styles = {
  container: css`
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 0px 5px lightgrey;
    padding: 1.5rem;
    border-radius: 5px;
    z-index: 4;
    width: 300px;
    max-width: 60%;

    @media (min-width: 750px) {
      left: 2rem;
      bottom: 2rem;
    }
  `,
  header: css`
    margin-top: 0px;
  `,
  icon: css`
    vertical-align: bottom;
  `,
  description: css`
    max-width: 300px;
    overflow: hidden;
    overflow-y: scroll;
    margin: 0;
    transition: height 0.4s;
  `,
  policyLink: css`
    margin-bottom: 1rem;
  `,
};

const CookieBanner = memo(() => {
  const [isExpanded, setExpanded] = useState(false);
  const windowSize = useWindowSizeDef();
  const location = useLocation();
  const [isReady] = useTimeout(3000);
  const [, cancelExpand] = useTimeoutFn(() => setExpanded(true), 4500);
  const [, cancelShrink] = useTimeoutFn(() => setExpanded(false), 9500);

  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  useEffect(
    () => () => {
      cancelExpand();
      cancelShrink();
    },
    []
  );

  const [introAnimation, setIntoAnimation] = useSpring(() => ({
    left: '-50rem',
  }));

  const descriptionAnimation = useSpring({
    maxHeight: isExpanded ? '400px' : '0px',
    margin: isExpanded ? '0px 0px 20px 0px' : '0px 0px 0px 0px',
  });

  const onAccept = async () => {
    acceptCookies();
    setIntoAnimation({ left: '-50rem' });
  };

  const onReject = async () => {
    rejectCookies();
    setIntoAnimation({ left: '-50rem' });
  };

  const onCaretClick = (e) => {
    e.preventDefault();
    setExpanded(!isExpanded);
  };

  const theme = useMemo(
    () => ({
      marker: MARKERS.red,
    }),
    []
  );

  const canAnimate = isReady();

  useEffect(() => {
    let isMounted = true;

    if (consent === null && canAnimate) {
      const distanceFromTheBorder = windowSize.isSmall ? '1rem' : '2rem';
      setIntoAnimation({ left: distanceFromTheBorder });
    } else if (isMounted && consent === true) {
      setIntoAnimation({ left: '-50rem' });
    }

    return () => {
      isMounted = false;
    };
  }, [consent, windowSize.isSmall, canAnimate, location]);

  if (typeof currentConsent === 'boolean') {
    return null;
  }

  return (
    <animated.div css={styles.container} style={introAnimation}>
      <Flex alignItems="center" justifyContent="space-between">
        <h3 css={styles.header}>
          <CookieOutlineIcon css={styles.icon} size={40} color="#875A34" />{' '}
          Cookies!
        </h3>
        <FlatButton onClick={onCaretClick}>
          {isExpanded ? (
            <CaretDownIcon css={styles.icon} />
          ) : (
            <CaretUpIcon css={styles.icon} />
          )}
        </FlatButton>
      </Flex>
      <animated.div css={styles.description} style={descriptionAnimation}>
        <p>
          I use anonymised google analytics cookies to see if anyone visits this
          website at all. Neither do I export nor use this data in any way other
          than observative.
        </p>
        <Reference
          css={styles.policyLink}
          href="https://policies.google.com/technologies/partner-sites"
          newTab
        >
          Google Privacy & Terms
        </Reference>
      </animated.div>
      <div>
        <Button onClick={onAccept}>Accept</Button>
        <Button onClick={onReject} theme={theme}>
          Reject
        </Button>
      </div>
    </animated.div>
  );
});

CookieBanner.displayName = 'CookieBanner';

export { CookieBanner };
