import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import {
  Heart,
  Download,
  Shield,
  Zap,
  Monitor,
  Battery,
  CheckCircle,
  Settings,
  Activity,
  Wifi,
  Stethoscope,
  Clock,
  Home,
  Users
} from 'lucide-react';

const NonInvasiveVentilator: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openDemoModal = () => setShowModal(true);
  const closeDemoModal = () => setShowModal(false);
  const downloadBrochure = () => {
  const link = document.createElement('a');
  link.href = '/Zerokost Ventilator (1).pdf'; // your brochure path
  link.download = 'Zerokost_Ventilator_Brochure.pdf'; // suggested downloaded filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center"

        style={{
          backgroundImage: 'url(/Venti1.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Non Invasive Ventilator</h1>
              <p className="text-xl opacity-90 mb-6">
                A cost-effective, portable, and user-friendly respiratory support device for hospitals, clinics, and home care.
              </p>
              <div className="flex gap-4">
                <button
            className="bg-purple-600 text-white px-6 py-3 rounded-md shadow hover:bg-purple-700 transition"
            onClick={() => {
              window.location.href = '/contact'; // 🔗 redirect to Contact Us page
            }}
          >
            Request Demo
          </button>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-md shadow hover:bg-gray-100 transition flex items-center gap-2" onClick={downloadBrochure}>
                  <Download /> Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section id="overview" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-light text-purple-900 mb-8">Product Overview</h2>
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <OverviewItem icon={<Shield />} title="Non-Invasive" description="CPAP and BiPAP modes for comfortable patient care" variants={cardVariants} />
          <OverviewItem icon={<Zap />} title="Portable" description="Lightweight design for easy transport and mobility" variants={cardVariants} />
          <OverviewItem icon={<Monitor />} title="Intuitive" description="5\ color touchscreen interface for easy operation" variants={cardVariants} />
          <OverviewItem icon={<Battery />} title="Reliable" description="Battery backup for uninterrupted operation" variants={cardVariants} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-purple-900 mb-8">Key Features</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <OverviewItem icon={<CheckCircle />} title="NIPPV Modes" description="CPAP and BiPAP modes for respiratory support" variants={cardVariants} />
            <OverviewItem icon={<Settings />} title="Adjustable Settings" description="Customizable pressure, flow, and alarms" variants={cardVariants} />
            <OverviewItem icon={<Activity />} title="Oxygen Enrichment" description="Built-in oxygen enrichment capability" variants={cardVariants} />
            <OverviewItem icon={<Wifi />} title="Data Logging" description="Comprehensive data logging and monitoring" variants={cardVariants} />
            <OverviewItem icon={<Shield />} title="Easy Maintenance" description="Easy-to-clean design for optimal hygiene" variants={cardVariants} />
            <OverviewItem icon={<Monitor />} title="Touchscreen Interface" description="5\ color touchscreen for easy operation" variants={cardVariants} />
          </motion.div>
        </div>
      </section>
     

    {/* Product Gallery Section */}
<section className="container mx-auto px-6 py-16">
  <h2 className="text-3xl font-light text-purple-900 mb-8">Product Gallery</h2>
  <motion.div
    className="grid md:grid-cols-3 gap-8"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    {['venti.jpg', 'Venti2.jpg', 'Venti3.jpg'].map((src, idx) => (
      <motion.div
        key={idx}
        variants={cardVariants}
        className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={`/${src}`}
          alt={`Gallery ${idx + 1}`}
          className="w-full h-60 object-cover"
        />
      </motion.div>
    ))}
  </motion.div>
</section>

      {/* Applications Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-light text-purple-900 mb-8">Applications</h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <OverviewItem icon={<Stethoscope />} title="Acute/Chronic Failure" description="Support for various respiratory failures" variants={cardVariants} />
          <OverviewItem icon={<Clock />} title="Sleep Apnea" description="Effective management of sleep apnea" variants={cardVariants} />
          <OverviewItem icon={<Heart />} title="Post-Operative Care" description="Assist recovery post surgeries" variants={cardVariants} />
          <OverviewItem icon={<Shield />} title="COVID-19" description="Management of infectious respiratory diseases" variants={cardVariants} />
          <OverviewItem icon={<Home />} title="Home Care" description="Chronic respiratory support at home" variants={cardVariants} />
          <OverviewItem icon={<Users />} title="Clinical Settings" description="Use in hospitals and clinics" variants={cardVariants} />
        </motion.div>
      </section>

      <Footer />

      {/* Demo Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Request Demo</h3>
              <button onClick={closeDemoModal}>✕</button>
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border px-3 py-2 rounded" required />
              <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" required />
              <input type="tel" placeholder="Phone" className="w-full border px-3 py-2 rounded" required />
              <textarea placeholder="Message" rows={3} className="w-full border px-3 py-2 rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={closeDemoModal}>Cancel</button>
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface OverviewItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: any;
}

const OverviewItem: React.FC<OverviewItemProps> = ({ icon, title, description, variants }) => (
  <motion.div
    variants={variants}
    className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex justify-center mb-4 text-purple-600 text-3xl">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default NonInvasiveVentilator;
