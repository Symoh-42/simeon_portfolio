import { useState } from "react";
import { projects } from "../utils/projects";
import { Briefcase, ExternalLink, X } from "lucide-react";

// Portfolio Page
const PortfolioPage = () => {
    const [activeProject, setActiveProject] = useState(null);
    const getScreenshotUrl = (url) => {
        return `https://api.screenshotmachine.com/?key=b99e88=${encodeURIComponent(url)}&dimension=1024x768`;
    };

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">My Portfolio</h2>
                <p className="text-gray-400 text-center mb-12">A collection of projects I've worked on</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, id) => (
                        <div
                            key={project.title}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
                            onClick={() => setActiveProject(project)}
                        >
                            <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                                <img
                                    src={getScreenshotUrl(project.url)}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                <div className="hidden absolute inset-0 items-center justify-center">
                                    <Briefcase className="text-cyan-400" size={48} />
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <ExternalLink className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={18} />
                                </div>

                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.slice(0, 2).map(tech => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {activeProject && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setActiveProject(null)}
                >
                    <div
                        className="bg-slate-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                            <img
                                src={getScreenshotUrl(activeProject.url)}
                                alt={activeProject.title}
                                className="w-full h-full object-cover object-top"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="hidden absolute inset-0 items-center justify-center">
                                <Briefcase className="text-cyan-400" size={64} />
                            </div>
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors"
                            >
                                <X className="text-white" size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-white mb-2">{activeProject.title}</h3>
                            <p className="text-purple-400 mb-6">{activeProject.company} • {activeProject.year}</p>

                            <p className="text-gray-300 mb-6 leading-relaxed">{activeProject.description}</p>

                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                    {activeProject.tech.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg text-cyan-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={activeProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium"
                            >
                                Visit Live Site
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PortfolioPage