import { Global, css } from '@emotion/react';
import theme from './theme';

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.7;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: ${theme.spacing.md};
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 1.875rem; }
  h3 { font-size: 1.5rem; }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primaryHover};
    }
  }

  code {
    font-family: ${theme.fonts.mono};
    font-size: 0.9em;
    background: ${theme.colors.codeBg};
    color: ${theme.colors.codeText};
    padding: 0.2em 0.4em;
    border-radius: ${theme.borderRadius.sm};
  }

  pre {
    font-family: ${theme.fonts.mono};
    background: ${theme.colors.codeBg};
    color: ${theme.colors.codeText};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${theme.spacing.lg};

    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius.md};
  }

  ul, ol {
    margin-bottom: ${theme.spacing.md};
    padding-left: ${theme.spacing.xl};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
  }

  blockquote {
    border-left: 4px solid ${theme.colors.primary};
    padding-left: ${theme.spacing.lg};
    margin: ${theme.spacing.lg} 0;
    font-style: italic;
    color: ${theme.colors.textMuted};
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.border};
    margin: ${theme.spacing.xxl} 0;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;