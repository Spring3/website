import React, { useRef } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import { useImagePreview } from '../../context/ImagePreviewContext';
import { LazyImage } from './LazyImage';

const CarouselContainer = styled.div`
  padding-top: ${(props) => (props.isPreview ? '0' : '1.5rem')};

  @media (max-width: 1050px) {
    padding-top: 0;
  }
`;

const StyledCarousel = styled(Carousel)`
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
`;

const SingleImage = styled(LazyImage)`
  max-width: 100%;
  cursor: pointer;
`;

const ImageSlide = styled(LazyImage)`
  cursor: pointer;
`;

const ImageCarousel = ({ className, images }) => {
  const { showImagePreview } = useImagePreview();
  const containerRef = useRef();

  if (!images.length) {
    return null;
  }

  if (images.length === 1) {
    const image = images[0];
    return (
      <div ref={containerRef}>
        <SingleImage
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
    <>
      <CarouselContainer ref={containerRef}>
        <StyledCarousel
          className={className}
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
            <ImageSlide
              key={image.name}
              intersectionTriggerRef={containerRef}
              alt={image.name}
              src={image.src}
              placeholder={image.placeholder}
              srcSet={image.srcSet}
              sizes={image.sizes}
            />
          ))}
        </StyledCarousel>
      </CarouselContainer>
    </>
  );
};

export { ImageCarousel };
