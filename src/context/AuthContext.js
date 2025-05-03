import { createContext, useState, useEffect, useContext } from 'react';
import {loginService,registerService} from '../services/allApis';
import { ThemeContext } from './ThemeContext';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setThemeName } = useContext(ThemeContext);

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  });

  const login = async (credentials) => {
    const { data } = await loginService(credentials);
    // console.log("data",data)
    setThemeName(data.theme)
    localStorage.setItem('token', data.token);
    setUser(JSON.parse(atob(data.token.split('.')[1])));
  };

  const register = async (details) => {
    const { data } = await registerService(details);
    localStorage.setItem('token', data.token);
    setUser(JSON.parse(atob(data.token.split('.')[1])));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
