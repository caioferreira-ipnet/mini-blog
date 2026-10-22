import { useState, useEffect } from "react";

import { db } from "../firebase/config.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    let unsubscribe;

    async function loadData() {
      setLoading(true);
      const collectionRef = collection(db, docCollection);

      try {
        let q;
        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc"),
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc"),
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        // Armazena a função de cancelamento da inscrição do Firestore
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      }
    }

    void loadData();

    // Função de limpeza do useEffect
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [docCollection, search, uid]);

  return { documents, loading, error };
};
