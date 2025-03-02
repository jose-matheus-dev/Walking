import { createContext, useState } from 'react';

type DefaultApp = {
  isAnimating: boolean;
  view: 'visual' | 'detail';
};

type AppContextType = {
  setApp: React.Dispatch<React.SetStateAction<DefaultApp>>;
  app: DefaultApp;
};

export const paths = ['/', '/shared', '/journal', '/account'];
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [app, setApp] = useState<DefaultApp>({ view: 'detail', isAnimating: false });

  return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>;
};
