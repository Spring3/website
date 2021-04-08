import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { css } from '@emotion/css';

import { animated, useSpring } from 'react-spring';
import { useIntersection, usePrevious } from 'react-use';
import { Tags } from '../common/Tags';
import { FixedImageSet } from '../project/FixedImageSet';
import { slugToAnchor } from '../../utils';
import { Link } from '../common/Reference';
import { MarkdownContent } from '../common/MarkdownContent';
import { ImageCarousel } from '../common/ImageCarousel';
import { Flex } from '../common/Flex';
import { Decorations, Rectangle, Circle } from '../common/Decorations';
import { SubHeader } from '../common/Headers';
import { revealBottom } from '../../animations';
import { useWindowSizeDef } from '../../hooks/useWindowSizeDef';

const styles = {
  projectInfo: css`
    @media (min-width: 1050px) {
      position: sticky;
      top: 16%;
      z-index: 2;
    }
  `,
  infoWrapper: css`
    width: 100%;
    position: relative;

    @media (min-width: 1051px) {
      padding-right: 1rem;
      width: 40%;
      position: sticky;
      top: 16%;
    }
  `,
  imageWrapper: css`
    width: 58%;
    gap: 0px;
    position: relative;

    @media (max-width: 1200px) {
      width: 58%;
      gap: 0px 1rem;
    }

    @media (max-width: 1050px) {
      display: none;
    }
  `,
  projectRow: css`
    width: 100%;
    position: relative;

    @supports (-moz-appearance: none) {
      transform: none !important;
    }
  `,
  projectRowWrapper: css`
    width: 100%;
  `,
  projectTitle: css`
    margin-bottom: 1.5rem;
    margin-top: 0px;
  `,
  projectMarkdownContent: css`
    font-size: 1rem;
    -webkit-line-clamp: 1;

    @media (max-width: 1050px) {
      margin-top: 2.5rem;
    }

    border-left: 5px solid ${(theme) => theme?.marker};
    padding-left: 1rem;
  `,
  imageCarousel: css`
    @media (min-width: 1050px) {
      display: none;
    }
  `,
  decorations: css`
    @media (max-width: 1050px) {
      display: none;
    }
  `,
};

const Project = ({ node, index }) => {
  const [wasRevealed, setRevealed] = useState(false);
  const anchor = slugToAnchor(node.fields.slug);

  const projectRef = useRef();
  const windowSize = useWindowSizeDef();
  const id = anchor.substring(1);

  const wasSmallScreen = usePrevious(windowSize.isMedium);

  const images = node.frontmatter.images.map((image) => ({
    name: image.name,
    ...image.childImageSharp.original,
    placeholder: image.childImageSharp.placeholder.base64,
  }));

  const intersection = useIntersection(projectRef, {
    rootMargin: windowSize.isMedium ? '0px' : '-350px',
  });

  const isIntersecting = intersection?.isIntersecting;

  const initialAnimationState = {
    opacity: 0,
  };

  // if (windowSize.isMedium) {
  //   initialAnimationState.bottom = '-100px';
  // } else {
  initialAnimationState.transform = 'translateY(100px)';
  // }

  const [revealAnimation, animateSection] = useSpring(
    () => initialAnimationState
  );
  const [tagAnimation, animateTags] = useSpring(() => revealBottom({}).initial);
  const [revealDecorations, animateDecorations] = useSpring(
    () => revealBottom({}).initial
  );

  useEffect(() => {
    if (!wasRevealed && isIntersecting) {
      setRevealed(true);
      const revealAnimationConfig = {
        opacity: 1,
        immediate: false,
        delay: 100,
        config: {
          reset: false,
        },
      };

      // if (windowSize.isMedium) {
      //   revealAnimationConfig.bottom = '0px';
      // } else {
      revealAnimationConfig.transform = 'translateY(0%)';
      // }

      animateSection(revealAnimationConfig);
      animateTags(revealBottom({ delay: 200 }));
      animateDecorations(revealBottom({ delay: 500 }));
    }
  }, [wasRevealed, isIntersecting]);

  useEffect(() => {
    if (wasSmallScreen !== windowSize.isMedium) {
      setRevealed(false);
    }
  }, [wasSmallScreen, windowSize.isMedium]);

  const renderLayer = useCallback(
    (key, layerData) => {
      if (!layerData) {
        return null;
      }

      const { props, squares, circles } = layerData;

      return (
        <Decorations
          className={styles.decorations}
          key={key}
          layer={key}
          {...props}
          style={revealDecorations}
        >
          {squares?.map((squareProps, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Rectangle {...squareProps} key={`square-${i}`} />
          ))}
          {circles?.map((cirlceProps, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Circle {...cirlceProps} key={`circle-${i}`} />
          ))}
        </Decorations>
      );
    },
    [id]
  );

  const decorationLayers = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return Object.entries(
      node.frontmatter.decorations || {}
    ).map(([layerKey, layerData]) => renderLayer(layerKey, layerData));
  }, [renderLayer]);

  return (
    <div className={styles.projectRowWrapper} ref={projectRef}>
      <Flex
        className={styles.projectRow}
        id={id}
        style={revealAnimation}
        justifyContent="space-between"
      >
        <animated.div className={styles.infoWrapper}>
          <animated.div className={styles.projectInfo} index={index}>
            <SubHeader className={styles.projectTitle}>
              <Link to={node.fields.slug} marker={node.frontmatter.marker} bold>
                {node.frontmatter.title}
              </Link>
            </SubHeader>
            <ImageCarousel
              className={styles.imageCarousel}
              key={`carousel-${id}`}
              images={images}
            />
            <MarkdownContent
              className={styles.projectMarkdownContent}
              marker={node.frontmatter.marker}
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
            <Tags style={tagAnimation} tags={node.frontmatter.technologies} />
          </animated.div>
        </animated.div>
        <animated.div className={styles.imageWrapper}>
          <FixedImageSet containerRef={projectRef} images={images} />
        </animated.div>
        {decorationLayers}
      </Flex>
    </div>
  );
};

export { Project };
