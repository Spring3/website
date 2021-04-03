import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';

import { animated, useSpring } from 'react-spring';
import { useWindowSize, useIntersection, usePrevious } from 'react-use';
import { Tags } from '../common/Tags';
import { FixedImageSet } from '../project/FixedImageSet';
import { slugToAnchor } from '../../utils';
import { Link } from '../common/Reference';
import { MarkdownContent } from '../common/MarkdownContent';
import { ImageCarousel } from '../common/ImageCarousel';
import { Flex } from '../common/Flex';
import { Decorations, Rectangle, Circle } from '../common/Decorations';
import { Subheader } from '../common/Headers';
import { revealBottom } from '../../animations';

const ProjectInfo = styled.div`
  @media (min-width: 1050px) {
    position: sticky;
    top: 16%;
    z-index: 2;
  }
`;

const InfoWrapper = styled(animated.div)`
  width: 100%;
  position: relative;

  @media (min-width: 1051px) {
    padding-right: 1rem;
    width: 40%;
    position: sticky;
    top: 16%;
  }
`;

const ImageWrapper = styled(animated.div)`
  width: 58%;
  gap: 0px;
  position: relative;

  @media (max-width: 1200px) {
    width: 58%;
    gap: 0px 1rem;
  }
`;

const ProjectRow = styled(Flex)`
  width: 100%;
  position: relative;
`;

const ProjectTitle = styled(Subheader)`
  margin-bottom: 1.5rem;
  margin-top: 0px;
`;

const ProjectContent = styled(MarkdownContent)`
  font-size: 1rem;
  -webkit-line-clamp: 1;

  @media (max-width: 1050px) {
    margin-top: 2.5rem;
  }

  border-left: 5px solid ${(props) => props.theme.marker};
  padding-left: 1rem;
`;

const Project = ({ node, index }) => {
  const [wasRevealed, setRevealed] = useState(false);
  const anchor = slugToAnchor(node.fields.slug);

  const fixedImageContainerRef = useRef();
  const infoRef = useRef();
  const { width } = useWindowSize();
  const id = anchor.substring(1);
  const isSmallScreen = width <= 1050;

  const wasSmallScreen = usePrevious(isSmallScreen);

  const images = node.frontmatter.images.map((image) => ({
    name: image.name,
    ...image.childImageSharp.original,
    placeholder: image.childImageSharp.placeholder.base64,
  }));

  const intersection = useIntersection(infoRef, {
    threshold: isSmallScreen ? 0.001 : 0.6,
  });

  const isIntersecting = intersection?.isIntersecting;

  const initialAnimationState = {
    opacity: 0,
  };

  if (isSmallScreen) {
    initialAnimationState.bottom = '-100px';
  } else {
    initialAnimationState.transform = 'translateY(100px)';
  }

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

      if (isSmallScreen) {
        revealAnimationConfig.bottom = '0px';
      } else {
        revealAnimationConfig.transform = 'translateY(0%)';
      }

      animateSection(revealAnimationConfig);
      animateTags(revealBottom({ delay: 200 }));
      animateDecorations(revealBottom({ delay: 500 }));
    }
  }, [wasRevealed, isIntersecting, isSmallScreen]);

  useEffect(() => {
    if (wasSmallScreen !== isSmallScreen) {
      setRevealed(false);
    }
  }, [wasSmallScreen, isSmallScreen]);

  const renderLayer = useCallback(
    (key, layerData) => {
      if (!layerData) {
        return null;
      }

      const { props, squares, circles } = layerData;

      return (
        <Decorations key={key} layer={key} {...props} style={revealDecorations}>
          {squares?.map((squareProps, i) => (
            <Rectangle {...squareProps} key={`square-${i}`} />
          ))}
          {circles?.map((cirlceProps, i) => (
            <Circle {...cirlceProps} key={`circle-${i}`} />
          ))}
        </Decorations>
      );
    },
    [id]
  );

  const decorationLayers = useMemo(
    () =>
      Object.entries(
        node.frontmatter.decorations || {}
      ).map(([layerKey, layerData]) => renderLayer(layerKey, layerData)),
    [renderLayer]
  );

  return (
    <ProjectRow id={id} justifyContent="space-between">
      <InfoWrapper ref={infoRef} style={revealAnimation}>
        <ProjectInfo index={index}>
          <ProjectTitle>
            <Link to={node.fields.slug} marker={node.frontmatter.marker} bold>
              {node.frontmatter.title}
            </Link>
          </ProjectTitle>
          {isSmallScreen ? <ImageCarousel images={images} /> : null}
          <ProjectContent
            marker={node.frontmatter.marker}
            dangerouslySetInnerHTML={{ __html: node.html }}
          />
          <Tags style={tagAnimation} tags={node.frontmatter.technologies} />
        </ProjectInfo>
      </InfoWrapper>
      {!isSmallScreen ? (
        <>
          <ImageWrapper ref={fixedImageContainerRef} style={revealAnimation}>
            <FixedImageSet
              containerRef={fixedImageContainerRef}
              images={images}
            />
          </ImageWrapper>
          {decorationLayers}
        </>
      ) : null}
    </ProjectRow>
  );
};

export { Project };
