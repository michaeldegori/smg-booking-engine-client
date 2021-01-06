import React, { createContext, useState } from 'react';

export const LoginContext = createContext({
  showLogin: false,
  setShowLogin: () => {},
});

const UpdateLoginContext = React.createContext();

export default function LoginProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <LoginContext.Provider value={{ showLogin, setShowLogin }}>
      <UpdateLoginContext.Provider
        value={{ handleLoginShow, handleLoginClose }}
      >
        {children}
      </UpdateLoginContext.Provider>
    </LoginContext.Provider>
  );
}
