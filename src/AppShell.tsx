// @ts-nocheck
/**
 * AppShell — minimal layout wrapper for the standalone Workshop app.
 * No auth requirements. No login gates. Just the Workshop.
 */
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Radio, Activity, BarChart2, Home } from 'lucide-react'

export function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/' || location.pathname === ''
  const isSwarm = location.pathname.startsWith('/swarm')
  const isAnalytics = location.pathname.startsWith('/analytics')

  return (
    <div className="min-h-screen bg-co-bg text-co-text">
      {/* Nav */}
      <nav className="border-b border-co-border px-4 py-3 flex items-center gap-4" style={{ background: 'var(--co-nav-bg)' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--co-primary)' }}
        >
          <Radio className="w-5 h-5" />
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: '1.15rem', fontWeight: 600, letterSpacing: '0.02em' }}>
            Workshop
          </span>
        </button>

        <div className="flex items-center gap-1 ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem' }}>
          <NavLink active={isHome} onClick={() => navigate('/')}>
            <Home className="w-3.5 h-3.5" /> Coordinate
          </NavLink>
          <NavLink active={isSwarm} onClick={() => navigate('/swarm')}>
            <Activity className="w-3.5 h-3.5" /> Swarm
          </NavLink>
          <NavLink active={isAnalytics} onClick={() => navigate('/analytics')}>
            <BarChart2 className="w-3.5 h-3.5" /> Analytics
          </NavLink>
        </div>
      </nav>

      {/* Content */}
      <main className="px-4 py-6" id="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-co-border px-4 py-4 text-center" style={{ background: 'var(--co-footer-bg)' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: 'var(--co-text-muted)' }}>
          Workshop · Techne Institute · RegenHub, LCA · Boulder, Colorado
        </p>
      </footer>
    </div>
  )
}

function NavLink({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all"
      style={{
        background: active ? 'rgba(196,149,106,0.12)' : 'transparent',
        border: `1px solid ${active ? 'rgba(196,149,106,0.3)' : 'transparent'}`,
        color: active ? 'var(--co-primary)' : 'var(--co-text-muted)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
