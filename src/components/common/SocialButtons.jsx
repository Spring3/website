import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import GithubIcon from 'mdi-react/GithubIcon';
import LinkedInIcon from 'mdi-react/LinkedinIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';
import SpotifyIcon from 'mdi-react/SpotifyIcon';
import { Flex } from './Flex';

const styles = css`
  background: transparent;
  padding: 0px;
  justify-content: center;
  display: flex;
`;

const OnlyImportantSocialButtons = ({ size }) => (
  <>
    <a
      css={styles}
      href="https://github.com/Spring3"
      target="_blank"
      rel="noreferrer noopener"
    >
      <GithubIcon color="#333" size={size} />
    </a>
    <a
      css={styles}
      href="https://www.linkedin.com/in/dvasylenko/"
      target="_blank"
      rel="noreferrer noopener"
    >
      <LinkedInIcon color="#0077b5" size={size} />
    </a>
    <a
      css={styles}
      href="mailto:connect.danv@gmail.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <EmailOutlineIcon color="#ea4335" size={size} />
    </a>
    <a
      css={styles}
      href="https://twitter.com/dan_vasylenko"
      target="_blank"
      rel="noreferrer noopener"
    >
      <TwitterIcon color="#1da1f2" size={size} />
    </a>
  </>
);

const SocialButtons = ({ className, size, onlyImportant, ...rest }) => {
  if (onlyImportant) {
    return (
      <Flex
        gap="1rem"
        margined
        alignItems="center"
        className={className}
        {...rest}
      >
        <OnlyImportantSocialButtons size={size} />
      </Flex>
    );
  }

  return (
    <Flex
      gap="1rem"
      margined
      alignItems="center"
      className={className}
      {...rest}
    >
      <OnlyImportantSocialButtons size={size} />
      <a
        css={styles}
        href="https://open.spotify.com/user/21vcdhgxp3gqinwau2aynzg7i?si=onT2d2-dTA-RqL7xHLI2Tw"
        target="_blank"
        rel="noreferrer noopener"
      >
        <SpotifyIcon color="#1db954" size={size} />
      </a>
    </Flex>
  );
};

SocialButtons.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  onlyImportant: PropTypes.bool,
};

SocialButtons.defaultProps = {
  size: 25,
  className: undefined,
  onlyImportant: false,
};

export { SocialButtons };
