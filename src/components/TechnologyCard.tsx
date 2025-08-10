import { memo } from 'react'
import { Technology } from '@/types'

interface TechnologyCardProps {
  tech: Technology
  index: number
}

const TechnologyCard = memo(({ tech, index }: TechnologyCardProps) => {
  return (
    <div
      className="glass-card p-8 rounded-2xl card-hover animate-slide-in-bottom"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start space-x-4 mb-6">
        <div className="text-4xl">{tech.icon}</div>
        <div className="flex-1">
          <h3 className="font-korean text-korean-2xl font-bold text-white mb-2 korean-subtitle mixed-content">{tech.name}</h3>
          <p className="font-korean-body text-slate-300 text-korean-sm korean-text-balance">{tech.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-korean text-slate-400 font-medium korean-text-balance">숙련도</span>
          <span className="font-korean text-gradient-primary font-bold text-korean-lg">{tech.level}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${tech.level}%`,
              background: `linear-gradient(135deg, var(--cloud-primary), var(--cloud-secondary))`
            }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span>🏆</span>
          <span className="font-korean korean-text-balance mixed-content">Production Ready</span>
        </div>
      </div>
    </div>
  )
})

TechnologyCard.displayName = 'TechnologyCard'

export default TechnologyCard