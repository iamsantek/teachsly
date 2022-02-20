//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { defaultDashboardContext } from "./constants/DashboardContext";
import UserService from "./services/UserService";
import { UserDashboardContext } from "./contexts/UserDashboardContext";
import Auth from "./layouts/Auth";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { applicationRoutes } from "./routes";
import CustomAlert from "./components/Alerts/Alert";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import DashboardLayout from "./layouts/DashboardLayout";
import { extendTheme } from "@chakra-ui/react";
import { defaultTheme } from "./constants/Theme";

Amplify.configure(awsExports);

const App = () => {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  );

  const [routes, setRoutes] = useState<Route[]>([]);
  const theme = extendTheme(defaultTheme);

  useEffect(() => {
    return onAuthUIStateChange(async (nextAuthState, authData) => {
      if (
        nextAuthState === AuthState.VerifyContact ||
        nextAuthState === AuthState.SignedOut ||
        nextAuthState === AuthState.ResetPassword ||
        !authData
      ) {
        setDashboardInformation({
          user: null,
        });
        return;
      }

      const cognitoId = authData.attributes.sub;
      const user = await UserService.fetchUserByCognitoId(cognitoId);
      const userType = UserService.getUserType(user);

      if (userType) {
        setRoutes(applicationRoutes[userType]);
      }

      setDashboardInformation({
        user: {
          ...user,
          type: userType,
        },
        routes: applicationRoutes[userType],
      });

      setAuthState(nextAuthState);
    });
  }, []);


  const routeComponent = useRoutes(routes);
  const location = useLocation();
  const routeName = routes.find((route) => route.path === location.pathname);

  return authState === AuthState.SignedIn && dashboardInformation.user ? (
    <ChakraProvider theme={theme}>
      <UserDashboardContext.Provider value={dashboardInformation}>
        <DashboardLayout>
          <Heading marginY={4} as="h4">
            {routeName?.name}
          </Heading>
          <CustomAlert />
          {routeComponent}
        </DashboardLayout>
      </UserDashboardContext.Provider>
    </ChakraProvider>
  ) : (
    <ChakraProvider>
      <Auth />
    </ChakraProvider>
  );
};

export default App;
