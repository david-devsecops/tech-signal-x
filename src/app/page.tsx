'use client'

import { useState, useEffect } from 'react'
import { 
  PROFILE, 
  metrics, 
  cloudTechnologies, 
  architectureProjects, 
  certifications, 
  coreSkills,
  careerHighlights 
} from '@/data/profile'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">박</span>
              </div>
              <span className="font-korean font-semibold text-gray-900">{PROFILE.name}</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="font-korean text-gray-600 hover:text-blue-600 transition-colors font-medium korean-text-balance">소개</a>
              <a href="#expertise" className="font-korean text-gray-600 hover:text-blue-600 transition-colors font-medium korean-text-balance">전문성</a>
              <a href="#projects" className="font-korean text-gray-600 hover:text-blue-600 transition-colors font-medium korean-text-balance">프로젝트</a>
              <a href="#contact" className="font-korean text-gray-600 hover:text-blue-600 transition-colors font-medium korean-text-balance">연락처</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <h1 className="font-korean-display text-korean-4xl md:text-korean-6xl mb-6 korean-title">
              안녕하세요, <span className="text-blue-600">{PROFILE.name}</span>입니다
            </h1>
            
            <p className="font-korean-body text-korean-xl md:text-korean-2xl text-gray-600 mb-8 max-w-3xl mx-auto korean-paragraph">
              <span className="text-blue-600 font-semibold">{PROFILE.experience}</span> 경력의 시니어 클라우드 엔지니어로서<br />
              <span className="text-orange-600 font-semibold">한국은행 CBDC</span> 프로젝트를 리드하며 
              <span className="text-indigo-600 font-semibold">엔터프라이즈 클라우드 아키텍처</span> 전문가입니다
            </p>

            {/* Simplified Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <div className="font-korean text-gray-600 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white font-korean font-medium py-3 px-6 rounded-lg transition-colors korean-text-balance">
                프로젝트 보기
              </a>
              <a href="#contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-korean font-medium py-3 px-6 rounded-lg transition-colors korean-text-balance">
                연락하기
              </a>
            </div>
            
            <div className="mt-12 flex justify-center space-x-6">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={`mailto:${PROFILE.email}`} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-korean-display text-korean-3xl font-bold text-gray-900 mb-8 korean-title">
              About Me
            </h2>
            <p className="font-korean-body text-korean-lg text-gray-600 max-w-3xl mx-auto korean-paragraph">
              {PROFILE.experience}의 클라우드 엔지니어 경험을 바탕으로 AWS, Azure, GCP 등 멀티클라우드 환경에서 인프라를 설계하고 구축합니다.<br/>
              오라클 데이터베이스부터 쿠버네티스까지, 다양한 기술 스택을 활용하여 안정적이고 확장 가능한 시스템을 구축합니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-korean text-korean-2xl font-bold text-gray-900 mb-6 korean-subtitle">기술 스택</h3>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'Azure', 'GCP', 'Oracle Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Linux', 'Unix', 'Nginx', 'GitLab CI/CD', 'Oracle Database', 'PostgreSQL', 'MongoDB', 'Redis', 'Python', 'Bash'].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium korean-text-balance">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-korean text-korean-2xl font-bold text-gray-900 mb-6 korean-subtitle">경력 하이라이트</h3>
              <div className="space-y-4">
                {careerHighlights.map((career, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-korean font-semibold text-gray-900 text-sm korean-subtitle">{career.position}</h4>
                    <p className="text-blue-600 font-medium text-sm">{career.company}</p>
                    <p className="text-xs text-gray-500 mb-1">{career.period}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 text-xs korean-text-balance">{career.description}</p>
                      <span className="text-orange-600 font-semibold text-xs">{career.salary}</span>
                    </div>
                  </div>
                ))}
                <div className="border-l-4 border-purple-500 pl-4 mt-4">
                  <h4 className="font-korean font-semibold text-gray-900 text-sm korean-subtitle">AI빅데이터학과 석사과정</h4>
                  <p className="text-purple-600 font-medium text-sm">서울과학종합대학원대학교</p>
                  <p className="text-xs text-gray-500 mb-1">2024.03 ~ 2025.06</p>
                  <p className="text-gray-600 text-xs">학점 4.0/4.0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-korean text-korean-2xl font-bold text-gray-900 mb-6 korean-subtitle">핵심 전문 영역</h3>
              <div className="space-y-4">
                {coreSkills.map((skill) => (
                  <div key={skill.area} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-korean font-medium text-gray-900 text-sm korean-text-balance">{skill.area}</span>
                      <span className="text-blue-600 font-semibold text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-korean-display text-korean-3xl font-bold text-gray-900 mb-8 korean-title">
              기술 전문성
            </h2>
            <p className="font-korean-body text-korean-lg text-gray-600 korean-paragraph">
              엔터프라이즈급 클라우드 인프라와 현대적 DevOps 도구 마스터리
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cloudTechnologies.map((tech) => (
              <div key={tech.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{tech.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-korean font-bold text-korean-lg text-gray-900 korean-subtitle">{tech.name}</h3>
                    <p className="text-gray-500 text-sm">{tech.description}</p>
                  </div>
                </div>
                <p className="font-korean-body text-gray-600 text-sm mb-4 korean-text-balance">{tech.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">숙련도</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{tech.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-20">
            <h3 className="font-korean text-korean-3xl font-bold text-center mb-12 text-gray-900 korean-title">
              전문 자격증
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert) => (
                <div key={cert.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{cert.org.charAt(0)}</span>
                  </div>
                  <h4 className="font-korean font-bold text-gray-900 text-sm mb-2 korean-subtitle">{cert.name}</h4>
                  <p className="text-gray-600 text-xs mb-1">{cert.org}</p>
                  <p className="text-gray-500 text-xs">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-korean-display text-korean-3xl font-bold text-gray-900 mb-8 korean-title">
              Major Projects
            </h2>
            <p className="font-korean-body text-korean-lg text-gray-600 korean-paragraph">
              {PROFILE.experience}간 클라우드 엔지니어로서 수행한 주요 프로젝트들입니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {architectureProjects.map((project) => (
              <div key={project.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 h-48 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-20">☁️</div>
                </div>
                
                <h3 className="font-korean font-bold text-korean-xl text-gray-900 mb-2 korean-subtitle">
                  {project.title}
                </h3>
                
                <p className="font-korean-body text-gray-600 mb-4 korean-text-balance">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <span className="korean-text-balance">{project.period}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    기업 내부 프로젝트
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-korean-display text-korean-4xl font-bold text-gray-900 mb-12 korean-title">
            연락 및 협업
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-korean font-bold text-korean-xl text-gray-900 mb-2 korean-subtitle">전화</h3>
              <p className="text-blue-600 font-code text-lg">{PROFILE.phone}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-korean font-bold text-korean-xl text-gray-900 mb-2 korean-subtitle">이메일</h3>
              <p className="text-blue-600 font-code text-lg">{PROFILE.email}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-korean font-bold text-korean-xl text-gray-900 mb-2 korean-subtitle">위치</h3>
              <p className="text-gray-600 text-lg">{PROFILE.location}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <h3 className="font-korean text-korean-2xl font-bold text-gray-900 mb-6 korean-subtitle">
              새로운 프로젝트 협업을 기다립니다
            </h3>
            <p className="font-korean-body text-gray-600 text-korean-lg mb-8 max-w-2xl mx-auto korean-paragraph">
              엔터프라이즈급 클라우드 인프라 구축, 대규모 시스템 마이그레이션, 
              또는 DevOps 문화 정착에 관심이 있으시다면 언제든 연락해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${PROFILE.email}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-korean font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center space-x-2 korean-text-balance"
              >
                <span>💼</span>
                <span className="korean">프로젝트 문의하기</span>
              </a>
              <a
                href={PROFILE.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-korean font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center space-x-2 korean-text-balance"
              >
                <span>🔗</span>
                <span className="korean mixed-content">Threads 팔로우</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">박</span>
              </div>
              <div className="text-left">
                <h3 className="font-korean text-korean-xl font-bold text-gray-900">{PROFILE.name}</h3>
                <p className="font-korean text-korean-sm text-gray-600 mixed-content">AWS {PROFILE.role}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="font-korean text-gray-600 text-korean-sm mb-4 mixed-content">
                © 2025 {PROFILE.name}. All rights reserved.
              </p>
              <p className="font-korean text-gray-500 text-korean-xs korean-text-balance">
                총 경력 {PROFILE.experience} 년 | AWS 전문 자격증 보유 | 엔터프라이즈 클라우드 아키텍트
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}