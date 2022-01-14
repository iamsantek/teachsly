import Profile from "./views/examples/Profile";
import Courses from "./views/sections/Courses";
import AdminDashboard from "./views/AdminDashboard";
import UserList from "./views/sections/UserList";
import { UserTypes } from "./enums/UserTypes";
import MediaContents from "./views/sections/MediaContents";
import { ApplicationRoute, ApplicationRoutes } from "./interfaces/Routes";

const adminDashboard: ApplicationRoute = {
  name: "Dashboard",
  icon: "ni ni-tv-2 text-primary",
  path: "/",
  element: <AdminDashboard />,
};

const mediaContents: ApplicationRoute = {
  name: "Contents",
  icon: "ni ni-bullet-list-67 text-red",
  path: "/contents",
  element: <MediaContents />,
};

const courses: ApplicationRoute = {
  name: "Cursos",
  icon: "ni ni-bullet-list-67 text-red",
  path: "/courses",
  element: <Courses />,
};

const students: ApplicationRoute = {
  path: "/students",
  name: "Students",
  icon: "ni ni-bullet-list-67 text-red",
  element: <UserList listType={UserTypes.STUDENT} />,
};

const teachers: ApplicationRoute = {
  path: "/teachers",
  name: "Teachers",
  icon: "ni ni-bullet-list-67 text-red",
  element: <UserList listType={UserTypes.TEACHER} />,
};

const profile: ApplicationRoute = {
  path: "/profile",
  name: "Profile",
  icon: "ni ni-single-02 text-yellow",
  element: <Profile />,
};

const adminRoutes: ApplicationRoute[] = [
  adminDashboard,
  mediaContents,
  courses,
  students,
  teachers,
  profile,
  { path: "*", element: <AdminDashboard /> },
];

export const applicationRoutes: ApplicationRoutes = {
  [UserTypes.ADMIN]: adminRoutes,
  [UserTypes.STUDENT]: adminRoutes,
  [UserTypes.TEACHER]: adminRoutes,
};
