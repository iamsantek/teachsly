import { RouteMatch } from "react-router-dom";
import { hideHeaderRoutes } from "../routes";

export const showHeader = (route: RouteMatch) => {
  console.log(route);
  if (!route.pathname) {
    return false;
  }

  return !hideHeaderRoutes.map((route) => route.path).includes(route.pathname);
};

export default showHeader;
