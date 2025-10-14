// About Page
import skills from "../utils/skills";
const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">About Me</h2>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">Who I Am</h3>
                        <p className="text-gray-300 leading-relaxed">
                            I'm an innovative Software Engineer with over 3 years of experience in full-stack web development.
                            I specialize in building scalable and user-friendly applications using React.js, Django, and modern frontend frameworks.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            I have a proven track record delivering custom solutions for businesses, NGOs, law firms, e-commerce platforms,
                            and real estate companies. I'm adept at working with cross-functional teams, integrating third-party APIs,
                            and ensuring responsive, high-performing applications.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="text-cyan-400" size={20} />
                                    <span className="text-white font-semibold">3+ Years</span>
                                </div>
                                <p className="text-gray-400 text-sm">Experience</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="text-purple-400" size={20} />
                                    <span className="text-white font-semibold">11+ Projects</span>
                                </div>
                                <p className="text-gray-400 text-sm">Completed</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">Skills & Expertise</h3>
                        {skills.map((skill, idx) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300 font-medium">{skill.name}</span>
                                    <span className="text-cyan-400">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${skill.level}%`, transitionDelay: `${idx * 100}ms` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Experience</h3>

                    <div className="space-y-8">
                        <div className="border-l-2 border-cyan-400 pl-6">
                            <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Calendar size={16} />
                                <span className="text-sm">May 2023 - Present</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Full Stack Developer</h4>
                            <p className="text-purple-400 mb-3">Greenbear Technologies</p>
                            <p className="text-gray-300 text-sm">
                                Designed and deployed responsive websites and web applications tailored to client needs.
                                Delivered projects end-to-end including UI design, backend architecture, database modeling, and API integrations.
                            </p>
                        </div>

                        <div className="border-l-2 border-purple-400 pl-6">
                            <div className="flex items-center gap-2 text-purple-400 mb-2">
                                <Calendar size={16} />
                                <span className="text-sm">Founder & Lead Developer</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Ohmspace Technologies</h4>
                            <p className="text-cyan-400 mb-3">Self-Employed</p>
                            <p className="text-gray-300 text-sm">
                                Built and deployed custom websites and applications for SMEs, NGOs, and event companies.
                                Provided additional services including digital marketing, bulk SMS & emails, and hosting.
                            </p>
                        </div>

                        <div className="border-l-2 border-gray-400 pl-6">
                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                <Calendar size={16} />
                                <span className="text-sm">Jan 2021 - June 2021</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">IT Intern</h4>
                            <p className="text-gray-400 mb-3">Superior Hotels</p>
                            <p className="text-gray-300 text-sm">
                                Supported IT infrastructure management and hospitality systems.
                                Assisted with troubleshooting hardware/software issues and system deployments.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                            <Award className="text-cyan-400" size={24} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-1">Bachelor of Science</h4>
                            <p className="text-cyan-400 mb-2">Mathematics & Computer Science</p>
                            <p className="text-gray-400">Murang'a University of Technology</p>
                            <p className="text-gray-500 text-sm mt-1">2017 - 2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;