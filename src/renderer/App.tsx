import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { i18n } from '../locales';
import { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeView } from './views';
import { MyAppBar } from './components';

export type AppContext = {
	mode: 'light' | 'dark';
	setMode: (mode: 'light' | 'dark') => void;
}

export const appContext = createContext<AppContext>({
	mode: 'light',
	setMode: () => {},
});

export const useAppContext = () => useContext(appContext);

export default function App() {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	useEffect(() => {
		const storedMode = localStorage.getItem('mode');
		if (storedMode) {
			setMode(storedMode as 'light' | 'dark');
		}
	}, []);
	const theme = createTheme({
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
	useEffect(() => {
		localStorage.setItem('mode', mode);
	}, [mode]);
	return (
		<appContext.Provider value={{ mode, setMode }}>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<MyAppBar />
						<Routes>
							<Route path="/" element={<HomeView />} />
						</Routes>
					</Router>
				</ThemeProvider>
			</I18nextProvider>
		</appContext.Provider>
	);
}
