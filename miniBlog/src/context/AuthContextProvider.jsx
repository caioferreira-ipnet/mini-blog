import { AuthContextCreate } from "./AuthContextCreate";
export const AuthContextProvider = ({ children, value }) => {
  return (
    <AuthContextCreate.Provider value={value}>
      {children}
    </AuthContextCreate.Provider>
  );
};
