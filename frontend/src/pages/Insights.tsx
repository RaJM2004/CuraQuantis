import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mic, Phone, Volume2, UserCheck, 
  Clock, TrendingUp, DollarSign, Globe2, 
  MessageSquare, Layout, Brain, Languages,
  CheckCircle2, PlayCircle, ShieldCheck, Zap,
  Activity, Sparkles, Headphones, ArrowRight, PauseCircle, ChevronRight,
  Music, Repeat, Waves, Wand2, ArrowDown
} from 'lucide-react';

const Insights: React.FC = () => {
  const [heroAudioPlaying, setHeroAudioPlaying] = React.useState(false);
  const heroAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleHeroAudio = () => {
    if (!heroAudioRef.current) return;
    if (heroAudioPlaying) {
      heroAudioRef.current.pause();
    } else {
      heroAudioRef.current.play();
    }
    setHeroAudioPlaying(!heroAudioPlaying);
  };

  const integrations = [
    {
      platform: 'CuraClinics',
      role: 'Outbound Patient Outreach',
      description: 'Automate appointment scheduling, follow-ups, and reminders with natural human speech.',
      features: ['Appointment Orchestration', 'Symptom Pre-capture', 'Native Language Support'],
      audio: '/appointment.wav'
    },
    {
      platform: 'CuraElite Care',
      role: 'Critical Alert Orchestration',
      description: 'Instant, human-voice emergency notifications for ICU staff and on-call doctors.',
      features: ['ICU Critical Alerts', 'Post-Op Follow-ups', 'Consent Management'],
      audio: '/crital_alert.wav'
    },
    {
      platform: 'CuraDiagnostics',
      role: 'Clinical Intelligence',
      description: 'Collect patient history via voice and feeds structured data into clinical systems before visits.',
      features: ['Pre-visit History Collection', 'Proactive Report Explanation', 'Result-Driven Guidance'],
      audio: '/diaagnostic.wav'
    },
    {
      platform: 'CuraCover',
      role: 'Insurance & Billing Concierge',
      description: 'Explain complex coverage details and verify insurance status in real-time conversations.',
      features: ['Coverage Explanations', 'CPT Code Guidance', 'Real-time Verification'],
      audio: '/insurance Z.wav'
    },
    {
      platform: 'CuraPharma',
      role: 'Supply Chain Intelligence',
      description: 'Automated medication refill reminders and adherence calls improve health and compliance.',
      features: ['Refill Automation', 'Adherence Reminders', 'Availability Updates'],
      audio: '/curaPharma.wav'
    },
    {
      platform: 'CuraRecruit',
      role: 'Clinical Patient Recruitment',
      description: 'Find and qualify the right patients for clinical trials instantly with automated, empathetic voice screening.',
      features: ['Trial Eligibility Verification', 'Automated Enrollment', 'Screening Orchestration'],
      audio: '/PATIENT RECRUITMENT.wav'
    }
  ];

  const capabilities = [
    { 
      title: 'Sub-500ms Latency', 
      desc: 'Conversations that feel real, without the awkward AI pauses.',
      icon: Zap
    },
    { 
      title: 'Emotional Intelligence', 
      desc: 'Detects patient sentiment and adjusts tone to provide empathetic care.',
      icon: HeartIcon
    },
    { 
      title: 'CuraClone™ Tech', 
      desc: 'Clone your trusted doctors\' voices for maximum patient trust.',
      icon: UserCheck
    },
    { 
      title: 'HIPAA Compliant', 
      desc: 'Enterprise-grade security for sensitive medical data processing.',
      icon: ShieldCheck
    }
  ];

  function HeartIcon(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    );
  }

  const AudioTrigger = ({ src, label }: { src?: string; label?: string }) => {
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
      <div className="flex flex-col items-center gap-2">
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
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative group/btn overflow-hidden ${
            !src ? 'bg-gray-50 text-gray-300 cursor-default' :
            isPlaying ? 'bg-blue-600 text-white scale-110 shadow-xl shadow-blue-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {src && !isPlaying && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400 rounded-full"
            />
          )}
          
          {isPlaying ? (
            <div className="flex gap-1 items-end h-5">
              {[0.4, 0.9, 0.6, 0.8, 0.4].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['30%', '100%', '30%'] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
          ) : (
            <Volume2 size={24} className={src ? 'animate-pulse' : ''} />
          )}
        </button>
        {label && <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 font-outfit overflow-x-hidden">
      <Navbar />

      <audio 
        ref={heroAudioRef} 
        src="/appointment.wav" 
        onPlay={() => setHeroAudioPlaying(true)}
        onPause={() => setHeroAudioPlaying(false)}
        onEnded={() => setHeroAudioPlaying(false)}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-gray-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-100/30 blur-[150px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-blue-950 font-space"
            >
              The First Voice <br className="hidden md:block" />
              Employee <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">That Never Sleeps.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-2xl text-gray-500 font-light max-w-3xl mb-12 leading-relaxed px-4"
            >
              Scale your patient engagement with natural, sub-500ms latency voice agents. Build, train, and deploy clinical-grade voice assistants in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6"
            >
              <Link to="/contact" className="bg-blue-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 font-bold flex items-center justify-center gap-3 active:scale-95 group">
                Build Voice Agent
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={toggleHeroAudio}
                className={`bg-white border border-blue-100 text-blue-600 px-8 py-4 md:px-10 md:py-5 rounded-full hover:bg-blue-50 transition-all font-bold flex items-center justify-center gap-3 shadow-xl ${heroAudioPlaying ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              >
                {heroAudioPlaying ? <PauseCircle size={24} className="animate-pulse" /> : <PlayCircle size={24} />}
                {heroAudioPlaying ? 'Playing Sample...' : 'Watch Action'}
              </button>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 md:mt-20 w-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent z-20"></div>
              <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden border border-blue-50 shadow-2xl bg-white p-2 md:p-4">
                <img 
                  src="/CuraVoice.png" 
                  alt="Voice AI Interface" 
                  className="w-full h-auto rounded-[18px] md:rounded-[24px]"
                />
              </div>
              <div className="hidden lg:block absolute -top-10 -left-10 bg-white border border-blue-50 p-6 rounded-3xl z-30 shadow-xl">
                <p className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-1 font-space">Response Time</p>
                <h3 className="text-3xl font-bold text-blue-950 font-space">480ms</h3>
              </div>
              <div className="hidden lg:block absolute bottom-20 -right-10 bg-white border border-blue-50 p-6 rounded-3xl z-30 shadow-xl">
                <p className="text-cyan-600 text-sm font-bold uppercase tracking-widest mb-1 font-space">Human Sentiment</p>
                <h3 className="text-3xl font-bold text-blue-950 font-space">98.4%</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Pipeline Section */}
      <section className="py-12 md:py-24 relative bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-950 font-space tracking-tight">Built for Clinical Speed</h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light">How we bridge the gap between AI and human conversation.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 max-w-6xl mx-auto relative">
            {[
              { icon: Mic, label: 'Listen', desc: 'Real-time speech-to-text with medical terminology expertise.' },
              { icon: Brain, label: 'Think', desc: 'Proprietary clinical LLM processes and determines next steps.' },
              { icon: Volume2, label: 'Speak', desc: 'Ultra-realistic text-to-speech with emotional resonance.' }
            ].map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 md:p-10 rounded-[32px] md:rounded-[40px] text-center group hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 w-full md:w-1/3"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                    <step.icon className="text-blue-600 group-hover:text-white transition-colors" size={32} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-950 font-space tracking-tight">{step.label}</h3>
                  <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">{step.desc}</p>
                </motion.div>
                
                {/* Arrow between cards */}
                {i < 2 && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.3 + 0.1 }}
                      className="hidden md:flex items-center justify-center text-blue-400 group"
                    >
                      <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight size={48} strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>
                    <div className="md:hidden flex items-center justify-center text-blue-200 py-2">
                        <ArrowDown size={32} />
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CuraClone™ Language Transformation Showcase */}
      <section className="py-12 md:py-24 bg-blue-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 bg-[url('https://www.transparenttextures.com/patterns/audio-wave.png')] bg-repeat-x"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 text-blue-300 px-4 py-2 rounded-full mb-6 md:mb-8 font-space"
              >
                <Languages size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Identity Preservation</span>
              </motion.div>
              <h2 className="text-3xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter text-white font-space leading-tight">One Voice. <br className="md:hidden" /> <span className="text-blue-400 italic">Every Language.</span></h2>
              <p className="text-base md:text-xl text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
                Train your voice once, and let your clinical identity speak to patients across the globe.
              </p>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Step 1: Input */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full md:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[32px] md:rounded-[40px] text-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                  <Mic size={28} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-space">Source Sample</h3>
                <p className="text-blue-100/40 text-xs mb-8">Raw voice capture in native <span className="text-blue-300 font-bold">Telugu</span>.</p>
                <AudioTrigger src="/Input.m4a" label="Source (Telugu)" />
              </motion.div>

              {/* Transformation Arrow */}
              <div className="w-full md:col-span-4 flex flex-col items-center justify-center gap-4 md:gap-6 py-6 md:py-0">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40"
                  >
                    <Wand2 className="text-white" size={32} />
                  </motion.div>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border border-blue-400/30 border-dashed rounded-full pointer-events-none" />
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                    <Zap size={12} />
                    30s Training
                  </div>
                  <p className="text-blue-100/60 text-[10px] font-medium uppercase tracking-widest">Analyzing Voice Profile...</p>
                </div>
                <div className="md:hidden text-blue-400">
                  <ArrowDown size={32} />
                </div>
              </div>

              {/* Step 2: Output */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full md:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[32px] md:rounded-[40px] text-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-400/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-300">
                  <Waves size={28} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-space">Trained Output</h3>
                <p className="text-blue-100/40 text-xs mb-8">Cloned identity speaking in <span className="text-blue-400 font-bold">Hindi</span>.</p>
                <AudioTrigger src="/output-51.wav" label="Cloned (Hindi)" />
              </motion.div>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Similarity', val: '99.2%', icon: Activity },
                { label: 'Latency', val: '<500ms', icon: Zap },
                { label: 'Emotion', val: 'Perfect', icon: HeartIcon },
                { label: 'Languages', val: '40+', icon: Globe2 }
              ].map((stat, i) => (
                <div key={i} className="text-center border-r border-white/10 last:border-0 pr-4 last:pr-0">
                  <h4 className="text-xl md:text-2xl font-black text-white font-space tracking-tight mb-1">{stat.val}</h4>
                  <p className="text-blue-100/30 text-[8px] md:text-[10px] uppercase font-black tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Bento Grid */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h2 className="text-3xl md:text-6xl font-bold mb-6 text-blue-950 font-space tracking-tighter leading-tight">Designed for <br className="md:hidden" /> Every <span className="text-blue-600">Touchpoint.</span></h2>
              <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">Hear how CuraVoice AI handles complex scenarios.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {integrations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative border rounded-[32px] md:rounded-[40px] p-8 md:p-10 overflow-hidden flex flex-col h-full hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 bg-white border-gray-100 text-gray-900"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 blur-[80px] group-hover:bg-blue-100 transition-all"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="relative">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight font-space text-blue-950">{item.platform}</h3>
                    <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest font-space">{item.role}</p>
                  </div>
                  <AudioTrigger src={item.audio} />
                </div>

                <div className="relative z-10 flex-grow">
                  <p className="text-base md:text-lg font-light leading-relaxed mb-6 italic text-gray-500">
                    "{item.description}"
                  </p>

                  <div className="space-y-4 pt-6 border-t mt-auto border-gray-100">
                    <div className="grid grid-cols-1 gap-3">
                      {item.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-medium text-gray-500">
                          <CheckCircle2 size={14} className="text-blue-500" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities / Specs Grid */}
      <section className="py-8 md:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {capabilities.map((cap, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <cap.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-950 font-space tracking-tight">{cap.title}</h3>
                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed px-4 md:px-0">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 md:py-16 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-blue-50/50 blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-7xl font-bold mb-8 md:mb-10 tracking-tighter leading-tight text-blue-950 font-space">Ready to hire your <br className="hidden md:block" /> <span className="text-blue-600 italic">first AI employee?</span></h2>
          <p className="text-lg md:text-3xl text-gray-500 font-light mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed px-4">
            Join leading healthcare organizations humanizing their digital patient journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
            <Link to="/contact" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-full hover:bg-blue-700 transition-all font-bold text-lg shadow-2xl active:scale-95 font-space">
              Book a Live Demo
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-white border border-blue-100 text-blue-600 px-10 py-5 rounded-full hover:bg-blue-50 transition-all font-bold text-lg font-space">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;