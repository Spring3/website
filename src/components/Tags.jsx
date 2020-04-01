import React from 'react';
import styled from 'styled-components';

const Tags = styled.ul`
  list-style-type: none;
  margin: 1rem 0px 0px 0px;
  padding: 0px;
`;

const TagItem = styled.li`
  display: inline-block;
  margin-right: .5rem;
  background: var(--background-color-dark);
  border-radius: var(--border-radius);
  padding: 3px 5px;
  margin: .25rem .5rem .25rem 0px;
  font-size: .9rem;
`;

export const Tag = ({ children }) => (
  <TagItem>{children}&nbsp;</TagItem>
);

export default Tags;
