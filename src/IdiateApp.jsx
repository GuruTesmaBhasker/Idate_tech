import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Cpu, LineChart, Zap, Layers, Network, Layout, Target, 
  ArrowRight, ArrowLeft, Mail, Globe, Users, Share2, Rocket, Palette, 
  Linkedin, Instagram, Github, MapPin, ChevronLeft, Check, Send, X, Terminal, Menu
} from 'lucide-react';

/**
 * IDATE TECH - V23.1 (UX & SPACING OPTIMIZATION)
 * Changes:
 * 1. Contact Spacing: Optimized "TALK TO US" layout for better reachability and visual flow.
 * 2. Branding: Simplified to "Idate Tech" (No version, no logo icons).
 * 3. Hero Copy: Lengthy PC copy ("WE DON'T CHASE TRENDS. WE BUILD SYSTEM.").
 * 4. Navigation: Standardized labels (HOME, CORE, etc.) for both nav bars.
 */

const SCENES = [
  { 
    id: 'HERO', 
    navLabel: 'HOME',
    title: ["WE DON'T CHASE TRENDS.", "WE BUILD SYSTEM."], 
    subtitle: 'DESIGN. DATA. INTELLIGENCE.', 
    description: 'Built with intent, not noise.', 
    accent: '#3b82f6', 
    x: 0, 
    y: 0, 
    buttonLabel: '→ Start Building',
    next: 'The Core' 
  },
  { 
    id: 'CAPABILITIES', 
    navLabel: 'CORE',
    title: 'THE CORE', 
    subtitle: 'SIMPLE GOALS. COMPLEX EXECUTION.', 
    description: '', 
    accent: '#6366f1', 
    items: [
      { 
        id: 'web-dev',
        icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'Web Design',
        details: {
          title: 'WEB ENGINEERING',
          desc: 'Websites shouldn’t just exist. They should work.',
          subDesc: 'We design and build websites that load fast, think clearly, and guide users without shouting.',
          points: ['UI/UX focused', 'Performance builds', 'Business-first', 'Responsive clarity']
        }
      },
      { 
        id: 'data-analytics',
        icon: <LineChart className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'Data Science',
        details: {
          title: 'DATA ANALYTICS',
          desc: 'Data is useless until it answers questions.',
          subDesc: 'We turn scattered data into decisions you can actually act on.',
          points: ['Interactive Dashboards', 'Actionable Insights', 'Operational Clarity', 'Data Cleaning']
        }
      },
      { 
        id: 'ai-dev',
        icon: <Cpu className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'AI Models',
        details: {
          title: 'AI ENGINEERING',
          desc: 'AI is not magic. It’s engineering.',
          subDesc: 'Custom AI tools, RAG systems, and fine-tuned models built for real business use.',
          points: ['RAG Architectures', 'Model Fine-tuning', 'Workflows', 'Scalability']
        }
      },
      { 
        id: 'brand-design',
        icon: <Palette className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'Branding',
        details: {
          title: 'VISUAL SYSTEMS',
          desc: 'Design is how people remember you.',
          subDesc: 'Packaging, banners, and brand visuals designed to feel intentional.',
          points: ['Brand Identity', 'Visual Systems', 'Template Design', 'Aesthetic']
        }
      }
    ], 
    x: 100, 
    y: 0, 
    next: 'Traction' 
  },
  { 
    id: 'GROWTH', 
    navLabel: 'TRACTION',
    title: 'TRACTION', 
    subtitle: 'EARNED ATTENTION.', 
    description: ['Ideas don’t fail. Execution does.', 'Moving from vision to market traction.'], 
    accent: '#06b6d4', 
    items: [
      { 
        id: 'smo',
        icon: <Share2 className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'Growth',
        details: {
          title: 'GROWTH SYSTEMS',
          desc: 'Steady growth over temporary noise.',
          subDesc: 'We optimize presence and campaigns to grow brands steadily.',
          points: ['Strategic Growth', 'Presence', 'Consistency', 'Tracking']
        }
      },
      { 
        id: 'startup-sol',
        icon: <Rocket className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'Startups',
        details: {
          title: 'EXECUTION ENGINE',
          desc: 'Execution is the differentiator.',
          subDesc: 'From pitch decks to automated flows — we help startups scale.',
          points: ['Pitch Decks', 'Automation', 'Email Infra', 'Lead Funnels']
        }
      }
    ],
    x: 100, 
    y: 100, 
    next: 'Horizon' 
  },
  { 
    id: 'HORIZON', 
    navLabel: 'HORIZON',
    title: 'HORIZON', 
    subtitle: 'THE PHYSICAL DIGITAL.', 
    description: 'Expanding into PLC automation and smart systems — connecting software with the physical world.', 
    accent: '#8b5cf6', 
    items: [
      { 
        id: 'plc-auto',
        icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />, 
        label: 'PLC Auto',
        details: {
          title: 'HARDWARE LOGIC',
          desc: 'Physical engineering meets digital precision.',
          points: ['PLC Programming', 'Industrial HMI', 'Telemetry', 'Machine Logic']
        }
      },
      { 
        id: 'smart-int',
        icon: <Network className="w-6 h-6 md:w-8 md:h-8" />, 
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
    next: 'About' 
  },
  { 
    id: 'ABOUT', 
    navLabel: 'ABOUT',
    title: 'WHO WE ARE', 
    subtitle: 'SMALL TEAM. BIG FOCUS.', 
    description: 'We believe good systems stay invisible and work quietly. We work with people who care about how things are built.', 
    accent: '#f59e0b', 
    team: [
      { name: 'John Doe', role: 'Founder / Dev', social: 'Designers. Developers.' },
      { name: 'Jane Doe', role: 'AI Specialist', social: 'Data. Insights.' }
    ],
    x: -100, 
    y: 0, 
    next: 'Contact' 
  },
  { 
    id: 'DIALOGUE', 
    navLabel: 'CONTACT',
    title: 'TALK TO US', 
    subtitle: 'READY TO START?', 
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
  const nodes = useMemo(() => [...Array(10)].map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {!hideBrackets && (
        <>
          <div className="absolute top-6 left-6 md:top-12 md:left-12 w-10 h-10 md:w-20 md:h-20 border-l border-t border-white/10" />
          <div className="absolute top-6 right-6 md:top-12 md:right-12 w-10 h-10 md:w-20 md:h-20 border-r border-t border-white/10" />
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-10 h-10 md:w-20 md:h-20 border-l border-b border-white/10" />
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-10 h-10 md:w-20 md:h-20 border-r border-b border-white/10" />
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
  const [viewportScale, setViewportScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const containerRef = useRef(null);
  const kineticGridRef = useRef(null);
  const touchStart = useRef(null);
  const worldRef = useRef({ 
    targetX: 0, targetY: 0, 
    currentX: 0, currentY: 0,
    mouseTargetX: 0, mouseTargetY: 0,
    mouseCurrentX: 0, mouseCurrentY: 0 
  });
  const scrollCooldown = useRef(false);
  const requestRef = useRef();

  // Escape Key / Back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSubView) setActiveSubView(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSubView]);

  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const scale = isMobile 
      ? Math.min(window.innerWidth / 375, window.innerHeight / 667, 1)
      : Math.min(window.innerWidth / 1440, window.innerHeight / 900, 1);
    setViewportScale(Math.max(scale, isMobile ? 0.95 : 0.7));
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
    await new Promise(r => setTimeout(r, 1500));
    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' });
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
        kineticGridRef.current.style.transform = `translate3d(${finalX * 0.4}vw, ${finalY * 0.4}vh, 0)`;
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
      if (Math.abs(e.deltaY) < 40) return;
      if (e.deltaY > 0 && currentIdx < SCENES.length - 1) goToScene(currentIdx + 1);
      else if (e.deltaY < 0 && currentIdx > 0) goToScene(currentIdx - 1);
      scrollCooldown.current = true;
      setTimeout(() => { scrollCooldown.current = false; }, 1200);
    };

    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!touchStart.current || activeSubView) return;
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIdx < SCENES.length - 1) goToScene(currentIdx + 1);
        else if (diff < 0 && currentIdx > 0) goToScene(currentIdx - 1);
      }
      touchStart.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIdx, goToScene, animate, handleResize, activeSubView]);

  const currentScene = SCENES[currentIdx];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020203] text-white select-none font-neue flex flex-col" style={{ perspective: `1200px` }}>
      
      {/* Noise Grain */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-screen bg-repeat bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Background Grid */}
      <div ref={kineticGridRef} className="absolute inset-0 pointer-events-none z-0 will-change-transform transform-gpu">
        <div className="absolute inset-[-150%]">
            <div className="absolute inset-0 opacity-[0.05] transition-colors duration-[1500ms]"
              style={{ 
                backgroundImage: `linear-gradient(${currentScene.accent} 1px, transparent 1px), linear-gradient(90deg, ${currentScene.accent} 1px, transparent 1px)`,
                backgroundSize: `clamp(40px, 10vw, 80px) clamp(40px, 10vw, 80px)`
              }} 
            />
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.5)_60%,#020203_100%)]" />

      {/* DESKTOP NAV (Right Side) */}
      <div className={`fixed right-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end transition-all duration-700 ${activeSubView ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100'}`}>
        {SCENES.map((s, i) => (
          <button 
            key={i} 
            onClick={() => goToScene(i)} 
            className="flex items-center justify-end h-12 group relative cursor-pointer pointer-events-auto outline-none"
          >
            <span className={`mr-6 text-[9px] tracking-[0.4em] uppercase font-black transition-all duration-500 whitespace-nowrap
              ${currentIdx === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'}`}
              style={{ color: currentIdx === i ? currentScene.accent : 'white' }}
            >
              {s.navLabel}
            </span>
            <div className="w-[2px] transition-all duration-700"
              style={{ 
                height: currentIdx === i ? '24px' : '4px',
                backgroundColor: currentIdx === i ? currentScene.accent : 'rgba(255,255,255,0.2)',
                boxShadow: currentIdx === i ? `0 0 10px ${currentScene.accent}` : 'none'
              }}
            />
          </button>
        ))}
      </div>

      {/* MOBILE NAV (Bottom Center) */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex md:hidden items-center gap-1 px-2 py-2 bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-3xl transition-all duration-700 ${activeSubView ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
        {SCENES.map((s, i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            className="relative h-10 px-3 flex items-center justify-center transition-all"
          >
            <div 
              className="h-1 rounded-full transition-all duration-500"
              style={{ 
                width: currentIdx === i ? '28px' : '4px',
                backgroundColor: currentIdx === i ? currentScene.accent : 'rgba(255,255,255,0.2)',
                boxShadow: currentIdx === i ? `0 0 10px ${currentScene.accent}` : 'none'
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
                transform: isCurrent ? `scale(${viewportScale})` : `scale(${viewportScale * 0.8})`,
                pointerEvents: isCurrent ? 'auto' : 'none',
                zIndex: isCurrent ? 20 : 10
              }}
            >
              <PeripheralDetails accent={scene.accent} hideBrackets={!!activeSubView} />
              
              <div className="absolute w-[180vw] h-[180vw] max-w-[1500px] blur-[150px] md:blur-[220px] opacity-[0.08] rounded-full pointer-events-none transition-all duration-[2000ms]"
                style={{ backgroundColor: scene.accent, transform: isCurrent ? 'scale(1)' : 'scale(0.5)' }}
              />

              <div className="relative z-20 max-w-7xl w-full px-6 md:px-12 h-full flex items-center justify-center overflow-hidden">
                
                {/* 1. Overview View */}
                <div className={`flex flex-col items-center text-center transition-all duration-700 ${activeSubView ? 'opacity-0 scale-90 blur-xl pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}>
                  <div className="mb-4 md:mb-8 pt-4">
                    {Array.isArray(scene.title) ? (
                      scene.title.map((line, i) => (
                        <h1 key={i} className="text-[1.8rem] sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1] md:leading-[0.85] animate-in" 
                            style={{ fontSize: `clamp(1.5rem, 8.5vw, 5.5rem)`, animationDelay: `${i * 0.1}s` }}>
                          {line}
                        </h1>
                      ))
                    ) : (
                      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[5.5rem] font-bold tracking-tight leading-tight"
                          style={{ fontSize: scene.id === 'DIALOGUE' ? `clamp(1.75rem, 7vw, 5.5rem)` : `clamp(2rem, 9.5vw, 5.5rem)` }}>
                        {scene.title}
                      </h1>
                    )}
                  </div>
                  
                  <h2 className="text-[9px] md:text-[11px] font-black tracking-[0.5em] uppercase opacity-70 mb-2" style={{ color: scene.accent }}>
                    {scene.subtitle}
                  </h2>

                  {scene.description && (
                    <div className="mt-2 flex flex-col items-center px-4">
                      {Array.isArray(scene.description) ? (
                        scene.description.map((line, i) => (
                          <p key={i} className="text-sm md:text-lg opacity-40 max-w-lg leading-relaxed italic">
                            {line}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm md:text-lg opacity-40 max-w-lg leading-relaxed italic">
                          {scene.description}
                        </p>
                      )}
                    </div>
                  )}

                  <div className={`${hasContent ? 'mt-8 md:mt-16 min-h-[120px] md:min-h-[220px]' : 'mt-2 min-h-0'} w-full flex justify-center items-center`}>
                    {scene.items && (
                      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-14 max-w-6xl">
                        {scene.items.map((item, i) => (
                          <div key={i} onClick={() => setActiveSubView(item.details)}
                            className="flex flex-col items-center gap-3 md:gap-5 group w-full max-w-[140px] md:w-[210px] cursor-pointer"
                          >
                            <div className="p-8 md:p-11 rounded-[1.8rem] md:rounded-[2.8rem] bg-white/[0.03] border border-white/[0.06] group-hover:bg-white/[0.06] transition-all duration-500 transform group-hover:-translate-y-2 relative overflow-hidden">
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: scene.accent }} />
                              <div className="relative z-10 opacity-40 group-hover:opacity-100 transition-all duration-500" style={{ color: scene.accent }}>
                                {item.icon}
                              </div>
                            </div>
                            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-black text-white/40 group-hover:text-white">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {scene.team && (
                      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 px-4 w-full">
                        {scene.team.map((member, i) => (
                          <div key={i} className="flex flex-col items-center gap-3 p-6 md:p-12 rounded-[1.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/[0.06] w-full md:w-80 transition-all">
                                <div className="text-center">
                                 <div className="text-lg md:text-[20px] font-bold tracking-tight mb-1">{member.name}</div>
                                 <div className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-50 mb-3" style={{ color: scene.accent }}>{member.role}</div>
                                 <div className="text-[8px] md:text-[10px] tracking-[0.1em] opacity-20 uppercase font-medium">{member.social}</div>
                               </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CONTACT PAGE (TALK TO US) */}
                    {scene.id === 'DIALOGUE' && (
                      <div className="w-full max-w-xl animate-in pt-4">
                        {formStatus === 'success' ? (
                          <div className="py-12 md:py-20 flex flex-col items-center gap-6">
                             <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center text-green-500 transition-all transform scale-110"><Check size={40} /></div>
                             <h4 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">Transmission Sent</h4>
                             <button onClick={() => setFormStatus('idle')} className="text-[9px] tracking-[0.4em] uppercase opacity-30 hover:opacity-100 underline mt-4">New Message</button>
                          </div>
                        ) : (
                          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 md:gap-6 text-left">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                              <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[9px] uppercase tracking-[0.3em] opacity-30 ml-2 font-bold">Name</label>
                                <input required type="text" placeholder="Your Name" className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 outline-none focus:border-white/30 transition-all text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                              </div>
                              <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[9px] uppercase tracking-[0.3em] opacity-30 ml-2 font-bold">Email</label>
                                <input required type="email" placeholder="Email Address" className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 outline-none focus:border-white/30 transition-all text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                               <label className="text-[9px] uppercase tracking-[0.3em] opacity-30 ml-2 font-bold">Message</label>
                               <textarea required rows={4} placeholder="Describe your vision..." className="bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-6 md:py-7 outline-none focus:border-white/30 transition-all text-sm resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                            </div>
                            <button disabled={formStatus === 'sending'} type="submit" className="group relative flex items-center justify-center gap-4 py-6 md:py-7 bg-white/[0.04] border border-white/10 rounded-full hover:bg-white/[0.08] transition-all cursor-pointer disabled:opacity-50 mt-2">
                              <span className="uppercase text-[10px] md:text-[12px] tracking-[0.6em] font-black opacity-40 group-hover:opacity-100 transition-opacity">Initiate Transfer</span>
                              <Send size={18} style={{ color: scene.accent }} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 md:mt-12 flex items-center gap-4 md:gap-8 relative z-50 mb-16">
                    {idx > 0 && (
                      <button onClick={() => goToScene(idx - 1)} className="group p-4 md:p-6 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/30 transition-all pointer-events-auto">
                        <ArrowLeft size={16} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                    {!scene.isFinal && (
                      <button onClick={() => goToScene(idx + 1)} className="group flex items-center gap-6 md:gap-16 px-8 md:px-16 py-4 md:py-7 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/30 transition-all pointer-events-auto active:scale-95 shadow-lg">
                        <span className="uppercase text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.6em] font-black opacity-30 group-hover:opacity-100 transition-opacity">{scene.buttonLabel || scene.next}</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform" style={{ color: scene.accent }} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Detail View Layout - Scrollable for mobile */}
                {activeSubView && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in pointer-events-auto bg-[#020203]/95 backdrop-blur-md overflow-y-auto">
                    <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 md:gap-24 items-center md:items-start text-left py-10">
                      
                      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <button 
                          onClick={() => setActiveSubView(null)}
                          className="mb-6 md:mb-10 flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/[0.08] transition-all text-[9px] tracking-[0.3em] uppercase font-black cursor-pointer group"
                        >
                          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                        
                        <h3 className="text-3xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-8 leading-tight">{activeSubView.title}</h3>
                        <div className="w-12 md:w-20 h-0.5 md:h-1 mb-6 md:mb-10 opacity-40" style={{ backgroundColor: currentScene.accent }} />
                        <p className="text-lg md:text-3xl font-medium tracking-tight mb-4 md:mb-8 opacity-90 leading-tight">{activeSubView.desc}</p>
                        {activeSubView.subDesc && (
                          <p className="text-xs md:text-lg opacity-40 italic border-l-2 border-white/5 pl-4 md:pl-8">{activeSubView.subDesc}</p>
                        )}
                      </div>
                      
                      <div className="w-full md:w-[450px] flex flex-col gap-3 pt-0 md:pt-28 pb-10">
                        <div className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-black mb-1 md:mb-2 opacity-20 ml-2">Specs</div>
                        {activeSubView.points.map((point, i) => (
                          <div key={i} className="px-6 md:px-10 py-4 md:py-7 rounded-2xl md:rounded-[2.2rem] bg-white/[0.02] border border-white/[0.06] flex items-center gap-4 md:gap-8 group">
                             <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentScene.accent }} />
                             <span className="text-[11px] md:text-[14px] tracking-[0.1em] uppercase font-black opacity-30 group-hover:opacity-100 transition-opacity">{point}</span>
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

      {/* Minimalist Branding: Idate Tech (No logo box, no version) */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50 flex flex-col pointer-events-none">
        <div className="text-[14px] md:text-[16px] tracking-[0.5em] font-black uppercase opacity-90 leading-none">
          Idate Tech
        </div>
      </div>

      {/* SOCIAL LINKS: Top-right on mobile, bottom-left on desktop */}
      <div className="fixed top-8 right-8 md:top-auto md:bottom-12 md:left-12 z-[110] flex items-center transition-all duration-700">
         <div className="flex gap-7 md:gap-10 items-center pointer-events-auto opacity-30 hover:opacity-100 transition-opacity">
            <a href="#" className="hover:opacity-60 transition-all transform hover:scale-110"><Instagram size={18} /></a>
            <a href="#" className="hover:opacity-60 transition-all transform hover:scale-110"><Linkedin size={18} /></a>
            <a href="#" className="hover:opacity-60 transition-all transform hover:scale-110"><Github size={18} /></a>
         </div>
      </div>

      <style>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
        .font-neue { font-family: 'PP Neue Montreal', 'Inter', sans-serif; }

        @keyframes fadeInZoom { 
          from { opacity: 0; transform: scale(0.96); filter: blur(20px); } 
          to { opacity: 1; transform: scale(1); filter: blur(0px); } 
        }
        .animate-in { animation: fadeInZoom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        input::placeholder, textarea::placeholder { opacity: 0.15; }
        
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .overflow-y-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}