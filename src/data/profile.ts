import { Metric, Technology, Project, Certification, Skill } from '@/types'

// 상수 정의
export const PROFILE = {
  name: '박상준',
  role: 'AWS Solutions Architect',
  title: 'Cloud Infrastructure Specialist',
  experience: '12+',
  location: '경기도 용인시',
  phone: '010-7413-5650',
  email: 'golreas@naver.com',
  threads: 'https://www.threads.com/@musma_ai'
} as const

export const ANIMATION_CONFIG = {
  METRIC_INTERVAL: 3000,
  METRIC_COUNT: 4,
  ANIMATION_DELAY_MULTIPLIER: 0.1,
  STAGGER_DELAY: 0.2
} as const

export const metrics: Metric[] = [
  { 
    label: '경력 년수', 
    value: '12+', 
    unit: 'years', 
    color: 'text-gradient-primary' 
  },
  { 
    label: '완료 프로젝트', 
    value: '50+', 
    unit: 'projects', 
    color: 'text-gradient-aws' 
  },
  { 
    label: '클라우드 자격증', 
    value: '8+', 
    unit: 'certs', 
    color: 'text-gradient-primary' 
  },
  { 
    label: '아키텍처 설계', 
    value: '100+', 
    unit: 'systems', 
    color: 'text-gradient-aws' 
  }
]

export const cloudTechnologies: Technology[] = [
  { 
    name: 'AWS', 
    icon: '☁️', 
    level: 95, 
    description: 'Solution Architect Associate', 
    color: 'from-orange-500 to-orange-600' 
  },
  { 
    name: 'Kubernetes', 
    icon: '⚙️', 
    level: 90, 
    description: 'Container Orchestration', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    name: 'Docker', 
    icon: '🐳', 
    level: 92, 
    description: 'Containerization Expert', 
    color: 'from-blue-400 to-blue-500' 
  },
  { 
    name: 'Terraform', 
    icon: '🏗️', 
    level: 88, 
    description: 'Infrastructure as Code', 
    color: 'from-purple-500 to-purple-600' 
  },
  { 
    name: 'Azure', 
    icon: '🌐', 
    level: 85, 
    description: 'Cloud Infrastructure', 
    color: 'from-sky-500 to-sky-600' 
  },
  { 
    name: 'GCP', 
    icon: '☁️', 
    level: 82, 
    description: 'Google Cloud Platform', 
    color: 'from-green-500 to-green-600' 
  }
]

export const architectureProjects: Project[] = [
  {
    title: '한국은행 CBDC 인프라',
    role: 'Lead Cloud Architect',
    period: '2024.08 - 진행중',
    stack: ['AWS', 'Kubernetes', 'Terraform', 'EKS'],
    description: '중앙은행 디지털화폐 테스트베드 아키텍처 설계 및 구현',
    impact: '99.9% 가용성, 초당 10,000 트랜잭션 처리 가능',
    status: 'active'
  },
  {
    title: '아모레퍼시픽 클라우드 마이그레이션',
    role: 'Solutions Architect',
    period: '2023.01 - 2023.10',
    stack: ['AWS', 'Docker', 'GitLab CI/CD', 'RDS'],
    description: 'On-Premise에서 AWS로 전체 시스템 마이그레이션',
    impact: '운영비용 40% 절감, 배포 시간 80% 단축',
    status: 'completed'
  },
  {
    title: 'MOIM 메타버스 플랫폼 DevOps',
    role: 'DevOps Team Lead',
    period: '2022.01 - 2023.01',
    stack: ['Docker', 'Kubernetes', 'GCP', 'Monitoring'],
    description: '메타버스 플랫폼의 확장 가능한 DevOps 인프라 구축',
    impact: '동시접속자 100,000명 지원, 99.95% 가용성 달성',
    status: 'completed'
  }
]

export const certifications: Certification[] = [
  { 
    name: 'AWS Solutions Architect - Associate', 
    org: 'Amazon Web Services', 
    year: '2023', 
    level: 'Associate' 
  },
  { 
    name: 'AWS Database Specialty', 
    org: 'Amazon Web Services', 
    year: '2023', 
    level: 'Specialty' 
  },
  { 
    name: 'Google Cloud Professional Cloud Architect', 
    org: 'Google Cloud', 
    year: '2020', 
    level: 'Professional' 
  },
  { 
    name: 'Oracle Cloud Infrastructure 2018 Architect Associate', 
    org: 'Oracle', 
    year: '2019', 
    level: 'Associate' 
  }
]

export const coreSkills: Skill[] = [
  { area: '클라우드 아키텍처 설계', level: 95, icon: '🏗️' },
  { area: 'DevOps 및 CI/CD', level: 90, icon: '⚙️' },
  { area: '컨테이너 오케스트레이션', level: 88, icon: '🐳' },
  { area: '인프라 자동화', level: 92, icon: '🤖' },
  { area: '성능 최적화', level: 85, icon: '⚡' }
]