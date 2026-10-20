import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //CleanUp
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();
  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  //Criando usuário
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa ter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }

    setLoading(false);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "E-mail ou senha incorretos.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  //Função de logout
  const logout = async () => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
      setError("Ocorreu um erro ao tentar sair.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
