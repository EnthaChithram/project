import { createContext, useReducer, useState } from "react";

export const commentsContext = createContext([]);

export const commentsReducer = (state, action) => {
  switch (action.type) {
    case "set_comments":
      return { ...state, comments: action.payload };

    case "create_comment":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        isReplying: false,
      };

    case "delete_comment":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    case "update":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload
            ? {
                ...comment,
                text: "[DELETED COMMENT]",
                userid: { ...comment.userid, username: "[DELETED]" },
              }
            : comment
        ),
      };

    case "reply_on":
      return {
        ...state,
        isReplying: true,
      };

    case "reply_off":
      return {
        ...state,
        isReplying: false,
      };

    default:
      return state;
  }
};

export const CommentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, {
    comments: [],
    isReplying: false,
  });

  return (
    <commentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </commentsContext.Provider>
  );
};
