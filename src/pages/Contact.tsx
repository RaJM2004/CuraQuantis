import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    location: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_OPENCAGE_API_KEY`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              setFormData(prev => ({
                ...prev,
                location: data.results[0].formatted
              }));
            }
          } catch (error) {
            console.error('Error fetching location:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        'service_t6ssh7g',
        'template_3tqp1nf',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          location: formData.location
        },
        'CG70ICmTB8Mb4O6gi'
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          location: formData.location
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }

    setLoading(false);
    setTimeout(() => setStatus(''), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Contact Us</h1>
              <p className="text-xl opacity-90">
                Get in touch with our team for any inquiries or support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={infoVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-light text-blue-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Office Location</h3>
                  <p className="text-gray-600"><p className="font-semibold text-black">Registered Office</p>Unit G3, Plot No:39.40 & 41,
                    Sree Sai Hills, Gokul Plots,
                    Hafeezpet, KPHB Phase 13 road, KPHB Colony,
                    Hyderabad- 500085, Telangana State.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Info</h3>
                  <p className="text-gray-600">Email: ashwin@curaquantis.com<br />Phone: +91 7036955133</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Weekend: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {formData.location && (
                  <div className="text-sm text-gray-500">
                    Location: {formData.location}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-green-600 text-center"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-red-600 text-center"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=T-Hub%20Phase%202%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </section>


      <Footer />
    </div>
  );
};

export default Contact;