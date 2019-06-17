import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import BackButton from '../components/BackButton';
import PageWrapper from '../components/PageWrapper';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import GithubLink from '../components/GithubLink';

const SourceCodeLink = styled.p`
  margin: 0;

  a {
    margin-left: .5rem;
    svg {
      vertical-align: bottom;
    }
  }
`;

export default (props) => {
  const post = props.data.markdownRemark;
  return (
    <PageWrapper>
      <BackButton href={post.frontmatter.previous} />
      <div>
        <PageHeader>{post.frontmatter.title}</PageHeader>
        <PageContent>
          <SourceCodeLink>
            <strong>Source Code:</strong><GithubLink href={post.frontmatter.repository} />
          </SourceCodeLink>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <h2>Screenshots</h2>
          <Carousel
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={true}
          >
            {
              post.frontmatter.images.map((image, i) => (
                <div key={i}>
                  <img
                    key={i}
                    alt={image.name}
                    src={image.childImageSharp.fluid.src}
                    srcSet={image.childImageSharp.fluid.srcSet}
                    sizes={image.childImageSharp.fluid.sizes}
                  />
                </div>
              )) 
            }
          </Carousel>
        </PageContent>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        previous
        repository
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
