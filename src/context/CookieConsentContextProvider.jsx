import React from 'react';
import { useConsentAPI, CookieConsentContext } from './CookieConsentContext';

const CookieConsentContextProvider = ({ children }) => {
  const api = useConsentAPI();

  return (
    <CookieConsentContext.Provider value={api}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export { CookieConsentContextProvider };
