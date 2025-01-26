import { useContext } from "react";
import { commentsContext } from "../context/commentscontext";

export const useCommentsContext = () => {
  const context = useContext(commentsContext);

  return context;
};
