import React from 'react';
import styled from 'styled-components';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import LinkedinBoxIcon from 'mdi-react/LinkedinBoxIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';

const SocialButtons = styled.ul`
  list-style-type: none;
  li {
    display: inline;
  }
`;

export default () => (
  <SocialButtons>
    <li>
      <a
        href="https://github.com/Spring3"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GithubCircleIcon />
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/dvasylenko/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedinBoxIcon />
      </a>
    </li>
    <li>
      <a
        href="https://twitter.com/danspr3"
        target="_blank"
        rel="noreferrer noopener"
      >
      <TwitterIcon />
      </a>
    </li>
    <li>
      <a
        href="mailto:daniyil.vasylenko@gmail.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <EmailOutlineIcon />
      </a>
    </li>
  </SocialButtons>
)
