import { useState, useEffect } from 'react'
import { ANIMATION_CONFIG } from '@/data/profile'

export const useMetricRotation = () => {
  const [activeMetric, setActiveMetric] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % ANIMATION_CONFIG.METRIC_COUNT)
    }, ANIMATION_CONFIG.METRIC_INTERVAL)
    
    return () => clearInterval(interval)
  }, [])

  return activeMetric
}