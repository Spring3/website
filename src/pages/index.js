import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import AboutSection from '../components/AboutSection';

export default ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  return (
    <Layout>
      {
        nodes.map((node, i) => {
          if (i === 0) {
            return (
              <AboutSection key={i}>
                <h1>{node.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: node.html }} />  
              </AboutSection>
            )
          }
          return (
            <section key={i}>
              <img src={node.frontmatter.thumbnail.publicURL} />
              <Link to={node.fields.slug}><h1>{node.frontmatter.title}</h1></Link>
              <p>{node.frontmatter.description}</p>
              <ul>
                {node.frontmatter.tags.map((tag, i) => (
                  <li>{tag}</li>
                ))}
              </ul>
            </section>
          )
        })
      }
    </Layout>
  );
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
            publicURL
          }
          tags
        }
      }
    }
  }
`
