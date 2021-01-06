import React, { createContext, useState } from 'react';

export const SignupContext = createContext({
  showSignup: false,
  setShowSignup: () => {},
});

const UpdateSignupContext = React.createContext();

export default function SignupProvider({ children }) {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  return (
    <SignupContext.Provider value={{ showSignup, setShowSignup }}>
      <UpdateSignupContext.Provider
        value={{ handleSignupShow, handleSignupClose }}
      >
        {children}
      </UpdateSignupContext.Provider>
    </SignupContext.Provider>
  );
}
