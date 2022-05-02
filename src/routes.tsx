import UserList from './views/UserList'
import { UserTypes } from './enums/UserTypes'
import { ApplicationRoute, ApplicationRoutes } from './interfaces/Routes'
import { FiHome } from 'react-icons/fi'
import { MediaContentsScreen } from './views/media/MediaContentsScreen'
import { StudentsHomeScreen } from './views/homeScreen/StudentsHomeScreen'
import { AiFillFolder, AiFillHome } from 'react-icons/ai'
import { BsFillCalendar2WeekFill, BsFillPeopleFill } from 'react-icons/bs'
import { AdminHomeScreen } from './views/homeScreen/AdminHomeScreen'
import { AdminCourseList } from './views/courses/AdminCourseList'
import { StudentsList } from './views/students/StudentsList'
import { TeachersHomeScreen } from './views/homeScreen/TeachersHomeScreen'
import { translate } from './utils/LanguageUtils'
import { PaymentsScreen } from './views/payments/PaymentsScreen'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { MediaFolderScreen } from './views/media/folders/MediaFolderScreen'
import { FetchType } from './enums/Media'

const adminHomeScreen: ApplicationRoute = {
  name: translate('MENU_HOME'),
  icon: AiFillHome,
  path: '/',
  element: <AdminHomeScreen />,
  showInNavbar: true
}

const payments: ApplicationRoute = {
  name: translate('MENU_PAYMENTS'),
  icon: FaMoneyCheckAlt,
  path: '/',
  element: <PaymentsScreen />,
  showInNavbar: true
}

const adminCoursesScreen: ApplicationRoute = {
  name: translate('MENU_COURSES'),
  icon: BsFillCalendar2WeekFill,
  path: '/courses',
  element: <AdminCourseList />,
  showInNavbar: true
}

const students: ApplicationRoute = {
  path: '/students',
  name: translate('MENU_STUDENTS'),
  icon: BsFillPeopleFill,
  element: <StudentsList />,
  showInNavbar: true
}

const teachers: ApplicationRoute = {
  path: '/teachers',
  name: translate('MENU_TEACHERS'),
  icon: BsFillPeopleFill,
  element: <UserList listType={UserTypes.TEACHER} />,
  showInNavbar: true
}

const studentHomeScreen: ApplicationRoute = {
  path: '/',
  name: translate('MENU_HOME'),
  icon: FiHome,
  element: <StudentsHomeScreen />,
  showInNavbar: true
}

const teachersHomeScreen: ApplicationRoute = {
  path: '/',
  name: translate('MENU_HOME'),
  icon: FiHome,
  element: <TeachersHomeScreen />,
  showInNavbar: true
}

const mediaContents: ApplicationRoute = {
  path: '/contents',
  name: translate('MENU_CONTENTS'),
  icon: AiFillFolder,
  element: <MediaContentsScreen fetchType={FetchType.ALL} />,
  showInNavbar: true
}

const studentsByCourseRoute: ApplicationRoute = { path: '/courses/:id/students', element: <StudentsList />, showInNavbar: true }
const mediaFolderCreateRoute: ApplicationRoute = { path: '/medias/folder/new', element: <MediaFolderScreen />, name: translate('CREATE_FOLDER'), showInNavbar: false }
const mediaContentDetailRoute: ApplicationRoute = { path: '/medias/:courseId', element: <MediaContentsScreen fetchType={FetchType.COURSE} />, showInNavbar: true }
const mediaFolderDetailRoute: ApplicationRoute = { path: '/medias/folder/:folderId', element: <MediaContentsScreen fetchType={FetchType.FOLDER} />, showInNavbar: true }
const mediaFolderEditRoute: ApplicationRoute = { path: '/medias/folder/:folderId/edit', element: <MediaFolderScreen />, showInNavbar: false }

const adminRoutes: ApplicationRoute[] = [
  adminHomeScreen,
  mediaContents,
  adminCoursesScreen,
  students,
  teachers,
  payments,
  mediaContentDetailRoute,
  studentsByCourseRoute,
  mediaFolderCreateRoute,
  mediaFolderDetailRoute,
  mediaFolderEditRoute,
  { path: '*', element: <AdminHomeScreen /> }
]

const studentRoutes: ApplicationRoute[] = [
  studentHomeScreen,
  mediaContents,
  mediaContentDetailRoute,
  studentsByCourseRoute,
  mediaFolderDetailRoute,
  { path: '*', element: <StudentsHomeScreen /> }
]

const teachersRoutes: ApplicationRoute[] = [
  teachersHomeScreen,
  mediaContents,
  students,
  mediaContentDetailRoute,
  studentsByCourseRoute,
  mediaFolderCreateRoute,
  mediaFolderDetailRoute,
  mediaFolderEditRoute,
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
