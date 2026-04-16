// @ts-nocheck
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { usePresenceHeartbeat } from './hooks/usePresenceHeartbeat'

const Coordinate = lazy(() => import('./pages/Coordinate').then(m => ({ default: m.Coordinate })))
const SprintDetail = lazy(() => import('./pages/SprintDetail').then(m => ({ default: m.SprintDetail })))
const SwarmViz = lazy(() => import('./pages/SwarmViz').then(m => ({ default: m.SwarmViz })))
const SwarmLive = lazy(() => import('./pages/SwarmLive').then(m => ({ default: m.SwarmLive })))
const GuildChatPage = lazy(() => import('./pages/GuildChatPage').then(m => ({ default: m.GuildChatPage })))
const Analytics = lazy(() => import('./pages/coordinate/Analytics'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#6a6a82' }}>
      Loading…
    </div>
  )
}

// Vite exposes BASE_URL as e.g. "/workcraft/" — React Router expects it without
// a trailing slash and stripped when it equals "/".
const rawBase = (import.meta as any).env?.BASE_URL ?? '/'
const routerBasename = rawBase === '/' ? undefined : rawBase.replace(/\/$/, '')

export default function App() {
  usePresenceHeartbeat()

  return (
    <BrowserRouter basename={routerBasename}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/coordinate" replace />} />
          <Route path="/coordinate" element={<Coordinate />} />
          <Route path="/coordinate/sprint/:id" element={<SprintDetail />} />
          <Route path="/coordinate/swarm" element={<SwarmViz />} />
          <Route path="/coordinate/swarm-live" element={<SwarmLive />} />
          <Route path="/coordinate/analytics" element={<Analytics />} />
          <Route path="/coordinate/chat" element={<GuildChatPage />} />
          <Route path="*" element={<Navigate to="/coordinate" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
