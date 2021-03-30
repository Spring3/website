import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Header } from '../common/Headers';
import { Project } from './Project';
import { Flex } from '../common/Flex';
import { paddingStyles } from '../common/PageWrapper';

const ProjectsWrapper = styled(Flex)`
  position: relative;

  ${paddingStyles};

  @media (max-width: 750px) {
    padding-top: 0;
  }
`;

const StickyTitle = styled(Header)`
  @media (min-width: 1000px) {
    z-index: 2;
    position: sticky;
    top: 5%;
  }

  ${paddingStyles}
  padding-top: 0px;
  padding-bottom: 0px;
`;

const ProjectsContainer = styled.div`
  padding-bottom: 25vh;
  position: relative;

  @media (max-width: 750px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

const ProjectsSection = ({ nodes }) => (
  <ProjectsContainer direction="column">
    <div>
      <StickyTitle>Projects</StickyTitle>
      <ProjectsWrapper direction="column" gap="5rem">
        {nodes.map((node, i) => {
          const theme = { marker: node.frontmatter.marker };
          return (
            <ThemeProvider key={node.fields.slug} theme={theme}>
              <Project node={node} index={i} />
            </ThemeProvider>
          );
        })}
      </ProjectsWrapper>
    </div>
  </ProjectsContainer>
);

export { ProjectsSection };
