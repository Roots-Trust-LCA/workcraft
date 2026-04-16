// @ts-nocheck
/**
 * RoadmapPanel — Full-width panel showing roadmap items above sprint tabs.
 * Roadmap items are directional work units that sprints link to.
 * Lighter lifecycle: propose → accept → in_progress → complete.
 */

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import type { RoadmapItem, RoadmapStatus, RoadmapPriority } from '../../types/roadmap'
import { PRIORITY_META, STATUS_META } from '../../types/roadmap'
import { Map, ChevronDown, ChevronRight, Plus, Zap, X } from 'lucide-react'

interface RoadmapPanelProps {
  sprints: any[]
  completedSprints: any[]
}

export function RoadmapPanel({ sprints, completedSprints }: RoadmapPanelProps) {
  const [items, setItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [showPropose, setShowPropose] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('')

  // Form state
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState<RoadmapPriority>('P2')
  const [newCategory, setNewCategory] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const loadItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('roadmap_items')
        .select('*, creator:participants!roadmap_items_created_by_fkey(name, craft_primary)')
        .order('created_at', { ascending: false })
        .limit(100)
      if (error) throw error

      // Count linked sprints for each item
      const allSprints = [...sprints, ...completedSprints]
      const enriched = (data || []).map((item: RoadmapItem) => {
        const linkedCount = allSprints.filter(s => s.roadmap_item_id === item.id).length
        return { ...item, linked_sprint_count: linkedCount }
      })

      setItems(enriched)
    } catch (err) {
      console.error('Failed to load roadmap items:', err)
    } finally {
      setLoading(false)
    }
  }, [sprints, completedSprints])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel('roadmap-items-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'roadmap_items' }, () => {
        loadItems()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [loadItems])

  const handlePropose = async () => {
    if (!newTitle.trim()) return
    setSubmitting(true)
    try {
      // Auto-assign next R-series ID
      const { data: maxRow } = await supabase
        .from('roadmap_items')
        .select('roadmap_id')
        .not('roadmap_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(100)
      const maxNum = (maxRow || []).reduce((max: number, r: { roadmap_id: string }) => {
        const m = r.roadmap_id?.match(/^R(\d+)$/)
        return m ? Math.max(max, parseInt(m[1])) : max
      }, 0)
      const nextId = `R${maxNum + 1}`

      const { error } = await supabase.from('roadmap_items').insert({
        roadmap_id: nextId,
        title: newTitle.trim(),
        description: newDescription.trim() || null,
        priority: newPriority,
        category: newCategory.trim() || null,
        status: 'proposed',
      })
      if (error) throw error
      setNewTitle('')
      setNewDescription('')
      setNewPriority('P2')
      setNewCategory('')
      setShowPropose(false)
      loadItems()
    } catch (err) {
      console.error('Failed to propose roadmap item:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusChange = async (itemId: string, newStatus: RoadmapStatus) => {
    try {
      const updates: Record<string, unknown> = { status: newStatus, updated_at: new Date().toISOString() }
      if (newStatus === 'accepted') updates.accepted_at = new Date().toISOString()
      if (newStatus === 'completed') updates.completed_at = new Date().toISOString()
      if (newStatus !== 'completed') updates.completed_at = null

      await supabase.from('roadmap_items').update(updates).eq('id', itemId)
      loadItems()
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const filteredItems = statusFilter
    ? items.filter(i => i.status === statusFilter)
    : items

  const activeCount = items.filter(i => i.status !== 'completed').length

  if (loading) return null

  return (
    <div className="bg-co-bg border border-co-border rounded-lg mb-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-co-border">
        <div className="flex items-center gap-3">
          <Map className="w-4 h-4 text-[#a78bfa]" />
          <span className="text-sm font-medium text-co-text" style={{ fontFamily: 'Cormorant, serif', fontSize: '1.1rem', fontWeight: 600 }}>
            Roadmap
          </span>
          {activeCount > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: '#a78bfa18', color: '#a78bfa', fontFamily: 'IBM Plex Mono, monospace' }}>
              {activeCount} active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              background: '#111',
              border: '1px solid var(--co-border)',
              borderRadius: '6px',
              color: 'var(--co-text-muted)',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.72rem',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            <option value="">All ({items.length})</option>
            {(['proposed', 'accepted', 'in_progress', 'completed'] as const).map(s => {
              const count = items.filter(i => i.status === s).length
              return count > 0 ? <option key={s} value={s}>{STATUS_META[s].label} ({count})</option> : null
            })}
          </select>
          <button
            onClick={() => setShowPropose(!showPropose)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs"
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#7ccfb8',
              background: '#7ccfb814',
              border: '1px solid #7ccfb855',
              cursor: 'pointer',
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Propose form */}
      {showPropose && (
        <div className="px-4 py-3 border-b border-co-border" style={{ background: '#0a0a0a' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-co-text-muted" style={{ fontFamily: 'IBM Plex Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Propose Roadmap Item
            </span>
            <button onClick={() => setShowPropose(false)} className="text-co-text-muted hover:text-co-text">
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title — what does this achieve?"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full mb-2 px-3 py-2 rounded text-sm"
            style={{ background: '#111', border: '1px solid var(--co-border)', color: 'var(--co-text)', fontFamily: 'Inter, sans-serif' }}
          />
          <textarea
            placeholder="Description — scope, deliverables, context (optional)"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            rows={3}
            className="w-full mb-2 px-3 py-2 rounded text-sm resize-none"
            style={{ background: '#111', border: '1px solid var(--co-border)', color: 'var(--co-text)', fontFamily: 'Inter, sans-serif' }}
          />
          <div className="flex items-center gap-3">
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value as RoadmapPriority)}
              style={{
                background: '#111', border: '1px solid var(--co-border)', borderRadius: '6px',
                color: 'var(--co-text-muted)', fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.72rem', padding: '6px 10px', cursor: 'pointer',
              }}
            >
              {(['P1', 'P2', 'P3', 'P4'] as const).map(p => (
                <option key={p} value={p}>{p} — {PRIORITY_META[p].label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Category (optional)"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded text-xs"
              style={{ background: '#111', border: '1px solid var(--co-border)', color: 'var(--co-text)', fontFamily: 'IBM Plex Mono, monospace' }}
            />
            <button
              onClick={handlePropose}
              disabled={!newTitle.trim() || submitting}
              className="px-4 py-1.5 rounded text-xs transition-colors disabled:opacity-40"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                color: '#0c0c0c',
                background: '#7ccfb8',
                border: 'none',
                cursor: newTitle.trim() && !submitting ? 'pointer' : 'not-allowed',
              }}
            >
              {submitting ? 'Proposing...' : 'Propose'}
            </button>
          </div>
        </div>
      )}

      {/* Items list */}
      {filteredItems.length === 0 ? (
        <div className="py-8 text-center">
          <Map className="w-8 h-8 mx-auto mb-3 text-co-text-muted" style={{ opacity: 0.3 }} />
          <p className="text-co-text-muted text-sm">
            {items.length === 0 ? 'No roadmap items yet' : 'No items match the filter'}
          </p>
          {items.length === 0 && (
            <p className="text-co-text-muted text-xs mt-1">Add directional goals that sprints can link to</p>
          )}
        </div>
      ) : (
        <div className="divide-y divide-[#1a1a1a]">
          {filteredItems.map(item => {
            const isExpanded = expanded[item.id]
            const priorityMeta = PRIORITY_META[item.priority]
            const statusMeta = STATUS_META[item.status]
            const linkedSprints = [...sprints, ...completedSprints].filter(s => s.roadmap_item_id === item.id)

            return (
              <div key={item.id} className="px-4 py-3 hover:bg-co-surface transition-colors">
                <div className="flex items-start gap-3">
                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className="mt-0.5 text-co-text-muted hover:text-co-text transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {/* R-series ID */}
                      {item.roadmap_id && (
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', fontWeight: 500,
                          background: '#a78bfa18', color: '#a78bfa',
                          padding: '1px 6px', borderRadius: '3px', border: '1px solid #a78bfa33',
                        }}>
                          {item.roadmap_id}
                        </span>
                      )}

                      {/* Priority badge */}
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem',
                        background: priorityMeta.color + '18', color: priorityMeta.color,
                        padding: '1px 6px', borderRadius: '3px', border: `1px solid ${priorityMeta.color}33`,
                      }}>
                        {priorityMeta.short}
                      </span>

                      {/* Title */}
                      <span className="font-serif-cormorant" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--co-text)' }}>
                        {item.title}
                      </span>

                      {/* Status badge */}
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem',
                        background: statusMeta.color + '18', color: statusMeta.color,
                        padding: '1px 6px', borderRadius: '3px', border: `1px solid ${statusMeta.color}33`,
                      }}>
                        {statusMeta.label}
                      </span>

                      {/* Category */}
                      {item.category && (
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem',
                          color: 'var(--co-text-muted)', background: '#ffffff08',
                          padding: '1px 6px', borderRadius: '3px',
                        }}>
                          {item.category}
                        </span>
                      )}

                      {/* Linked sprints count */}
                      {(item.linked_sprint_count || 0) > 0 && (
                        <span className="flex items-center gap-1" style={{
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem',
                          color: 'var(--co-primary)',
                        }}>
                          <Zap className="w-3 h-3" />
                          {item.linked_sprint_count} sprint{item.linked_sprint_count !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {/* Metadata row */}
                    <div className="flex items-center gap-3" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>
                      {item.creator?.name && <span>by {item.creator.name}</span>}
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      {/* Status transition dropdown */}
                      <select
                        value={item.status}
                        onChange={e => handleStatusChange(item.id, e.target.value as RoadmapStatus)}
                        onClick={e => e.stopPropagation()}
                        style={{
                          background: 'transparent', border: '1px solid var(--co-border)', borderRadius: '4px',
                          color: statusMeta.color, fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: '0.65rem', padding: '1px 6px', cursor: 'pointer',
                        }}
                      >
                        <option value="proposed">Proposed</option>
                        <option value="accepted">Accepted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    {/* Expanded: description + linked sprints */}
                    {isExpanded && (
                      <div className="mt-3 pl-0">
                        {item.description && (
                          <p className="text-sm text-co-text-muted leading-relaxed mb-3 whitespace-pre-line" style={{ maxWidth: '72ch' }}>
                            {item.description}
                          </p>
                        )}

                        {linkedSprints.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-co-text-muted" style={{ fontFamily: 'IBM Plex Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                              Linked Sprints
                            </span>
                            <div className="mt-1.5 space-y-1">
                              {linkedSprints.map(s => (
                                <div key={s.id} className="flex items-center gap-2 text-xs">
                                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: s.status === 'completed' ? '#7ccfb8' : 'var(--co-primary)' }}>
                                    {s.sprint_id || s.id.slice(0, 6)}
                                  </span>
                                  <span className="text-co-text-muted truncate">{s.title}</span>
                                  <span style={{
                                    fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem',
                                    color: s.status === 'completed' ? '#7ccfb8' : 'var(--co-text-muted)',
                                  }}>
                                    {s.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {linkedSprints.length === 0 && (
                          <p className="text-xs text-co-text-muted mt-1" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                            No sprints linked yet — sprints attach via roadmap_item_id
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
