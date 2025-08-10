import { memo } from 'react'
import { Skill } from '@/types'

interface SkillBarProps {
  skill: Skill
  index?: number
}

const SkillBar = memo(({ skill }: SkillBarProps) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-2xl">{skill.icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-white">{skill.area}</span>
          <span className="text-cyan-400 font-bold">{skill.level}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    </div>
  )
})

SkillBar.displayName = 'SkillBar'

export default SkillBar