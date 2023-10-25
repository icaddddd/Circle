import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { ChakraProvider } from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './stores/rootReducer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer:rootReducer
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
     <BrowserRouter>
      <App />
      </BrowserRouter>
    </ChakraProvider>
      </Provider>
  </React.StrictMode>,
)
