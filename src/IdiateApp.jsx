import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Cpu, LineChart, Zap, Layers, Network, Layout, Target, 
  ArrowRight, ArrowLeft, Mail, Globe, Users, Share2, Rocket, Palette, 
  Linkedin, Instagram, Github, MapPin, ChevronLeft, Check, Send, X, Terminal, Menu
} from 'lucide-react';

/**
 * IDATE TECH - LUMINOUS EDITION (V8 - Mobile Nav Restore & Scaling)
 * Changes:
 * 1. Mobile Navigator: Restored the bottom-center navigation pills for mobile devices.
 * 2. Mobile Visibility: Fixed the scaling and text appearance for small screens.
 * 3. Sub-View Integration: Seamless blending with no background boxes.
 * 4. Interaction: ESC key to back, and responsive scaling for 100% zoom.
 */

const isMobileDevice = () => {
  return typeof window !== 'undefined' && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768);
};

const SCENES = [
  { 
    id: 'HERO', 
    navLabel: 'HOME',
    title: ["WE DON'T CHASE TRENDS.", "WE BUILD SYSTEMS."], 
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
    accent: '#8b5cf6', 
    items: [
      { 
        id: 'web-dev',
        icon: <Globe className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'Web Design',
        details: {
          title: 'WEB ENGINEERING',
          desc: 'Websites shouldn’t just exist. They should work.',
          subDesc: 'High-performance digital engines built with surgical precision.',
          points: ['UI/UX focused', 'Performance builds', 'Business-first', 'Responsive clarity']
        }
      },
      { 
        id: 'data-analytics',
        icon: <LineChart className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'Data Science',
        details: {
          title: 'DATA ANALYTICS',
          desc: 'Data is useless until it answers questions.',
          subDesc: 'We turn scattered data into actionable intelligence.',
          points: ['Interactive Dashboards', 'Actionable Insights', 'Operational Clarity', 'Data Cleaning']
        }
      },
      { 
        id: 'ai-dev',
        icon: <Cpu className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'AI Models',
        details: {
          title: 'AI ENGINEERING',
          desc: 'AI is not magic. It’s engineering.',
          subDesc: 'Custom RAG systems and LLM fine-tuning for real-world utility.',
          points: ['RAG Architectures', 'Model Fine-tuning', 'Workflows', 'Scalability']
        }
      },
      { 
        id: 'brand-design',
        icon: <Palette className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'Branding',
        details: {
          title: 'VISUAL SYSTEMS',
          desc: 'Design is how people remember you.',
          subDesc: 'Intentional aesthetics that define market presence.',
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
        icon: <Share2 className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'Growth',
        details: {
          title: 'GROWTH SYSTEMS',
          desc: 'Steady growth over temporary noise.',
          points: ['Strategic Growth', 'Presence', 'Consistency', 'Tracking']
        }
      },
      { 
        id: 'startup-sol',
        icon: <Rocket className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'Startups',
        details: {
          title: 'EXECUTION ENGINE',
          desc: 'From pitch decks to automated flows.',
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
    description: 'Hardware logic meets digital precision.', 
    accent: '#f43f5e', 
    items: [
      { 
        id: 'plc-auto',
        icon: <Zap className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'PLC Auto',
        details: {
          title: 'HARDWARE LOGIC',
          desc: 'Physical engineering meets digital precision.',
          points: ['PLC Programming', 'Industrial HMI', 'Telemetry', 'Machine Logic']
        }
      },
      { 
        id: 'smart-int',
        icon: <Network className="w-5 h-5 md:w-8 md:h-8" />, 
        label: 'Smart Systems',
        details: {
          title: 'INTELLIGENT ENVIRONMENTS',
          desc: 'Connecting software with the physical world.',
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
    accent: '#f59e0b', 
    team: [
      { name: 'System Architect', role: 'Engineering Lead', social: 'Designers. Developers.' },
      { name: 'AI Lead', role: 'Intelligence Specialist', social: 'Data. Insights.' }
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
    accent: '#3b82f6', 
    buttonLabel: '→ Transmission Complete',
    x: 0, 
    y: 0, 
    isFinal: true 
  }
];

const PeripheralDetails = ({ accent, hideBrackets }) => {
  const nodes = useMemo(() => [...Array(15)].map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {!hideBrackets && (
        <>
          <div className="absolute top-4 left-4 md:top-10 md:left-10 w-8 h-8 md:w-16 md:h-16 border-l border-t border-white/40" />
          <div className="absolute top-4 right-4 md:top-10 md:right-10 w-8 h-8 md:w-16 md:h-16 border-r border-t border-white/40" />
          <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-8 h-8 md:w-16 md:h-16 border-l border-b border-white/40" />
          <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-8 h-8 md:w-16 md:h-16 border-r border-b border-white/40" />
        </>
      )}

      {nodes.map((node, i) => (
        <div 
          key={i}
          className="absolute rounded-full opacity-60 animate-pulse"
          style={{
            top: node.top,
            left: node.left,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: accent,
            animationDelay: `${node.delay}s`,
            boxShadow: `0 0 10px ${accent}`
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
  const [formStatus, setFormStatus] = useState('idle');

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

  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const targetW = isMobile ? 380 : 1440;
    const targetH = isMobile ? 660 : 900;
    const scaleW = window.innerWidth / targetW;
    const scaleH = window.innerHeight / targetH;
    let scale = Math.min(scaleW, scaleH);
    setViewportScale(Math.max(scale, isMobile ? 0.85 : 0.6));
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

  const handleBack = useCallback(() => setActiveSubView(null), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && activeSubView) {
        handleBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSubView, handleBack]);

  const animate = useCallback(() => {
    const w = worldRef.current;
    w.currentX += (w.targetX - w.currentX) * 0.08;
    w.currentY += (w.targetY - w.currentY) * 0.08;
    w.mouseCurrentX += (w.mouseTargetX - w.mouseCurrentX) * 0.06;
    w.mouseCurrentY += (w.mouseTargetY - w.mouseCurrentY) * 0.06;

    if (containerRef.current) {
      const finalX = -w.currentX + (w.mouseCurrentX * 1.2);
      const finalY = -w.currentY + (w.mouseCurrentY * 1.2);
      const rotX = w.mouseCurrentY * 0.3; 
      const rotY = -w.mouseCurrentX * 0.3;
      
      containerRef.current.style.transform = `translate3d(${finalX}vw, ${finalY}vh, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      
      if (kineticGridRef.current) {
        kineticGridRef.current.style.transform = `translate3d(${finalX * 0.3}vw, ${finalY * 0.3}vh, 0)`;
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
      if (isMobileDevice() || scrollCooldown.current || activeSubView) return;
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
    <div className="fixed inset-0 overflow-hidden bg-[#020203] text-white select-none font-neue flex flex-col" style={{ perspective: `1200px` }}>
      
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.05] mix-blend-overlay bg-repeat bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div ref={kineticGridRef} className="absolute inset-0 pointer-events-none z-0 will-change-transform transform-gpu">
        <div className="absolute inset-[-150%]">
            <div className="absolute inset-0 opacity-[0.2] transition-colors duration-[1500ms]"
              style={{ 
                backgroundImage: `linear-gradient(${currentScene.accent} 1px, transparent 1px), linear-gradient(90deg, ${currentScene.accent} 1px, transparent 1px)`,
                backgroundSize: `80px 80px`
              }} 
            />
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.4)_50%,#020203_100%)]" />

      {/* DESKTOP NAV */}
      <div className={`fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end transition-all duration-700 ${activeSubView ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100'}`}>
        {SCENES.map((s, i) => (
          <button key={i} onClick={() => goToScene(i)} className="flex items-center justify-end h-10 group relative cursor-pointer pointer-events-auto outline-none">
            <span className={`mr-4 text-[9px] tracking-[0.4em] uppercase font-black transition-all duration-500 whitespace-nowrap
              ${currentIdx === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'}`}
              style={{ color: currentIdx === i ? currentScene.accent : 'white' }}
            >
              {s.navLabel}
            </span>
            <div className="w-[2px] transition-all duration-700"
              style={{ 
                height: currentIdx === i ? '20px' : '4px',
                backgroundColor: currentIdx === i ? currentScene.accent : 'rgba(255,255,255,0.2)'
              }}
            />
          </button>
        ))}
      </div>

      {/* MOBILE NAV (Bottom Center) - RESTORED */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex md:hidden items-center gap-1 px-3 py-2 bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-3xl transition-all duration-700 ${activeSubView ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
        {SCENES.map((s, i) => (
          <button key={i} onClick={() => goToScene(i)} className="relative h-10 px-3 flex items-center justify-center transition-all">
            <div className="h-1 rounded-full transition-all duration-500"
              style={{ 
                width: currentIdx === i ? '28px' : '4px',
                backgroundColor: currentIdx === i ? currentScene.accent : 'rgba(255,255,255,0.2)',
                boxShadow: currentIdx === i ? `0 0 10px ${currentScene.accent}` : 'none'
              }}
            />
          </button>
        ))}
      </div>

      <div ref={containerRef} className="absolute inset-0 will-change-transform transform-gpu z-10" style={{ transformStyle: 'preserve-3d' }}>
        {SCENES.map((scene, idx) => {
          const isCurrent = currentIdx === idx;
          const hasContent = scene.items || scene.team || scene.id === 'DIALOGUE';
          
          return (
            <div key={scene.id} className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-[1300ms] cubic-bezier(0.16, 1, 0.3, 1) px-4 md:px-6"
              style={{ 
                left: `${scene.x}vw`, top: `${scene.y}vh`, width: '100vw', height: '100vh',
                opacity: isCurrent ? 1 : 0,
                transform: isCurrent ? `scale(${viewportScale})` : `scale(${viewportScale * 0.85})`,
                pointerEvents: isCurrent ? 'auto' : 'none',
                zIndex: isCurrent ? 20 : 10
              }}
            >
              <PeripheralDetails accent={scene.accent} hideBrackets={!!activeSubView} />
              
              <div className="absolute w-[180vw] h-[180vw] max-w-[1500px] blur-[150px] opacity-[0.4] rounded-full pointer-events-none transition-all duration-[2000ms]"
                style={{ backgroundColor: scene.accent, transform: isCurrent ? 'scale(1)' : 'scale(0.5)' }}
              />

              <div className="relative z-20 max-w-6xl w-full flex flex-col items-center justify-center overflow-hidden py-12 md:py-20">
                
                {/* 1. OVERVIEW VIEW */}
                <div className={`flex flex-col items-center text-center transition-all duration-700 ease-in-out ${activeSubView ? 'opacity-0 scale-95 translate-y-10 blur-2xl pointer-events-none' : 'opacity-100 scale-100 translate-y-0 blur-0'}`}>
                  <div className="mb-4 md:mb-6 px-4">
                    {Array.isArray(scene.title) ? (
                      scene.title.map((line, i) => (
                        <h1 key={i} className="text-[1.8rem] sm:text-4xl md:text-5xl lg:text-[5rem] font-black tracking-tight leading-[1.05] md:leading-[0.9]">
                          {line}
                        </h1>
                      ))
                    ) : (
                      <h1 className="text-3xl md:text-5xl lg:text-[5.5rem] font-black tracking-tighter leading-tight">
                        {scene.title}
                      </h1>
                    )}
                  </div>
                  
                  <h2 className="text-[9px] md:text-[11px] font-black tracking-[0.5em] uppercase mb-3" style={{ color: scene.accent }}>
                    {scene.subtitle}
                  </h2>

                  {scene.description && (
                    <div className="mt-2 flex flex-col items-center px-4 max-w-xl">
                        <p className="text-sm md:text-lg opacity-60 leading-relaxed font-medium">
                          {Array.isArray(scene.description) ? scene.description.join(' ') : scene.description}
                        </p>
                    </div>
                  )}

                  <div className={`${hasContent ? 'mt-8 md:mt-12 min-h-[120px] md:min-h-[220px]' : 'mt-2 min-h-0'} w-full flex justify-center items-center`}>
                    {scene.items && (
                      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-10 max-w-5xl px-4">
                        {scene.items.map((item, i) => (
                          <div key={i} onClick={() => setActiveSubView(item.details)}
                            className="flex flex-col items-center gap-3 group w-full max-w-[130px] md:w-[180px] cursor-pointer"
                          >
                            <div className="p-7 md:p-10 rounded-[2rem] md:rounded-[2.8rem] bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.07] transition-all duration-500 transform group-hover:-translate-y-2 relative overflow-hidden">
                              <div className="relative z-10 opacity-50 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110" style={{ color: scene.accent }}>
                                {item.icon}
                              </div>
                            </div>
                            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-black text-white/30 group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {scene.team && (
                      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 px-6 w-full">
                        {scene.team.map((member, i) => (
                          <div key={i} className="flex flex-col items-center gap-3 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/[0.08] w-full md:w-80">
                                 <div className="text-lg md:text-xl font-black tracking-tight mb-1 text-center">{member.name}</div>
                                 <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-center" style={{ color: scene.accent }}>{member.role}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {scene.id === 'DIALOGUE' && (
                      <div className="w-full max-w-xl animate-in pt-0 px-4">
                        <form className="flex flex-col gap-4 text-left" onSubmit={(e) => { e.preventDefault(); setFormStatus('success'); }}>
                          <div className="flex flex-col md:flex-row gap-4">
                            <input required type="text" placeholder="Identity" className="flex-1 bg-white/[0.03] border border-white/20 rounded-xl px-6 py-4 outline-none focus:border-white/40 transition-all text-sm" />
                            <input required type="email" placeholder="Gateway" className="flex-1 bg-white/[0.03] border border-white/20 rounded-xl px-6 py-4 outline-none focus:border-white/40 transition-all text-sm" />
                          </div>
                          <textarea required rows={3} placeholder="Transmission details..." className="bg-white/[0.03] border border-white/20 rounded-2xl px-6 py-5 outline-none focus:border-white/40 transition-all text-sm resize-none" />
                          <button type="submit" className="group relative flex items-center justify-center gap-4 py-5 bg-white/[0.05] border border-white/10 rounded-full hover:bg-white/[0.1] transition-all cursor-pointer shadow-lg active:scale-95">
                            <span className="uppercase text-[10px] md:text-[12px] tracking-[0.5em] font-black opacity-50 group-hover:opacity-100 transition-opacity">Initiate Transfer</span>
                            <Send size={16} style={{ color: scene.accent }} className="group-hover:translate-x-2 transition-transform" />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 md:mt-12 flex items-center gap-6 md:gap-10 relative z-50 px-4">
                    {idx > 0 && (
                      <button onClick={() => goToScene(idx - 1)} className="group p-4 md:p-5 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/30 transition-all pointer-events-auto">
                        <ArrowLeft size={16} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                    {!scene.isFinal && (
                      <button onClick={() => goToScene(idx + 1)} className="group flex items-center gap-10 md:gap-16 px-10 md:px-16 py-4 md:py-6 bg-white/[0.03] border border-white/10 rounded-full hover:border-white/40 transition-all pointer-events-auto active:scale-95">
                        <span className="uppercase text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] font-black opacity-30 group-hover:opacity-100 transition-opacity">{scene.buttonLabel || scene.next}</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-3 transition-transform" style={{ color: scene.accent }} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. MERGED SUB VIEW (DETAILS) */}
                {activeSubView && (
                  <div className="absolute inset-0 z-[100] flex items-start md:items-center justify-center p-6 md:p-10 animate-in pointer-events-auto bg-transparent overflow-y-auto pt-24 pb-24 md:pt-10 md:pb-10">
                    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start text-left relative z-10 px-4">
                      <div className="flex-1 flex flex-col items-start text-left">
                        <button onClick={handleBack} className="mb-6 md:mb-10 flex items-center gap-3 px-6 py-3 bg-white/[0.05] border border-white/10 rounded-full text-[9px] tracking-[0.4em] uppercase font-black cursor-pointer group hover:bg-white/20 transition-all">
                          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                        <h3 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-8 leading-[0.9] text-left">
                          {activeSubView.title}
                        </h3>
                        <div className="w-16 md:w-32 h-2 mb-6 md:mb-12 rounded-full" style={{ backgroundColor: currentScene.accent, boxShadow: `0 0 25px ${currentScene.accent}` }} />
                        <p className="text-xl md:text-4xl font-bold tracking-tight mb-6 opacity-95 leading-[1.1] text-left">
                          {activeSubView.desc}
                        </p>
                        {activeSubView.subDesc && (
                          <p className="text-sm md:text-xl opacity-40 font-medium border-l-4 border-white/5 pl-6 md:pl-10 italic">
                            {activeSubView.subDesc}
                          </p>
                        )}
                      </div>
                      
                      <div className="w-full md:w-[420px] flex flex-col gap-4 pt-6 md:pt-32">
                        <div className="text-[8px] md:text-[10px] tracking-[0.5em] uppercase font-black mb-4 opacity-20 ml-4">Core Architecture</div>
                        {activeSubView.points.map((point, i) => (
                          <div key={i} className="px-2 md:px-12 py-3 md:py-4 flex items-start gap-6 group">
                             <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0 mt-1.5 animate-pulse" style={{ backgroundColor: currentScene.accent, boxShadow: `0 0 12px ${currentScene.accent}` }} />
                             <span className="text-[11px] md:text-[15px] tracking-[0.15em] uppercase font-black opacity-30 group-hover:opacity-100 transition-opacity leading-tight">
                               {point}
                             </span>
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

      <div className="fixed top-6 left-6 md:top-12 md:left-12 z-50 pointer-events-none">
        <div className="text-[14px] md:text-[16px] tracking-[0.5em] font-black uppercase opacity-80 leading-none">
          Idate Tech
        </div>
      </div>

      <div className="fixed top-6 right-6 md:top-auto md:bottom-12 md:left-12 z-[110] flex items-center transition-all duration-700">
         <div className="flex gap-6 md:gap-10 items-center pointer-events-auto opacity-30 hover:opacity-100 transition-opacity">
            <a href="#" className="hover:scale-110 transition-all"><Instagram size={18} /></a>
            <a href="#" className="hover:scale-110 transition-all"><Linkedin size={18} /></a>
            <a href="#" className="hover:scale-110 transition-all"><Github size={18} /></a>
         </div>
      </div>

      <style>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
        .font-neue { font-family: 'PP Neue Montreal', 'Inter', sans-serif; }

        @keyframes fadeInZoom { 
          from { opacity: 0; transform: scale(0.97) translateY(10px); filter: blur(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); } 
        }
        .animate-in { animation: fadeInZoom 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        input::placeholder, textarea::placeholder { opacity: 0.5; color: white; }
        
        .overflow-y-auto {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .overflow-y-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}