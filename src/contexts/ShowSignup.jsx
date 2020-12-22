import { createContext, useState } from 'react';
export const showSignupContext = createContext({
  showSignup: false,
  setShowSignup: () => {},
});
export default function ({ children }) {
  const [showSignup, setShowSignup] = useState();
  return (
    <showSignupContext.Provider value={{ showSignup, setShowSignup }}>
      {children}
    </showSignupContext.Provider>
  );
}
