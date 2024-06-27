// src/context/GlobalContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

const initialState = {
  theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  locale: enUS,
};

const GlobalContext = createContext();

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};
const { darkAlgorithm } = theme;
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {

      console.log('?????')

      const newTheme = e.matches ? 'dark' : 'light';
      if (newTheme === "dark") {
	document.documentElement.classList.add("dark");
	document.body.style.backgroundColor = "black";
} else {
            document.documentElement.classList.remove("dark");
            document.body.style.backgroundColor = "white";
      }




      dispatch({ type: 'SET_THEME', payload: newTheme });
    };

    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0071c2',
          },
          algorithm: state.theme==='dark' ? [darkAlgorithm] : [],
        }}
      >
        {children}
      </ConfigProvider>
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
