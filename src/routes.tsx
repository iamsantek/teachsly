import UserList from './views/UserList'
import { UserTypes } from './enums/UserTypes'
import { ApplicationRoute, ApplicationRoutes } from './interfaces/Routes'
import { FiHome } from 'react-icons/fi'
import { MediaContentsScreen } from './views/media/MediaContentsScreen'
import { StudentsHomeScreen } from './views/homeScreen/StudentsHomeScreen'
import { GiTeacher, GiWhiteBook } from 'react-icons/gi'
import { AiFillHome } from 'react-icons/ai'
import { ImBooks } from 'react-icons/im'
import { BsFillPeopleFill } from 'react-icons/bs'
import { AdminHomeScreen } from './views/homeScreen/AdminHomeScreen'
import { MdOutlinePayments } from 'react-icons/md'
import { CoursesList } from './views/courses/CoursesList'
import { StudentsList } from './views/students/StudentsList'
import { TeachersHomeScreen } from './views/homeScreen/TeachersHomeScreen'

const adminHomeScreen: ApplicationRoute = {
  name: 'Home',
  icon: AiFillHome,
  path: '/',
  element: <AdminHomeScreen />
}

const payments: ApplicationRoute = {
  name: 'Pagos',
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
  name: 'Alumnos',
  icon: BsFillPeopleFill,
  element: <StudentsList />
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

const teachersHomeScreen: ApplicationRoute = {
  path: '/',
  name: 'Home',
  icon: FiHome,
  element: <TeachersHomeScreen />
}

const mediaContents: ApplicationRoute = {
  path: '/contents',
  name: 'Contenidos',
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

const studentRoutes: ApplicationRoute[] = [
  studentHomeScreen,
  mediaContents,
  { path: '*', element: <StudentsHomeScreen /> }
]

const teachersRoutes: ApplicationRoute[] = [
  teachersHomeScreen,
  mediaContents,
  students,
  { path: '*', element: <TeachersHomeScreen /> }
]

export const disabledAccountRoutes: ApplicationRoute[] = [
  studentHomeScreen,
  { path: '*', element: <StudentsHomeScreen /> }
]

export const applicationRoutes: ApplicationRoutes = {
  [UserTypes.ADMIN]: adminRoutes,
  [UserTypes.STUDENT]: studentRoutes,
  [UserTypes.TEACHER]: teachersRoutes
}
