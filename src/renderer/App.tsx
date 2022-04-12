import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { i18n } from '../locales';
import './App.css';
import { HomeView, NewView } from './views';
import { MyAppBar } from './components';
import { RTL } from './rtl';

export type AppContext = {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  language: 'en' | 'ar';
  setLanguage: (language: 'en' | 'ar') => void;
};

export const appContext = createContext<AppContext>({
  mode: 'light',
  setMode: () => {},
  language: 'ar',
  setLanguage: () => {},
});

export const useAppContext = () => useContext(appContext);

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState(i18n.language as 'en' | 'ar');
  useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    if (storedMode) {
      setMode(storedMode as 'light' | 'dark');
    }
  }, []);
  const createThemeCallback = () => createTheme({
    direction: language === 'en' ? 'ltr' : 'rtl',
    palette: {
      mode,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
  const [theme, setTheme] = useState(createThemeCallback());
  i18n.on('languageChanged', setLanguage);
  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.body.style.direction = language === 'ar' ? 'rtl' : 'ltr';
    setTheme(createThemeCallback());
  }, [language, mode]);
  return (
    <appContext.Provider value={{ mode, setMode, language, setLanguage }}>
      <I18nextProvider i18n={i18n}>
        <RTL>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <MyAppBar />
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/new" element={<NewView />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </RTL>
      </I18nextProvider>
    </appContext.Provider>
  );
}
