import { useState, useEffect } from "react";

import { db } from "../firebase/config.js";

import { doc, getDoc } from "firebase/firestore";
export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDocument() {
      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        // Só atualiza o estado se o componente ainda estiver visível na tela
        if (isMounted) {
          setDocument(docSnap.data());
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          console.log(error);
          setLoading(false);
        }
      }
    }

    if (id) {
      void loadDocument();
    }

    // Marca como falso se o usuário navegar para fora da página
    return () => {
      isMounted = false;
    };
  }, [docCollection, id]);

  return { document, loading, error };
};
