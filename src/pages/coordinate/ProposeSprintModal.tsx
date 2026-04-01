/** P239: Human Sprint Proposal UI — modal form for proposing sprints */
import { useState } from 'react'
import { X, Send, Layers, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { usePageTitle } from '../../hooks/usePageTitle'


const COMPLEXITY_OPTIONS = ['XS', 'S', 'M', 'L', 'XL'] as const
const LAYER_OPTIONS = [
  { id: 1, label: 'Identity', color: 'var(--co-primary)' },
  { id: 2, label: 'State', color: '#7ccfb8' },
  { id: 3, label: 'Relationship', color: '#a78bfa' },
  { id: 4, label: 'Event', color: '#60a5fa' },
  { id: 5, label: 'Flow', color: '#f59e0b' },
  { id: 6, label: 'Constraint', color: '#ef4444' },
  { id: 7, label: 'View', color: '#8b5cf6' },
]
const WORK_TYPES = [
  'ui', 'infrastructure', 'protocol', 'fix', 'documentation', 'agent-identity', 'process',
] as const

interface ProposeSprintModalProps {
  open: boolean
  onClose: () => void
  onProposed: () => void
  workshopChannelId: string | null
}

export function ProposeSprintModal({ open, onClose, onProposed, workshopChannelId }: ProposeSprintModalProps) {
  usePageTitle('Propose Sprint Modal')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [complexity, setComplexity] = useState<string>('S')
  const [layers, setLayers] = useState<number[]>([])
  const [workType, setWorkType] = useState<string>('infrastructure')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const toggleLayer = (id: number) => {
    setLayers(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id])
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Title is required'); return }
    if (title.trim().length < 5) { setError('Title must be at least 5 characters'); return }
    if (!description.trim()) { setError('Description is required'); return }

    setSubmitting(true)
    setError(null)

    try {
      // Get current user's participant ID
      // Standalone: no auth required for viewing
      

      // Look up participant by auth user
      const { data: participant } = await supabase
        .from('participants')
        .select('id, name, participant_type')
        .eq('auth_user_id', user.id)
        .maybeSingle()

      // Generate next sprint ID
      const { data: lastSprint } = await supabase
        .from('coordination_requests')
        .select('sprint_id')
        .not('sprint_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      const lastNum = lastSprint?.sprint_id?.match(/P(\d+)/)?.[1]
      const nextId = lastNum ? `P${parseInt(lastNum) + 1}` : 'P999'

      const { error: insertErr } = await supabase
        .from('coordination_requests')
        .insert({
          sprint_id: nextId,
          title: `${nextId}: ${title.trim()}`,
          description: description.trim(),
          complexity,
          layers: layers.length > 0 ? layers : null,
          work_type: workType,
          visibility_tier: 'tier-2-evolutionary',
          status: 'proposed',
          channel_id: workshopChannelId,
          proposer_id: participant?.id ?? null,
          reference_urls: ['https://co-op.us/app/coordinate'],
        })

      if (insertErr) throw insertErr

      // Reset form
      setTitle('')
      setDescription('')
      setComplexity('S')
      setLayers([])
      setWorkType('infrastructure')
      onProposed()
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '0.5rem',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* P304: Responsive modal — tighter padding on mobile */}
      <div style={{
        background: '#111', border: '1px solid var(--co-border)', borderRadius: '12px',
        width: '100%', maxWidth: '560px', maxHeight: '90vh', overflow: 'auto',
        padding: 'clamp(1rem, 4vw, 1.5rem)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 className="font-serif-cormorant" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--co-text)', margin: 0 }}>
            Propose Sprint
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--co-text-muted)', padding: '10px', minHeight: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close sprint proposal">
            <X size={20} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#ef44441a', border: '1px solid #ef444433', borderRadius: '8px',
            padding: '8px 12px', marginBottom: '1rem',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem', color: '#ef4444',
          }}>
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {/* Title */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            maxLength={200}
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Context, acceptance criteria, technical details..."
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          />
        </div>

        {/* Complexity + Work Type row */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Complexity</label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {COMPLEXITY_OPTIONS.map(c => (
                <button
                  key={c}
                  onClick={() => setComplexity(c)}
                  style={{
                    flex: 1, padding: '6px 0', borderRadius: '6px', cursor: 'pointer',
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem',
                    letterSpacing: '0.04em', border: 'none',
                    background: complexity === c ? '#c4956a22' : 'var(--co-surface)',
                    color: complexity === c ? 'var(--co-primary)' : 'var(--co-text-muted)',
                    outline: complexity === c ? '1px solid #c4956a44' : '1px solid var(--co-border)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Work Type</label>
            <select
              value={workType}
              onChange={e => setWorkType(e.target.value)}
              style={{
                width: '100%', background: 'var(--co-surface)', border: '1px solid var(--co-border)',
                borderRadius: '6px', color: 'var(--co-text)', padding: '6px 8px',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem',
                cursor: 'pointer',
              }}
            >
              {WORK_TYPES.map(wt => (
                <option key={wt} value={wt}>{wt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Layers */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={12} />
            Pattern Layers (optional)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {LAYER_OPTIONS.map(l => {
              const selected = layers.includes(l.id)
              return (
                <button
                  key={l.id}
                  onClick={() => toggleLayer(l.id)}
                  style={{
                    padding: '4px 10px', borderRadius: '6px', cursor: 'pointer',
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem',
                    letterSpacing: '0.04em', border: 'none',
                    background: selected ? `${l.color}1a` : 'var(--co-surface)',
                    color: selected ? l.color : 'var(--co-border)',
                    outline: selected ? `1px solid ${l.color}44` : '1px solid var(--co-border)',
                  }}
                >
                  {l.id}. {l.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting || !title.trim() || !description.trim()}
          style={{
            width: '100%', padding: '10px', borderRadius: '8px', cursor: submitting ? 'wait' : 'pointer',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.04em', border: 'none',
            background: submitting ? 'var(--co-border)' : 'var(--co-primary)',
            color: submitting ? 'var(--co-text-muted)' : '#0a0a0a',
            fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            opacity: (!title.trim() || !description.trim()) ? 0.4 : 1,
          }}
        >
          <Send size={14} />
          {submitting ? 'Proposing...' : 'Propose Sprint'}
        </button>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '4px',
  fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem',
  color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em',
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--co-surface)', border: '1px solid var(--co-border)',
  borderRadius: '8px', color: 'var(--co-text)', padding: '10px 12px',
  fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem',
  outline: 'none', boxSizing: 'border-box',
}
