// 공통 타입 정의
export interface Metric {
  label: string
  value: string
  unit: string
  color: string
}

export interface Technology {
  name: string
  icon: string
  level: number
  description: string
  color: string
}

export interface Project {
  title: string
  role: string
  period: string
  stack: string[]
  description: string
  impact: string
  status: 'active' | 'completed'
}

export interface Certification {
  name: string
  org: string
  year: string
  level: 'Associate' | 'Professional' | 'Specialty'
}

export interface Skill {
  area: string
  level: number
  icon: string
}

export interface ContactInfo {
  type: 'phone' | 'email' | 'location'
  icon: string
  title: string
  value: string
}