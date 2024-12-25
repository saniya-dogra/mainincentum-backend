import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'; 
import AllInOneChat from './components/widget/allinonechat.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AllInOneChat />
  <ScrollToTop />
  <App />
  </BrowserRouter>
</StrictMode>,
)
