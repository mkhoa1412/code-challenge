import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import CustomizedThemeProvider from './providers/themeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomizedThemeProvider>
      <App />
    </CustomizedThemeProvider>
  </StrictMode>
);
