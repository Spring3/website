import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import 'normalize.css';

import Menu from '../components/Menu';
import Content from '../components/Content';
import AboutSection from '../components/AboutSection';

export default ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  const aboutNode = nodes.shift();
  return (
    <Fragment>
      <Menu />
      <Content>
        <AboutSection>
          <h1>{aboutNode.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: aboutNode.html }} />  
        </AboutSection>
        <div>
          <h1>Projects</h1>
          {
            nodes.map((node, i) => (
              <section key={i}>
                <img
                  loading="lazy"
                  src={node.frontmatter.thumbnail.childImageSharp.sizes.src}
                  alt={node.frontmatter.thumbnail.name}
                  width={node.frontmatter.thumbnail.childImageSharp.sizes.presentationWidth}
                  height={node.frontmatter.thumbnail.childImageSharp.sizes.presentationHeight}
                />
                <Link to={node.fields.slug}><h1>{node.frontmatter.title}</h1></Link>
                <p>{node.frontmatter.description}</p>
                <ul>
                  {node.frontmatter.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </section>
            ))
          }
        </div>
      </Content>
    </Fragment>
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
