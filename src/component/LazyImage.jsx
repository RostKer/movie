import { useState } from 'react'

const LazyImage = ({
  src,
  alt,
  style,
  className,
  placeholderColor = '#1a1a1a',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: placeholderColor,
        ...style,
      }}
      className={className}
    >
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        {...props}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
      `}</style>
    </div>
  )
}

export default LazyImage
