import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';

const LazyImage = ({
  Component = 'img',
  src,
  intersectionTriggerRef,
  placeholder,
  ...restProps
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef();

  const isRenderingPlaceholder = imageSrc === placeholder;

  const defaultPlaceholderStyles = useMemo(
    () => ({
      backgroundColor: 'var(--background-color-dark)',
      minWidth: '350px',
      minHeight: '350px',
    }),
    []
  );
  const intersection = useIntersection(intersectionTriggerRef || imageRef, {
    threshold: 0.001,
  });

  useEffect(() => {
    if (intersection?.isIntersecting && !isLoading && isRenderingPlaceholder) {
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
  }, [isLoading]);

  if (!src) {
    return null;
  }

  const previewStyles = {
    filter: 'blur(3px)',
    ...restProps.style,
  };

  let styles = restProps.style;

  if (isRenderingPlaceholder) {
    styles = placeholder ? previewStyles : defaultPlaceholderStyles;
  }

  return (
    <Component
      src={imageSrc}
      ref={imageRef}
      loading="lazy"
      {...restProps}
      style={styles}
    />
  );
};

export { LazyImage };
