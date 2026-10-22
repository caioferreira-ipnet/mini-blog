import { useReducer } from "react";
import { db } from "../firebase/config.js";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const deleteDocument = async (id) => {
    dispatch({ type: "LOADING" });

    try {
      const deletedDocument = deleteDoc(doc(db, docCollection, id));
      dispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { deleteDocument, response };
};
