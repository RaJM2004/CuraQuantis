import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Director {
  name: string;
  role: string;
  image: string;
  description: string[];
}

const directors: Director[] = [
  {
    name: "Ananya Parikibandla",
    role: "Founder, Managing director of Zerokost Healthcare Pvt Ltd now known as GENQUANTAA pvt Ltd. Chairman and Founder of Genquantis Pvt Ltd",
    image: "/Ananya.png",
    description: [
      "Founder, Managing director of Zerokost Healthcare Pvt Ltd now known as GENQUANTAA pvt Ltd.",
      "Chairman and Founder of Genquantis Pvt Ltd a Group company which has 2 Subsidiaries CuraQuantis Health Clinics pvt Ltd and GenquantisRobotics Pvt Ltd."
    ]
  },
  {
    name: "Ashwin Kumar T S",
    role: "Founder & Strategic Director",
    image: "/Ashwin-1.png",
    description: [
      "Ashwin Kumar T S is the Founder of Zerokost. He is a visionary entrepreneur dedicated to driving innovation, technological advancement, and strategic growth within the organization. With a strong background in healthcare technology, he focuses on bridging the gap between cutting-edge AI solutions and practical, accessible patient care.",
      "His leadership continues to steer the company toward expanding its global footprint and delivering scalable, future-ready healthcare ecosystems that positively impact communities."
    ]
  },
  {
    name: "Anandh Kumar",
    role: "Global Business Director",
    image: "/Anand.jpeg",
    description: [
      "Anandh Kumar is an entrepreneur and global strategist dedicated to shaping the future of healthcare. As the Global Business Director of CuraQuantis, he leads the company’s international expansion and strategic vision, bridging the gap between emerging technology and patient-centric care.",
      "With years of international experience—including deep integration into the Israeli innovation ecosystem—Anandh leverages a high-level network of global business leaders to drive collaborative growth. He is a forward-thinking leader who specializes in identifying market shifts before they become mainstream, ensuring CuraQuantis remains at the forefront of healthcare accessibility.",
      "Driven by a passion for innovation and adaptability, Anandh is committed to building CuraQuantis into a trusted, future-ready brand that evolves alongside the changing needs of global society."
    ]
  },
  {
    name: "Pavan Sirish Dey",
    role: "Founder Director – Strategy & Executive Business Development",
    image: "/Pawan.jpeg",
    description: [
      "Pavan Sirish Dey is the visionary force behind the strategic and business expansion initiatives at CuraQuantis Healthcare Pvt. Ltd. As Founder Director – Strategy & Executive Business Development, he spearheads the company’s growth architecture, strategic alliances, healthcare innovation frameworks, and institutional collaborations.",
      "Driven by a mission to redefine accessible and integrated healthcare delivery, he focuses on building scalable healthcare ecosystems that combine technology, operational efficiency, and patient-centered care. His leadership reflects a forward-thinking approach toward creating sustainable healthcare infrastructure and expanding CuraQuantis into a trusted healthcare brand across emerging markets."
    ]
  },
  {
    name: "Mr. PVS Prasad",
    role: "Director – HR & Business Development",
    image: "/Prasad.jpeg",
    description: [
      "With three decades of experience at the intersection of talent and growth, PVS Prasad leads the HR and Business Development functions at CuraQuantis Health Clinics. His career is built on a foundation of operational excellence and a passion for workforce transformation.",
      "Mr.Prasad focuses on strengthening our human capital and expanding our strategic footprint through sustainable partnerships and scalable healthcare solutions. By fostering a culture of innovation and professional excellence, he ensures that the CuraQuantis team is equipped to deliver exceptional healthcare outcomes. Under his guidance, we continue to build a future-ready talent pipeline that positively impacts the communities we serve."
    ]
  },
  {
    name: "Mrs. Dharani N. Viswanath",
    role: "Director | Entrepreneur | AI Healthcare Strategist | Animal Welfare Advocate",
    image: "/Dharni.jpeg",
    description: [
      "Mrs. Dharani N. Viswanath began her entrepreneurial journey in the traditional silk saree industry, gaining valuable experience in business development and enterprise management. She has since expanded her focus to AI-driven healthcare innovation, leading initiatives to build scalable and technology-enabled healthcare ecosystems. Alongside her entrepreneurial work, she is a dedicated animal welfare advocate, actively supporting the care, rescue, and well-being of stray and abandoned animals."
    ]
  }
];

const DirectorCard = ({ director, index }: { director: Director, index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = director.description.join(' ').length > 200;

  return (
    <div 
      className="bg-white rounded-[30px] p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50/50 flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border-4 border-blue-50 shadow-md bg-white flex items-center justify-center">
          <img 
            src={director.image} 
            alt={director.name} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{director.name}</h3>
          <p className="text-blue-600 font-medium text-sm leading-relaxed">
            {director.role}
          </p>
        </div>
      </div>
      
      <div className="mb-2 min-h-[96px]">
        <div className={`text-gray-600 text-sm leading-relaxed space-y-4 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
          {director.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      
      {isLong && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-auto flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors w-full py-2 bg-blue-50/50 rounded-xl hover:bg-blue-50"
        >
          {expanded ? (
            <>Read Less <ChevronUp size={16} /></>
          ) : (
            <>Read More <ChevronDown size={16} /></>
          )}
        </button>
      )}
    </div>
  );
};

const DirectorsSection = () => {
  return (
    <section id="leadership" className="py-24 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[80px] -z-10 opacity-60 -translate-x-1/3 translate-y-1/4"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
            Our Leadership
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Visionaries</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The driving force behind CuraQuantis, our leadership team brings together decades of expertise in healthcare, technology, and global business strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {/* Ananya Parikibandla - Highlighted Card (Full Width on md/lg or top center) */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-center mb-4">
            <div className="w-full lg:w-2/3">
              <DirectorCard director={directors[0]} index={0} />
            </div>
          </div>
          
          {/* Other Directors */}
          {directors.slice(1).map((director, index) => (
            <DirectorCard 
              key={index} 
              director={director} 
              index={index + 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectorsSection;
