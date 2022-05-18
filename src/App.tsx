import { useCallback, useEffect, useState } from 'react'
import { matchRoutes, useLocation, useRoutes } from 'react-router-dom'
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
import { ApplicationRoute, CustomRouteObject } from './interfaces/Routes'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { SpinnerScreen } from './views/others/SpinnerScreen'
import { CognitoUserAmplify } from '@aws-amplify/ui'
import './App.css'
import CourseService from './services/CourseService'
import { ApplicationContext, UserContext } from './interfaces/DashboardContext'
import { UserDashboardContext } from './contexts/UserDashboardContext'
import { Course, User } from './API'
import { GRAPHQL_ENDPOINT } from './constants/Environment'
import CognitoService from './services/aws/CognitoService'
import LocalStorageService, { LocalStorageKeys } from './services/LocalStorageService'

Amplify.configure({
  ...awsExports,
  aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT
})

const App = () => {
  const [userSettings, setUserSettings] = useState<UserContext>(
    defaultUserContext
  )
  const [routes, setRoutes] = useState<ApplicationRoute[]>([])
  const theme = extendTheme(defaultTheme)

  const { user, route: authRoute } = useAuthenticator((context) => [context.user])

  useEffect(() => {
    CognitoService.createClient(user)
    LocalStorageService.saveItem(LocalStorageKeys.USER, user)

    return () => {
      LocalStorageService.cleanItem(LocalStorageKeys.USER)
    }
  }, [user])

  const fetchCourses = useCallback(async () => {
    if (!user) {
      return []
    }

    const courses = await CourseService.fetchCourses({
      nextToken: undefined
    })

    return courses?.listCourses?.items
  }, [user])

  const fetchRoutes = useCallback(async (cognitoUser: CognitoUserAmplify) => {
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
  }, [fetchCourses])

  useEffect(() => {
    if (authRoute === 'authenticated') {
      fetchRoutes(user)
    }
  }, [fetchRoutes, user, authRoute])

  const routeComponent = useRoutes(routes)
  const isContextLoaded = user && userSettings.routes.length > 0

  const dashboardContext: ApplicationContext = {
    context: userSettings,
    setApplicationContext: setUserSettings
  }

  const matchRoutesArray = matchRoutes(routes, useLocation().pathname)
  const withDashboardLayout = (matchRoutesArray?.at(0)?.route as CustomRouteObject)?.withDashboardLayout

  return (
      <ChakraProvider theme={theme}>
        <UserDashboardContext.Provider value={dashboardContext}>
          {authRoute === 'authenticated'
            ? isContextLoaded
              ? (
                  withDashboardLayout ? <DashboardLayout>{routeComponent}</DashboardLayout> : <>{routeComponent}</>
                )
              : <SpinnerScreen />
            : <LogInScreen />}
        </UserDashboardContext.Provider>
        <ToastWrapper />
      </ChakraProvider>
  )
}

export default App
