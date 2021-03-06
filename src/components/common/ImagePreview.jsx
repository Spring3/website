import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import ArrowLeftIcon from 'mdi-react/ArrowLeftThickIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightThickIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { Helmet } from 'react-helmet';
import { useSprings, animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import clamp from 'lodash.clamp';
import { useKeyPressEvent, usePrevious, useWindowSize } from 'react-use';
import { PreviewButtonNext, PreviewButtonPrevious } from './buttons';
import { useImagePreview } from '../../context/ImagePreviewContext';
import { reveal } from '../../animations';

const ImagePreviewPortal = ({ children }) => {
  const container = useMemo(() => {
    if (typeof document !== 'undefined') {
      return document.createElement('div');
    }

    return undefined;
  }, []);

  useEffect(() => {
    let root;
    if (typeof document !== 'undefined') {
      root = document.getElementById('image-preview-portal');

      if (root) {
        root.appendChild(container);
      }
    }
    return () => root.removeChild(container);
  }, [container]);

  return createPortal(children, container);
};

const ImagePreviewContainer = ({ children }) => (
  <div id="image-preview-portal">{children}</div>
);

const styles = {
  previewContainer: css`
    position: fixed;
    z-index: 6;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.9);
  `,
  closeIcon: css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    z-index: 2;

    padding: 1rem;
    fill: rgba(255, 255, 255, 0.5);

    &:focus,
    &:hover {
      fill: rgba(255, 255, 255, 1);
    }
  `,
  previewImages: css`
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: calc(100% - 100px);
    margin: 0 auto;

    @media (max-width: 700px) {
      max-width: 95%;
    }
  `,
  slidingImage: (maxHeight) => css`
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    max-width: 100%;
    border-radius: 5px;
    touch-action: pan-y;
    max-height: calc(${maxHeight + 'px' || '100vh'} - 1rem);
  `,
  previewButtonIcon: css`
    fill: rgba(255, 255, 255, 0.5);
    vertical-align: middle;
  `,
};

const ImagePreview = ({ images, startIndex = 0, onClose }) => {
  const { width, height } = useWindowSize();
  const [index, setIndex] = useState(startIndex);
  const [mousePressed, setMousePressed] = useState(false);

  const preview = useImagePreview();

  const wasOpen = usePrevious(preview.isPreviewShown);

  const [draggingAnimationSprings, set] = useSprings(images.length, (i) => {
    if (i !== startIndex) return { display: 'none' };
    const x = (i - startIndex) * width;
    return {
      x,
      scale: 1,
      display: 'block',
      transform: `translateX(${x}px) scale(1)`,
    };
  });

  useEffect(() => {
    setIndex(images.length ? startIndex : 0);
  }, [startIndex, images]);

  useEffect(() => {
    if (!wasOpen && preview.isPreviewShown) {
      return;
    }

    set((i) => {
      if (i < index - 1 || i > index + 1) return { display: 'none' };
      const x = (i - index) * width;
      return {
        x,
        scale: 1,
        display: 'block',
        transform: `translateX(${x}px) scale(1)`,
      };
    });
  }, [index, width, wasOpen, preview]);

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > width / 4) {
        const newIndex = clamp(
          index + (xDir > 0 ? -1 : 1),
          0,
          images.length - 1
        );
        setIndex(newIndex);
        // marking to skip the next onClick on the preview overlay
        setMousePressed(true);
        cancel(newIndex);
      }
      set((i) => {
        if (i < index - 1 || i > index + 1) {
          return { display: 'none' };
        }

        const x = (i - index) * width + (active ? mx : 0);
        const scale = active ? 1 - distance / width / 2 : 1;
        return {
          x,
          scale,
          display: 'block',
          transform: `translateX(${x}px) scale(${scale})`,
        };
      });
    },
    { axis: 'x' }
  );

  const nextSlide = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      const isDisabled = index === images.length - 1;
      if (!isDisabled) {
        setIndex(clamp(index + 1, 0, images.length - 1));
      }
    },
    [index, images]
  );

  const previousSlide = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      const isDisabled = index === 0;
      if (!isDisabled) {
        setIndex(clamp(index - 1, 0, images.length - 1));
      }
    },
    [index, images]
  );

  const interceptEvent = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  useKeyPressEvent('Escape', preview.hideImagePreview);
  useKeyPressEvent('ArrowRight', nextSlide);
  useKeyPressEvent('ArrowLeft', previousSlide);

  const [containerAnimation, animateContainer] = useSpring(() =>
    reveal({ duration: 150, slow: false })
  );

  useEffect(() => {
    if (preview.isPreviewShown) {
      animateContainer(reveal({ duration: 150, slow: false }));
    }
  }, [preview.isPreviewShown]);

  if (!images.length) {
    return <></>;
  }

  if (images.length === 1) {
    return (
      <>
        <Helmet>
          <style type="text/css">
            {`
            body {
              overflow: hidden;
            }
          `}
          </style>
        </Helmet>
        <ImagePreviewPortal>
          <animated.div
            css={styles.previewContainer}
            style={containerAnimation}
            onClick={onClose}
          >
            <CloseIcon css={styles.closeIcon} color="white" onClick={onClose} />
            <div css={styles.previewImages}>
              <animated.img
                css={styles.slidingImage(height)}
                src={images[0].src}
                alt={images[0].name}
                sizes={images[0].sizes}
                srcSet={images[0].srcSet}
                onDragStart={interceptEvent}
                onClick={interceptEvent}
              />
            </div>
          </animated.div>
        </ImagePreviewPortal>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <style type="text/css">
          {`
          body {
            overflow: hidden;
          }
        `}
        </style>
      </Helmet>
      <ImagePreviewPortal>
        <animated.div
          css={styles.previewContainer}
          style={containerAnimation}
          onClick={() => {
            // this is done because when drag event is cancelled, releasing the mouse triggered this click event and closed the preview
            // this way we skip this one call
            if (!mousePressed) {
              onClose();
            } else {
              setMousePressed(false);
            }
          }}
        >
          <CloseIcon css={styles.closeIcon} color="white" onClick={onClose} />
          <PreviewButtonPrevious onClick={previousSlide} disabled={index === 0}>
            <ArrowLeftIcon css={styles.previewButtonIcon} color="white" />
          </PreviewButtonPrevious>
          <div css={styles.previewImages}>
            {draggingAnimationSprings.map(({ display, transform }, i) => {
              const image = images[i];
              return (
                <animated.img
                  css={styles.slidingImage(height)}
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={image.sizes}
                  onClick={interceptEvent}
                  onDragStart={interceptEvent}
                  key={image.name}
                  alt={image.name}
                  {...bind()}
                  style={{ transform, display, zIndex: i === index ? 1 : 0 }}
                />
              );
            })}
          </div>
          <PreviewButtonNext
            onClick={nextSlide}
            disabled={index === images.length - 1}
          >
            <ArrowRightIcon css={styles.previewButtonIcon} color="white" />
          </PreviewButtonNext>
        </animated.div>
      </ImagePreviewPortal>
    </>
  );
};

export { ImagePreview, ImagePreviewContainer };
