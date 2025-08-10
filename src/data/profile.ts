import { Metric, Technology, Project, Certification, Skill } from '@/types'

// 박상준님 프로필 정보
export const PROFILE = {
  name: '박상준',
  role: 'AWS Cloud Solutions Architect',
  title: 'Senior Cloud Infrastructure Specialist',
  experience: '12년 9개월',
  location: '경기도 용인시',
  phone: '010-7413-5650',
  email: 'golreas@naver.com',
  threads: 'https://www.threads.com/@musma_ai',
  age: '42세 (1983년생)',
  education: '서울과학종합대학원대학교 AI빅데이터학과 석사과정',
  currentCompany: '엘퍼스트',
  currentProject: '한국은행 CBDC 활용성 테스트 인프라 구축',
  salary: '10,000만원'
} as const

export const ANIMATION_CONFIG = {
  METRIC_INTERVAL: 3000,
  METRIC_COUNT: 4,
  ANIMATION_DELAY_MULTIPLIER: 0.1,
  STAGGER_DELAY: 0.2
} as const

export const metrics: Metric[] = [
  { 
    label: '총 경력', 
    value: '12년+', 
    unit: 'years', 
    color: 'text-gradient-primary' 
  },
  { 
    label: '클라우드 프로젝트', 
    value: '20+', 
    unit: 'projects', 
    color: 'text-gradient-aws' 
  },
  { 
    label: '클라우드 자격증', 
    value: '8개', 
    unit: 'certs', 
    color: 'text-gradient-primary' 
  },
  { 
    label: '현재 연봉', 
    value: '1억', 
    unit: 'won', 
    color: 'text-gradient-aws' 
  }
]

export const cloudTechnologies: Technology[] = [
  { 
    name: 'AWS', 
    icon: '☁️', 
    level: 98, 
    description: 'Solutions Architect Associate + Database Specialty', 
    color: 'from-orange-500 to-orange-600' 
  },
  { 
    name: 'Kubernetes', 
    icon: '⚙️', 
    level: 95, 
    description: 'Container Orchestration & EKS 전문', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    name: 'Terraform', 
    icon: '🏗️', 
    level: 92, 
    description: 'Infrastructure as Code 구축', 
    color: 'from-purple-500 to-purple-600' 
  },
  { 
    name: 'Docker', 
    icon: '🐳', 
    level: 90, 
    description: 'Container 기술 및 CI/CD', 
    color: 'from-blue-400 to-blue-500' 
  },
  { 
    name: 'GCP', 
    icon: '🌐', 
    level: 85, 
    description: 'Google Cloud Professional Architect', 
    color: 'from-green-500 to-green-600' 
  },
  { 
    name: 'Azure', 
    icon: '☁️', 
    level: 82, 
    description: 'Microsoft Cloud Platform', 
    color: 'from-sky-500 to-sky-600' 
  },
  { 
    name: 'Oracle', 
    icon: '🗄️', 
    level: 88, 
    description: 'Database 전문 + OCP 자격증', 
    color: 'from-red-500 to-red-600' 
  },
  { 
    name: 'Linux/Unix', 
    icon: '🐧', 
    level: 93, 
    description: 'Solaris, Ubuntu, CentOS 전문', 
    color: 'from-gray-600 to-gray-700' 
  }
]

export const architectureProjects: Project[] = [
  {
    title: '한국은행 CBDC 인프라 구축',
    role: 'Lead Cloud Architect',
    period: '2024.08 - 2025.07 (진행중)',
    stack: ['AWS', 'Kubernetes', 'Terraform', 'EKS', 'Docker'],
    description: '중앙은행 디지털화폐 활용성 테스트를 위한 클라우드 인프라 설계 및 구축. 고가용성과 확장성을 고려한 엔터프라이즈급 아키텍처 구현.',
    impact: '99.99% 가용성, 대용량 트랜잭션 처리 가능한 안정적 인프라',
    status: 'active'
  },
  {
    title: '아모레퍼시픽 AWS 마이그레이션',
    role: 'Solutions Architect',
    period: '2023.01 - 2023.10',
    stack: ['AWS', 'Migration', 'Terraform', 'CloudWatch', 'RDS'],
    description: 'On-Premise 환경에서 AWS로 전체 시스템 마이그레이션 프로젝트 리드. 무중단 서비스를 위한 단계적 마이그레이션 전략 수립 및 실행.',
    impact: '운영비용 대폭 절감, 시스템 안정성 및 확장성 크게 향상',
    status: 'completed'
  },
  {
    title: 'MOIM 메타버스 플랫폼 DevOps',
    role: 'DevOps Team Lead',
    period: '2022.01 - 2023.01',
    stack: ['GCP', 'Kubernetes', 'Docker', 'Monitoring', 'CI/CD'],
    description: '메타버스 플랫폼의 확장 가능한 DevOps 인프라 구축. 대용량 동시 접속자 처리를 위한 오토스케일링 시스템 구현.',
    impact: '동시접속자 100,000명 지원, 99.95% 서비스 가용성 달성',
    status: 'completed'
  },
  {
    title: 'SKT T-deal 클라우드 인프라',
    role: 'Cloud Infrastructure Engineer',
    period: '2020.01 - 2021.12',
    stack: ['AWS', 'Terraform', 'Glue', 'EMR', 'Athena'],
    description: 'SKT T-deal 서비스의 AWS 인프라 구축 및 운영. 빅데이터 처리를 위한 EMR, Athena 최적화로 비용 절감 달성.',
    impact: '데이터 처리 비용 40% 절감, 처리 속도 2배 향상',
    status: 'completed'
  },
  {
    title: 'Oracle 엔터프라이즈 시스템',
    role: 'Database Architect',
    period: '2010.12 - 2021.09',
    stack: ['Oracle', 'RAC', 'ASM', 'ZDLRA', 'Unix/Linux'],
    description: '대기업 및 금융권 Oracle Database 시스템 구축 및 운영. 국민연금, KB카드, 신한DS 등 미션크리티컬 시스템 담당.',
    impact: '99.9% 가용성, 무손실 백업 시스템 구축으로 데이터 완전성 보장',
    status: 'completed'
  },
  {
    title: '해군 C4I 체계 운영',
    role: 'System Administrator',
    period: '2010.12 - 2013.08',
    stack: ['Oracle', 'Sun Solaris', 'Veritas', 'NetBackup', 'WAS'],
    description: '해군 전투지휘체계(KNCCS) 운영 및 유지보수. 미션크리티컬한 국방 시스템의 24/7 안정적 운영.',
    impact: '무중단 서비스 운영, 국가 보안 시스템 안정성 확보',
    status: 'completed'
  }
]

export const certifications: Certification[] = [
  { 
    name: 'AWS Solutions Architect Associate', 
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
  },
  { 
    name: 'OCP (Oracle Certified Professional)', 
    org: 'Oracle', 
    year: '2010', 
    level: 'Professional' 
  },
  { 
    name: 'SCSECA (Sun Certified System Administrator)', 
    org: 'Sun Microsystems', 
    year: '2009', 
    level: 'Professional' 
  },
  { 
    name: 'SCNA (Sun Certified Network Administrator)', 
    org: 'Sun Microsystems', 
    year: '2009', 
    level: 'Professional' 
  },
  { 
    name: 'CSA (Certified Solaris Administrator)', 
    org: 'Sun Microsystems', 
    year: '2009', 
    level: 'Professional' 
  }
]

export const coreSkills: Skill[] = [
  { area: '클라우드 아키텍처 설계', level: 98, icon: '🏗️' },
  { area: 'AWS 솔루션 아키텍팅', level: 95, icon: '☁️' },
  { area: 'DevOps 및 CI/CD', level: 92, icon: '⚙️' },
  { area: 'Database 관리 및 최적화', level: 90, icon: '🗄️' },
  { area: 'Infrastructure as Code', level: 88, icon: '📜' },
  { area: 'Container 오케스트레이션', level: 87, icon: '🐳' },
  { area: '시스템 운영 및 모니터링', level: 93, icon: '📊' },
  { area: '성능 최적화 및 튜닝', level: 85, icon: '⚡' }
]

// 경력 하이라이트
export const careerHighlights = [
  {
    company: '엘퍼스트',
    position: '클라우드 아키텍트 (차장)',
    period: '2024.09 - 현재',
    salary: '10,000만원',
    description: '한국은행 CBDC 프로젝트 리드'
  },
  {
    company: '우나프론트',
    position: '솔루션스 아키텍트',
    period: '2023.01 - 2025.04',
    salary: '8,700만원',
    description: '아모레퍼시픽 AWS 마이그레이션'
  },
  {
    company: '그리드',
    position: 'DevOps 팀장 (차장)',
    period: '2022.01 - 2023.01',
    salary: '7,000만원',
    description: 'MOIM 메타버스 플랫폼 DevOps'
  }
]