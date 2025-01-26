import { createContext, useReducer, useState } from "react";

export const commentsContext = createContext([]);


export const commentsReducer = ((state, action) => {
    switch (action.type) {
        case "set_comments":
            return {
                comments: action.payload
            }
        case "create_comment":
            if (!state.comments.includes(action.payload)) {
                return {
                    ...state,
                    comments: [...state.comments, action.payload],
                };
            }

            return {
                state

            } // Prevent duplicate updates

        // case "set_tasks":
        //     return {
        //         tasks: action.payload
        //     }
        case "new_task":
            return {
                task: [...state.tasks, action.payload]
            }
        default:
            return state
    }
})

export const CommentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentsReducer, { comments: [], tasks: ["okok", "nice"] })

    return (
        <commentsContext.Provider value={{ ...state, dispatch }}>{children}</commentsContext.Provider>
    )
}