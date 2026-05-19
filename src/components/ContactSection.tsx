
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          message: formData.message
        },
        'CG70ICmTB8Mb4O6gi'
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }

    setLoading(false);
    setTimeout(() => setStatus(''), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'ashwin@curaquantis.com',
      description: 'Get in touch for AI solutions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 7036955133',
      description: 'Available between 9am to 6pm IST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: "T-Hub's main facility (Phase 2), Plot No 1/C, Sy No 83/1, Raidurgam Panmaktha, Hyderabad Knowledge City, Serilingampally, Hyderabad, Telangana 500081",
      description: 'Innovation Hub'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-blue-900">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your healthcare with AI? Contact our team for expert solutions and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <info.icon className="w-12 h-12 text-blue-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{info.title}</h4>
                      <p className="text-blue-600 font-medium">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
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


          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
              {status === 'success' && (
                <div className="text-green-600 text-center flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully!</span>
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-600 text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
