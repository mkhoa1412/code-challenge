import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';

// Create your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // blue
    },
    secondary: {
      main: '#f50057', // pink
    },
  },
});

type ThemeProviderProps = {
  children: ReactNode;
};

// Define your component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    // Wrap your app with ThemeProvider and provide the custom theme
    <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
  );
};
