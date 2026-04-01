/**
 * IdeaGarden — /coordinate/garden
 *
 * Embeds the standalone Idea Garden (L-system plant visualization for
 * knowledge clusters) within the co-op.us coordinate shell.
 * The garden.html app runs in an iframe to isolate its Three.js/WebGL
 * context from the React DOM.
 *
 * Static assets served from /garden/ (copied from app-src/public/garden/).
 */

import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '../../../hooks/usePageTitle'


export default function IdeaGarden() {
  usePageTitle('Idea Garden')

  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0a0a0f',
    }}>
      {/* Minimal top bar — back to coordinate */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid #1a1a2e',
        background: 'rgba(8, 8, 7, 0.95)',
        flexShrink: 0,
        zIndex: 10,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#d6d7d0',
            cursor: 'pointer',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.8rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          <ArrowLeft size={14} />
          coordinate
        </button>
        <span style={{
          color: '#616161',
          fontSize: '0.8rem',
          fontFamily: "'IBM Plex Mono', monospace",
        }}>/</span>
        <span style={{
          color: '#d4a843',
          fontSize: '0.8rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
        }}>garden</span>
      </div>

      {/* Garden iframe — full remaining viewport */}
      <iframe
        src="/garden/garden.html"
        title="Idea Garden"
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          background: '#0a0a0f',
        }}
        allow="clipboard-read; clipboard-write"
      />
    </div>
  )
}
