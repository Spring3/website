import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import 'animate.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --text-color-primary: black;
    --text-color-secondary: #767B91;
    --background-color: white;
    --background-color-dark: #f5f5f5;
    --marker-primary: #A9E5BB;
    --marker-secondary: #FCF6B1;
    --marker-link: #BCE5FF;
    --border-radius: 3px;
  }

  body {
    background-color: white;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4;
    color: var(--text-color-primary);
  }

  @media (min-width: 750px) {
    body {
      font-size: 16px;
    }
  }

  @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px),
  (max-width: 750px) {
    body {
      font-size: 14px;
    }
  }

  a, a:visited {
    color: black;
    font-weight: 500;
    padding: 2px;
    background: linear-gradient(to bottom, transparent 0%, transparent 60%, var(--marker-link) 60%, var(--marker-link) 100%);
    transition: background ease .2s;

    &:hover,
    &:focus {
      background: var(--marker-link);
    }
  }
`;

export default GlobalStyle;
