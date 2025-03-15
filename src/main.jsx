import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
// import App2 from './App2.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>


    <App />

  </ThemeProvider>
)
