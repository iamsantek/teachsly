import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Icons from "./views/examples/Icons.js";
import Courses from "./views/sections/Courses";
import AdminDashboard from "./views/AdminDashboard";
import UserList from "./views/sections/UserList";
import { UserTypes } from "./enums/UserTypes";
import MediaContents from "./views/sections/MediaContents";

export interface Route {
  path: string;
  name: string;
  icon: string;
  component: () => JSX.Element;
  layout: String;
}

const mainPaths = {
  [UserTypes.ADMIN]: "/admin",
  [UserTypes.STUDENT]: "/students",
  [UserTypes.TEACHER]: "/teachers",
};

const adminPath = mainPaths[UserTypes.ADMIN];
const adminRoutes: Route[] = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: () => <Index />,
    layout: adminPath,
  },
  {
    path: "/admin",
    name: "Admin",
    icon: "ni ni-tv-2 text-primary",
    component: () => <AdminDashboard />,
    layout: adminPath,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: () => <Icons />,
    layout: adminPath,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: () => <Maps />,
    layout: adminPath,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: () => <Profile />,
    layout: adminPath,
  },
  {
    path: "/courses",
    name: "Cursos",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <Courses />,
    layout: adminPath,
  },
  {
    path: "/students",
    name: "Students",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <UserList listType={UserTypes.STUDENT} />,
    layout: adminPath,
  },
  {
    path: "/contents",
    name: "Contents",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <MediaContents />,
    layout: adminPath,
  },
  {
    path: "/teachers",
    name: "Teacher",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <UserList listType={UserTypes.TEACHER} />,
    layout: "/admin",
  },
];

const studentPath = mainPaths[UserTypes.STUDENT];
const studentRoutes: Route[] = [
  {
    path: "/contents",
    name: "Contents",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <MediaContents />,
    layout: studentPath,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: () => <Icons />,
    layout: studentPath,
  },
];

const teachersPath = mainPaths[UserTypes.TEACHER];
const teacherRoutes: Route[] = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <MediaContents />,
    layout: teachersPath,
  },
  {
    path: "/contents",
    name: "Contents",
    icon: "ni ni-bullet-list-67 text-red",
    component: () => <MediaContents />,
    layout: teachersPath,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: () => <Icons />,
    layout: teachersPath,
  },
];

export const routes = {
  [UserTypes.ADMIN]: adminRoutes,
  [UserTypes.STUDENT]: studentRoutes,
  [UserTypes.TEACHER]: teacherRoutes,
};
