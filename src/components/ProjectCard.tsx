import { memo } from 'react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const statusConfig = {
    active: {
      className: 'bg-green-500/20 text-green-400 border border-green-500/30',
      label: '진행중'
    },
    completed: {
      className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      label: '완료'
    }
  }

  const status = statusConfig[project.status]

  return (
    <div
      className="glass-card p-8 rounded-2xl animate-slide-in-bottom"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        <div className="flex-1">
          <div className="flex items-start space-x-4 mb-6">
            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status.className}`}>
              {status.label}
            </div>
            <span className="text-slate-400 font-medium">{project.period}</span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-xl text-gradient-aws font-semibold mb-4">{project.role}</p>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">📊 주요 성과</h4>
            <p className="text-slate-200 font-medium">{project.impact}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">🛠️ 기술 스택</h4>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="tech-badge px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-80 mt-8 lg:mt-0">
          <div className="terminal p-6 h-48 overflow-hidden">
            <div className="pt-8 font-code text-sm text-green-400">
              <div className="mb-2">$ kubectl get deployments</div>
              <div className="text-slate-300 mb-2">NAME    READY   UP-TO-DATE   AVAILABLE</div>
              <div className="text-green-400 mb-2">cbdc-api   3/3     3            3</div>
              <div className="text-green-400 mb-2">gateway    2/2     2            2</div>
              <div className="mb-2">$ terraform plan</div>
              <div className="text-cyan-400 mb-2">Plan: 15 to add, 0 to change, 0 to destroy.</div>
              <div className="text-slate-500">█</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard