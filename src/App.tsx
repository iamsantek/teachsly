import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { defaultUserContext } from './constants/DashboardContext'
import UserService from './services/UserService'
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
import { ApplicationContext, UserContext } from './interfaces/DashboardContext'
import { UserDashboardContext } from './contexts/UserDashboardContext'
import { Course, User } from './API'
import { isDevEnvironment } from './utils/EnvironmentUtils'

Amplify.configure(awsExports)

const App = () => {
  const [userSettings, setUserSettings] = useState<UserContext>(
    defaultUserContext
  )
  const [routes, setRoutes] = useState<ApplicationRoute[]>([])
  const theme = extendTheme(defaultTheme)

  const { user, route: authRoute } = useAuthenticator((context) => [context.user])

  console.log(`ENV: ${process.env.ENVIRONMENT}`)
  console.log(isDevEnvironment())

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
    const cognitoId = cognitoUser?.username

    const userResponse = UserService.fetchUserByCognitoId(cognitoId)
    const courseResponse = fetchCourses()

    const [user, courses] = await Promise.all([userResponse, courseResponse])

    const userType = UserService.getUserType(user)
    let routes: ApplicationRoute[] = []

    if (userType) {
      routes = user?.isDisabledUser ? disabledAccountRoutes : applicationRoutes[userType]
      setRoutes(routes)
    }

    setUserSettings({
      user: user as User,
      routes,
      courses: courses as Course[],
      externalUserId: cognitoId as string
    })
  }

  useEffect(() => {
    if (authRoute === 'authenticated') {
      console.log(user)
      fetchRoutes(user)
    }
  }, [authRoute])

  const routeComponent = useRoutes(routes)
  const isContextLoaded = user && userSettings.routes.length > 0

  const dashboardContext: ApplicationContext = {
    context: userSettings,
    setApplicationContext: setUserSettings
  }

  return (
    <ChakraProvider theme={theme}>
      <UserDashboardContext.Provider value={dashboardContext}>
        {authRoute === 'authenticated'
          ? isContextLoaded ? <DashboardLayout>{routeComponent}</DashboardLayout> : <SpinnerScreen />
          : <LogInScreen />}
      </UserDashboardContext.Provider>
      <ToastWrapper />
    </ChakraProvider>
  )
}

export default App
