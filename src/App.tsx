import React, { useEffect, useState } from "react";
import "./App.css";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import { defaultDashboardContext } from "./constants/DashboardContext";
import { UserDashboardContext } from "./contexts/UserDashboardContext";
import UserService from "./services/UserService";
import Admin from "./layouts/Admin";

Amplify.configure(awsExports);

function App() {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  );

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      const user = UserService.generateUser(authData);
      setDashboardInformation({
        user: user,
      });

      setAuthState(nextAuthState);
    });
  }, []);

  return authState === AuthState.SignedIn && dashboardInformation.user ? (
    <div className="App">
      <UserDashboardContext.Provider value={dashboardInformation}>
        <Dashboard />
      </UserDashboardContext.Provider>
    </div>
  ) : (
    <SignIn />
  );
}

export default App;
