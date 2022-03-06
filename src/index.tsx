import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'
import '@aws-amplify/ui-react/styles.css'
import App from './App'
import { ColorModeScript, theme } from '@chakra-ui/react'
import { Authenticator } from '@aws-amplify/ui-react'

ReactDOM.render(
  <Authenticator.Provider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Authenticator.Provider>,
  document.getElementById('root')
)
