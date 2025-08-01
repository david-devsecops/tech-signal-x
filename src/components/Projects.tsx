
import { useLanguage } from '../contexts/LanguageContext'

const Projects = () => {
  const { language } = useLanguage()
  const projects = [
    {
      title: language === 'ko' ? '한국은행 CBDC 활용성 테스트' : 'Bank of Korea CBDC Viability Testing',
      description: language === 'ko' 
        ? '중앙은행 디지털 화폐(CBDC) 활용성 테스트를 위한 인프라 설계 및 구축. 클라우드 아키텍처로 고가용성 및 보안성 달성'
        : 'Infrastructure design and construction for Central Bank Digital Currency (CBDC) viability testing. Achieved high availability and security through cloud architecture',
      image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=200&fit=crop',
      tech: [],
      github: '',
      demo: ''
    },
    {
      title: language === 'ko' ? '아모레퍼시픽 AWS Migration' : 'Amorepacific AWS Migration',
      description: language === 'ko'
        ? 'On-Premise 환경에서 AWS 클라우드로의 대규모 마이그레이션 프로젝트. 솔루션 아키텍트로서 전체 인프라 설계부터 마이그레이션, 운영까지 담당'
        : 'Large-scale migration project from On-Premise environment to AWS cloud. Responsible for entire infrastructure design, migration, and operations as Solutions Architect',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
      tech: ['AWS', 'Migration', 'CloudWatch', 'EC2'],
      github: '',
      demo: ''
    },
    {
      title: language === 'ko' ? 'SKT T-deal AWS 인프라 구축' : 'SKT T-deal AWS Infrastructure Construction',
      description: language === 'ko'
        ? 'SKT T-deal 서비스를 위한 AWS 인프라 구축 및 Terraform을 통한 IaC 구현. AWS Glue, EMR, Athena를 활용한 비용 절감 솔루션 설계'
        : 'AWS infrastructure construction for SKT T-deal service and IaC implementation through Terraform. Cost reduction solution design utilizing AWS Glue, EMR, and Athena',
      image: 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=400&h=200&fit=crop',
      tech: ['AWS', 'Terraform', 'EMR', 'Athena'],
      github: '',
      demo: ''
    },
    {
      title: language === 'ko' ? 'SK 건설 IoT Landing Zone' : 'SK Construction IoT Landing Zone',
      description: language === 'ko'
        ? 'Google Cloud Platform에서 SK 건설의 IoT 서비스를 위한 Landing Zone 아키텍처 설계 및 구축. 대규모 IoT 데이터 처리를 위한 스케일러블 인프라 구축'
        : 'Landing Zone architecture design and construction for SK Construction IoT services on Google Cloud Platform. Scalable infrastructure construction for large-scale IoT data processing',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
      tech: ['GCP', 'IoT', 'BigQuery', 'Kubernetes'],
      github: '',
      demo: ''
    },
    {
      title: language === 'ko' ? 'SK 이노베이션 BaaS Platform' : 'SK Innovation BaaS Platform',
      description: language === 'ko'
        ? 'Microsoft Azure를 기반으로 한 Backend as a Service(BaaS) 플랫폼 및 CI/CD 파이프라인 구축. 마이크로서비스 아키텍처 기반 자동화 시스템 구축'
        : 'Backend as a Service (BaaS) platform and CI/CD pipeline construction based on Microsoft Azure. Automation system construction based on microservices architecture',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop',
      tech: ['Azure', 'DevOps', 'Pipeline', 'Microservices'],
      github: '',
      demo: ''
    },
    {
      title: language === 'ko' ? 'Oracle ZDLRA 구축 및 운영' : 'Oracle ZDLRA Construction and Operations',
      description: language === 'ko'
        ? '국민연금, KB카드, 수협, 광주은행 등 대형 금융기관의 Oracle Zero Data Loss Recovery Appliance(ZDLRA) 구축 및 운영. 데이터 백업 및 복구 전략 수립'
        : 'Construction and operation of Oracle Zero Data Loss Recovery Appliance (ZDLRA) for major financial institutions including National Pension Service, KB Card, Suhyup, and Gwangju Bank. Data backup and recovery strategy establishment',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
      tech: ['Oracle', 'ZDLRA', 'Database', 'Backup'],
      github: '',
      demo: ''
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Major Projects</h2>
          <p className="text-lg text-gray-600">
            {language === 'ko' ? '클라우드 아키텍트로서 수행한 주요 프로젝트들입니다' : 'Key projects performed as a cloud architect'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card group hover:shadow-lg transition-shadow">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              
              {project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex space-x-4">
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <span className="text-gray-500 text-sm">
                    {language === 'ko' ? '기업 내부 프로젝트' : 'Internal Enterprise Project'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects