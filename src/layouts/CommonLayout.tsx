//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import CommonFooter from "../components/Footers/CommonFooter";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { defaultDashboardContext } from "../constants/DashboardContext";
import UserService from "../services/UserService";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import Auth from "./Auth";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import { applicationRoutes } from "../routes";

Amplify.configure(awsExports);

const CommonLayout = (props: any) => {
  const mainContent = React.useRef(null);

  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  );
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    return onAuthUIStateChange(async (nextAuthState, authData) => {
      console.log(nextAuthState);
      console.log(authData);
      if (
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
      console.log("Log in", user);
      setDashboardInformation({
        user: user,
      });

      const userType = UserService.getUserType(user);

      if (userType) {
        setRoutes(applicationRoutes[userType]);
      }

      setAuthState(nextAuthState);
    });
  }, []);

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const routeComponent = useRoutes(routes);

  return authState === AuthState.SignedIn && dashboardInformation.user ? (
    <>
      <UserDashboardContext.Provider value={dashboardInformation}>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/argon-react.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location?.pathname)}
          />
          {routeComponent}
          <Container fluid>
            <CommonFooter />
          </Container>
        </div>
      </UserDashboardContext.Provider>
    </>
  ) : (
    <>
      <Auth />
    </>
  );
};

export default CommonLayout;
