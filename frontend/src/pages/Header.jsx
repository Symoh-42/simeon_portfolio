import { useState } from "react";

// Navigation Component
const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        SM
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className={`flex items-center gap-2 transition-colors ${currentPage === 'home' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            <Home size={18} />
                            Home
                        </button>
                        <button
                            onClick={() => setCurrentPage('about')}
                            className={`flex items-center gap-2 transition-colors ${currentPage === 'about' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            <User size={18} />
                            About
                        </button>
                        <button
                            onClick={() => setCurrentPage('portfolio')}
                            className={`flex items-center gap-2 transition-colors ${currentPage === 'portfolio' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            <FolderOpen size={18} />
                            Portfolio
                        </button>
                        <button
                            onClick={() => setCurrentPage('contact')}
                            className={`flex items-center gap-2 transition-colors ${currentPage === 'contact' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            <MessageSquare size={18} />
                            Contact
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <button
                            onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-2 w-full py-2 ${currentPage === 'home' ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <Home size={18} />
                            Home
                        </button>
                        <button
                            onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-2 w-full py-2 ${currentPage === 'about' ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <User size={18} />
                            About
                        </button>
                        <button
                            onClick={() => { setCurrentPage('portfolio'); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-2 w-full py-2 ${currentPage === 'portfolio' ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <FolderOpen size={18} />
                            Portfolio
                        </button>
                        <button
                            onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-2 w-full py-2 ${currentPage === 'contact' ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <MessageSquare size={18} />
                            Contact
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navigation