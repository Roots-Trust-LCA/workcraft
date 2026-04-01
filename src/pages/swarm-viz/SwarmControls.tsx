/** P251: Extracted from SwarmViz.tsx */

import { COMPLEXITY_NEON, LAYER_COLORS } from './SwarmHelpers'
import { usePageTitle } from '../../hooks/usePageTitle'


interface SwarmControlsProps {
  simFilter: 'all' | 'sim-only' | 'hide-sim'
  setSimFilter: React.Dispatch<React.SetStateAction<'all' | 'sim-only' | 'hide-sim'>>
  showLegends: boolean
  setShowLegends: React.Dispatch<React.SetStateAction<boolean>>
  dimensions: { width: number; height: number }
}

export default function SwarmControls({
  simFilter, setSimFilter, showLegends, setShowLegends, dimensions,
}: SwarmControlsProps) {
  usePageTitle('Swarm Controls')

  return (
    <>
      {/* P195: Simulation filter toggle */}
      <button
        onClick={() => setSimFilter(f => f === 'all' ? 'sim-only' : f === 'sim-only' ? 'hide-sim' : 'all')}
        title={simFilter === 'all' ? 'Show all nodes (sim + production)' : simFilter === 'sim-only' ? 'Show simulation nodes only' : 'Hide simulation nodes'}
        aria-label="Toggle simulation filter"
        style={{
          position: 'absolute',
          top: '12px',
          left: '50px',
          background: simFilter !== 'all' ? 'rgba(20,40,20,0.95)' : 'rgba(10, 10, 10, 0.88)',
          border: `1px solid ${simFilter !== 'all' ? '#4ade80' : 'var(--co-border)'}`,
          borderRadius: '4px',
          padding: '3px 7px',
          color: simFilter !== 'all' ? '#4ade80' : 'var(--co-text-muted)',
          cursor: 'pointer',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.65rem',
          transition: 'all 0.2s',
        }}
      >
        {simFilter === 'all' ? 'SIM' : simFilter === 'sim-only' ? 'SIM ✓' : 'SIM ✗'}
      </button>

      {/* P154: Legend toggle button with label for discoverability */}
      <button
        onClick={() => setShowLegends(!showLegends)}
        title={showLegends ? "Hide legends" : "Show legends (complexity, layers, node types)"}
        aria-label={showLegends ? "Hide legends" : "Show legends"}
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(10, 10, 10, 0.88)',
          border: '1px solid var(--co-border)',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          color: showLegends ? 'var(--co-primary)' : '#777',
          cursor: 'pointer',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s',
        }}
      >
        ?
      </button>

      {/* P117: Complexity & Layer legends */}
      {showLegends && (
        <>
          {/* Complexity legend */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '12px',
            background: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid var(--co-border)',
            borderRadius: '6px',
            padding: '10px 12px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            color: 'var(--co-text-muted)',
            minWidth: '140px',
          }}>
            <div style={{ marginBottom: '8px', color: 'var(--co-text)', fontSize: '0.65rem', fontWeight: 500 }}>
              Sprint Complexity
            </div>
            {(['XS', 'S', 'M', 'L', 'XL'] as const).map(size => {
              const sizes: Record<string, number> = { XS: 16, S: 20, M: 26, L: 32, XL: 40 }
              const s = sizes[size]
              const neon = COMPLEXITY_NEON[size]
              return (
                <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <svg width="32" height="32" style={{ flexShrink: 0 }}>
                    <polygon
                      points={`16,${16-s} ${16+s},16 16,${16+s} ${16-s},16`}
                      fill={neon + '33'}
                      stroke={neon}
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span style={{ color: neon }}>{size}</span>
                </div>
              )
            })}
          </div>

          {/* Layer legend */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '180px',
            background: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid var(--co-border)',
            borderRadius: '6px',
            padding: '10px 12px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            color: 'var(--co-text-muted)',
            minWidth: '160px',
          }}>
            <div style={{ marginBottom: '8px', color: 'var(--co-text)', fontSize: '0.65rem', fontWeight: 500 }}>
              Seven Layers
            </div>
            {Object.entries({
              '1': 'Identity', '2': 'State', '3': 'Relationship',
              '4': 'Event', '5': 'Flow', '6': 'Constraint', '7': 'View'
            }).map(([num, name]) => (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  width: '12px',
                  height: '12px',
                  background: LAYER_COLORS[num],
                  borderRadius: '2px',
                  flexShrink: 0,
                }} />
                <span style={{ color: 'var(--co-text)' }}>{name}</span>
              </div>
            ))}
          </div>

          {/* P162: Edge types legend */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '348px',
            background: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid var(--co-border)',
            borderRadius: '6px',
            padding: '10px 12px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            color: 'var(--co-text-muted)',
            minWidth: '140px',
          }}>
            <div style={{ marginBottom: '8px', color: 'var(--co-text)', fontSize: '0.65rem', fontWeight: 500 }}>
              Edge Types
            </div>
            {([
              { label: 'Claim', color: 'var(--co-text-muted)', dash: 'none', width: 2 },
              { label: 'Propose', color: 'var(--co-text-muted)', dash: '5,4', width: 1.2 },
              { label: 'Sprint→Repo', color: 'var(--co-text-muted)', dash: '3,3', width: 1.5 },
              { label: 'Co-authorship', color: 'var(--co-primary)', dash: 'none', width: 2.5 },
            ] as const).map(e => (
              <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <svg width="28" height="8" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="4" x2="28" y2="4" stroke={e.color} strokeWidth={e.width} strokeDasharray={e.dash} strokeOpacity="0.7" />
                </svg>
                <span style={{ color: 'var(--co-text)' }}>{e.label}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{
        position: 'absolute', bottom: '12px', left: '12px',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)',
        maxWidth: dimensions.width < 500 ? '180px' : undefined,
      }}>
        {dimensions.width < 500
          ? 'pinch/scroll · tap ◆ for details'
          : 'scroll to zoom · drag to pan · click ◆ for details · ◆ active sprints · ■ repos · ● agents · hidden after 3h inactive'}
      </div>
    </>
  )
}
