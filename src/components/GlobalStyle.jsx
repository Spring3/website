import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Global, css } from '@emotion/react';
import { Globals } from 'react-spring';
import { CookieBanner } from './common/cookie/CookieBanner';
import 'normalize.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useReducedMotion } from '../hooks/useReducedMotion';

const globalStyles = css`
  :root {
    --text-color-primary: #282c36;
    --text-color-secondary: #434750;
    --background-color: white;
    --background-color-dark: #f5f5f5;
    --shadow-color: #e0e0e0;
    --marker-green: #a9e5bb;
    --marker-yellow: #fcf6b1;
    --marker-red: #f78888;
    --marker-blue: #bce5ff;
    --marker-purple: #c3a9ff;
    --border-radius: 3px;
    --page-size: 45em;
    --color-red: #ef3934;
    --color-green: #44c95c;
    --color-yellow: #ffb402;
    --color-blue: #2f86eb;
  }

  body {
    font-size: 16px;
    background-color: var(--background-color);
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: var(--text-color-primary);
  }

  main {
    padding: 0;
    position: relative;
  }
`;

const GlobalStyles = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    Globals.assign({
      skipAnimation: prefersReducedMotion,
    });
  }, [prefersReducedMotion]);

  return <Global styles={globalStyles} />;
};

const OGP = memo(({ title, description, image = '/icon_ogp.png' }) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line
    window.__forceSmoothScrollPolyfill__ = true;
  }

  return (
    <>
      <Helmet
        title={title}
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta name="description" content={description} />
        <meta property="og:site_name" content="www.dvasylenko.com" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <title>Daniyil Vasylenko</title>
      </Helmet>
      <CookieBanner />
    </>
  );
});

OGP.displayName = 'OGP';

export { GlobalStyles, OGP };
