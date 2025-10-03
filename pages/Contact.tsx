import React from 'react';
import { MessengerIcon, WhatsAppIcon, FacebookIcon, XIcon, YouTubeIcon } from '../components/icons';

const Contact: React.FC = () => {
    return (
        <div className="bg-warm-gray dark:bg-gray-900 font-open-sans">
            {/* Header Section */}
            <section className="relative bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('https://picsum.photos/1200/800?random=51')" }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins">Contact Us</h1>
                    <p className="mt-4 text-lg md:text-xl text-yellow-200">We’d love to hear from you. Reach out with any questions or needs.</p>
                </div>
            </section>

            {/* Contact & Location Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Form & Details */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                            <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mb-6">Get in Touch</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" className="w-full px-4 py-2 border rounded-md bg-warm-gray dark:bg-gray-700 dark:border-gray-600 focus:ring-church-maroon dark:focus:ring-yellow-400" placeholder="Your Name" />
                                    <input type="text" className="w-full px-4 py-2 border rounded-md bg-warm-gray dark:bg-gray-700 dark:border-gray-600 focus:ring-church-maroon dark:focus:ring-yellow-400" placeholder="Email / Phone" />
                                </div>
                                <select className="w-full px-4 py-2 border rounded-md bg-warm-gray dark:bg-gray-700 dark:border-gray-600 focus:ring-church-maroon dark:focus:ring-yellow-400">
                                    <option>General Inquiry</option>
                                    <option>Prayer Request</option>
                                    <option>Testimony</option>
                                    <option>Volunteer</option>
                                    <option>Partnership</option>
                                </select>
                                <textarea rows={4} className="w-full px-4 py-2 border rounded-md bg-warm-gray dark:bg-gray-700 dark:border-gray-600 focus:ring-church-maroon dark:focus:ring-yellow-400" placeholder="Your Message"></textarea>
                                <button type="submit" className="w-full bg-church-maroon text-white font-bold py-3 rounded-lg shadow-md hover:bg-church-maroon-dark transition-colors">Send Message</button>
                            </form>
                            <div className="mt-8 border-t dark:border-gray-700 pt-6 space-y-3 text-gray-700 dark:text-gray-300">
                                <p><strong>Address:</strong> <a href="#" className="hover:underline">123 Church Street, Itire, Lagos, Nigeria</a></p>
                                <p><strong>Phone:</strong> <a href="tel:+2341234567890" className="hover:underline">+234 123 456 7890</a></p>
                                <p><strong>Email:</strong> <a href="mailto:info@fbcitire.org" className="hover:underline">info@fbcitire.org</a></p>
                                <p><strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                        {/* Right Column: Map & Quick Buttons */}
                        <div className="flex flex-col">
                            <div className="h-80 w-full rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700">
                                 <iframe
                                    className="w-full h-full"
                                    loading="lazy"
                                    allowFullScreen
                                    src="https://maps.google.com/maps?q=First%20Baptist%20Church%20Itire%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed">
                                </iframe>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <a href="#" className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"><WhatsAppIcon className="w-6 h-6"/> WhatsApp</a>
                                <a href="#" className="flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"><MessengerIcon className="w-6 h-6"/> Messenger</a>
                                <a href="tel:+2341234567890" className="flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">Call Now</a>
                            </div>
                             <div className="mt-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-poppins">Follow Our Journey</h3>
                                <div className="flex justify-center space-x-4 mt-3">
                                  <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Facebook"><FacebookIcon className="h-8 w-8" /></a>
                                  <a href="#" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors" aria-label="X (Twitter)"><XIcon className="h-8 w-8" /></a>
                                  <a href="#" className="text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors" aria-label="YouTube"><YouTubeIcon className="h-8 w-8" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
