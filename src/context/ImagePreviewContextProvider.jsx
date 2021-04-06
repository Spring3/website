import React from 'react';
import {
  ImagePreviewContainer,
  ImagePreview,
} from '../components/common/ImagePreview';
import { usePreviewApi, ImagePreviewContext } from './ImagePreviewContext';

const ImagePreviewContextProvider = ({ children }) => {
  const { imagesToPreview, startIndex, ...api } = usePreviewApi();

  return (
    <ImagePreviewContext.Provider value={api}>
      {api.isPreviewShown ? <ImagePreviewContainer /> : null}
      <ImagePreview
        images={imagesToPreview}
        startIndex={startIndex}
        onClose={api.hideImagePreview}
      />
      {children}
    </ImagePreviewContext.Provider>
  );
};

export { ImagePreviewContextProvider };
