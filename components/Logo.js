'use client'
import Image from 'next/image'

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL

export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-sm' },
    md: { width: 40, height: 40, text: 'text-lg' },
    lg: { width: 60, height: 60, text: 'text-2xl' },
    xl: { width: 80, height: 80, text: 'text-3xl' },
  }

  const { width, height, text } = sizes[size] || sizes.md

  // If Cloudinary logo URL is set, use the image
  if (LOGO_URL) {
    return (
      <Image
        src={LOGO_URL}
        alt="Zitra Logo"
        width={width}
        height={height}
        className={`object-contain ${className}`}
        priority
      />
    )
  }

  // Fallback to styled "Z" placeholder
  return (
    <div
      className={`bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold ${text} ${className}`}
      style={{ width, height }}
    >
      Z
    </div>
  )
}

export function LogoWithText({ size = 'md', className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={size} />
      <span className="font-bold text-primary text-xl">Zitra</span>
    </div>
  )
}
