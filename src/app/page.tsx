'use client'

import { useState, useEffect } from 'react'
import MetricCard from '@/components/MetricCard'
import TechnologyCard from '@/components/TechnologyCard'
import ProjectCard from '@/components/ProjectCard'
import SkillBar from '@/components/SkillBar'
import CertificationCard from '@/components/CertificationCard'
import { useMetricRotation } from '@/hooks/useMetricRotation'
import { 
  PROFILE, 
  metrics, 
  cloudTechnologies, 
  architectureProjects, 
  certifications, 
  coreSkills 
} from '@/data/profile'
import { Skill } from '@/types'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const activeMetric = useMetricRotation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null


  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-enterprise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">박</span>
              </div>
              <span className="font-semibold text-white">{PROFILE.name}</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">About</a>
              <a href="#expertise" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Expertise</a>
              <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Projects</a>
              <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
            <div className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/4 left-1/4 animate-pulse" />
            <div className="w-1 h-1 bg-blue-400 rounded-full absolute top-1/3 right-1/3 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute bottom-1/4 left-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-in-bottom">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full glass-enterprise text-cyan-400 font-medium text-sm mb-4">
                ☁️ Cloud Infrastructure Specialist
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient-primary">{PROFILE.name}</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-slate-200">
              AWS <span className="text-gradient-aws">{PROFILE.role}</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              <span className="text-gradient-primary font-semibold">{PROFILE.experience} 경력</span>의 시니어 클라우드 엔지니어로서 
              <span className="text-gradient-aws font-semibold"> 엔터프라이즈급 인프라 설계</span>와 
              <span className="text-cyan-400 font-semibold">클라우드 마이그레이션</span> 전문가입니다.
            </p>

            {/* Live Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={metric.label}
                  metric={metric}
                  isActive={activeMetric === index}
                  index={index}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#projects" className="btn-primary px-8 py-4 rounded-full font-semibold text-lg">
                🚀 프로젝트 보기
              </a>
              <a href="#contact" className="btn-aws px-8 py-4 rounded-full font-semibold text-lg text-white">
                📞 연락하기
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-bottom">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
              현재 상황 및 전문 분야
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              엔터프라이즈 환경에서의 클라우드 아키텍처 설계 및 대규모 시스템 운영 경험
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-right">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-gradient-aws">🏢 현재 진행 프로젝트</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-cyan-400 pl-6">
                    <h4 className="font-bold text-lg mb-2 text-white">엘퍼스트 - 클라우드 아키텍트</h4>
                    <p className="text-slate-300 mb-2">한국은행 CBDC 활용성 테스트 인프라 구축</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-400 font-medium">진행중</span>
                      <span className="text-slate-400">2024.08 ~ 현재</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="tech-badge px-3 py-1 rounded-full text-xs font-medium">AWS EKS</span>
                      <span className="tech-badge px-3 py-1 rounded-full text-xs font-medium">Terraform</span>
                      <span className="tech-badge px-3 py-1 rounded-full text-xs font-medium">Kubernetes</span>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h4 className="font-bold text-lg mb-2 text-white">서울과학종합대학원대학교</h4>
                    <p className="text-slate-300 mb-2">AI빅데이터학과 석사과정</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-purple-400 font-medium">학점 4.0/4.0</span>
                      <span className="text-slate-400">2024.03 ~ 2025.06</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-bottom">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-gradient-primary">🎯 핵심 전문 영역</h3>
                <div className="space-y-4">
                  {coreSkills.map((skill: Skill, index: number) => (
                    <SkillBar key={skill.area} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 relative" style={{ background: 'var(--gradient-mesh)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-bottom">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-aws">
              ⚡ 기술 전문성
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              엔터프라이즈급 클라우드 인프라와 현대적 DevOps 도구 마스터리
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {cloudTechnologies.map((tech, index) => (
              <TechnologyCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
              🏅 전문 자격증
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={cert.name} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-bottom">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
              🚀 주요 프로젝트 성과
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              대규모 엔터프라이즈 환경에서의 클라우드 아키텍처 설계 및 구현 경험
            </p>
          </div>

          <div className="space-y-12">
            {architectureProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative" style={{ background: 'var(--gradient-mesh)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gradient-aws">
            📞 연락 및 협업
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-8 rounded-2xl card-hover">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold text-xl text-white mb-2">전화</h3>
              <p className="text-cyan-400 font-code text-lg">{PROFILE.phone}</p>
            </div>

            <div className="glass-card p-8 rounded-2xl card-hover">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-bold text-xl text-white mb-2">이메일</h3>
              <p className="text-cyan-400 font-code text-lg">{PROFILE.email}</p>
            </div>

            <div className="glass-card p-8 rounded-2xl card-hover">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-bold text-xl text-white mb-2">위치</h3>
              <p className="text-slate-300 text-lg">{PROFILE.location}</p>
            </div>
          </div>

          <div className="glass-card p-12 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              🤝 새로운 프로젝트 협업을 기다립니다
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              엔터프라이즈급 클라우드 인프라 구축, 대규모 시스템 마이그레이션, 
              또는 DevOps 문화 정착에 관심이 있으시다면 언제든 연락해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${PROFILE.email}`}
                className="btn-primary px-10 py-4 rounded-full font-bold text-lg text-white inline-flex items-center space-x-2"
              >
                <span>💼</span>
                <span>프로젝트 문의하기</span>
              </a>
              <a
                href={PROFILE.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aws px-10 py-4 rounded-full font-bold text-lg text-white inline-flex items-center space-x-2"
              >
                <span>🔗</span>
                <span>Threads 팔로우</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-enterprise border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">박</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">{PROFILE.name}</h3>
                <p className="text-slate-400 text-sm">AWS {PROFILE.role}</p>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8">
              <p className="text-slate-400 text-sm mb-4">
                © 2025 {PROFILE.name}. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs">
                ☁️ 총 경력 {PROFILE.experience} 년 | 🏆 AWS 전문 자격증 보유 | 🚀 엔터프라이즈 클라우드 아키텍트
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}