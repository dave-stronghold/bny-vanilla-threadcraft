import { Providers, ProviderState } from "@microsoft/mgt-element";
import { Login } from "@microsoft/mgt-react";
import React, { useState, useEffect } from "react";
import "./App.css";
import Mails from "./components/Mails2";

function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

function App() {
  const [isSignedIn] = useIsSignedIn();
  return (
    <>
      <Login />
      <div>{isSignedIn && <Mails status={isSignedIn}/>}</div>
    </>
  );
}

export default App;
