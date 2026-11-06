import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, Volume2, Brain, Zap, 
  ArrowRight, PlayCircle, ShieldCheck, Sparkles, Activity, Globe2, UserCheck, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CuraVoiceAISection = () => {
  const integrations = [
    {
      platform: 'CuraClinics',
      role: 'Outbound Outreach',
      description: 'Automate appointment scheduling and reminders with natural human speech.',
      audio: '/appointment.wav'
    },
    {
      platform: 'CuraElite Care',
      role: 'Critical Alerts',
      description: 'Human-voice emergency notifications for ICU staff and on-call doctors.',
      audio: '/crital_alert.wav'
    },
    {
      platform: 'CuraDiagnostics',
      role: 'Clinical Intelligence',
      description: 'Collect patient history via voice and feed data into clinical systems.',
      audio: '/diaagnostic.wav'
    },
    {
      platform: 'CuraCover',
      role: 'Billing Concierge',
      description: 'Explain coverage details and verify insurance status in real-time.',
      audio: '/insurance Z.wav'
    },
    {
      platform: 'CuraPharma',
      role: 'Supply Chain',
      description: 'Automated medication refill reminders and adherence calls.',
      audio: '/curaPharma.wav'
    },
    {
      platform: 'CuraRecruit',
      role: 'Trial Recruitment',
      description: 'Find and qualify patients for clinical trials instantly with automated voice screening.',
      audio: '/PATIENT RECRUITMENT.wav'
    },
    {
      platform: 'CuraClone™',
      role: 'Voice Identity',
      description: 'Just 30 seconds of audio is all it takes to build a permanent digital twin.',
      isFeatured: true,
      highlight: '30s Speed'
    }
  ];

  const AudioTrigger = ({ src }: { src?: string }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const togglePlay = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!src || !audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    return (
      <div className="relative">
        {src && <audio 
          ref={audioRef} 
          src={src} 
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />}
        <button
          onClick={togglePlay}
          disabled={!src}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative group/btn ${
            !src ? 'bg-gray-50 text-gray-300 cursor-default' :
            isPlaying ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {src && !isPlaying && (
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400 rounded-full"
            />
          )}
          {isPlaying ? (
            <div className="flex gap-0.5 items-end h-4">
              {[0.4, 0.9, 0.6].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['40%', '100%', '40%'] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
          ) : (
            <Volume2 size={20} />
          )}
        </button>
      </div>
    );
  };

  return (
    <section id="cura-voice-ai" className="py-32 bg-white relative overflow-hidden text-gray-900 font-outfit">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-50 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-600 px-4 py-2 rounded-full mb-8 font-space"
          >
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Conversational Intelligence</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-blue-950 leading-tight font-space">
            The Voice of <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modern Healthcare.</span>
          </h2>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Human-level voice agents that handle scheduling, alerts, and patient support with sub-500ms latency.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {integrations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border p-10 rounded-[40px] hover:shadow-2xl transition-all duration-500 group flex flex-col h-full ${
                item.isFeatured ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-100 lg:col-span-3 lg:flex-row lg:items-center lg:gap-12 lg:py-12' : 'bg-white border-gray-100 text-gray-900 hover:border-blue-200 hover:shadow-blue-50'
              }`}
            >
              <div className={`flex justify-between items-start mb-10 ${item.isFeatured ? 'lg:mb-0 lg:w-1/4' : ''}`}>
                <div className="relative">
                  {item.highlight && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="absolute -top-6 -left-2 bg-yellow-400 text-blue-950 text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full shadow-lg z-20 font-space"
                    >
                      {item.highlight}
                    </motion.div>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 font-space tracking-tight ${item.isFeatured ? 'text-white' : 'text-blue-950'}`}>{item.platform}</h3>
                  <p className={`${item.isFeatured ? 'text-blue-100' : 'text-blue-500'} text-xs font-bold uppercase tracking-widest font-space`}>{item.role}</p>
                </div>
                {item.isFeatured ? (
                   <UserCheck size={28} className="text-white" />
                ) : (
                  <AudioTrigger src={item.audio} />
                )}
              </div>
              <div className={item.isFeatured ? 'lg:w-2/3' : ''}>
                <p className={`font-light italic leading-relaxed mb-8 flex-grow ${item.isFeatured ? 'text-blue-50 text-lg' : 'text-gray-500'}`}>
                  "{item.description}"
                </p>
                <Link to="/insights" className={`flex items-center gap-2 text-sm font-bold transition-colors pt-6 border-t ${
                  item.isFeatured ? 'text-white border-white/20' : 'text-blue-950 border-gray-50 group-hover:text-blue-600'
                }`}>
                  Learn More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto py-16 border-y border-gray-100">
           {[
             { label: 'Latency', value: '<500ms', icon: Zap },
             { label: 'Accuracy', value: '99%', icon: Activity },
             { label: 'Uptime', value: '99.9%', icon: ShieldCheck },
             { label: 'Languages', value: '40+', icon: Globe2 }
           ].map((stat, i) => (
             <div key={i} className="text-center">
                <stat.icon className="text-blue-500 mx-auto mb-4" size={24} />
                <h4 className="text-3xl font-bold mb-1 text-blue-950 font-space tracking-tighter">{stat.value}</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-space">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default CuraVoiceAISection;
