// @ts-nocheck
import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { defaultDashboardContext } from './constants/DashboardContext'
import UserService from './services/UserService'
import { UserDashboardContext } from './contexts/UserDashboardContext'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
import { applicationRoutes, disabledAccountRoutes } from './routes'
import ToastWrapper from './components/Toast/ToastWrapper'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import DashboardLayout from './layouts/DashboardLayout'
import { defaultTheme } from './constants/Theme'
import { LogInScreen } from './layouts/LogInScreen'
import { ApplicationRoute } from './interfaces/Routes'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { SpinnerScreen } from './views/others/SpinnerScreen'
import { CognitoUserAmplify } from '@aws-amplify/ui'
import './App.css'
import CourseService from './services/CourseService'

Amplify.configure(awsExports)

const App = () => {
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  )
  const [routes, setRoutes] = useState<ApplicationRoute[]>([])
  const theme = extendTheme(defaultTheme)

  const { user } = useAuthenticator((context) => [context.user])

  const fetchCourses = async () => {
    if (!user) {
      return []
    }

    const courses = await CourseService.fetchCourses({
      nextToken: undefined
    })

    return courses?.listCourses?.items
  }

  const fetchRoutes = async (cognitoUser: CognitoUserAmplify) => {
    const cognitoId = cognitoUser?.attributes?.sub

    const userResponse = UserService.fetchUserByCognitoId(cognitoId)
    const courseResponse = fetchCourses()

    const [user, courses] = await Promise.all([userResponse, courseResponse])

    const userType = UserService.getUserType(user)
    let routes: ApplicationRoute[] = []

    if (userType) {
      routes = user?.isDisabledUser ? disabledAccountRoutes : applicationRoutes[userType]
      setRoutes(routes)
    }

    setDashboardInformation({
      user: {
        ...user,
        type: userType
      },
      routes,
      courses
    })
  }

  useEffect(() => {
    fetchRoutes(user)
  }, [user])

  const routeComponent = useRoutes(routes)
  const isLoading = !(user && dashboardInformation.routes.length > 0 && dashboardInformation.courses.length > 0)

  return (
        <ChakraProvider theme={theme}>
          <UserDashboardContext.Provider value={dashboardInformation}>
              {!isLoading && <DashboardLayout>{routeComponent}</DashboardLayout>}
              {!user && <LogInScreen />}
              {isLoading && <SpinnerScreen />}
          </UserDashboardContext.Provider>
          <ToastWrapper />
        </ChakraProvider>
  )
}

export default App
