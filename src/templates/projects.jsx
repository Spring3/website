import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import { css, cx } from '@emotion/css';
import { animated, useChain, useSpring, useSpringRef } from 'react-spring';

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

import {
  revealBottom,
  revealLeft,
  revealRight,
  revealTop,
} from '../animations';
import { CookieConsentContextProvider } from '../context/CookieConsentContextProvider';

const styles = {
  pageLayout: css`
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
  `,
  relative: css`
    position: relative;
  `,
  referenceContainer: css`
    @media (max-width: 750px) {
      justify-content: flex-start;
    }
  `,
  infoWrapper: css`
    grid-area: info;
  `,
  contentNav: css`
    grid-area: nav;
  `,
  info: css`
    grid-area: content;
  `,
};

const ProjectsPage = (props) => {
  const imagesAnimationRef = useSpringRef();
  const referencesAnimationRef = useSpringRef();
  const tagsAnimationRef = useSpringRef();
  // eslint-disable-next-line
  const post = props.data.markdownRemark;
  // eslint-disable-next-line
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

  const contentRevealAnimation = useSpring(revealLeft({}));
  const imageRevealAnimation = useSpring(
    revealRight({ ref: imagesAnimationRef })
  );
  const referencesAnimation = useSpring(
    revealTop({ ref: referencesAnimationRef })
  );
  const tagsAnimation = useSpring(revealBottom({ ref: tagsAnimationRef }));

  useChain(
    [imagesAnimationRef, referencesAnimationRef, tagsAnimationRef],
    [0, 0.5, 0.5]
  );

  const ogpDescription = post.excerptAst.children
    .find((child) => child.tagName === 'p')
    ?.children.find((child) => child.type === 'text')?.value;

  return (
    <>
      <GlobalStyles />
      <CookieConsentContextProvider>
        <OGP
          title={post.frontmatter.title}
          description={ogpDescription}
          image={post.frontmatter.thumbnail.childImageSharp.fluid.src}
        />
        <ThemeProvider theme={theme}>
          <ImagePreviewContextProvider>
            <PageWrapper>
              <Navbar margined>
                <ButtonBack
                  withColorfulBackground={activeAnchor === '#title'}
                  href={`/${anchor}`}
                  value="Main page"
                />
              </Navbar>
              <BurgerMenu />
              <div className={styles.pageLayout}>
                <Flex
                  className={styles.contentNav}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <animated.div
                    className={styles.relative}
                    id="title"
                    style={contentRevealAnimation}
                  >
                    <Subheading>{post.frontmatter.title}</Subheading>
                  </animated.div>
                  <Flex
                    className={cx(styles.relative, styles.referenceContainer)}
                    style={referencesAnimation}
                    alignItems="center"
                    flexWrap="wrap"
                    gap="1.5rem"
                    margined
                    justifyContent="flex-end"
                  >
                    <ProjectReferences
                      size={25}
                      frontmatter={post.frontmatter}
                    />
                  </Flex>
                </Flex>
                <animated.div
                  className={cx(styles.relative, styles.infoWrapper)}
                  style={contentRevealAnimation}
                >
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
                </animated.div>
                <animated.div
                  className={cx(styles.relative, styles.info)}
                  style={imageRevealAnimation}
                >
                  <ImageCarousel images={images} />
                  <Tags
                    style={tagsAnimation}
                    tags={post.frontmatter.technologies}
                  />
                </animated.div>
              </div>
              <SlugListMenu active={post.fields.slug} slugs={slugs} />
            </PageWrapper>
          </ImagePreviewContextProvider>
        </ThemeProvider>
      </CookieConsentContextProvider>
    </>
  );
};

export default ProjectsPage;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerptAst
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
            original: fluid(quality: 100, maxHeight: 1920) {
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
            fluid(quality: 100, maxHeight: 1920) {
              src
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
