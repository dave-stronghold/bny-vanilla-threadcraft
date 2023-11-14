import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";

Providers.globalProvider = new Msal2Provider({
  clientId: "6dc74d86-fb84-4d18-94d8-1125ece22692",
  scopes: [
    "calendars.read",
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
    "Mail.ReadBasic",
    "Mail.Read",
    "Mail.ReadWrite",
    "Mail.Send",
    "Mail.Send.Shared",
  ],
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
