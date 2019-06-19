import React from 'react';
import styled from 'styled-components';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';


const Link = styled.a`
  background: none !important;

  svg {
    vertical-align: middle;
  }
`;

export default ({ href }) => (
  <Link
    href={href}
    target="__blank"
    rel="noopener noreferrer"
  >
    <GithubCircleIcon size={32} color="#333" />
  </Link>
)
