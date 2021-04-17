import React, { useCallback } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';

import { GlobalStyles, OGP } from '../components/GlobalStyle';
import { AboutSection } from '../components/index/AboutSection';
import { ProjectsSection } from '../components/index/ProjectsSection';
import { AnchorListMenu } from '../components/common/Menus';
import { slugToAnchor } from '../utils';
import { Footer } from '../components/index/Footer';
import { ImagePreviewContextProvider } from '../context/ImagePreviewContextProvider';
import { MarkdownContent } from '../components/common/MarkdownContent';
import { BurgerMenu } from '../components/common/BurgerMenu';
import { CookieConsentContextProvider } from '../context/CookieConsentContextProvider';

const styles = {
  markdown: css`
    em {
      font-style: normal;
      font-weight: bold;
      background: var(--marker-green);
    }

    strong {
      background: var(--marker-yellow);
    }

    span,
    p:last-child {
      color: var(--text-color-secondary);
      font-size: smaller;
    }

    @media (min-width: 1050px) {
      font-size: 1.2rem;
    }
  `,
  relativeDiv: css`
    position: relative;
  `,
};

const IndexPage = ({ data }) => {
  const { siteMetadata } = data.site;
  const { nodes } = data.allMarkdownRemark;
  const aboutNode = nodes[0];

  const projectNodes = nodes.slice(1);
  const menuNodes = projectNodes.map((node) => ({
    name: node.frontmatter.title,
    anchor: slugToAnchor(node.fields.slug),
  }));

  const onMenuClick = useCallback((e) => {
    e.preventDefault();
    const anchor = e.target.getAttribute('data-anchor');
    const id = anchor.substring(1);
    const element = document.getElementById(id);
    const marginsAndPaddings = 55;
    window.scrollTo({
      behavior: 'smooth',
      top:
        element.getBoundingClientRect().top +
        window.pageYOffset -
        marginsAndPaddings,
    });
    return false;
  }, []);

  return (
    <>
      <GlobalStyles />
      <CookieConsentContextProvider>
        <OGP
          title={siteMetadata.title}
          description={siteMetadata.description}
        />
        <ImagePreviewContextProvider>
          <BurgerMenu />
          <main>
            <div css={styles.relativeDiv}>
              <AboutSection>
                <MarkdownContent
                  css={styles.markdown}
                  dangerouslySetInnerHTML={{ __html: aboutNode.html }}
                />
              </AboutSection>
            </div>
            <ProjectsSection nodes={projectNodes} />
          </main>
          <AnchorListMenu nodes={menuNodes} onClick={onMenuClick} />
          <Footer />
        </ImagePreviewContextProvider>
      </CookieConsentContextProvider>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { ne: "/cv/" } } }
      sort: { fields: fields___slug, order: ASC }
    ) {
      nodes {
        html
        fields {
          slug
        }
        frontmatter {
          title
          marker
          decorations {
            back {
              props {
                height
                top
              }
              squares {
                radius
                top
                left
                size
                background
                sticky
              }
              circles {
                top
                left
                size
                background
                sticky
              }
            }
            base {
              props {
                height
                top
              }
              squares {
                radius
                top
                left
                size
                background
                sticky
              }
              circles {
                top
                left
                size
                background
                sticky
              }
            }
          }
          images {
            name
            childImageSharp {
              original: fluid(maxHeight: 1080) {
                src: srcWebp
                sizes
                srcSet: srcSetWebp
                aspectRatio
                presentationWidth
                presentationHeight
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
                sizes
                srcSet: srcSetWebp
              }
            }
          }
          technologies
        }
      }
    }
  }
`;
