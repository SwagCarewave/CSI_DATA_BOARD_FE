// src/styles/GlobalStyle.ts

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100vh;
  }

  body {
    font-family: "Pretendard", sans-serif;
    background-color: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.textPrimary};

    overflow-x: hidden;
  }

  button {
    border: none;
    outline: none;

    background: none;

    font-family: inherit;

    cursor: pointer;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
