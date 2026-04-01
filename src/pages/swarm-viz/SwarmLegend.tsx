/** P251: Extracted from SwarmViz.tsx */

import { STATUS_COLORS } from './SwarmHelpers'
import { usePageTitle } from '../../hooks/usePageTitle'


interface CommitContributor {
  login: string
  avatar: string
  contributions: number
  repos: string[]
}

interface SwarmLegendProps {
  dimensions: { width: number; height: number }
  commitLeaderboard: CommitContributor[]
}

export default function SwarmLegend({ dimensions, commitLeaderboard }: SwarmLegendProps) {
  usePageTitle('Swarm Legend')

  return (
    <>
      {/* Overlay: Agent Status + Edges legend — P135: hidden on mobile / P136: z-index 50 */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        background: 'rgba(10, 10, 10, 0.88)', border: '1px solid var(--co-border)', borderRadius: '4px',
        padding: '10px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--co-text-muted)',
        display: dimensions.width < 500 ? 'none' : 'block',
        zIndex: 50,
      }}>
        <div style={{ marginBottom: '6px', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.55rem' }}>Agent Status</div>
        {Object.entries(STATUS_COLORS).filter(([k]) => !['idle'].includes(k)).map(([key, color]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span>{key}</span>
          </div>
        ))}
        <div style={{ marginTop: '8px', marginBottom: '4px', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.55rem' }}>Edges</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{ width: '16px', height: '0', borderTop: '2px solid #555' }} />
          <span>sprint link</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '16px', height: '0', borderTop: '1px dashed #555' }} />
          <span>repo contrib</span>
        </div>
      </div>

      {/* Overlay: Commits by Agent leaderboard */}
      {commitLeaderboard.length > 0 && (
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px', width: '230px',
          background: 'rgba(10, 10, 10, 0.88)',
          border: '1px solid var(--co-border)', borderRadius: '4px',
          padding: '10px 12px',
          fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)',
        }}>
          <div style={{
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--co-text-muted)', marginBottom: '8px', fontSize: '0.58rem',
          }}>
            Commits by contributor
          </div>
          {commitLeaderboard.map((c, i) => (
            <div key={c.login} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '3px 0',
              borderBottom: i < commitLeaderboard.length - 1 ? '1px solid rgba(42,42,42,0.5)' : 'none',
            }}>
              <span style={{ width: '14px', color: 'var(--co-text-muted)', textAlign: 'right', fontSize: '0.58rem' }}>{i + 1}</span>
              {c.avatar ? (
                <img
                  src={`${c.avatar}&s=16`}
                  alt=""
                  style={{ width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0 }}
                />
              ) : (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--co-primary)', flexShrink: 0 }} />
              )}
              <a
                href={`https://github.com/${c.login}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, fontWeight: 500, fontSize: '0.65rem',
                  color: 'var(--co-text)', textDecoration: 'none',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}
              >
                {c.login}
              </a>
              <span style={{ color: 'var(--co-text)', minWidth: '28px', textAlign: 'right', fontWeight: 500 }}>
                {c.contributions}
              </span>
              <span style={{
                fontSize: '0.5rem', color: 'var(--co-text-muted)',
                minWidth: '16px', textAlign: 'right',
              }}>
                {c.repos.length}r
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
