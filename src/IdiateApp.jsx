import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Cpu, LineChart, Zap, Layers, Volume2, VolumeX, Network, Layout, Target, 
  ArrowRight, ArrowLeft, Mail, Globe, Users, Share2, Rocket, Palette, 
  Linkedin, Instagram, Github, MapPin, ChevronLeft, Check, Send, X, Terminal
} from 'lucide-react';

/**
 * IDIATE TECHNOLOGY - V21.0 (UX & CLARITY UPDATE)
 * Changes:
 * 1. Escape Function: Pressing 'Escape' now exits sub-views instantly.
 * 2. Status Removal: Removed "Status: Active" terminal text from detail view.
 * 3. Framing: Removed L-shape corner brackets during sub-view for a cleaner focus.
 * 4. Nav Precision: Maintained tight hit-boxes for the scene navigator.
 */

const SCENES = [
  { 
    id: 'HERO', 
    title: ["WE  DON'T  CHASE  TRENDS.", "WE  BUILD  SYSTEMS."], 
    subtitle: 'DESIGN. DATA. INTELLIGENCE.', 
    description: 'Built with intent, not noise.', 
    accent: '#3b82f6', 
    x: 0, 
    y: 0, 
    buttonLabel: '→ Let’s Build Something Real',
    next: 'The Core' 
  },
  { 
    id: 'CAPABILITIES', 
    title: 'THE CORE', 
    subtitle: 'WHAT WE DO IS SIMPLE. HOW WE DO IT IS NOT.', 
    description: '', 
    accent: '#6366f1', 
    items: [
      { 
        id: 'web-dev',
        icon: <Globe size={24} />, 
        label: 'Web Design & Dev',
        details: {
          title: 'WEB ENGINEERING',
          desc: 'Websites shouldn’t just exist. They should work.',
          subDesc: 'We design and build websites that load fast, think clearly, and guide users without shouting.',
          points: ['UI/UX focused', 'Performance builds', 'Business-first strategy', 'Responsive clarity']
        }
      },
      { 
        id: 'data-analytics',
        icon: <LineChart size={24} />, 
        label: 'Data Analytics',
        details: {
          title: 'DATA ANALYTICS',
          desc: 'Data is useless until it answers questions.',
          subDesc: 'We turn scattered data into decisions you can actually act on.',
          points: ['Interactive Dashboards', 'Actionable Insights', 'Operational Clarity', 'Data Cleaning']
        }
      },
      { 
        id: 'ai-dev',
        icon: <Cpu size={24} />, 
        label: 'AI Model Dev',
        details: {
          title: 'AI ENGINEERING',
          desc: 'AI is not magic. It’s engineering.',
          subDesc: 'Custom AI tools, RAG systems, and fine-tuned models built for real business use — not demos.',
          points: ['RAG Architectures', 'Model Fine-tuning', 'Workflow Automation', 'Scalability']
        }
      },
      { 
        id: 'brand-design',
        icon: <Palette size={24} />, 
        label: 'Design & Branding',
        details: {
          title: 'VISUAL SYSTEMS',
          desc: 'Design is how people remember you.',
          subDesc: 'Packaging, banners, templates, and brand visuals — designed to feel intentional, not decorative.',
          points: ['Brand Identity', 'Visual Systems', 'Template Design', 'Intentional Aesthetic']
        }
      }
    ], 
    x: 100, 
    y: 0, 
    next: 'Traction' 
  },
  { 
    id: 'GROWTH', 
    title: 'TRACTION', 
    subtitle: 'ATTENTION IS EARNED, NOT BOOSTED.', 
    description: ['Ideas don’t fail. Execution does.', 'We help brands and startups move from vision to traction.'], 
    accent: '#06b6d4', 
    items: [
      { 
        id: 'smo',
        icon: <Share2 size={24} />, 
        label: 'Audience Growth',
        details: {
          title: 'GROWTH SYSTEMS',
          desc: 'Steady growth over temporary noise.',
          subDesc: 'We optimize presence, content, and campaigns to grow brands steadily.',
          points: ['Strategic Growth', 'Presence Optimization', 'Consistency Models', 'Performance tracking']
        }
      },
      { 
        id: 'startup-sol',
        icon: <Rocket size={24} />, 
        label: 'Startup Systems',
        details: {
          title: 'EXECUTION ENGINE',
          desc: 'Execution is the differentiator.',
          subDesc: 'From pitch decks to automated marketing flows — we help startups scale.',
          points: ['Pitch Deck Systems', 'Marketing Automation', 'Email Infrastructure', 'Lead Funnels']
        }
      }
    ],
    x: 100, 
    y: 100, 
    next: 'Horizon' 
  },
  { 
    id: 'HORIZON', 
    title: 'LOOKING AHEAD', 
    subtitle: 'DIGITAL IS ONLY HALF THE STORY.', 
    description: 'We’re expanding into PLC automation and smart systems — connecting software with the physical world.', 
    quietLine: 'Bits meet machines. Intelligence meets reality.',
    accent: '#8b5cf6', 
    items: [
      { 
        id: 'plc-auto',
        icon: <Zap size={24} />, 
        label: 'PLC Automation',
        details: {
          title: 'HARDWARE LOGIC',
          desc: 'Physical engineering meets digital precision.',
          points: ['PLC Programming', 'Industrial HMI', 'Telemetry', 'Machine Logic']
        }
      },
      { 
        id: 'smart-int',
        icon: <Network size={24} />, 
        label: 'Smart Systems',
        details: {
          title: 'INTELLIGENT ENVIRONMENTS',
          desc: 'Connecting the world of bits with atoms.',
          points: ['IoT Connectivity', 'Smart Integrations', 'Remote Systems', 'Sensor Mesh']
        }
      }
    ], 
    x: 0, 
    y: 100, 
    next: 'Who We Are' 
  },
  { 
    id: 'ABOUT', 
    title: 'WHO WE ARE', 
    subtitle: 'A SMALL TEAM OBSESSED WITH CLARITY.', 
    description: 'We believe good systems stay invisible, work quietly, and last longer than trends. We work with people who care about how things are built.', 
    accent: '#f59e0b', 
    team: [
      { name: 'John Doe', role: 'Founder / Developer', social: 'Designers. Developers. Analysts.' },
      { name: 'Jane Doe', role: 'Data & AI Specialist', social: 'Different skills. Same mindset.' }
    ],
    x: -100, 
    y: 0, 
    next: 'Let’s Talk' 
  },
  { 
    id: 'DIALOGUE', 
    title: 'LET’S TALK', 
    subtitle: 'HAVE SOMETHING IN MIND? SO DO WE.', 
    description: ["Drop us a line.", "We’ll take it from there."], 
    accent: '#3b82f6', 
    email: 'hello@idiate.tech', 
    buttonLabel: '→ Transmission Complete',
    location: 'INDIA (REMOTE)',
    x: 0, 
    y: 0, 
    isFinal: true 
  }
];

const PeripheralDetails = ({ accent, hideBrackets }) => {
  const nodes = useMemo(() => [...Array(14)].map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Corner Brackets - Conditionally hidden for clean Detail View */}
      {!hideBrackets && (
        <>
          <div className="absolute top-12 left-12 w-20 h-20 border-l border-t border-white/10" />
          <div className="absolute top-12 right-12 w-20 h-20 border-r border-t border-white/10" />
          <div className="absolute bottom-12 left-12 w-20 h-20 border-l border-b border-white/10" />
          <div className="absolute bottom-12 right-12 w-20 h-20 border-r border-b border-white/10" />
        </>
      )}

      {nodes.map((node, i) => (
        <div 
          key={i}
          className="absolute rounded-full opacity-30 animate-pulse"
          style={{
            top: node.top,
            left: node.left,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: accent,
            animationDelay: `${node.delay}s`,
            boxShadow: `0 0 8px ${accent}`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeSubView, setActiveSubView] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [viewportScale, setViewportScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const containerRef = useRef(null);
  const kineticGridRef = useRef(null);
  const worldRef = useRef({ 
    targetX: 0, targetY: 0, 
    currentX: 0, currentY: 0,
    mouseTargetX: 0, mouseTargetY: 0,
    mouseCurrentX: 0, mouseCurrentY: 0 
  });
  const scrollCooldown = useRef(false);
  const requestRef = useRef();

  // Escape Key Functionality
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSubView) {
        setActiveSubView(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSubView]);

  const handleResize = useCallback(() => {
    const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 900, 1);
    setViewportScale(Math.max(scale, 0.7));
  }, []);

  const goToScene = useCallback((index) => {
    if (index >= 0 && index < SCENES.length) {
      setCurrentIdx(index);
      setActiveSubView(null);
      setFormStatus('idle');
      worldRef.current.targetX = SCENES[index].x;
      worldRef.current.targetY = SCENES[index].y;
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    await new Promise(r => setTimeout(r, 2000));
    setFormStatus('success');
  };

  const animate = useCallback(() => {
    const w = worldRef.current;
    w.currentX += (w.targetX - w.currentX) * 0.08;
    w.currentY += (w.targetY - w.currentY) * 0.08;
    w.mouseCurrentX += (w.mouseTargetX - w.mouseCurrentX) * 0.06;
    w.mouseCurrentY += (w.mouseTargetY - w.mouseCurrentY) * 0.06;

    setMousePos({ x: w.mouseCurrentX, y: w.mouseCurrentY });

    if (containerRef.current) {
      const finalX = -w.currentX + (w.mouseCurrentX * 1.5);
      const finalY = -w.currentY + (w.mouseCurrentY * 1.5);
      const rotX = w.mouseCurrentY * 0.4; 
      const rotY = -w.mouseCurrentX * 0.4;
      
      containerRef.current.style.transform = `translate3d(${finalX}vw, ${finalY}vh, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      
      if (kineticGridRef.current) {
        const gridX = finalX * 0.4;
        const gridY = finalY * 0.4;
        kineticGridRef.current.style.transform = `translate3d(${gridX}vw, ${gridY}vh, 0)`;
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      worldRef.current.mouseTargetX = (e.clientX / window.innerWidth) * 2 - 1;
      worldRef.current.mouseTargetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleWheel = (e) => {
      if (scrollCooldown.current || activeSubView) return;
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0 && currentIdx < SCENES.length - 1) goToScene(currentIdx + 1);
      else if (e.deltaY < 0 && currentIdx > 0) goToScene(currentIdx - 1);

      scrollCooldown.current = true;
      setTimeout(() => { scrollCooldown.current = false; }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIdx, goToScene, animate, handleResize, activeSubView]);

  const currentScene = SCENES[currentIdx];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020203] text-white select-none font-neue" style={{ perspective: `${1200 / viewportScale}px` }}>
      
      {/* Texture & Grain */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-screen bg-repeat bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Persistent Background Grid */}
      <div ref={kineticGridRef} className="absolute inset-0 pointer-events-none z-0 will-change-transform transform-gpu">
        <div className="absolute inset-[-150%]">
            <div className="absolute inset-0 opacity-[0.05] transition-colors duration-[1500ms]"
              style={{ 
                backgroundImage: `linear-gradient(${currentScene.accent} 1px, transparent 1px), linear-gradient(90deg, ${currentScene.accent} 1px, transparent 1px)`,
                backgroundSize: `80px 80px`
              }} 
            />
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.5)_60%,#020203_100%)]" />

      {/* Navigator: Precision Hit-Areas */}
      <div className={`fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end transition-all duration-700 ${activeSubView ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100'}`}>
        {SCENES.map((s, i) => (
          <button 
            key={i} 
            onClick={() => goToScene(i)} 
            className="flex items-center justify-end h-8 group relative cursor-pointer pointer-events-auto outline-none"
          >
            <span className={`mr-6 text-[9px] tracking-[0.4em] uppercase font-black transition-all duration-500 whitespace-nowrap
              ${currentIdx === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'}`}
              style={{ color: currentIdx === i ? currentScene.accent : 'white' }}
            >
              {Array.isArray(s.title) ? s.title[0] : s.title}
            </span>
            <div className="w-[2px] transition-all duration-700"
              style={{ 
                height: currentIdx === i ? '32px' : '4px',
                backgroundColor: currentIdx === i ? currentScene.accent : 'rgba(255,255,255,0.3)',
                boxShadow: currentIdx === i ? `0 0 15px ${currentScene.accent}` : 'none'
              }}
            />
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div ref={containerRef} className="absolute inset-0 will-change-transform transform-gpu z-10" style={{ transformStyle: 'preserve-3d' }}>
        {SCENES.map((scene, idx) => {
          const isCurrent = currentIdx === idx;
          const hasContent = scene.items || scene.team || scene.id === 'DIALOGUE';
          
          return (
            <div key={scene.id} className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-[1300ms] cubic-bezier(0.16, 1, 0.3, 1)"
              style={{ 
                left: `${scene.x}vw`, top: `${scene.y}vh`, width: '100vw', height: '100vh',
                opacity: isCurrent ? 1 : 0,
                filter: isCurrent ? 'blur(0px)' : 'blur(40px)',
                transform: isCurrent ? `scale(${viewportScale}) translateZ(0)` : `scale(${viewportScale * 0.8}) translateZ(-300px)`,
                pointerEvents: isCurrent ? 'auto' : 'none',
                zIndex: isCurrent ? 20 : 10
              }}
            >
              {/* Peripheral nodes - Brackets removed during Active View */}
              <PeripheralDetails accent={scene.accent} hideBrackets={!!activeSubView} />
              
              <div className="absolute w-[140vw] h-[140vw] max-w-[1500px] blur-[220px] opacity-[0.07] rounded-full pointer-events-none transition-all duration-[2000ms]"
                style={{ backgroundColor: scene.accent, transform: isCurrent ? 'scale(1)' : 'scale(0.5)' }}
              />

              {/* INTEGRATED CONTENT AREA */}
              <div className="relative z-20 max-w-7xl w-full px-8 md:px-12 h-full flex items-center justify-center">
                
                {/* 1. Overview View */}
                <div className={`flex flex-col items-center text-center transition-all duration-700 ${activeSubView ? 'opacity-0 scale-90 blur-xl pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}>
                  <div className="mb-8 pt-10">
                    {Array.isArray(scene.title) ? (
                      scene.title.map((line, i) => (
                        <h1 key={i} className="text-4xl md:text-5xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.85] animate-in" 
                            style={{ fontSize: `clamp(2.5rem, 8vw * ${viewportScale}, 5.5rem)`, animationDelay: `${i * 0.15}s` }}>
                          {line}
                        </h1>
                      ))
                    ) : (
                      <h1 className="text-4xl md:text-5xl lg:text-[5.5rem] font-bold tracking-tight leading-none"
                          style={{ fontSize: `clamp(2.5rem, 8vw * ${viewportScale}, 5.5rem)` }}>
                        {scene.title}
                      </h1>
                    )}
                  </div>
                  
                  <h2 className="text-[11px] font-black tracking-[0.5em] uppercase opacity-70 mb-2" style={{ color: scene.accent }}>
                    {scene.subtitle}
                  </h2>

                  {scene.description && (
                    <div className="mt-4 flex flex-col items-center">
                      {Array.isArray(scene.description) ? (
                        scene.description.map((line, i) => (
                          <p key={i} className="text-base md:text-lg opacity-40 max-w-2xl leading-relaxed font-normal italic">
                            {line}
                          </p>
                        ))
                      ) : (
                        <p className="text-base md:text-lg opacity-40 max-w-2xl leading-relaxed font-normal italic">
                          {scene.description}
                        </p>
                      )}
                    </div>
                  )}

                  <div className={`${hasContent ? 'mt-16 min-h-[220px]' : 'mt-2 min-h-0'} w-full flex justify-center items-center`}>
                    {scene.items && (
                      <div className="flex flex-wrap justify-center gap-6 md:gap-14 max-w-6xl">
                        {scene.items.map((item, i) => (
                          <div key={i} onClick={() => setActiveSubView(item.details)}
                            className="flex flex-col items-center gap-5 group w-[170px] md:w-[210px] cursor-pointer"
                          >
                            <div className="p-11 rounded-[2.8rem] bg-white/[0.03] border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:border-white/30 transition-all duration-500 transform group-hover:-translate-y-3 relative overflow-hidden shadow-2xl">
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: scene.accent }} />
                              <div className="relative z-10 opacity-50 group-hover:opacity-100 transition-all duration-500" style={{ color: scene.accent }}>
                                {item.icon}
                              </div>
                            </div>
                            <span className="text-[14px] uppercase tracking-[0.3em] font-black text-white/50 transition-all group-hover:text-white group-hover:opacity-100">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {scene.team && (
                      <div className="flex flex-wrap justify-center gap-8">
                        {scene.team.map((member, i) => (
                          <div key={i} className="flex flex-col items-center gap-4 group p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/[0.06] w-80 hover:bg-white/[0.04] transition-all relative">
                               <div className="text-center">
                                <div className="text-[20px] font-bold tracking-tight mb-1">{member.name}</div>
                                <div className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-4" style={{ color: scene.accent }}>{member.role}</div>
                                <div className="text-[10px] tracking-[0.1em] opacity-20 uppercase font-medium">{member.social}</div>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {scene.id === 'DIALOGUE' && (
                      <div className="w-full max-w-xl animate-in">
                        {formStatus === 'success' ? (
                          <div className="py-20 flex flex-col items-center gap-6">
                             <div className="w-24 h-24 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center text-green-500"><Check size={40} /></div>
                             <h4 className="text-3xl font-bold tracking-tight uppercase">Transmission Sent</h4>
                          </div>
                        ) : (
                          <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 text-left">
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 ml-2 font-bold">Name</label>
                                <input required type="text" placeholder="Your Name" className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-white/30 transition-all text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                              </div>
                              <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 ml-2 font-bold">Email</label>
                                <input required type="email" placeholder="email@address.com" className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-white/30 transition-all text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 mt-4">
                               <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 ml-2 font-bold">Message</label>
                               <textarea required rows={4} placeholder="Describe your vision..." className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] px-8 py-7 outline-none focus:border-white/30 transition-all text-sm resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                            </div>
                            <button disabled={formStatus === 'sending'} type="submit" className="group relative flex items-center justify-center gap-4 py-7 bg-white/[0.04] border border-white/10 rounded-full hover:bg-white/[0.08] transition-all cursor-pointer disabled:opacity-50 mt-6">
                              <span className="uppercase text-[12px] tracking-[0.6em] font-black opacity-40 group-hover:opacity-100">Initiate Transfer</span>
                              <Send size={18} style={{ color: scene.accent }} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-16 flex items-center gap-8 relative z-50">
                    {idx > 0 && (
                      <button onClick={() => goToScene(idx - 1)} className="group p-6 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/30 transition-all active:scale-90 cursor-pointer pointer-events-auto">
                        <ArrowLeft size={18} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                    {!scene.isFinal && (
                      <button onClick={() => goToScene(idx + 1)} className="group flex items-center gap-16 px-16 py-7 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/30 transition-all cursor-pointer pointer-events-auto active:scale-95 shadow-lg">
                        <span className="uppercase text-[12px] tracking-[0.6em] font-black opacity-30 group-hover:opacity-100 transition-opacity">{scene.buttonLabel || scene.next}</span>
                        <ArrowRight size={20} style={{ color: scene.accent }} className="group-hover:translate-x-4 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Detail View Layout */}
                {activeSubView && (
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 animate-in pointer-events-auto">
                    
                    <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start text-left">
                      
                      {/* Left: Detail Content */}
                      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <button 
                          onClick={() => setActiveSubView(null)}
                          className="mb-10 flex items-center gap-4 px-8 py-4 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/[0.08] transition-all text-[10px] tracking-[0.4em] uppercase font-black cursor-pointer group"
                        >
                          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Overview
                        </button>
                        
                        <h3 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">{activeSubView.title}</h3>
                        <div className="w-20 h-1 mb-10 opacity-40" style={{ backgroundColor: currentScene.accent }} />
                        <p className="text-xl md:text-3xl font-medium tracking-tight mb-8 opacity-90 leading-tight">{activeSubView.desc}</p>
                        <p className="text-sm md:text-lg tracking-wide opacity-40 font-normal leading-relaxed italic border-l-2 border-white/5 pl-8">{activeSubView.subDesc}</p>
                      </div>
                      
                      {/* Right: Technical Specs */}
                      <div className="w-full md:w-[450px] flex flex-col gap-4 pt-4 md:pt-28">
                        <div className="text-[10px] tracking-[0.4em] uppercase font-black mb-2 opacity-20 ml-2">Specifications</div>
                        {activeSubView.points.map((point, i) => (
                          <div key={i} className="px-10 py-7 rounded-[2.2rem] bg-white/[0.02] border border-white/[0.06] flex items-center gap-8 group hover:bg-white/[0.04] transition-all cursor-default">
                             <div className="w-2 h-2 rounded-full shadow-[0_0_15px_currentColor] animate-pulse" style={{ backgroundColor: currentScene.accent, color: currentScene.accent }} />
                             <span className="text-[14px] tracking-[0.1em] uppercase font-black opacity-30 group-hover:opacity-100 transition-opacity">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* Global Branding Interface */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50 flex items-center gap-6 pointer-events-none">
        <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-xl bg-black/50 backdrop-blur-xl">
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: currentScene.accent, boxShadow: `0 0 20px ${currentScene.accent}` }} />
        </div>
        <div className="hidden sm:block">
          <div className="text-[15px] tracking-[0.5em] font-black uppercase opacity-90 leading-none">Idiate</div>
          <div className="text-[9px] tracking-[0.2em] opacity-30 uppercase font-black mt-1.5">v21.0 system</div>
        </div>
      </div>

      {/* Socials */}
      <div className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50 flex items-center gap-10 opacity-20 hover:opacity-100 transition-opacity">
         <div className="flex gap-10 items-center">
            <Instagram size={18} className="cursor-pointer hover:opacity-50 transition-all pointer-events-auto" />
            <Linkedin size={18} className="cursor-pointer hover:opacity-50 transition-all pointer-events-auto" />
            <Github size={18} className="cursor-pointer hover:opacity-50 transition-all pointer-events-auto" />
         </div>
      </div>

      <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 flex items-center gap-6 text-[9px] tracking-[0.5em] font-black opacity-20 transition-opacity hover:opacity-80">
        <button onClick={() => setIsMuted(!isMuted)} className="cursor-pointer pointer-events-auto">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} style={{ color: currentScene.accent }} />}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
        .font-neue { font-family: 'PP Neue Montreal', 'Inter', sans-serif; }

        @keyframes fadeInZoom { 
          from { opacity: 0; transform: scale(0.96); filter: blur(30px); } 
          to { opacity: 1; transform: scale(1); filter: blur(0px); } 
        }
        .animate-in { animation: fadeInZoom 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        input::placeholder, textarea::placeholder { opacity: 0.1; }
      `}</style>
    </div>
  );
}