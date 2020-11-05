import React from "react"
import styled from "styled-components"

import Tags, { Tag } from "./project/Tags"
import { FixedImageSet } from "./project/FixedImageSet"
import { slugToAnchor } from "../utils"
import { Link } from "./Reference"
import { MarkdownContent } from "./MarkdownContent"
import { useWindowResize } from "../hooks/useWindowResize"
import { ImageCarousel } from "./ImageCarousel"
import { Flex } from "./Flex"

const ProjectInfo = styled.div`
  @media (min-width: 1000px) {
    position: sticky;
    top: 16%;
    z-index: ${(props) => props.index + 1};
  }
`

const InfoWrapper = styled.div`
  width: 100%;

  @media (min-width: 1000px) {
    width: 40%;
    position: sticky;
    top: 16%;
  }
`

const ImageWrapper = styled.div`
  width: 60%;
  gap: 0px;

  @media (max-width: 1200px) {
    width: 58%;
    gap: 0px 1rem;
  }
`

const ProjectRow = styled(Flex)`
  width: 100%;
`

const ProjectTitle = styled.div`
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
`
const ProjectContent = styled(MarkdownContent)`
  font-size: 1rem;
`

const Project = ({ node, index }) => {
  const anchor = slugToAnchor(node.fields.slug)
  const width = useWindowResize()
  const id = anchor.substring(1)
  return (
    <ProjectRow>
      <InfoWrapper id={id}>
        <ProjectInfo index={index}>
          <ProjectTitle>
            <Link
              to={node.fields.slug}
              marker={node.frontmatter.marker}
              bold={true}
            >
              {node.frontmatter.title}
            </Link>
          </ProjectTitle>
          {width <= 1000 ? (
            <ImageCarousel images={node.frontmatter.images} />
          ) : null}
          <ProjectContent
            marker={node.frontmatter.marker}
            dangerouslySetInnerHTML={{ __html: node.html }}
          />
          <Tags flexWrap="wrap">
            {node.frontmatter.technologies.map((tag, i) => (
              <Tag key={i} marker={node.frontmatter.marker}>
                {tag}
              </Tag>
            ))}
          </Tags>
        </ProjectInfo>
      </InfoWrapper>
      {width > 1000 ? (
        <ImageWrapper id={id}>
          <FixedImageSet images={node.frontmatter.images} />
        </ImageWrapper>
      ) : null}
    </ProjectRow>
  )
}

export { Project }
