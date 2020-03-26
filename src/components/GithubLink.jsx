import React from 'react';
import styled from 'styled-components';
import GithubIcon from 'mdi-react/GithubIcon';


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
    <GithubIcon size={32} color="#333" />
  </Link>
)
