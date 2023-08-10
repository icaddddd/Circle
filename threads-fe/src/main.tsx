import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { ChakraProvider, Colors, ThemeConfig, extendTheme } from '@chakra-ui/react'

const colors: Colors = {
  brand: {
    grey: "#878787",
    green: "#04A51F"
  }
}

const config: ThemeConfig = {
  initialColorMode: "dark"
}

const theme = extendTheme({ colors, config})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
