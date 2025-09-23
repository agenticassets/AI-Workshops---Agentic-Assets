import Image from 'next/image'

interface AgenticAssetsLogoProps {
  className?: string
  width?: number
  height?: number
  type?: 'svg' | 'png'
}

export function AgenticAssetsLogo({ 
  className = '', 
  width = 28, 
  height = 28,
  type = 'svg'
}: AgenticAssetsLogoProps) {
  const logoSrc = type === 'png' 
    ? '/components/Agentic-Asset-logo.png'
    : '/components/Agentic_Assets_Logo.svg'

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Agentic Assets Logo"
        width={width}
        height={height}
        className="object-contain"
        style={{
          filter: 'brightness(0)', // Makes it black
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  )
}