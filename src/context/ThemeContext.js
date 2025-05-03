// themeContext.js
import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

const themeConfigs = {
  light: {
    palette: {
      mode: 'light',
      background: {
        default: '#f5f5f5'
      }
    }
  },
  dark: {
    palette: {
      mode: 'dark',
      background: {
        default: '#1e1e1e'
      }
    }
  },
  blue: {
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#e3f2fd'
      }
    }
  }
};

export function ThemeProviderWrapper({ children }) {
  const [themeName, setThemeName] = useState('light');

  const theme = useMemo(() => createTheme(themeConfigs[themeName]), [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
