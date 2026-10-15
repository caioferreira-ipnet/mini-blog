import { AuthContextCreate } from "../context/AuthContextCreate.jsx";
import { useContext } from "react";
export const useAuthValue = () => {
  return useContext(AuthContextCreate);
};
