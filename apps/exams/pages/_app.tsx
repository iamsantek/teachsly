import '@fontsource/nunito'
import '@fontsource/raleway'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import { theme } from '../components/theme'

function MyApp ({ Component, pageProps }: AppProps) {
  const themeSettings = extendTheme(theme)

  return (
    <ChakraProvider theme={themeSettings}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
