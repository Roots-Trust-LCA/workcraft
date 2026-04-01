// @ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { AppShell } from './AppShell'
import { Coordinate } from './pages/Coordinate'
import { SprintDetail } from './pages/SprintDetail'
import { SwarmViz } from './pages/SwarmViz'
import Analytics from './pages/coordinate/Analytics'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/workcraft">
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Coordinate />} />
          <Route path="sprint/:id" element={<SprintDetail />} />
          <Route path="swarm" element={<SwarmViz />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
