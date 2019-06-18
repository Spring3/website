import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import 'animate.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --text-color-primary: black;
    --text-color-secondary: #767B91;
    --background-color: white;
    --background-color-dark: #f5f5f5;
    --shadow-color: #E0E0E0;
    --marker-primary: #A9E5BB;
    --marker-secondary: #FCF6B1;
    --marker-danger: #F97350;
    --marker-link: #BCE5FF;
    --border-radius: 3px;
    --page-size: 45em;
  }

  body {
    font-size: 16px;
    background-color: white;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4;
    color: var(--text-color-primary);
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

  .thumbs {
    padding: 0 !important;
  }
`;

export default GlobalStyle;
