// @ts-nocheck
/**
 * TimelineSlider — stub for SwarmViz timeline control.
 */
interface TimelineSliderProps {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  label?: string
}

export function TimelineSlider({ min = 0, max = 100, value = 50, onChange, label }: TimelineSliderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
      {label && <span style={{ fontSize: '0.75rem', color: '#6a6a82' }}>{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange?.(Number(e.target.value))}
        style={{ flex: 1, accentColor: '#c4956a' }}
      />
    </div>
  )
}
