import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CommentsContextProvider } from "./context/commentscontext";
import { Colorcontextprovider } from "./context/colorcontext";
import { ListContextProvider } from "./context/listcontext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CommentsContextProvider>
      <Colorcontextprovider>
        <ListContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ListContextProvider>
      </Colorcontextprovider>
    </CommentsContextProvider>
  </React.StrictMode>
);
