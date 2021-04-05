import {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useCookie, useLocation } from 'react-use';
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies';

export const COOKIE_KEY = 'gatsby-gdpr-google-analytics';

const CookieConsentContext = createContext();

const useConsentAPI = () => {
  const [currentConsent, setConsent] = useState(null);
  const [cookie, updateCookie] = useCookie(COOKIE_KEY);
  const location = useLocation();

  useEffect(() => {
    if (cookie !== null) {
      const givenConsent = cookie === 'true';
      setConsent(givenConsent);
      if (givenConsent) {
        initializeAndTrack(location);
      }
    }
  }, []);

  const acceptCookies = useCallback(() => {
    updateCookie(true, { secure: true });
    setConsent(true);
    initializeAndTrack(location);
  }, [location]);

  const rejectCookies = useCallback(() => {
    updateCookie(false, { secure: true });
    setConsent(false);
  }, []);

  return {
    consent: currentConsent,
    acceptCookies,
    rejectCookies,
  };
};

const useCookieConsent = () => useContext(CookieConsentContext);

export { CookieConsentContext, useConsentAPI, useCookieConsent };
