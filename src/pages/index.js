import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import GlobalStyle from '../components/GlobalStyle';
import AboutSection from '../components/AboutSection';
import PageWrapper from '../components/PageWrapper';

const IntroSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  const aboutNode = nodes.shift();
  return (
    <PageWrapper>
      <GlobalStyle />
      <IntroSection>
        <AboutSection>
          <div dangerouslySetInnerHTML={{ __html: aboutNode.html }} />
        </AboutSection>
      </IntroSection>
      <div>
        <h1>Projects</h1>
        {nodes.map((node, i) => (
          <section key={i}>
            <img
              loading="lazy"
              src={node.frontmatter.thumbnail.childImageSharp.sizes.src}
              alt={node.frontmatter.thumbnail.name}
            />
            <Link to={node.fields.slug}>
              <h1>{node.frontmatter.title}</h1>
            </Link>
            <p>{node.frontmatter.description}</p>
            <ul>
              {node.frontmatter.tags.map((tag, i) => (
                <li key={i}>{tag}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
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
          thumbnail {
            name
            childImageSharp {
              sizes(maxWidth: 600) {
                src
                presentationWidth
                presentationHeight
              }
            }
          }
          tags
        }
      }
    }
  }
`
