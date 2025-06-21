import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Auth0Provider
      domain="dev-0umg70wqwl267g1l.us.auth0.com"
      clientId="xLKCvDc13fe2RO2QZ8k73tQ0qdA74vfY"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
        // audience:"http://localhost:3000",
      scope:"openid profile email",
      response_type: "code"
      }}
      
    >
    <App />
    </Auth0Provider>
   
  </React.StrictMode>
);
