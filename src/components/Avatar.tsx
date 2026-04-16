// @ts-nocheck
/**
 * Avatar — simple stub component for agent/participant avatars.
 */
interface AvatarProps {
  name?: string
  size?: number
  className?: string
}

export default function Avatar({ name = '?', size = 32, className = '' }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#2a2a3e',
        border: '1px solid #3a3a4e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        color: '#a0a0b8',
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  )
}
