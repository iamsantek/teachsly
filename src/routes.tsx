import Profile from "./views/examples/Profile";
import Courses from "./views/sections/Courses";
import AdminDashboard from "./views/AdminDashboard";
import UserList from "./views/sections/UserList";
import { UserTypes } from "./enums/UserTypes";
import { ApplicationRoute, ApplicationRoutes } from "./interfaces/Routes";
import { FiHome } from "react-icons/fi";
import { StudentsMediaContentsScreen } from "./views/sections/students/StudentsMediaContentsScreen";
import MediaContents from "./views/sections/MediaContents";

const adminDashboard: ApplicationRoute = {
  name: "Home",
  icon: "ni ni-tv-2 text-primary",
  path: "/",
  element: <AdminDashboard />,
};

const mediaContents: ApplicationRoute = {
  name: "Contenidos",
  icon: "ni ni-bullet-list-67 text-primary",
  path: "/contents",
  element: <MediaContents />,
};

const courses: ApplicationRoute = {
  name: "Cursos",
  icon: "ni ni-bullet-list-67 text-primary",
  path: "/courses",
  element: <Courses />,
};

const students: ApplicationRoute = {
  path: "/students",
  name: "Estudiantes",
  icon: "fa fa-graduation-cap text-primary",
  element: <UserList listType={UserTypes.STUDENT} />,
};

const teachers: ApplicationRoute = {
  path: "/teachers",
  name: "Profesores",
  icon: "fa fa-users text-primary",
  element: <UserList listType={UserTypes.TEACHER} />,
};

const profile: ApplicationRoute = {
  path: "/profile",
  name: "Perfil",
  icon: "ni ni-single-02 text-primary",
  element: <Profile />,
};

const studentContents: ApplicationRoute = {
  path: "/contents",
  name: "Contents",
  icon: FiHome,
  element: <StudentsMediaContentsScreen />,
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

const studentRoutes: ApplicationRoute[] = [studentContents];

export const hideHeaderRoutes: ApplicationRoute[] = [profile];

export const applicationRoutes: ApplicationRoutes = {
  [UserTypes.ADMIN]: adminRoutes,
  [UserTypes.STUDENT]: studentRoutes,
  [UserTypes.TEACHER]: adminRoutes,
};
