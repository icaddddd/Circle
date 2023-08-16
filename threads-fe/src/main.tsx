import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { ChakraProvider } from '@chakra-ui/react'
// import { configureStore } from '@reduxjs/toolkit'

// const store = configureStore({
//   reducer:rootReducer
// })


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
