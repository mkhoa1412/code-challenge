import { createGlobalStyle } from 'styled-components';
import { themeSettings } from './theme';
import { resetStyles } from './resetStyles';

const GlobalStyles = createGlobalStyle<{ $themeName: 'light' | 'dark' }>`
  ${resetStyles}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: "Figtree", serif;
    font-size: 16px;
    color: white;
    background-color: ${({ $themeName }) => themeSettings[$themeName].mainBackground};
    transition: background-color 0.3s ease, color 0.3s ease;
    -webkit-user-drag: none;
    user-select: none;
    overflow: hidden;
  }

  button{
    cursor: pointer;
    color: white;
    font-size: inherit;
    font-family: inherit;
  }
`;

export default GlobalStyles;
