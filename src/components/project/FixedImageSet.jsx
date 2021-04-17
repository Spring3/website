import React, { Fragment } from 'react';
import { css } from '@emotion/react';
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
        css={styles.normalImage({ src: image.src, scaledHeight })}
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
    const style = {
      backgroundImage: `url("${image.src}")`,
      height: `${scaledHeight}px`,
      backgroundPosition: `${horizontalPosition}px ${verticalPosition}px`,
      backgroundSize: `${imageWidthPercent}% auto`,
    };

    const placeholderStyle = {
      height: `${scaledHeight * 2}px`,
      backgroundPosition: `${horizontalPosition}px ${verticalPosition}px`,
      backgroundSize: `${imageWidthPercent}% auto`,
      pointerEvents: 'none',
    };

    return (
      <Fragment key={image.name}>
        <LazyImage
          css={styles.fixedStyles}
          style={style}
          intersectionTriggerRef={containerRef}
          Component={'div'}
          id={image.name}
          src={image.src}
          placeholder={image.placeholder}
          onClick={() => showImagePreview(images, i)}
        />
        <div
          css={styles.fixedStyles}
          style={placeholderStyle}
          id={image.name}
        />
      </Fragment>
    );
  });
};

export { FixedImageSet };
