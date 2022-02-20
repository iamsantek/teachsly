import { IconType } from "react-icons";
import { RouteObject } from "react-router-dom";
import { UserTypes } from "../enums/UserTypes";

export interface CustomRouteObject extends RouteObject {
  name: string;
  icon: string | IconType;
}

export type ApplicationRoute = CustomRouteObject | RouteObject;

export type ApplicationRoutes = { [key in UserTypes]: ApplicationRoute[] };
