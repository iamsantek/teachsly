import React, { useContext, useEffect } from "react";
// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import AuthNavbar from "../components/Navbars/AuthNavbar.js";
import AuthFooter from "../components/Footers/AuthFooter.js";

import SignIn from "../components/SignIn";
import { UserDashboardContext } from "../contexts/UserDashboardContext";

const Auth = (props: any) => {
  const { user } = useContext(UserDashboardContext);

  const mainContent = React.useRef(null);
  // const location = useLocation();

  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   //@ts-ignore
  //   document.scrollingElement.scrollTop = 0;
  //   //@ts-ignore
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
        <div className="header bg-gradient-info py-3 py-lg-8">
          <Container>
            <div className="header-body text-center">
              <Row className="justify-content-center">
                <SignIn />
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        {/* <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container> */}
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
