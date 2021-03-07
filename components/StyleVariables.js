import { createGlobalStyle } from 'styled-components';

export const StyleVariables = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.mode === 'light' ? '#19A974' : '#3cb689'};
    --color-primary-dark: ${({ theme }) => theme.mode === 'light' ? '#18a16e' : '#36a47b'};

    --color-background: ${({ theme }) => theme.mode === 'light' ? '#eeeeee' : '#555555'};
    --color-background-light: ${({ theme }) => theme.mode === 'light' ? 'white' : '#606060'};
    --color-foreground: ${({ theme }) => theme.mode === 'light' ? '#222222' : 'white'};
    --color-foreground-light: #22222240;
    --color-foreground-dark: #999999;
    --color-foreground-invert: white;

    --color-dim-bg: ${({ theme }) => theme.mode === 'light' ? '#0000000B' : '#00000015'};

    --hover-dim-duration: .15s;
  }
`;
