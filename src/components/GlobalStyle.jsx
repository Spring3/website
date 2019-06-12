import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    @import url('https://fonts.googleapis.com/css?family=Assistant:400,600,700&display=swap');

    --text-color-primary: black;
    --text-color-secondary: #767B91;
    --background-color: white;
    --marker-primary: #A9E5BB;
    --marker-secondary: #FCF6B1;
    --marker-link: #BCE5FF;

    body {
      background-color: white;
      font-size: 16px;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.4;
      color: var(--text-color-primary);
    }

    a, a:visited {
      color: black;
      font-weight: 500;
      padding: 2px;
      background: linear-gradient(to bottom, transparent 0%, transparent 60%, var(--marker-link) 60%, var(--marker-link) 100%);

      &:hover,
      &:focus {
        background: var(--marker-link);
      }
    }
  }
`

export default GlobalStyle;
