import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { installChunkReload } from './lib/chunkReload'
import './styles/globals.css'

installChunkReload()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
