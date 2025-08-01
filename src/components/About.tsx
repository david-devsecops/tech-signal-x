
import { useLanguage } from '../contexts/LanguageContext'

const About = () => {
  const { language } = useLanguage()
  const skills = [
    'AWS', 'Azure', 'GCP', 'Oracle Cloud',
    'Kubernetes', 'Docker', 'Terraform', 'Jenkins',
    'Linux', 'Unix', 'Nginx', 'GitLab CI/CD',
    'Oracle Database', 'PostgreSQL', 'MongoDB', 'Redis',
    'Python', 'Bash', 'ChatGPT', 'Cursor'
  ]

  const experience = [
    {
      company: language === 'ko' ? '엘퍼스트' : 'L First',
      role: language === 'ko' ? '클라우드 아키텍트' : 'Cloud Architect',
      description: language === 'ko' 
        ? '한국은행 CBDC 활용성 테스트 인프라 구축 (2024.08 ~ 2025.07)'
        : 'Infrastructure construction for Bank of Korea CBDC viability testing (2024.08 ~ 2025.07)'
    },
    {
      company: language === 'ko' ? '우나프론트' : 'UnaFront',
      role: language === 'ko' ? '솔루션스 아키텍트, 클라우드 아키텍트' : 'Solutions Architect, Cloud Architect',
      description: language === 'ko'
        ? '아모레퍼시픽 On-Premise to AWS Migration SA Role 및 AWS 운영'
        : 'Amorepacific On-Premise to AWS Migration SA Role and AWS Operations'
    },
    {
      company: language === 'ko' ? '그리드' : 'Grid',
      role: language === 'ko' ? 'DevOps 엔지니어' : 'DevOps Engineer',
      description: language === 'ko'
        ? 'MOIM 메타버스 플랫폼 DevOps, SKT Tdeal 인프라 구축, SK그룹 프로젝트'
        : 'MOIM Metaverse Platform DevOps, SKT Tdeal Infrastructure Construction, SK Group Projects'
    },
    {
      company: language === 'ko' ? '아이와이씨앤씨(주)' : 'IYC&C Co., Ltd.',
      role: language === 'ko' ? '유닉스 엔지니어' : 'Unix Engineer',
      description: language === 'ko'
        ? '국방통합데이터센터 오라클 하드웨어 유지보수, Oracle ZDLRA 구축'
        : 'Defense Integrated Data Center Oracle Hardware Maintenance, Oracle ZDLRA Construction'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">About Me</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'ko' ? (
              <>12년 9개월의 클라우드 엔지니어 경험을 바탕으로 AWS, Azure, GCP 등 멀티클라우드 환경에서 인프라를 설계하고 구축합니다.<br/>
              오라클 데이터베이스부터 쿠버네티스까지, 다양한 기술 스택을 활용하여 안정적이고 확장 가능한 시스템을 구축합니다.</>
            ) : (
              <>With 12 years and 9 months of cloud engineering experience, I design and build infrastructure in multi-cloud environments including AWS, Azure, and GCP.<br/>
              From Oracle databases to Kubernetes, I leverage diverse technology stacks to build stable and scalable systems.</>
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'ko' ? '기술 스택' : 'Tech Stack'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'ko' ? '경력 사항' : 'Experience'}
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm">{exp.role}</h4>
                  <p className="text-blue-600 font-medium text-sm">{exp.company}</p>
                  <p className="text-gray-600 text-xs">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'ko' ? '자격증' : 'Certifications'}
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">AWS Solution Architect Associate</h4>
                <p className="text-xs text-gray-500">2023.05</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">AWS Database Specialty</h4>
                <p className="text-xs text-gray-500">2023.04</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">Google Cloud Professional Cloud Architect</h4>
                <p className="text-xs text-gray-500">2020.09</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">Oracle Cloud Infrastructure 2018 Architect Associate</h4>
                <p className="text-xs text-gray-500">2019.04</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">Oracle Certified Professional (OCP)</h4>
                <p className="text-xs text-gray-500">2010.05</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">Sun Certified System Administrator (SCSECA)</h4>
                <p className="text-xs text-gray-500">2009.08</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">Sun Certified Network Administrator (SCNA)</h4>
                <p className="text-xs text-gray-500">2009.07</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 text-sm">Certified Solaris Administrator (CSA)</h4>
                <p className="text-xs text-gray-500">2009.06</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About