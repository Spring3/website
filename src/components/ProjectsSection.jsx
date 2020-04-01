import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Animated } from 'react-animated-css';

import Tags, { Tag } from './Tags';

const ProjectsGrid = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(12, minmax(20px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(50px,1fr));
  grid-gap: 4rem 2rem;

  @media (max-width: 750px) {
    grid-gap: 4rem 0rem;
  }
`;

const ProjectsContainer = styled.div`
  @media (min-width: 750px) {
    max-width: 90%;
    margin: 0 auto;
  }

  h1 {
    @media (min-width: 750px) {
      font-size: 3rem;
    }
    @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
    (max-width: 750px) {
      font-size: 2rem;
    }
    margin-top: 3rem;
  }
`;

const ProjectSection = styled.section`
  img {
    max-width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
  }

  @media (min-width: 750px) {
    grid-column: span 6;

    .title {
      font-size: 2rem;
    }
  }

  @media (min-width: 1100px),
  @media (min-width; 1500px) {
    grid-column: span 4;
  }

  @media (max-width: 750px) {
    grid-column: 1 / -1;
  }

  .title {
    @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
    (max-width: 750px) {
      font-size: 1.5rem;
    }
    margin-top: 1.5rem;
  }

  p {
    box-sizing: border-box;
    min-width: 100%;
    width: 0;
  }
`;

const ImageLink = styled(Link)`
  background: none !important;
  padding: 0px !important;
  display: inline-block;
  height: 300px;
  width: 100%;
  box-shadow: 0px 0px 20px lightgrey;
  transition: box-shadow ease .3s;

  &:hover {
    box-shadow: 0px 0px 20px var(--marker-${props => props.marker || 'link'});
  }
`;

const Thumbnail = styled.img`
  border-radius: var(--border-radius);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
`;

export default ({ nodes }) => (
  <ProjectsContainer>
    <h1>Projects</h1>
    <ProjectsGrid>
      {nodes.map((node, i) => (
        <ProjectSection key={i}>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDelay={500 * i}
            animationInDuration={500}
            animationOutDuration={500}
          >
              <ImageLink marker={node.frontmatter.marker} to={node.fields.slug}>
                <Thumbnail
                  src={node.frontmatter.thumbnail.childImageSharp.fluid.src}
                  srcSet={node.frontmatter.thumbnail.childImageSharp.fluid.srcSet}
                  sizes={node.frontmatter.thumbnail.childImageSharp.fluid.sizes}
                  alt={`A screenshot of ${node.frontmatter.thumbnail.name}`}
                />
              </ImageLink>
              <Details>
                <div className="title">
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </div>
                <p>{node.frontmatter.description}</p>
                <Tags>
                  {node.frontmatter.tags.map((tag, i) => (
                    <Tag key={i}>{tag}</Tag>
                  ))}
                </Tags>
              </Details>
          </Animated>
        </ProjectSection>
      ))}
    </ProjectsGrid>
  </ProjectsContainer>
);
