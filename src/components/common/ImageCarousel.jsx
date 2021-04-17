import React, { useRef } from 'react';
import { css } from '@emotion/react';
import { Carousel } from 'react-responsive-carousel';
import { useImagePreview } from '../../context/ImagePreviewContext';
import { LazyImage } from './LazyImage';

const styles = {
  container: css`
    padding-top: 1.5rem;

    @media (max-widht: 1050px) {
      padding-top: 0;
    }
  `,
  singleImage: css`
    max-width: 100%;
  `,
  slide: css`
    cursor: pointer;
  `,
  carousel: css`
    div:first-of-type {
      border-radius: 5px;
    }

    .slide {
      background: transparent;
      overflow: hidden;
      cursor: pointer;
    }

    .thumbs {
      padding: 0 !important;
    }

    .thumbs-wrapper {
      margin: 20px 0px !important;
    }

    @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
      (max-width: 750px) {
      .slider-wrapper {
        max-height: 80vh;
      }
    }
  `,
};

const ImageCarousel = ({ className, images }) => {
  const { showImagePreview } = useImagePreview();
  const containerRef = useRef();

  if (!images.length) {
    return null;
  }

  if (images.length === 1) {
    const image = images[0];
    return (
      <div className={className} css={styles.singleImage} ref={containerRef}>
        <LazyImage
          css={[styles.slide, styles.singleImage]}
          key={image.name}
          alt={image.name}
          src={image.src}
          placeholder={image.placeholder}
          srcSet={image.srcSet}
          sizes={image.sizes}
          onClick={() => showImagePreview(images)}
        />
      </div>
    );
  }

  return (
    <div className={className} css={styles.container} ref={containerRef}>
      <Carousel
        css={styles.carousel}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        interval={5000}
        swipeable
        autoPlay
        dynamicHeight
        onClickItem={(index) => showImagePreview(images, index)}
      >
        {images.map((image) => (
          <LazyImage
            css={styles.slide}
            key={image.name}
            intersectionTriggerRef={containerRef}
            alt={image.name}
            src={image.src}
            placeholder={image.placeholder}
            srcSet={image.srcSet}
            sizes={image.sizes}
          />
        ))}
      </Carousel>
    </div>
  );
};

export { ImageCarousel };
