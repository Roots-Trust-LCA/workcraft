// @ts-nocheck
/**
 * BottomSheet — simple slide-up panel for mobile views.
 */
interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function BottomSheet({ open, onClose, children, title }: BottomSheetProps) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#141420', borderRadius: '12px 12px 0 0',
          width: '100%', maxHeight: '80vh', overflow: 'auto',
          padding: '16px', border: '1px solid #2a2a3e',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div style={{ fontWeight: 600, marginBottom: 12, color: '#e8e8f0' }}>{title}</div>
        )}
        {children}
      </div>
    </div>
  )
}
