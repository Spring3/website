import React from 'react';
import { graphql, Link } from 'gatsby';

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
      <ul>
        {
          post.frontmatter.tags.map((tag, i) => (<li key={i}>{tag}</li>))
        }
      </ul>
      {
        post.frontmatter.images.map((image, i) => (
          <img
            key={i}
            alt={image.name}
            src={image.childImageSharp.sizes.src}
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
            sizes(maxWidth: 600) {
              src
              presentationWidth
              presentationHeight
            }
          }
        }
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
      }
    }
  }
`
