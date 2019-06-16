import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import AboutSection from '../components/AboutSection';
import PageWrapper from '../components/PageWrapper';
import ProjectsSection from '../components/ProjectsSection';

const IntroSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  const aboutNode = nodes.shift();
  return (
    <PageWrapper>
      <IntroSection>
        <AboutSection>
          <div dangerouslySetInnerHTML={{ __html: aboutNode.html }} />
        </AboutSection>
      </IntroSection>
      <ProjectsSection nodes={nodes} />
    </PageWrapper>
  )
};

export const query = graphql`
  query {
    allMarkdownRemark (
      filter: {
        fields: {
          slug: {
            ne: "/cv/"
          }
        }
      },
      sort: {
        fields: fields___slug,
        order: ASC
      }
    ) {
      nodes {
        html
        fields {
          slug
        }
        frontmatter {
          title
          description
          marker
          thumbnail {
            name
            childImageSharp {
              fluid(maxWidth: 900) {
                src
                sizes
                srcSet
              }
            }
          }
          tags
        }
      }
    }
  }
`
