import React, { createContext, useState } from 'react';

export const SignupContext = createContext({
  showSignup: false,
  setShowSignup: () => {},
});

const UpdateSignupContext = React.createContext();

// export const useSignup = () => {
//   return useContext(SignupContext);
// };

// export const useSignupUpdate = () => {
//   return useContext(UpdateSignupContext);
// };

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

// import { createContext, useState } from 'react';
// export const SignupContext = createContext({
//   user: null,
//   setUser: () => {},
// });
// export default function ({ children }) {
//   const [showSignup, setShowSignup] = useState(false);
//   return (
//     <userContext.Provider value={{ user, setUser }}>
//       {children}
//     </userContext.Provider>
//   );
// }
