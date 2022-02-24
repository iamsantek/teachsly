import UserList from './views/UserList'
import { UserTypes } from './enums/UserTypes'
import { ApplicationRoute, ApplicationRoutes } from './interfaces/Routes'
import { FiHome } from 'react-icons/fi'
import { MediaContentsScreen } from './views/media/MediaContentsScreen'
import { StudentsHomeScreen } from './views/students/StudentsHomeScreen'
import { GiTeacher, GiWhiteBook } from 'react-icons/gi'
import { AiFillHome } from 'react-icons/ai'
import { ImBooks } from 'react-icons/im'
import { BsFillPeopleFill } from 'react-icons/bs'
import { AdminHomeScreen } from './views/homeScreen/AdminHomeScreen'
import { MdOutlinePayments } from 'react-icons/md'
import { CoursesList } from './views/courses/CoursesList'

const adminHomeScreen: ApplicationRoute = {
  name: 'Home',
  icon: AiFillHome,
  path: '/',
  element: <AdminHomeScreen />
}

const payments: ApplicationRoute = {
  name: 'Payments',
  icon: MdOutlinePayments,
  path: '/',
  element: <AdminHomeScreen />
}

const adminCoursesScreen: ApplicationRoute = {
  name: 'Cursos',
  icon: ImBooks,
  path: '/courses',
  element: <CoursesList />
}

const students: ApplicationRoute = {
  path: '/students',
  name: 'Estudiantes',
  icon: BsFillPeopleFill,
  element: <UserList listType={UserTypes.STUDENT} />
}

const teachers: ApplicationRoute = {
  path: '/teachers',
  name: 'Profesores',
  icon: GiTeacher,
  element: <UserList listType={UserTypes.TEACHER} />
}

const studentHomeScreen: ApplicationRoute = {
  path: '/',
  name: 'Home',
  icon: FiHome,
  element: <StudentsHomeScreen />
}

const mediaContents: ApplicationRoute = {
  path: '/contents',
  name: 'Contents',
  icon: GiWhiteBook,
  element: <MediaContentsScreen />
}

const adminRoutes: ApplicationRoute[] = [
  adminHomeScreen,
  mediaContents,
  adminCoursesScreen,
  students,
  teachers,
  payments,
  { path: '*', element: <AdminHomeScreen /> }
]

const studentRoutes: ApplicationRoute[] = [studentHomeScreen, mediaContents]

export const applicationRoutes: ApplicationRoutes = {
  [UserTypes.ADMIN]: adminRoutes,
  [UserTypes.STUDENT]: studentRoutes,
  [UserTypes.TEACHER]: adminRoutes
}
