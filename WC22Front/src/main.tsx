import React from 'react'
import UserContextProvider from './contexts/userContext';
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'
import './styles/partials.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
)
