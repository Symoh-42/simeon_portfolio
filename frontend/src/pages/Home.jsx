import React, { useState, useEffect } from 'react';
import { Briefcase, Code, GraduationCap, Mail, Phone, MapPin, Layers, Settings, Zap, ArrowRight, Menu, X, User, DollarSign } from 'lucide-react';

// --- Utility Components ---

/**
 * Animated Card for Sections/Projects
 * @param {object} props
 * @param {React.ReactNode} props.children - Content of the card
 * @param {string} props.className - Additional class names for the card
 */
const AnimatedCard = ({ children, className = '' }) => {
    return (
        <div
            className={`bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl transition-all duration-300 hover:border-primary-400/50 ${className}`}
        >
            {children}
        </div>
    );
};

/**
 * Section Header Component - Updated to match the "Revento" aesthetic
 * @param {object} props
 * @param {string} props.category - The small, capitalized category text (e.g., SUMMARY)
 * @param {string} props.title - The main, large title
 * @param {string} props.subtitle - Descriptive subtitle
 */
const SectionHeader = ({ category, title, subtitle }) => (
    <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">
            {category}
        </p>
        <h2 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tighter max-w-4xl mx-auto">
            {title}
        </h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">{subtitle}</p>
    </div>
);

// --- Data Structure ---

const skillColors = [
    'bg-indigo-600/80 hover:bg-indigo-500',   // Backend / Server
    'bg-pink-600/80 hover:bg-pink-500',      // Frontend
    'bg-lime-600/80 hover:bg-lime-500',      // APIs & Integration
    'bg-teal-600/80 hover:bg-teal-500',      // Best Practices
];

const profileData = {
    name: "SIMEON MWANGI",
    title: "Full Stack Web Developer | Software Engineer",
    contact: {
        email: "msimeon937@gmail.com",
        phone: "+254-704662432",
        location: "Nairobi-Kenya",
    },
    summary: "Innovative Software Engineer with over 3 years of experience in full-stack web development. Skilled in building scalable and user-friendly applications using React.js, Django, and modern frontend frameworks. Proven track record delivering custom solutions for businesses, NGOs, law firms, e-commerce platforms, and real estate companies. Adept at working with cross-functional teams, integrating third-party APIs, and ensuring responsive, high-performing applications.",
    skills: [
        { domain: "Backend / Server", tools: "Python, Django, Django REST Framework, PostgreSQL, MySQL", Icon: Code, color: skillColors[0] },
        { domain: "Frontend", tools: "JavaScript/ES6+, React.js, React Native, Tailwind CSS, Bootstrap", Icon: Layers, color: skillColors[1] },
        { domain: "APIs & Integration", tools: "RESTful API design, authentication, third-party APIs", Icon: Settings, color: skillColors[2] },
        { domain: "Best Practices", tools: "Clean code, unit testing, version control, security, agile / Scrum", Icon: Zap, color: skillColors[3] },
    ],
    experience: [
        {
            company: "Greenbear Technologies",
            role: "Full Stack Developer",
            duration: "May 2023 - Present",
            description: "Designed and deployed responsive websites and web applications tailored to client needs. Delivered projects end-to-end including UI design, backend architecture, database modeling, and API integrations.",
            projects: [
                { name: "Villa Leone Nairobi", url: "https://villaleonenairobi.com/", tech: "Hotel management site (Django + Tailwind CSS)" },
                { name: "Rental Pay", url: "https://rentalpay.africa/", tech: "Rental management platform with M-PESA to bank integration." },
                { name: "ETCO Advocates", url: "https://etcoadvocates.com/", tech: "Law firm booking and client portal (Django + Tailwind CSS)." },
                { name: "Credit Scoring Model", url: "https://credit-scoring-model-eight.vercel.app/", tech: "Loan creditworthiness assessment system." },
                { name: "GBT Kenya", url: "https://gbt.co.ke/", tech: "Software development company site." },
            ]
        },
        {
            company: "Ohmspace Technologies",
            role: "Founder & Lead Developer",
            duration: "Jan 2021 - May 2023",
            description: "Built and deployed custom websites and applications for SMEs, NGOs, and event companies. Provided additional services including digital marketing, bulk SMS & emails, and hosting.",
            projects: [
                { name: "Tirus & Esther Foundation", url: "https://tirusandestherfoundation.org/", tech: "NGO platform" },
                { name: "Jay B Events", url: "https://jay-b-events.vercel.app/", tech: "Event management website" },
                { name: "Zippy Okoth", url: "https://zippy-okoth.vercel.app/", tech: "Artist/educator personal site" },
                { name: "Firmcop", url: "https://firmcop.vercel.app/", tech: "Industrial and commercial solutions provider" },
            ]
        },
    ],
    education: {
        institution: "Murang'a University of Technology",
        degree: "Bachelor of Science in Mathematics & Computer Science",
        years: "2017-2021"
    }
};

// --- Section Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Work' },
        { id: 'faq', label: 'Q&A' },
        { id: 'contact', label: 'Contact' },
    ];

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 text-2xl font-black text-white">
                        <span className="text-primary-400">Simeon</span>.Dev
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-300 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group relative"
                            >
                                {item.label}
                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute w-full bg-gray-900/90 backdrop-blur-lg border-b border-gray-700`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

const HeroSection = () => (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gray-900">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-4 pt-16 pb-24">
            <p className="text-xl sm:text-2xl text-primary-400 font-semibold mb-3 tracking-wider uppercase animate-fadeInDown">
                Innovative Solutions Delivered
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 animate-fadeInDown delay-300">
                I Build & Deploy <span className="text-secondary-400">Scalable Web Apps</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 font-light mb-12 max-w-3xl mx-auto animate-fadeInUp">
                Full Stack Web Developer | Software Engineer with 3+ years of experience in React.js, Django, and modern frameworks.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp delay-500">
                <button
                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 hover:from-primary-600 hover:to-secondary-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 transition-all duration-300 transform hover:scale-[1.02]"
                >
                    <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-gray-900 rounded-full group-hover:bg-opacity-0 text-white">
                        View My Work <ArrowRight className="inline-block w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </button>
            </div>
        </div>
    </section>
);

const AboutSection = () => (
    <section id="about" className="py-20 sm:py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Text */}
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">
                        PROFILE SUMMARY
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tighter mb-6">
                        Tailored Solutions for <span className="text-primary-400">Your Digital Needs</span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
                        {profileData.summary}
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-300">
                            <Mail className="w-5 h-5 mr-3 text-primary-400 flex-shrink-0" />
                            <span className="font-medium">{profileData.contact.email}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <Phone className="w-5 h-5 mr-3 text-primary-400 flex-shrink-0" />
                            <span className="font-medium">{profileData.contact.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <MapPin className="w-5 h-5 mr-3 text-primary-400 flex-shrink-0" />
                            <span className="font-medium">{profileData.contact.location}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stylized Image/Code Placeholder */}
                <AnimatedCard className="aspect-video w-full flex items-center justify-center bg-gray-900 shadow-3xl">
                    <div className="p-6 bg-gray-700 rounded-lg w-full max-w-md">
                        <div className="flex space-x-2 mb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <pre className="text-sm text-lime-400 overflow-x-auto whitespace-pre-wrap font-mono">
                            {`// Backend Logic Example (Django)
class ProjectManager(APIView):
    def post(self, request):
        # Authenticate user
        if not self.is_authenticated(request):
            return Response({'error': 'Unauthorized'}, status=401)

        # Process data
        data = request.data
        new_project = Project.objects.create(
            name=data['name'],
            status='In Progress'
        )
        return Response(ProjectSerializer(new_project).data, status=201)
// UI rendered by React
const ProjectCard = ({ project }) => <p>{project.name}</p>`}
                        </pre>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    </section>
);

const SkillCard = ({ skill }) => (
    <div
        className={`group ${skill.color} p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between h-full cursor-pointer`}
    >
        <div>
            <div className="flex items-center justify-between mb-4">
                <skill.Icon className="w-8 h-8 text-white" />
                <ArrowRight className="w-6 h-6 text-white opacity-70 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{skill.domain}</h3>
            <p className="text-white/80 text-sm font-light leading-relaxed">
                {skill.tools}
            </p>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-white/60 uppercase tracking-wider">Expertise Area</p>
        </div>
    </div>
);

const SkillsSection = () => (
    <section id="skills" className="py-20 sm:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
                category="SPECIALIZATION"
                title="We Provide Quality Services"
                subtitle="I leverage a modern, full-stack approach to build robust, scalable, and beautiful applications from scratch."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {profileData.skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                ))}
            </div>
        </div>
    </section>
);

const ProjectItem = ({ project }) => (
    <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group p-4 bg-gray-700/50 rounded-lg hover:bg-primary-900/50 transition-all duration-300 border border-gray-700 hover:border-primary-500/50"
    >
        <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
                {project.name}
            </p>
            <ArrowRight className="w-5 h-5 text-primary-400 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <p className="text-sm text-gray-400 mt-1">{project.tech}</p>
    </a>
);


const ExperienceSection = () => (
    <section id="experience" className="py-20 sm:py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
                category="EXPERIENCE"
                title="My Professional Journey"
                subtitle="A detailed look at my full-stack development roles and notable client contributions."
            />

            <div className="space-y-12">
                {profileData.experience.map((job, jobIndex) => (
                    <AnimatedCard key={jobIndex} className="p-6 sm:p-10 border-white/20">
                        <div className="md:flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-primary-400">{job.role}</h3>
                                <p className="text-xl text-white font-medium">{job.company}</p>
                            </div>
                            <p className="text-sm text-gray-400 mt-2 md:mt-0 md:text-right">{job.duration}</p>
                        </div>
                        <p className="text-gray-300 mb-8 border-b border-white/10 pb-6">{job.description}</p>

                        <h4 className="text-lg font-semibold text-white mb-4">Notable Contributions (Projects)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {job.projects.map((project, projectIndex) => (
                                <ProjectItem key={projectIndex} project={project} />
                            ))}
                        </div>
                    </AnimatedCard>
                ))}

                {/* Education Highlight */}
                <AnimatedCard className="max-w-4xl mx-auto border-dashed border-primary-500 border-2 bg-gray-700/10">
                    <div className="flex items-start">
                        <GraduationCap className="w-8 h-8 text-secondary-400 mr-4 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Education</h3>
                            <p className="text-lg text-primary-400 font-medium">{profileData.education.degree}</p>
                            <p className="text-gray-300">{profileData.education.institution} ({profileData.education.years})</p>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    </section>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-white/10">
        <button
            className="w-full text-left py-4 px-2 flex justify-between items-center text-white hover:text-primary-400 transition-colors duration-200"
            onClick={onClick}
        >
            <span className="text-lg font-semibold">{question}</span>
            <span className="ml-6">{isOpen ? <X className="w-5 h-5" /> : <ArrowRight className="w-5 h-5 transition-transform duration-300 transform rotate-45" />}</span>
        </button>
        <div
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
                }`}
            style={{ maxHeight: isOpen ? '999px' : '0' }}
        >
            <p className="text-gray-400 pb-4 px-2">{answer}</p>
        </div>
    </div>
);

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is your main technology stack?",
            answer: "My core expertise lies in the Python/Django ecosystem for the backend, coupled with React.js, React Native, and Tailwind CSS for robust, modern, and highly responsive frontend development.",
        },
        {
            question: "How do you ensure project success and quality?",
            answer: "I follow Agile/Scrum methodologies, emphasizing clean, well-documented code, strict version control (Git/GitHub), unit testing, and continuous deployment practices to ensure high-quality, scalable applications are delivered on time.",
        },
        {
            question: "What types of industries have you worked with?",
            answer: "I have delivered custom solutions for a diverse range of clients, including e-commerce platforms, law firms (client portals), NGOs, real estate companies, event management businesses, and industrial solutions providers.",
        },
        {
            question: "Are your solutions mobile-friendly and responsive?",
            answer: "Absolutely. Using frameworks like React Native and utility-first CSS like Tailwind, all solutions are designed to be fully responsive and optimized for performance across mobile, tablet, and desktop devices.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 sm:py-32 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left Column: Title */}
                    <div className="lg:col-span-1">
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">
                            Q&A
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
                            Your Questions <span className="text-secondary-400">Answered</span>
                        </h2>
                        <p className="text-gray-400">
                            Everything you need to know about my skills, process, and approach to full-stack development.
                        </p>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-2 space-y-4 bg-white/5 p-2 rounded-xl border border-white/10">
                        {faqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => toggleFaq(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const ContactSection = () => (
    <section id="contact" className="py-20 sm:py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-10 sm:p-16 max-w-4xl mx-auto text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3">
                        NEXT STEP
                    </p>
                    <p className="text-3xl sm:text-4xl font-black text-white mb-6 leading-snug">
                        Ready to Partner with <span className="text-primary-400">Simeon Mwangi</span>?
                    </p>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                        I'm currently available for new opportunities and freelance work. Let's discuss how I can bring your vision to life.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`mailto:${profileData.contact.email}`}
                            className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 hover:from-primary-600 hover:to-secondary-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 transition-all duration-300"
                        >
                            <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-gray-800 rounded-full group-hover:bg-opacity-0 text-white">
                                Start a Conversation <Mail className="inline-block w-5 h-5 ml-2" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <div className="flex justify-center items-center mb-2">
                <div className="text-2xl font-black text-white">
                    <span className="text-primary-400">Simeon</span>.Dev
                </div>
            </div>
            <p className="mb-1">Experience growth through innovative digital engineering designed to reach, inspire, and deliver results.</p>
            <p>&copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
        </div>
    </footer>
)

// --- Main App Component ---

const App = () => {
    useEffect(() => {
        // Add custom CSS for animations and custom colors
        const style = document.createElement('style');
        style.innerHTML = `
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        30% { transform: translate(30px, -50px) scale(1.1); }
        60% { transform: translate(-20px, 30px) scale(0.9); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }

      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInDown {
        animation: fadeInDown 0.8s ease-out;
      }
      .delay-300 { animation-delay: 0.3s; }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInUp {
        animation: fadeInUp 0.8s ease-out 0.3s forwards;
        opacity: 0; /* Ensures it starts invisible */
      }
      .delay-500 { animation-delay: 0.5s; }

      .transition-max-height {
          transition-property: max-height, opacity;
      }
      
      /* Custom shadow for card hover effect */
      .shadow-primary-lg {
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5), 0 4px 6px -2px rgba(59, 130, 246, 0.05);
      }
      /* Custom brand colors matching inspiration */
      .text-secondary-400 { color: #fb923c; } /* orange-400 */
      .bg-secondary-500 { background-color: #f97316; } /* orange-500 */
      .bg-accent-500 { background-color: #10b981; } /* emerald-500 */
      .text-primary-400 { color: #60a5fa; } /* blue-400 */
    `;
        document.head.appendChild(style);

        // Set custom Tailwind configuration (Primary: blue, Font: Inter)


        return () => {
            document.head.removeChild(style);
        };
    }, []);


    return (
        <div className="min-h-screen bg-gray-900 font-sans">
            <script src="https://cdn.tailwindcss.com"></script>
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ExperienceSection />
                <FAQSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

export default App;
