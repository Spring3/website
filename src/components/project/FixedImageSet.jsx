import React, { Fragment } from 'react';
import { css } from '@emotion/css';
import { useWindowSize } from 'react-use';
import { useImagePreview } from '../../context/ImagePreviewContext';
import { LazyImage } from '../common/LazyImage';

const styles = {
  fixedStyles: css`
    background-attachment: fixed;
    background-repeat: no-repeat;
    position: sticky;
    top: 16%;
    cursor: initial;
  `,
  fixedImage: ({
    src,
    scaledHeight,
    horizontalPosition,
    verticalPosition,
    imageWidth,
  }) => ({
    backgroundImage: `url("${src}")`,
    height: `${scaledHeight}px`,
    backgroundPosition: `${horizontalPosition}px ${verticalPosition}px`,
    backgroundSize: `${imageWidth}% auto`,
  }),
  placeholder: ({
    scaledHeight,
    horizontalPosition,
    verticalPosition,
    imageWidth,
  }) => ({
    height: `${scaledHeight * 2}px`,
    backgroundPosition: `${horizontalPosition}px ${verticalPosition}px`,
    backgroundSize: `${imageWidth}% auto`,
    pointerEvents: 'none',
  }),
  normalImage: ({ src, scaledHeight }) => css`
    background-image: url('${src}');
    height: ${scaledHeight}px;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  `,
};

const FixedImageSet = ({ images, containerRef }) => {
  const { height, width } = useWindowSize();
  const { showImagePreview } = useImagePreview();

  if (!images || !images.length) {
    return null;
  }

  // for gatsby ssr
  if (typeof window === 'undefined') {
    return null;
  }

  const windowWidth = width || window.innerWidth;
  const windowHeight = height || window.innerHeight;
  // 6%
  const padding = 0.06 * windowWidth;
  const imageAreaWidth = (windowWidth - padding * 2) * 0.58;
  const marginTop = windowHeight * 0.16;
  const imageWidthPercent = Number(
    (imageAreaWidth / windowWidth) * 100
  ).toFixed(2);
  const verticalPosition = Number(
    windowHeight - (windowHeight - marginTop)
  ).toFixed(2);
  const horizontalPosition = Number(
    windowWidth - imageAreaWidth - padding
  ).toFixed(2);

  if (images.length === 1) {
    const image = images[0];
    const scaledHeight = Number(imageAreaWidth / image.aspectRatio).toFixed(2);
    return (
      <LazyImage
        className={styles.normalImage({ src: image.src, scaledHeight })}
        intersectionTriggerRef={containerRef}
        Component={'div'}
        src={image.src}
        placeholder={image.placeholder}
        onClick={() => showImagePreview(images)}
      />
    );
  }

  return images.map((image, i) => {
    const scaledHeight = Number(imageAreaWidth / image.aspectRatio).toFixed(2);

    return (
      <Fragment key={image.name}>
        <LazyImage
          className={styles.fixedStyles}
          style={styles.fixedImage({
            src: image.src,
            scaledHeight,
            horizontalPosition,
            verticalPosition,
            imageWidth: imageWidthPercent,
          })}
          intersectionTriggerRef={containerRef}
          Component={'div'}
          id={image.name}
          src={image.src}
          placeholder={image.placeholder}
          onClick={() => showImagePreview(images, i)}
        />
        <div
          className={styles.fixedStyles}
          style={styles.placeholder({
            scaledHeight,
            horizontalPosition,
            verticalPosition,
            imageWidth: imageWidthPercent,
          })}
          id={image.name}
        />
      </Fragment>
    );
  });
};

export { FixedImageSet };
