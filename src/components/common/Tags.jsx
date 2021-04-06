import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

const TagsContainer = styled(animated.ul)`
  list-style-type: none;
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const TagItem = styled.li`
  display: inline-block;
  font-weight: bold;
  border-radius: var(--border-radius);
  border: 2px solid ${(props) => props.theme.marker};
  padding: 3px 5px;
  margin: 0.25rem;
  font-size: 0.8rem;
`;

const Tags = ({ tags = [], ...rest }) => (
  <TagsContainer {...rest}>
    {tags.map((tag) => (
      <TagItem key={tag}>
        {tag}
        &nbsp;
      </TagItem>
    ))}
  </TagsContainer>
);

export { Tags };
