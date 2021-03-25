import {
  createContext, useState, useCallback, useContext
} from 'react';

const ImagePreviewContext = createContext();

const usePreviewApi = () => {
  const [imagesToPreview, setImagesToPreview] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isPreviewShown, showPreview] = useState(false);

  const showImagePreview = useCallback((images, startFrom = 0) => {
    if (!images || !images.length) {
      return;
    }

    setImagesToPreview(Array.isArray(images) ? images : [images]);
    setStartIndex(startFrom);
    showPreview(true);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagesToPreview([]);
    setStartIndex(0);
    showPreview(false);
  }, []);

  return {
    startIndex,
    isPreviewShown,
    imagesToPreview,
    showImagePreview,
    hideImagePreview,
  };
};

const useImagePreview = () => useContext(ImagePreviewContext);

export { ImagePreviewContext, usePreviewApi, useImagePreview };
