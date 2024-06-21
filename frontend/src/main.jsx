import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {Toaster} from 'react-hot-toast'

const store = configureStore({
  reducer:rootReducer,

})

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>

  <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>

  </Provider>
)
