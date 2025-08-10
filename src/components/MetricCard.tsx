import { memo } from 'react'
import { Metric } from '@/types'

interface MetricCardProps {
  metric: Metric
  isActive: boolean
  index?: number
}

const MetricCard = memo(({ metric, isActive }: MetricCardProps) => {
  return (
    <div
      className={`metric-card p-6 rounded-xl transition-all duration-500 ${
        isActive ? 'animate-pulse-glow scale-105' : ''
      }`}
    >
      <div className={`font-korean-display text-korean-3xl font-bold mb-2 ${metric.color}`}>
        {metric.value}
      </div>
      <div className="font-korean text-slate-400 text-korean-sm font-medium korean-text-balance">
        {metric.label}
      </div>
    </div>
  )
})

MetricCard.displayName = 'MetricCard'

export default MetricCard