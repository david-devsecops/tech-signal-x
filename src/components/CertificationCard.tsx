import { memo } from 'react'
import { Certification } from '@/types'

interface CertificationCardProps {
  cert: Certification
  index: number
}

const CertificationCard = memo(({ cert, index }: CertificationCardProps) => {
  return (
    <div
      className="glass-card p-6 rounded-xl card-hover text-center animate-slide-in-bottom"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-gradient-aws text-lg font-bold mb-2">{cert.org}</div>
      <h4 className="font-semibold text-white mb-2 text-sm leading-tight">{cert.name}</h4>
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400">{cert.year}</span>
        <span className="tech-badge px-2 py-1 rounded text-xs">{cert.level}</span>
      </div>
    </div>
  )
})

CertificationCard.displayName = 'CertificationCard'

export default CertificationCard