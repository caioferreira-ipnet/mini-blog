import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };

    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [cancelled, setCancelled] = useState(false);
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const checkCanelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };
  const insertDocument = async (document) => {
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      await addDoc(collection(db, docCollection), newDocument);
      checkCanelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      checkCanelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
  checkCanelBeforeDispatch({
    type: "LOADING",
    payload: insertDocument,
  });
  //memory leak
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { insertDocument, response };
};
