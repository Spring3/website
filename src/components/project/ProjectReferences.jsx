import React from 'react';
import { css } from '@emotion/react';
import GithubIcon from 'mdi-react/GithubIcon';
import CardSearchOutlineIcon from 'mdi-react/CardSearchOutlineIcon';
import ChromeIcon from 'mdi-react/GoogleChromeIcon';
import FirefoxIcon from 'mdi-react/FirefoxIcon';
import { Reference } from '../common/Reference';

const styles = {
  reference: css`
    display: flex !important;
    flex-wrap: wrap;
    background: none;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;

    &:visited,
    &:focus,
    &:hover {
      border-radius: 3px;
    }

    @media (max-width: 750px) {
      font-size: 1rem;
      margin-right: 1rem;
    }
  `,
  onlyIcons: css`
    margin-right: 0rem;
    vertical-align: middle;
  `,
  icons: css`
    margin-right: 0.5rem;
    vertical-align: middle;
  `,
};

const ProjectReference = ({ href, children }) => (
  <Reference css={styles.reference} href={href} newTab>
    {children}
  </Reference>
);

const ProjectReferences = ({ frontmatter, size = 30, onlyIcons = false }) => {
  const components = [];

  if (frontmatter.chrome) {
    components.push(
      <ProjectReference key={frontmatter.chrome} href={frontmatter.chrome}>
        <ChromeIcon
          css={onlyIcons ? [styles.onlyIcons] : [styles.icons]}
          size={size}
        />
        {onlyIcons ? '' : ' Chrome Store'}
      </ProjectReference>
    );
  }

  if (frontmatter.firefox) {
    components.push(
      <ProjectReference key={frontmatter.firefox} href={frontmatter.firefox}>
        <FirefoxIcon
          css={onlyIcons ? [styles.onlyIcons] : [styles.icons]}
          size={size}
        />
        {onlyIcons ? '' : ' Firefox Store'}
      </ProjectReference>
    );
  }

  if (frontmatter.demo) {
    components.push(
      <ProjectReference key={frontmatter.demo} href={frontmatter.demo}>
        <CardSearchOutlineIcon
          css={onlyIcons ? [styles.onlyIcons] : [styles.icons]}
          size={size}
        />
        {onlyIcons ? '' : ' Demo'}
      </ProjectReference>
    );
  }

  if (frontmatter.repository) {
    components.push(
      <ProjectReference
        key={frontmatter.repository}
        href={frontmatter.repository}
      >
        <GithubIcon
          css={onlyIcons ? [styles.onlyIcons] : [styles.icons]}
          size={size}
        />
        {onlyIcons ? '' : ' Source'}
      </ProjectReference>
    );
  }

  return components;
};

export { ProjectReferences };
