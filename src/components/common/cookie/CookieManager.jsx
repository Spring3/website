import React from 'react';
import { useCookie } from 'react-use';
import { Flex } from '../Flex';
import { Reference } from '../Reference';
import { COOKIE_KEY } from './CookieBanner';

const CookieManager = () => {
  const [cookie, updateCookie] = useCookie(COOKIE_KEY);

  const updateCookieValue = async (e) => {
    e.preventDefault();
    const nextValue = cookie === null ? true : !(cookie.value === 'true');
    updateCookie(nextValue);
  };

  const text = cookie?.value === 'true' ? 'Disallow cookies' : 'Allow cookies';

  return (
    <Flex gap="1rem" margined alignItems="center">
      <strong>Cookies:</strong>
      <Reference href="#" role="button" onClick={updateCookieValue}>
        {text}
      </Reference>
    </Flex>
  );
};

export { CookieManager };
