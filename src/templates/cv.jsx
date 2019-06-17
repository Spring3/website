import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import PageWrapper from '../components/PageWrapper';
import BackButton from '../components/BackButton';

const Header = styled.h1`
  @media (min-width: 750px) {
    font-size: 2.5rem;
  }

  display: inline-block;
  background: linear-gradient(to bottom, transparent 0%, transparent 60%, var(--marker-primary) 60%, var(--marker-primary) 100%);
`;

const Content = styled.div`
  @media (min-width: 750px) {
    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    p,ul {
      font-size: 1.2rem;
    }
  }
  h2 {
    display: inline-block;
    background: linear-gradient(to bottom, transparent 0%, transparent 60%, var(--marker-secondary) 60%, var(--marker-secondary) 100%);
  }

  text-align: justify;

  li {
    margin-top: 5px;
  }
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <PageWrapper>
      <BackButton href={post.frontmatter.previous}/>
      <div>
        <Header>{post.frontmatter.title}</Header>
        <Content dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
    }
  }
`
