import React from 'react';
import styled from 'styled-components';
import GithubIcon from 'mdi-react/GithubIcon';
import CardSearchOutlineIcon from 'mdi-react/CardSearchOutlineIcon';
import ChromeIcon from 'mdi-react/GoogleChromeIcon';
import FirefoxIcon from 'mdi-react/FirefoxIcon';
import { Reference } from '../common/Reference';

const StyledReference = styled(Reference)`
  display: flex !important;
  flex-wrap: wrap;
  background: none;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  svg {
    margin-right: ${(props) => props.onlyIcons ? '0rem' : '0.5rem'};
    vertical-align: middle;
  }

  &:visited,
  &:focus,
  &:hover {
    border-radius: 3px;
  }

  @media (max-width: 750px) {
    font-size: 1rem;
    margin-right: 1rem;
  }
`;

const ProjectReference = ({ href, children, onlyIcons }) => (
  <StyledReference href={href} newTab onlyIcons={onlyIcons}>
    {children}
  </StyledReference>
);

const ProjectReferences = ({ frontmatter, size = 30, onlyIcons = false }) => {
  const components = [];

  if (frontmatter.chrome) {
    components.push(
      <ProjectReference key={frontmatter.chrome} href={frontmatter.chrome} onlyIcons={onlyIcons}>
        <ChromeIcon size={size} />
        {onlyIcons ? '' : ' Chrome Store'}
      </ProjectReference>
    );
  }

  if (frontmatter.firefox) {
    components.push(
      <ProjectReference key={frontmatter.firefox} href={frontmatter.firefox} onlyIcons={onlyIcons}>
        <FirefoxIcon size={size} />
        {onlyIcons ? '' : ' Firefox Store'}
      </ProjectReference>
    );
  }

  if (frontmatter.demo) {
    components.push(
      <ProjectReference key={frontmatter.demo} href={frontmatter.demo} onlyIcons={onlyIcons}>
        <CardSearchOutlineIcon size={size} />
        {onlyIcons ? '' : ' Demo'}
      </ProjectReference>
    );
  }

  if (frontmatter.repository) {
    components.push(
      <ProjectReference
        key={frontmatter.repository}
        href={frontmatter.repository}
        onlyIcons={onlyIcons}
      >
        <GithubIcon size={size} />
        {onlyIcons ? '' : ' Source'}
      </ProjectReference>
    );
  }

  return components;
};

export { ProjectReferences };
