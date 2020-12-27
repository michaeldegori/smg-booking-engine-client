import React, { useContext, useState } from 'react';

const SignupContext = React.createContext();
const UpdateSignupContext = React.createContext();

export const useSignup = () => {
  return useContext(SignupContext);
};

export const useSignupUpdate = () => {
  return useContext(UpdateSignupContext);
};

export default function SignupProvider({ children }) {
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
