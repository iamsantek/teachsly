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
import { ContentLayout } from './layouts/ContentLayout'
import { CreateExamScreen } from './views/exams/CreateExamScreen'
import { ExamsHomeScreen } from './views/exams/ExamsHomeScreen'
import DashboardLayout from './layouts/DashboardLayout'
import { ExamIntroductionScreen } from './views/exams/ExamIntroductionScreen'

const adminHomeScreen: ApplicationRoute = {
  name: translate('MENU_HOME'),
  icon: AiFillHome,
  path: '/',
  element: <AdminHomeScreen />,
  showInNavbar: true,
  withDashboardLayout: true
}

const payments: ApplicationRoute = {
  name: translate('MENU_PAYMENTS'),
  icon: FaMoneyCheckAlt,
  path: '/',
  element: <PaymentsScreen />,
  showInNavbar: true,
  withDashboardLayout: true
}

const adminCoursesScreen: ApplicationRoute = {
  name: translate('MENU_COURSES'),
  icon: BsFillCalendar2WeekFill,
  path: '/courses',
  element: <AdminCourseList />,
  showInNavbar: true,
  withDashboardLayout: true
}

const students: ApplicationRoute = {
  path: '/students',
  name: translate('MENU_STUDENTS'),
  icon: BsFillPeopleFill,
  element: <StudentsList />,
  showInNavbar: true,
  withDashboardLayout: true
}

const teachers: ApplicationRoute = {
  path: '/teachers',
  name: translate('MENU_TEACHERS'),
  icon: BsFillPeopleFill,
  element: <UserList listType={UserTypes.TEACHER} />,
  showInNavbar: true,
  withDashboardLayout: true
}

const studentHomeScreen: ApplicationRoute = {
  path: '/',
  name: translate('MENU_HOME'),
  icon: FiHome,
  element: <StudentsHomeScreen />,
  showInNavbar: true,
  withDashboardLayout: true
}

const teachersHomeScreen: ApplicationRoute = {
  path: '/',
  name: translate('MENU_HOME'),
  icon: FiHome,
  element: <TeachersHomeScreen />,
  showInNavbar: true,
  withDashboardLayout: true
}

const mediaContents: ApplicationRoute = {
  path: '/contents',
  name: translate('MENU_CONTENTS'),
  icon: AiFillFolder,
  element: <MediaContentsScreen fetchType={FetchType.ALL} />,
  showInNavbar: true,
  withDashboardLayout: true
}

const createExamScreen: ApplicationRoute = {
  path: '/exams/new',
  name: translate('EXAMS'),
  icon: AiFillFolder,
  element: <CreateExamScreen />,
  showInNavbar: false,
  withDashboardLayout: true
}

const examsHomeScreen: ApplicationRoute = {
  path: '/exams',
  name: translate('EXAMS'),
  icon: AiFillFolder,
  element: <ExamsHomeScreen />,
  showInNavbar: true,
  withDashboardLayout: true

}

const examDetailRoute: ApplicationRoute = { path: '/exams/:examId', element: <CreateExamScreen />, showInNavbar: false, withDashboardLayout: true }
const examIntroductionRoute: ApplicationRoute = { path: '/exams/:examId/intro', element: <ExamIntroductionScreen />, showInNavbar: false, withDashboardLayout: false }

const studentsByCourseRoute: ApplicationRoute = { path: '/courses/:id/students', element: <StudentsList />, showInNavbar: true, withDashboardLayout: true }
const mediaFolderCreateRoute: ApplicationRoute = { path: '/medias/folder/new', element: <MediaFolderScreen />, name: translate('CREATE_FOLDER'), showInNavbar: false, withDashboardLayout: true }
const mediaContentDetailRoute: ApplicationRoute = { path: '/medias/:courseId', element: <MediaContentsScreen fetchType={FetchType.COURSE} />, showInNavbar: true, withDashboardLayout: true }
const mediaFolderDetailRoute: ApplicationRoute = { path: '/medias/folder/:folderId', element: <MediaContentsScreen fetchType={FetchType.FOLDER} />, showInNavbar: true, withDashboardLayout: true }
const mediaFolderEditRoute: ApplicationRoute = { path: '/medias/folder/:folderId/edit', element: <MediaFolderScreen />, showInNavbar: false, withDashboardLayout: true }
const videoPreviewRoute: ApplicationRoute = { path: '/play/:mediaId', element: <ContentLayout />, showInNavbar: false, withDashboardLayout: false }

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
  videoPreviewRoute,
  createExamScreen,
  examsHomeScreen,
  examDetailRoute,
  { path: '*', element: <DashboardLayout><AdminHomeScreen /></DashboardLayout> }
]

const studentRoutes: ApplicationRoute[] = [
  studentHomeScreen,
  mediaContents,
  mediaContentDetailRoute,
  studentsByCourseRoute,
  mediaFolderDetailRoute,
  videoPreviewRoute,
  examsHomeScreen,
  examIntroductionRoute,
  { path: '*', element: <DashboardLayout><StudentsHomeScreen /></DashboardLayout> }
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
  videoPreviewRoute,
  createExamScreen,
  { path: '*', element: <DashboardLayout><TeachersHomeScreen /></DashboardLayout> }
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
