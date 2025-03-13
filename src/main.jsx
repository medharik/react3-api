import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import {  ThemeProvider } from './components/ThemeProvider.jsx'
import { ProduitProvider } from './components/ProduitProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ProduitProvider>
    <App />
    </ProduitProvider>
  </ThemeProvider>,
)
