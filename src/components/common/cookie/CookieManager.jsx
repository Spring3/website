import React from 'react';
import { useCookieConsent } from '../../../context/CookieConsentContext';
import { Flex } from '../Flex';
import { css } from '@emotion/react';
import { Toggle } from '../Toggle';

const styles = {
  label: css`
    font-weight: bold;
  `,
};

const CookieManager = () => {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  const updateCookieValue = async () => {
    const nextValue = consent === null ? true : !consent;
    if (nextValue === true) {
      acceptCookies();
    } else {
      rejectCookies();
    }
  };

  return (
    <Flex gap="1rem" margined alignItems="center">
      <Toggle
        onChange={updateCookieValue}
        label="Cookies:"
        checked={consent}
        id="cookie-manager"
        labelStyles={styles.label}
      />
    </Flex>
  );
};

export { CookieManager };
