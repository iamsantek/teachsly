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

Amplify.configure(awsExports)

const App = () => {
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [routes, setRoutes] = useState<ApplicationRoute[]>([])
  const theme = extendTheme(defaultTheme)

  const { user, isPending } = useAuthenticator((context) => [context.user])

  const fetchRoutes = async (cognitoUser: CognitoUserAmplify) => {
    const cognitoId = cognitoUser?.attributes.sub

    const user = await UserService.fetchUserByCognitoId(cognitoId)

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
      routes
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRoutes(user)
  }, [user])

  const routeComponent = useRoutes(routes)

  if (isLoading || isPending) {
    return (
        <ChakraProvider>
          <SpinnerScreen />
        </ChakraProvider>
    )
  }

  return user && dashboardInformation.user
    ? (
        <ChakraProvider theme={theme}>
          <UserDashboardContext.Provider value={dashboardInformation}>
            <DashboardLayout>
              <ToastWrapper />
              {routeComponent}
            </DashboardLayout>
          </UserDashboardContext.Provider>
        </ChakraProvider>

      )
    : (
        <ChakraProvider>
          <LogInScreen />
        </ChakraProvider>
      )
}

export default App
