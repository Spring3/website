import React, { memo } from 'react';
import { css } from '@emotion/react';

const styles = {
  genericStyles: css`
    z-index: 2;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    @media (max-width: 700px) {
      position: absolute;
    }
  `,
  disabledButton: css`
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.1);
    svg {
      fill: rgba(255, 255, 255, 0.15);
    }
  `,
  enabledButton: css`
    &:focus,
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      svg {
        fill: rgba(255, 255, 255, 1);
      }
    }
  `,
  buttonPrevious: css`
    @media (min-width: 701px) {
      margin-left: 1rem;
    }

    @media (max-width: 700px) {
      left: 1rem;
    }
  `,
  buttonNext: css`
    @media (min-width: 701px) {
      margin-right: 1rem;
    }

    @media (max-width: 700px) {
      right: 1rem;
    }
  `,
};

const PreviewButton = ({ className, children, onClick, disabled }) => {
  return (
    <button
      className={className}
      css={[
        styles.genericStyles,
        ...(disabled ? [styles.disabledButton] : [styles.enabledButton]),
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const PreviewButtonPrevious = memo(
  ({ className, children, onClick, disabled }) => {
    return (
      <PreviewButton
        className={className}
        css={styles.buttonPrevious}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </PreviewButton>
    );
  }
);

PreviewButtonPrevious.displayName = 'PreviewButtonPrevious';

const PreviewButtonNext = memo(({ className, children, onClick, disabled }) => {
  return (
    <PreviewButton
      className={className}
      css={styles.buttonNext}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </PreviewButton>
  );
});

PreviewButtonNext.displayName = 'PreviewButtonNext';

export { PreviewButtonPrevious, PreviewButtonNext };
