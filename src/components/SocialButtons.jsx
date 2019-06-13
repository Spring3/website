import React from 'react';
import styled from 'styled-components';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import LinkedinBoxIcon from 'mdi-react/LinkedinBoxIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';

const SocialButtons = styled.ul`
  margin-top: 1rem;
  list-style-type: none;
  padding: 0px;
  vertical-align: middle;
  li {
    display: inline-block;
    margin-right: 1rem;

    a {
      background: transparent !important;
      padding: 0px;
      display: inline-block;

      svg {
        width: 2rem;
        height: 2rem;

        @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
        (max-width: 750px) {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &:hover {
        svg {
          animation: pulse ease 1s infinite;
        }
      }
    }
  }

  
  
  
`;

export default ({ className, style }) => (
  <SocialButtons className={className} style={style}>
    <li>
      <a
        href="https://github.com/Spring3"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GithubCircleIcon color="#333" />
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/dvasylenko/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedinBoxIcon color="#0077b5" />
      </a>
    </li>
    <li>
      <a
        href="https://twitter.com/danspr3"
        target="_blank"
        rel="noreferrer noopener"
      >
      <TwitterIcon color="#1da1f2" />
      </a>
    </li>
    <li>
      <a
        href="mailto:daniyil.vasylenko@gmail.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <EmailOutlineIcon color="#ea4335" />
      </a>
    </li>
  </SocialButtons>
);
