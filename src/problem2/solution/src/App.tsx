import { AppProvider } from '@/providers/app';
import { ThemeProvider } from '@/providers/theme';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
