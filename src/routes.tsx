import UserList from './views/UserList'
import { UserTypes } from './enums/UserTypes'
import { ApplicationRoute, ApplicationRoutes } from './interfaces/Routes'
import { FiHome } from 'react-icons/fi'
import { MediaContentsScreen } from './views/media/MediaContentsScreen'
import { StudentsHomeScreen } from './views/homeScreen/StudentsHomeScreen'
import { AiFillFolder, AiFillHome } from 'react-icons/ai'
import { BsFillCalendar2WeekFill, BsFillPeopleFill } from 'react-icons/bs'
import { AdminHomeScreen } from './views/homeScreen/AdminHomeScreen'
import { CoursesList } from './views/courses/CoursesList'
import { StudentsList } from './views/students/StudentsList'
import { TeachersHomeScreen } from './views/homeScreen/TeachersHomeScreen'
import { translate } from './utils/LanguageUtils'
import { PaymentsScreen } from './views/payments/PaymentsScreen'
import { FaMoneyCheckAlt } from 'react-icons/fa'

const adminHomeScreen: ApplicationRoute = {
  name: translate('MENU_HOME'),
  icon: AiFillHome,
  path: '/',
  element: <AdminHomeScreen />
}

const payments: ApplicationRoute = {
  name: translate('MENU_PAYMENTS'),
  icon: FaMoneyCheckAlt,
  path: '/',
  element: <PaymentsScreen />
}

const adminCoursesScreen: ApplicationRoute = {
  name: translate('MENU_COURSES'),
  icon: BsFillCalendar2WeekFill,
  path: '/courses',
  element: <CoursesList />
}

const students: ApplicationRoute = {
  path: '/students',
  name: translate('MENU_STUDENTS'),
  icon: BsFillPeopleFill,
  element: <StudentsList />
}

const teachers: ApplicationRoute = {
  path: '/teachers',
  name: translate('MENU_TEACHERS'),
  icon: BsFillPeopleFill,
  element: <UserList listType={UserTypes.TEACHER} />
}

const studentHomeScreen: ApplicationRoute = {
  path: '/',
  name: translate('MENU_HOME'),
  icon: FiHome,
  element: <StudentsHomeScreen />
}

const teachersHomeScreen: ApplicationRoute = {
  path: '/',
  name: translate('MENU_HOME'),
  icon: FiHome,
  element: <TeachersHomeScreen />
}

const mediaContents: ApplicationRoute = {
  path: '/contents',
  name: translate('MENU_CONTENTS'),
  icon: AiFillFolder,
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
  { path: '*', element: <StudentsHomeScreen /> },
  { path: '/courses/:id', element: <MediaContentsScreen /> }
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
