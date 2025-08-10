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
      <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
        {metric.value}
      </div>
      <div className="text-slate-400 text-sm font-medium">
        {metric.label}
      </div>
    </div>
  )
})

MetricCard.displayName = 'MetricCard'

export default MetricCard