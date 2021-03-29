import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles, OGP } from '../components/GlobalStyle';
import { ButtonBack } from '../components/common/buttons';
import { MarkdownContent } from '../components/common/MarkdownContent';
import { Subheading } from '../components/project/Header';
import { Tags } from '../components/common/Tags';
import { ProjectReferences } from '../components/project/ProjectReferences';
import { SlugListMenu } from '../components/common/Menus';
import { PageWrapper } from '../components/common/PageWrapper';
import { Navbar } from '../components/common/Navbar';
import { ImageCarousel } from '../components/common/ImageCarousel';
import { Flex } from '../components/common/Flex';
import { ImagePreviewContextProvider } from '../context/ImagePreviewContextProvider';
import { BurgerMenu } from '../components/common/BurgerMenu';
import { slugToAnchor } from '../utils';
import { useAnchorTracker } from '../hooks/useAnchorTracker';

const PageLayout = styled.div`
  display: grid;
  grid-gap: 0rem 3rem;
  margin: 0 auto;
  margin-bottom: 3rem;

  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  grid-template-areas:
    'nav nav nav nav'
    'info info content content'
    'info info content content';

  @media (max-width: 850px) {
    grid-template-columns: repeat(4, 25%);
    grid-gap: 0rem;

    grid-template-areas:
      'nav nav nav nav'
      'info info info info'
      'content content content content';
  }

  @media (max-width: 700px) {
    grid-gap: 0rem;

    grid-template-areas:
      'nav nav nav nav'
      'info info info info'
      'content content content content';
  }
`;

const ProjectReferenceContainer = styled(Flex)`
  @media (max-width: 750px) {
    justify-content: flex-start;
  }
`;

const ProjectInfoWrapper = styled.div`
  grid-area: info;
`;

const ProjectContentNav = styled(Flex)`
  grid-area: nav;
`;

const ProjectInfo = styled.div`
  grid-area: content;
`;

const ProjectsPage = (props) => {
  const post = props.data.markdownRemark;
  const allPosts = props.data.allMarkdownRemark.nodes;
  const anchor = slugToAnchor(post.fields.slug);
  const activeAnchor = useAnchorTracker(['#title']);

  const slugs = allPosts.map((node) => node.fields.slug);

  const theme = useMemo(() => ({ marker: post.frontmatter.marker }), [
    post.frontmatter.marker,
  ]);

  const images = post.frontmatter.images.map((image) => ({
    name: image.name,
    ...image.childImageSharp.original,
    placeholder: image.childImageSharp.placeholder.base64,
  }));

  return (
    <>
      <GlobalStyles />
      <OGP
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.thumbnail.childImageSharp.fluid.src}
      />
      <ThemeProvider theme={theme}>
        <ImagePreviewContextProvider>
          <PageWrapper>
            <Navbar withBurgerMenu margined>
              <ButtonBack withColorfulBackground={activeAnchor === '#title'} href={`/${anchor}`} value="Main page" />
            </Navbar>
            <BurgerMenu />
            <PageLayout>
              <ProjectContentNav
                alignItems="center"
                justifyContent="space-between"
              >
                <div id="title">
                  <Subheading>{post.frontmatter.title}</Subheading>
                </div>
                <ProjectReferenceContainer
                  alignItems="center"
                  flexWrap="wrap"
                  gap="1.5rem"
                  margined
                  justifyContent="flex-end"
                >
                  <ProjectReferences size={25} frontmatter={post.frontmatter} />
                </ProjectReferenceContainer>
              </ProjectContentNav>
              <ProjectInfoWrapper>
                <MarkdownContent
                  id="markdown"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {post.frontmatter.description.map((description) => {
                  if (description.href) {
                    return (
                      <MarkdownContent key={description.href}>
                        <p>
                          <a href={description.href}>{description.text}</a>
                        </p>
                      </MarkdownContent>
                    );
                  }

                  if (description.text) {
                    return (
                      <MarkdownContent key={description.text}>
                        <p>{description.text}</p>
                      </MarkdownContent>
                    );
                  }

                  return null;
                })}
              </ProjectInfoWrapper>
              <ProjectInfo>
                <ImageCarousel images={images} />
                <Tags tags={post.frontmatter.technologies} />
              </ProjectInfo>
            </PageLayout>
            <SlugListMenu active={post.fields.slug} slugs={slugs} />
          </PageWrapper>
        </ImagePreviewContextProvider>
      </ThemeProvider>
    </>
  );
};

export default ProjectsPage;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description {
          text
          href
        }
        demo
        repository
        chrome
        firefox
        marker
        technologies
        images {
          name
          childImageSharp {
            original: fluid(maxHeight: 1080) {
              src: srcWebp
              sizes
              srcSet: srcSetWebp
            }
            placeholder: fluid(quality: 1, maxWidth: 10) {
              base64
            }
          }
        }
        thumbnail {
          name
          childImageSharp {
            fluid(maxHeight: 1080) {
              src: srcWebp
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { nin: ["/cv/", "/"] } } }
      sort: { fields: fields___slug, order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
