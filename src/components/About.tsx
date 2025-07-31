
const About = () => {
  const skills = [
    'JavaScript/TypeScript', 'React', 'Node.js', 'Python',
    'AWS', 'Docker', 'PostgreSQL', 'MongoDB',
    'Git', 'CI/CD', 'Kubernetes', 'GraphQL'
  ]

  const experience = [
    {
      company: '테크 스타트업',
      role: 'Senior Frontend Developer',
      period: '2021 - Present',
      description: 'React 기반 웹 애플리케이션 개발 및 팀 리딩'
    },
    {
      company: '중견 IT 기업',
      role: 'Full Stack Developer',
      period: '2019 - 2021',
      description: 'Node.js와 React를 활용한 풀스택 개발'
    },
    {
      company: '스타트업',
      role: 'Junior Developer',
      period: '2018 - 2019',
      description: '웹 개발 기초 학습 및 프로젝트 참여'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">About Me</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            5년간의 개발 경험을 바탕으로 사용자 중심의 웹 애플리케이션을 만들고 있습니다.
            지속적인 학습과 기술 공유를 통해 개발 커뮤니티에 기여하고자 합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">기술 스택</h3>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">경력 사항</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-1">{exp.period}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About