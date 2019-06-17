import React from 'react';
import { graphql } from 'gatsby';

import PageWrapper from '../components/PageWrapper';
import BackButton from '../components/BackButton';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <PageWrapper>
      <BackButton href={post.frontmatter.previous}/>
      <div>
        <PageHeader>{post.frontmatter.title}</PageHeader>
        <PageContent dangerouslySetInnerHTML={{ __html: post.html }} />
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
