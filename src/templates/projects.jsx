import React from 'react';
import { graphql, Link } from 'gatsby';

import Tags, { Tag } from '../components/Tags';

export default (props) => {
  const post = props.data.markdownRemark;
  return (
    <div>
      <button>
        <Link to={post.previous}>Back</Link>
      </button>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <h2>Technologies</h2>
      <Tags>
        {
          post.frontmatter.tags.map((tag, i) => (<Tag key={i}>{tag}</Tag>))
        }
      </Tags>
      {
        post.frontmatter.images.map((image, i) => (
          <img
            key={i}
            alt={image.name}
            src={image.childImageSharp.fluid.src}
            srcSet={image.childImageSharp.fluid.srcSet}
            sizes={image.childImageSharp.fluid.sizes}
          />
        )) 
      }
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        previous
        tags
        images {
          name
          childImageSharp {
            fluid(maxWidth: 900) {
              src
              sizes
              srcSet
            }
          }
        }
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
      }
    }
  }
`
