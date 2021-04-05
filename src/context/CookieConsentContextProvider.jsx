import React from 'react';
import { useConsentAPI, CookieConsentContext } from './CookieConsentContext';

const CookieConsentContextProvider = ({ children }) => {
  const { imagesToPreview, startIndex, ...api } = useConsentAPI();

  return (
    <CookieConsentContext.Provider value={api}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export { CookieConsentContextProvider };
