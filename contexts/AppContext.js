import { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

const initialContextValue =
{
  theme:
  {
    mode: 'dark',
  },
};

const AppContext = createContext(initialContextValue);
export const useAppContext = () => useContext(AppContext);

class AppContextHook
{
  constructor()
  {
    const [state, setState] = useState(initialContextValue);
    this.state = state;
    this.setState = setState;

    this.theme = this.state.theme;
  }

  toggleTheme()
  {
    this.setState(
      {
        ...this.state,
        theme: { mode: this.state.theme.mode === 'light' ? 'dark' : 'light' },
      }
    );
  }
}

export function AppContextProvider({ children })
{
  const appContextHook = new AppContextHook();

  return (
    <AppContext.Provider value={appContextHook}>
      <ThemeProvider theme={appContextHook.state.theme}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
