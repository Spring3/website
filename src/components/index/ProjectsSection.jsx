import React from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { Header } from '../common/Headers';
import { Project } from './Project';
import { Flex } from '../common/Flex';
import { paddingStyles } from '../common/PageWrapper';

const styles = {
  projectsWrapper: css`
    position: relative;

    ${paddingStyles};

    @media (max-width: 750px) {
      padding-top: 0;
      padding-bottom: 4rem;
    }
  `,
  stickyTitle: css`
    @media (min-width: 1050px) {
      z-index: 2;
      position: sticky;
      top: 5%;
    }

    ${paddingStyles}
    padding-top: 0px;
    padding-bottom: 0px;
  `,
  container: css`
    padding-bottom: 15vh;
    position: relative;

    @media (max-width: 750px) {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
    }
  `,
};

const ProjectsSection = ({ nodes }) => (
  <div direction="column">
    <div>
      <Header css={styles.stickyTitle}>Projects</Header>
      <Flex css={styles.projectsWrapper} direction="column" gap="5rem">
        {nodes.map((node, i) => {
          const theme = { marker: node.frontmatter.marker };
          return (
            <ThemeProvider key={node.fields.slug} theme={theme}>
              <Project node={node} index={i} />
            </ThemeProvider>
          );
        })}
      </Flex>
    </div>
  </div>
);

export { ProjectsSection };
