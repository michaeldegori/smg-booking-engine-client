import React, { useContext, useState } from 'react';

const SignupContext = React.createContext();
const UpdateSignupContext = React.createContext();

export function useSignup() {
  return useContext(SignupContext);
}

export function useSignupUpdate() {
  return useContext(UpdateSignupContext);
}

export function SignupProvider({ children }) {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  return (
    <SignupContext.Provider value={showSignup}>
      <UpdateSignupContext.Provider
        value={{ handleSignupShow, handleSignupClose }}
      >
        {children}
      </UpdateSignupContext.Provider>
    </SignupContext.Provider>
  );
}
