import React from 'react';
import { useCookieConsent } from '../../../context/CookieConsentContext';
import { Flex } from '../Flex';
import { Reference } from '../Reference';

const CookieManager = () => {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  const updateCookieValue = async (e) => {
    e.preventDefault();
    const nextValue = consent === null ? true : !consent;
    if (nextValue === true) {
      acceptCookies();
    } else {
      rejectCookies();
    }
  };

  const text = consent === true ? 'Reject cookies' : 'Allow cookies';

  return (
    <Flex gap="1rem" margined alignItems="center">
      <strong>Cookies: &nbsp;{consent ? 'Allowed' : 'Rejected'}</strong>
      <Reference href="#" role="button" onClick={updateCookieValue}>
        {text}
      </Reference>
    </Flex>
  );
};

export { CookieManager };
