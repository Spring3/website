import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';
import DownloadOutlineIcon from 'mdi-react/DownloadOutlineIcon';

import PageWrapper from '../components/PageWrapper';
import BackButton from '../components/BackButton';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import Navbar from '../components/Navbar';

const DownloadButton = styled.a`
  margin-left: 2rem;
  vertical-align: top;
  text-decoration: none;
  background: var(--marker-danger) !important;
  padding: 10px;

  &:hover {
    box-shadow: 0px 0px 10px var(--marker-danger);
  }

  &:pressed {
    box-shadow: inset 0px 0px 10px var(--marker-danger);
  }
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <PageWrapper>
      <Navbar>
        <BackButton href={post.frontmatter.previous}/>
        <DownloadButton href="https://drive.google.com/uc?export=download&id=1Q9lHeyQGoNCadM-N4gULbmgvrYekweKU">
          <DownloadOutlineIcon /> Download .pdf
        </DownloadButton>
      </Navbar>
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <div>
          <PageHeader>{post.frontmatter.title}</PageHeader>
          <PageContent dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Animated>
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
