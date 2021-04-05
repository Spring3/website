import React, { useEffect, useState } from 'react';
import { Flex } from '../Flex';
import { Reference } from '../Reference';
import { COOKIE_KEY } from './CookieBanner';

const CookieManager = () => {
  const [currentCookieValue, setCurrentCookieValue] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getGACookie = async () => {
      if (typeof window !== 'undefined') {
        const value = await window.cookieStore.get(COOKIE_KEY)?.value;
        if (isMounted) {
          setCurrentCookieValue(!!value);
        }
      }
    };

    getGACookie();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateCookieValue = async (e) => {
    e.preventDefault();
    const nextValue = !currentCookieValue;
    if (typeof window !== 'undefined') {
      await window.cookieStore.set(COOKIE_KEY, nextValue);
      setCurrentCookieValue(nextValue);
      window.location.reload();
    }
  };

  const text = currentCookieValue ? 'Disallow cookies' : 'Allow cookies';

  return (
    <Flex gap="1rem" margined alignItems='center'>
      <strong>Cookies:</strong>
      <Reference href="#" role="button" onClick={updateCookieValue}>{text}</Reference>
    </Flex>
  );
};

export {
  CookieManager
};
