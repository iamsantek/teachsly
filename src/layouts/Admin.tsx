//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { defaultDashboardContext } from "../constants/DashboardContext";
import routes from "../routes.js";
import UserService from "../services/UserService";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import Auth from "./Auth";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

const Admin = (props: any) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  );

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      const user = UserService.generateUser(authData);
      console.log("User log in: ", user);
      setDashboardInformation({
        user: user,
      });

      setAuthState(nextAuthState);
    });
  }, []);

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: number) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

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
            brandText={getBrandText(props.location.pathname)}
          />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
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

export default Admin;
