import { useCallback, useEffect, useState } from "react";
import { matchRoutes, useLocation, useRoutes } from "react-router-dom";
import { defaultUserContext } from "./constants/DashboardContext";
import UserService from "./services/UserService";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { applicationRoutes, disabledAccountRoutes } from "./routes";
import DashboardLayout from "./layouts/DashboardLayout";
import { LogInScreen } from "./layouts/LogInScreen";
import { ApplicationRoute, CustomRouteObject } from "./interfaces/Routes";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { SpinnerScreen } from "./views/others/SpinnerScreen";
import "./App.css";
import CourseService from "./services/CourseService";
import { ApplicationContext, UserContext } from "./interfaces/DashboardContext";
import { UserDashboardContext } from "./contexts/UserDashboardContext";
import { Course, User } from "./API";
import { GRAPHQL_ENDPOINT } from "./constants/Environment";
import CognitoService from "./services/aws/CognitoService";
import LocalStorageService, {
  LocalStorageKeys,
} from "./services/LocalStorageService";
import { sortCoursesByName } from "./utils/CourseUtils";
import ReactGA from "react-ga4";
import { useToast } from "@chakra-ui/react";

ReactGA.initialize(
  process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID as string
);

Amplify.configure({
  ...awsExports,
  aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT,
});

const App = () => {
  const [userSettings, setUserSettings] =
    useState<UserContext>(defaultUserContext);
  const [routes, setRoutes] = useState<ApplicationRoute[]>([]);
  const [courseNextPageToken, setCourseNextPageToken] = useState<
    string | undefined
  >(undefined);
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    toast.closeAll();
    if (process.env.NODE_ENV === "production") {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location, toast]);

  const { user, route: authRoute } = useAuthenticator((context) => [
    context.user,
  ]);

  useEffect(() => {
    CognitoService.createClient(user);

    return () => {
      LocalStorageService.cleanItem(LocalStorageKeys.USER);
    };
  }, [user]);

  const fetchCourses = useCallback(async () => {
    if (!user) {
      return [];
    }

    const courses = await CourseService.fetchCourses({
      filterDisabledCourses: false,
      nextToken: courseNextPageToken,
    });

    if (courses?.listCourses?.nextToken) {
      setCourseNextPageToken(courses?.listCourses?.nextToken);
    }

    return courses?.listCourses?.items;
  }, [user, courseNextPageToken, setCourseNextPageToken]);

  const fetchRoutes = useCallback(
    async (cognitoUser: any) => {
      const cognitoId = cognitoUser?.username;

      const userResponse = UserService.fetchUserByCognitoId(cognitoId);
      const courseResponse = fetchCourses();

      const [user, courses] = await Promise.all([userResponse, courseResponse]);
      LocalStorageService.saveItem(LocalStorageKeys.USER, user);

      const userType = UserService.getUserType(user);
      let routes: ApplicationRoute[] = [];

      if (userType) {
        routes = user?.isDisabledUser
          ? disabledAccountRoutes
          : applicationRoutes[userType];
        setRoutes(routes);
      }

      setUserSettings({
        user: user as User,
        routes,
        courses: sortCoursesByName(courses as Course[]),
        externalUserId: cognitoId as string,
      });
    },
    [fetchCourses]
  );

  useEffect(() => {
    if (authRoute === "authenticated") {
      fetchRoutes(user);
    }
  }, [fetchRoutes, user, authRoute]);

  const routeComponent = useRoutes(routes);
  const isContextLoaded = user && userSettings.routes.length > 0;

  const dashboardContext: ApplicationContext = {
    context: userSettings,
    setApplicationContext: setUserSettings,
  };

  const matchRoutesArray = matchRoutes(routes, useLocation().pathname);
  const withDashboardLayout = (
    matchRoutesArray?.at(0)?.route as CustomRouteObject
  )?.withDashboardLayout;

  return (
    <>
      <UserDashboardContext.Provider value={dashboardContext}>
        {authRoute === "authenticated" ? (
          isContextLoaded ? (
            withDashboardLayout ? (
              <DashboardLayout>{routeComponent}</DashboardLayout>
            ) : (
              <>{routeComponent}</>
            )
          ) : (
            <SpinnerScreen />
          )
        ) : (
          <LogInScreen />
        )}
      </UserDashboardContext.Provider>
    </>
  );
};

export default App;
