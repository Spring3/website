import styled, { css } from "styled-components"

const Header = styled.h1`
  @media (min-width: 750px) {
    font-size: 2.5rem;
  }

  display: inline-block;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    ${(props) => css`
      ${props.theme.marker} 60%,
      ${props.theme.marker} 100%
    `}
  );
`

export { Header }