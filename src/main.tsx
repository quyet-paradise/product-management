import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { App } from './App'
import './index.css'
import { Login } from './routes/Login'

import { useAuth } from './hooks/useAuth'

const RequireAuth = ({ children }: { children: any }) => {
  const auth = useAuth()
  return auth ? children : <Navigate to='/login' />
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
