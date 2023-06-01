import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PostProvider } from "./context/PostContext"
import AuthContextProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
        <PostProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </PostProvider>
    </AuthContextProvider>
)
