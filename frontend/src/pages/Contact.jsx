import { Github, Linkedin, Mail, MapPin, Paperclip, Phone } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const whatsappMessage = `Hello, I'm ${name}%0A%0AEmail: ${email}%0A%0AMessage: ${message}`;
        const whatsappUrl = `https://wa.me/254704662432?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Get In Touch</h2>
                <p className="text-gray-400 text-center mb-12">Have a project in mind? Let's work together!</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                <a href="mailto:msimeon937@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors">
                                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                                        <Mail className="text-cyan-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="font-medium">msimeon937@gmail.com</p>
                                    </div>
                                </a>

                                <a href="tel:+254704662432" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors">
                                    <div className="p-3 bg-purple-500/20 rounded-lg">
                                        <Phone className="text-purple-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="font-medium">+254-704662432</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                                        <MapPin className="text-cyan-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Location</p>
                                        <p className="font-medium">Nairobi, Kenya</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
                            <div className="flex gap-4">
                                <a href="#" className="p-3 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 rounded-lg transition-all">
                                    <Github className="text-gray-300 hover:text-cyan-400" size={24} />
                                </a>
                                <a href="#" className="p-3 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 rounded-lg transition-all">
                                    <Linkedin className="text-gray-300 hover:text-purple-400" size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Send a Message via WhatsApp</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition-colors"
                            >
                                <Paperclip size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage