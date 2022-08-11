import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'
import '@aws-amplify/ui-react/styles.css'
import App from './App'
import { ChakraProvider, ColorModeScript, createStandaloneToast, extendTheme } from '@chakra-ui/react'
import { Authenticator } from '@aws-amplify/ui-react'
import { defaultTheme } from './constants/Theme';

const container = document.getElementById('root');
const root = createRoot(container!)
const { ToastContainer } = createStandaloneToast()
const theme = extendTheme(defaultTheme)

const app = (
  <Authenticator.Provider>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
            <>
              <App />
              <ToastContainer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </Authenticator.Provider>
)

root.render(app);
