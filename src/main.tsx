import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SettingProvider, ThemeProvider } from './providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SettingProvider>
  </StrictMode>,
)
