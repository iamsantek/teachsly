// @ts-nocheck
import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { defaultDashboardContext } from './constants/DashboardContext'
import UserService from './services/UserService'
import { UserDashboardContext } from './contexts/UserDashboardContext'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
import { applicationRoutes } from './routes'
import CustomAlert from './components/Alerts/Alert'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import DashboardLayout from './layouts/DashboardLayout'
import { defaultTheme } from './constants/Theme'
import { LogInScreen } from './layouts/LogInScreen'
import { ApplicationRoute } from './interfaces/Routes'

Amplify.configure(awsExports)

const App = () => {
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [dashboardInformation, setDashboardInformation] = useState(
    defaultDashboardContext
  )

  const [routes, setRoutes] = useState<ApplicationRoute[]>([])
  const theme = extendTheme(defaultTheme)

  useEffect(() => {
    return onAuthUIStateChange(async (nextAuthState, authData) => {
      if (
        nextAuthState === AuthState.VerifyContact ||
        nextAuthState === AuthState.SignedOut ||
        nextAuthState === AuthState.ResetPassword ||
        !authData
      ) {
        setDashboardInformation({
          user: null
        })
        return
      }

      const cognitoId = authData.attributes.sub
      const user = await UserService.fetchUserByCognitoId(cognitoId)
      const userType = UserService.getUserType(user)

      if (userType) {
        setRoutes(applicationRoutes[userType])
      }

      setDashboardInformation({
        user: {
          ...user,
          type: userType
        },
        routes: applicationRoutes[userType]
      })

      setAuthState(nextAuthState)
    })
  }, [])

  const routeComponent = useRoutes(routes)

  return authState === AuthState.SignedIn && dashboardInformation.user
    ? (
    <ChakraProvider theme={theme}>
      <UserDashboardContext.Provider value={dashboardInformation}>
        <DashboardLayout>
          <CustomAlert />
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
