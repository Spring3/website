import React, { memo, useState, useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import { css } from '@emotion/react';

const styles = {
  defaultPlaceholder: css`
    background-color: var(--background-color-dark);
    min-width: 350px;
    min-height: 350px;
  `,
  preview: css`
    filter: blur(3px);
  `,
};

const LazyImage = memo(
  ({
    Component = 'img',
    src,
    className,
    intersectionTriggerRef,
    placeholder,
    style,
    ...restProps
  }) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoading, setIsLoading] = useState(false);
    const imageRef = useRef();

    const isRenderingPlaceholder = imageSrc === placeholder;

    const intersection = useIntersection(intersectionTriggerRef || imageRef, {
      threshold: 0.001,
    });

    useEffect(() => {
      if (
        intersection?.isIntersecting &&
        !isLoading &&
        isRenderingPlaceholder
      ) {
        setIsLoading(true);
      }
    }, [intersection, isLoading, src]);

    useEffect(() => {
      let wasCancelled = false;
      if (isLoading) {
        const updateSrc = () => {
          if (!wasCancelled) {
            setImageSrc(src);
            setIsLoading(false);
          }
        };

        const img = new Image();
        img.onload = updateSrc;
        img.src = src;
      }

      return () => {
        wasCancelled = true;
      };
    }, [isLoading, src]);

    if (!src) {
      return null;
    }

    return (
      <Component
        className={className}
        css={[
          ...(isRenderingPlaceholder && !placeholder
            ? [styles.defaultPlaceholder]
            : []),
          ...(isRenderingPlaceholder && placeholder ? [styles.preview] : []),
        ]}
        src={imageSrc}
        ref={imageRef}
        loading="lazy"
        style={style}
        {...restProps}
      />
    );
  }
);

LazyImage.displayName = 'LazyImage';

export { LazyImage };
