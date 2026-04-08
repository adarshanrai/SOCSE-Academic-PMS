import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import ToastProvider from './components/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider />
    <App />
  </StrictMode>,
)
