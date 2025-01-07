/**
 * @file reset.ts
 * @description This file is used to reset the default styles of the browser to generate a "clean" slate of CSS styles for the application.
 * @module styles/reset
 */

import { css } from 'styled-components';

export const resetStyles = css`
  * {
    box-sizing: border-box;
  }

  img {
    margin: 0;
    padding: 0;
    vertical-align: top;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    cursor: pointer;
    background: none;
    outline: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }

  p {
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
