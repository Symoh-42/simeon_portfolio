import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Code, GraduationCap, Mail, Phone, MapPin, Layers, Settings, Zap, ArrowRight, Menu, X } from 'lucide-react';

// --- Utility Components ---

/**
 * Custom Tech Cursor Component
 * Replaces default cursor with a glowing dot and trailing ring
 */
const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run on desktop/devices with a mouse
        if (window.matchMedia("(pointer: coarse)").matches) return;

        setIsVisible(true);

        const moveCursor = (e) => {
            const { clientX, clientY } = e;

            // Move the dot instantly
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }

            // Move the outline with a slight delay/animation via CSS
            if (cursorOutlineRef.current) {
                // We use animate to create a smooth trailing effect
                cursorOutlineRef.current.animate({
                    transform: `translate3d(${clientX}px, ${clientY}px, 0)`
                }, {
                    duration: 500,
                    fill: 'forwards'
                });
            }
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        // Detect hover over interactive elements
        const handleLinkHoverEvents = () => {
            const handleLinkEnter = () => setIsHovering(true);
            const handleLinkLeave = () => setIsHovering(false);

            document.querySelectorAll('a, button, input, textarea, .cursor-pointer').forEach(el => {
                el.addEventListener('mouseenter', handleLinkEnter);
                el.addEventListener('mouseleave', handleLinkLeave);
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Initial attach
        handleLinkHoverEvents();

        // Re-attach listeners if DOM changes (simple observer)
        const observer = new MutationObserver(handleLinkHoverEvents);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
        };
    }, []);

    // If on mobile, don't render custom cursor
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

    return (
        <>
            {/* Inner Dot */}
            <div
                ref={cursorDotRef}
                className={`fixed top-0 left-0 w-2 h-2 bg-primary-400 rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Outer Ring */}
            <div
                ref={cursorOutlineRef}
                className={`fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out border border-primary-400 rounded-full flex items-center justify-center mix-blend-screen
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                    ${isHovering ? 'w-12 h-12 bg-primary-400/20 border-transparent' : 'w-8 h-8'}
                `}
            >
                {/* Optional Crosshair effect inside ring */}
                <div className={`w-1 h-1 bg-white rounded-full transition-all duration-300 ${isHovering ? 'opacity-0' : 'opacity-50'}`}></div>
            </div>
        </>
    );
};

/**
 * Hook for scroll animations
 */
const Reveal = ({ children, className = '', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const style = {
        transitionDelay: `${delay}ms`,
    };

    return (
        <div
            ref={ref}
            style={style}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${className}`}
        >
            {children}
        </div>
    );
};

/**
 * Animated Card for Sections/Projects
 */
const AnimatedCard = ({ children, className = '' }) => {
    return (
        <div
            className={`cursor-pointer bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl transition-all duration-500 hover:border-primary-400/50 hover:-translate-y-2 hover:shadow-primary-lg ${className}`}
        >
            {children}
        </div>
    );
};

/**
 * Section Header Component
 */
const SectionHeader = ({ category, title, subtitle }) => (
    <div className="text-center mb-16">
        <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">
                {category}
            </p>
            <h2 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tighter max-w-4xl mx-auto">
                {title}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">{subtitle}</p>
        </Reveal>
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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-2xl font-black text-white cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollTo(0, 0)}>
                        <span className="text-primary-400">Simeon</span>.Dev
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-300 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group relative cursor-none-target"
                                style={{ animationDelay: `${index * 100}ms` }}
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
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gray-900 cursor-default">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-4 pt-16 pb-24">
            <div className="animate-fadeInDown">
                <p className="text-xl sm:text-2xl text-primary-400 font-semibold mb-3 tracking-wider uppercase">
                    Innovative Solutions Delivered
                </p>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-8">
                    I Build & Deploy <span className="text-secondary-400 relative inline-block">
                        Scalable Web Apps
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary-500 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.49994 132.5 -3.50004 198 2.49997" stroke="currentColor" strokeWidth="3"></path></svg>
                    </span>
                </h1>
            </div>

            <div className="animate-fadeInUp delay-300">
                <p className="text-lg sm:text-xl text-gray-300 font-light mb-12 max-w-3xl mx-auto">
                    Full Stack Web Developer | Software Engineer with 3+ years of experience in React.js, Django, and modern frameworks.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp delay-500">
                <button
                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 hover:from-primary-600 hover:to-secondary-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 transition-all duration-300 transform hover:scale-[1.05]"
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
    <section id="about" className="py-20 sm:py-32 bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Text */}
                <Reveal>
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
                            <div className="flex items-center text-gray-300 hover:text-primary-400 transition-colors">
                                <Mail className="w-5 h-5 mr-3 text-primary-400 flex-shrink-0" />
                                <span className="font-medium">{profileData.contact.email}</span>
                            </div>
                            <div className="flex items-center text-gray-300 hover:text-primary-400 transition-colors">
                                <Phone className="w-5 h-5 mr-3 text-primary-400 flex-shrink-0" />
                                <span className="font-medium">{profileData.contact.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-300 hover:text-primary-400 transition-colors">
                                <MapPin className="w-5 h-5 mr-3 text-primary-400 flex-shrink-0" />
                                <span className="font-medium">{profileData.contact.location}</span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Right Column: Stylized Image/Code Placeholder */}
                <Reveal delay={200}>
                    <AnimatedCard className="aspect-video w-full flex items-center justify-center bg-gray-900 shadow-3xl hover:rotate-1">
                        <div className="p-6 bg-gray-700 rounded-lg w-full max-w-md shadow-inner cursor-text">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"></div>
                            </div>
                            <pre className="text-sm text-lime-400 overflow-x-auto whitespace-pre-wrap font-mono custom-scrollbar">
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
                </Reveal>
            </div>
        </div>
    </section>
);

const SkillCard = ({ skill }) => (
    <div
        className={`group ${skill.color} p-8 rounded-2xl shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl flex flex-col justify-between h-full cursor-pointer relative overflow-hidden`}
    >
        <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <skill.Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                <ArrowRight className="w-6 h-6 text-white opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{skill.domain}</h3>
            <p className="text-white/80 text-sm font-light leading-relaxed">
                {skill.tools}
            </p>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 relative z-10">
            <p className="text-xs text-white/60 uppercase tracking-wider group-hover:text-white transition-colors">Expertise Area</p>
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
                    <Reveal key={index} delay={index * 150} className="h-full">
                        <SkillCard skill={skill} />
                    </Reveal>
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
        className="block group p-4 bg-gray-700/50 rounded-lg hover:bg-primary-900/50 transition-all duration-300 border border-gray-700 hover:border-primary-500/50 relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex justify-between items-center relative z-10">
            <p className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
                {project.name}
            </p>
            <ArrowRight className="w-5 h-5 text-primary-400 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <p className="text-sm text-gray-400 mt-1 relative z-10 group-hover:text-gray-300">{project.tech}</p>
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
                    <Reveal key={jobIndex}>
                        <AnimatedCard className="p-6 sm:p-10 border-white/20">
                            <div className="md:flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-400">{job.role}</h3>
                                    <p className="text-xl text-white font-medium">{job.company}</p>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 md:mt-0 md:text-right bg-white/5 px-3 py-1 rounded-full border border-white/10">{job.duration}</p>
                            </div>
                            <p className="text-gray-300 mb-8 border-b border-white/10 pb-6">{job.description}</p>

                            <h4 className="text-lg font-semibold text-white mb-4">Notable Contributions (Projects)</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {job.projects.map((project, projectIndex) => (
                                    <ProjectItem key={projectIndex} project={project} />
                                ))}
                            </div>
                        </AnimatedCard>
                    </Reveal>
                ))}

                {/* Education Highlight */}
                <Reveal>
                    <AnimatedCard className="max-w-4xl mx-auto border-dashed border-primary-500 border-2 bg-gray-700/10 hover:border-solid hover:bg-gray-700/20">
                        <div className="flex items-start">
                            <GraduationCap className="w-8 h-8 text-secondary-400 mr-4 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Education</h3>
                                <p className="text-lg text-primary-400 font-medium">{profileData.education.degree}</p>
                                <p className="text-gray-300">{profileData.education.institution} ({profileData.education.years})</p>
                            </div>
                        </div>
                    </AnimatedCard>
                </Reveal>
            </div>
        </div>
    </section>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-white/10">
        <button
            className="w-full text-left py-6 px-2 flex justify-between items-center text-white hover:text-primary-400 transition-colors duration-200"
            onClick={onClick}
        >
            <span className="text-lg font-semibold">{question}</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                {isOpen ? <X className="w-5 h-5 text-secondary-400" /> : <ArrowRight className="w-5 h-5" />}
            </span>
        </button>
        <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
                }`}
        >
            <p className="text-gray-400 pb-6 px-2 leading-relaxed border-l-2 border-primary-500 pl-4 ml-2">{answer}</p>
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
                        <Reveal>
                            <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">
                                Q&A
                            </p>
                            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
                                Your Questions <span className="text-secondary-400">Answered</span>
                            </h2>
                            <p className="text-gray-400">
                                Everything you need to know about my skills, process, and approach to full-stack development.
                            </p>
                        </Reveal>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-2 space-y-4 bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
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
            <Reveal>
                <div className="bg-gray-900 border border-white/10 rounded-2xl p-10 sm:p-16 max-w-4xl mx-auto text-center relative overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
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
                                className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 hover:from-primary-600 hover:to-secondary-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-gray-800 rounded-full group-hover:bg-opacity-0 text-white">
                                    Start a Conversation <Mail className="inline-block w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <div className="flex justify-center items-center mb-6">
                <div className="text-2xl font-black text-white">
                    <span className="text-primary-400">Simeon</span>.Dev
                </div>
            </div>
            <p className="mb-4 max-w-md mx-auto">Experience growth through innovative digital engineering designed to reach, inspire, and deliver results.</p>
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
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }

      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInDown {
        animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInUp {
        animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0; /* Ensures it starts invisible */
      }
      .delay-300 { animation-delay: 0.3s; }
      .delay-500 { animation-delay: 0.5s; }

      /* Custom scrollbar for code block */
      .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #374151; 
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #60a5fa; 
        border-radius: 4px;
      }

      /* Custom shadow for card hover effect */
      .shadow-primary-lg {
          box-shadow: 0 10px 25px -3px rgba(96, 165, 250, 0.2), 0 4px 6px -2px rgba(96, 165, 250, 0.1);
      }
      /* Custom brand colors */
      .text-secondary-400 { color: #fb923c; } 
      .bg-secondary-500 { background-color: #f97316; } 
      .bg-accent-500 { background-color: #10b981; } 
      .text-primary-400 { color: #60a5fa; } 
      
      /* HIDE DEFAULT CURSOR ON DESKTOP */
      @media (pointer: fine) {
          body, a, button, input, textarea {
              cursor: none !important;
          }
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);


    return (
        <div className="min-h-screen bg-gray-900 font-sans selection:bg-primary-400 selection:text-gray-900">
            <script src="https://cdn.tailwindcss.com"></script>
            <CustomCursor />
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