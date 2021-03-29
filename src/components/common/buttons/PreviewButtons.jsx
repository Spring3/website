import styled, { css } from 'styled-components';

const PreviewButton = styled.button`
  z-index: 2;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;

  svg {
    fill: rgba(255, 255, 255, 0.5);
    vertical-align: middle;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.isDisabled
      ? css`
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.1);
          svg {
            fill: rgba(255, 255, 255, 0.15);
          }
        `
      : css`
          &:focus,
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            svg {
              fill: rgba(255, 255, 255, 1);
            }
          }
        `}

  @media (max-width: 700px) {
    position: absolute;
  }
`;

const PreviewButtonPrevious = styled(PreviewButton)`
  @media (min-width: 701px) {
    margin-left: 1rem;
  }

  @media (max-width: 700px) {
    left: 1rem;
  }
`;

const PreviewButtonNext = styled(PreviewButton)`
  @media (min-width: 701px) {
    margin-right: 1rem;
  }

  @media (max-width: 700px) {
    right: 1rem;
  }
`;

export {
  PreviewButtonPrevious,
  PreviewButtonNext
};
