"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, animate, Variants } from "framer-motion";

interface MediaDataStructure {
  igViews: string;
  igLikes: string;
  igVideoLink1: string;
  igVideoLink2: string;
  ytSubs: string;
  ytViews: string;
  ytLikes: string;
  ytComments: string;
  ytShares: string;
  ytLink: string;
  devAvatar: string;
  cvDownloadLink: string;
}

interface MatrixElement {
  id: number;
  text: string;
  left: number;
  duration: number;
  opacity: number;
  color: string;
  zIndex: number;
}

interface ProjectStructure {
  title: string;
  type: string;
  tech: string;
  status: string;
  actionType: string;
  target: string;
  desc: string;
}

const codeSnippets = [
  `<script>\n  function init() {\n    const sys = new ArchSystem();\n    sys.connect();\n  }\n</script>`,
  `import { WAF } from 'security';\nconst engine = new WAF();\nengine.mitigate('SQLi');\nconsole.log('Secure');`,
  `void main() {\n  for(int i=0; i<10; i++) {\n    printf("Shadow_A2234\\n");\n  }\n}`,
  `# [ SYSTEM STATUS: SECURE ]\n# ARCH_LINUX_KERNEL: 6.x\n# TARGET_PORT: 8080\n# STATUS: MONITORING`,
  `SELECT * FROM users\nWHERE role = 'admin'\nAND status = 'active';`
];

const TypingSnippet = ({ text, color, opacity }: { text: string; color: string; opacity: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <pre 
      className={`font-mono text-[11px] ${color} whitespace-pre leading-relaxed pointer-events-none`} 
      style={{ 
        opacity: opacity,
        textShadow: `0 0 8px currentColor, 0 0 12px currentColor`
      }}
    >
      {displayedText}<span className="animate-pulse">_</span>
    </pre>
  );
};

const HomeBiography = ({ activeTab }: { activeTab: string }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const totalLength = 550; 

  useEffect(() => {
    if (activeTab !== "HOME") {
      setVisibleChars(0);
      setIsDone(false);
      return;
    }
    let i = 0;
    setIsDone(false);
    const timer = setInterval(() => {
      i += 1; 
      if (i >= totalLength) {
        setVisibleChars(totalLength);
        setIsDone(true);
        clearInterval(timer);
      } else {
        setVisibleChars(i);
      }
    }, 20); 
    return () => clearInterval(timer);
  }, [activeTab]);

  const renderMaskedText = (chars: number) => {
    const segments = [
      { text: "Saya adalah mahasiswa D3 Teknik Informatika di Politeknik Hasnur yang berfokus pada ", type: "normal" },
      { text: "Full-Stack Web Development (Laravel & Next.js)", type: "white-bold" },
      { text: ", rekayasa keamanan ofensif, serta optimalisasi pertumbuhan media digital. Memiliki rekam jejak dalam membangun sistem terintegrasi ", type: "normal" },
      { text: "Payment Gateway", type: "cyan-medium" },
      { text: ", mengimplementasikan model ", type: "normal" },
      { text: "Machine Learning (Random Forest) WAF", type: "purple-medium" },
      { text: ", serta melakukan audit penetrasi jaringan secara etis. Di luar arsitektur kode, saya juga seorang ", type: "normal" },
      { text: "Growth Hacker", type: "white-medium" },
      { text: " yang sukses mengeksploitasi algoritma media sosial organik hingga menembus angka jutaan impresi.", type: "normal" }
    ];

    let accumulatedLength = 0;
    return (
      <>
        {segments.map((seg, idx) => {
          const segLength = seg.text.length;
          if (accumulatedLength >= chars) return null;
          
          const sliceEnd = chars - accumulatedLength;
          const textToShow = seg.text.slice(0, sliceEnd);
          accumulatedLength += segLength;

          if (seg.type === "white-bold") {
            return <span key={idx} className="text-white font-medium">{textToShow}</span>;
          } else if (seg.type === "cyan-medium") {
            return <span key={idx} className="text-cyan-400 font-medium">{textToShow}</span>;
          } else if (seg.type === "purple-medium") {
            return <span key={idx} className="text-purple-400 font-medium">{textToShow}</span>;
          } else if (seg.type === "white-medium") {
            return <span key={idx} className="text-white font-medium">{textToShow}</span>;
          }
          return <span key={idx}>{textToShow}</span>;
        })}
        <motion.span 
          animate={isDone ? { opacity: [0.2, 1, 0.2] } : { opacity: [1, 0, 1] }} 
          transition={isDone ? { repeat: Infinity, duration: 1.4, ease: "easeInOut" } : { repeat: Infinity, duration: 0.3 }} 
          className="font-black text-purple-400 ml-0.5"
        >
          _
        </motion.span>
      </>
    );
  };

  return (
    <div className="mt-6 text-gray-400 text-sm font-light leading-relaxed max-w-2xl border-l border-purple-500/30 pl-4 text-justify min-h-[140px] md:min-h-[100px]">
      {renderMaskedText(visibleChars)}
    </div>
  );
};

const DynamicRoles = () => {
  const roles = ["Web Developer", "Content Creator", "Video Editor", "Gray Hat Hacker"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div className="h-6 overflow-hidden relative mt-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="text-purple-400 font-mono text-sm md:text-base font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CountUpMatrix = ({ value, suffix = "", duration = 2 }: { value: string; suffix?: string; duration?: number }) => {
  const isK = value.includes("K");
  const isM = value.includes("M");
  const rawNumber = parseFloat(value.replace(/K|M|\+/g, "")) || 0;
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setDisplayValue(0); 
    const node = countRef.current;
    if (!node) return;

    const controls = animate(0, rawNumber, {
      duration: duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (isM || value.includes(".")) {
          setDisplayValue(parseFloat(latest.toFixed(1)));
        } else {
          setDisplayValue(Math.floor(latest));
        }
      },
    });

    return () => controls.stop();
  }, [value, rawNumber, duration, isM]);

  return (
    <span ref={countRef}>
      {displayValue}
      {isK && "K"}
      {isM && "M"}
      {suffix}
    </span>
  );
};

export default function WutheringShadowPortfolio() {
  const [activeTab, setActiveTab] = useState("HOME");
  const [elements, setElements] = useState<MatrixElement[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocalhost, setIsLocalhost] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        setIsLocalhost(true);
      }
    }
  }, []);

  // Kunci data taktis secara permanen, avatar langsung membaca folder public/profil.png Anda
  const [mediaData, setMediaData] = useState<MediaDataStructure>({
    igViews: "553K",
    igLikes: "58.3K",
    igVideoLink1: "https://www.instagram.com/reel/DYVjI97TSDT/",
    igVideoLink2: "https://www.instagram.com/reel/DVJ7Y43E0_g/",
    ytSubs: "1.5K",
    ytViews: "2.1M",
    ytLikes: "55.9K",
    ytComments: "1.5K",
    ytShares: "10.2K",
    ytLink: "https://youtube.com/@abdi_shadow",
    devAvatar: "/profile.png", 
    cvDownloadLink: "https://drive.google.com/file/d/1HGRy26EgfDW2-3lSA0K9IXPivQ7AeUJp/view?usp=sharing"
  });

  const [projectsList] = useState<ProjectStructure[]>([
    { title: "RANDOM FOREST WAF", type: "AI Security Lab", tech: "Python / Decision Tree", status: "SIMULATOR LAB", actionType: "TAB", target: "LAB", desc: "Model kecerdas-an buatan untuk mendeteksi dan memfilter serangan injeksi SQL & XSS pada lapisan aplikasi secara real-time." },
    { title: "VOID BREAKER", type: "Cybersecurity Offensive", tech: "Network / Packet Flooding", status: "SIMULATOR LAB", actionType: "TAB", target: "LAB", desc: "Skrip pengujian stress-test jaringan untuk mensimulasikan mitigasi serangan DDoS (Distributed Denial of Service)." },
    { title: "CYBERSEC PORTAL", type: "Security Framework UI", tech: "HTML / Tailwind CSS", status: "LIVE PAGES", actionType: "LINK", target: "https://shadow-a2234.github.io/CYBERSEC/", desc: "Landing page audit keamanan siber taktis yang telah di-deploy penuh pada ekosistem cloud GitHub Pages." },
    { title: "KOS-HUB PLATFORM", type: "Web Application", tech: "Laravel / Filament / MySQL", status: "REPOSITORY HUB", actionType: "LINK", target: "https://github.com/Shadow-A2234/Kos-Hub.git", desc: "Sistem manajemen persewaan kost digital modern yang telah terintegrasi secara penuh dengan Payment Gateway Midtrans." },
    { title: "GEOMETRY DASH REMAKE", type: "Game Development", tech: "Unity Engine / C#", status: "REPOSITORY HUB", actionType: "LINK", target: "https://github.com/Shadow-A2234/ShadowProject-Game.git", desc: "Rekayasa ulang mekanika ritme audio konstan dan kalkulasi collider presisi tinggi menggunakan Unity Engine." },
    { title: "WALLET MANAGER APP", type: "Mobile Application", tech: "Android Studio / Java", status: "REPOSITORY HUB", actionType: "LINK", target: "https://github.com/Shadow-A2234/WalletManager_MobileApp.git", desc: "Aplikasi mobile berbasis Android untuk pelacakan keuangan personal dengan manajemen penyimpanan database lokal." }
  ]);

  const codeTools = [
    { name: "KALI LINUX", type: "OS Security", logo: "https://logodix.com/logo/1287701.png", animateType: "glitch" },
    { name: "VS CODE", type: "Editor IDE", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", animateType: "stagger" },
    { name: "ANDROID STUDIO", type: "Mobile IDE", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/android-studio-icon.png", animateType: "stagger" },
    { name: "NETBEANS", type: "Java IDE", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netbeans/netbeans-original.svg", animateType: "stagger" }
  ];

  const designTools = [
    { name: "CAPCUT", type: "Video Editing", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Capcut-icon.png", animateType: "stagger" },
    { name: "AFTER EFFECTS", type: "VFX / Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", animateType: "stagger" },
    { name: "PHOTOSHOP", type: "Raster Graphics", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", animateType: "stagger" },
    { name: "CANVA", type: "Vector Layout", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", animateType: "stagger" },
    { name: "ADOBE ILLUSTRATOR", type: "Vector Graphics", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", animateType: "stagger" }
  ];

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [labSubTab, setLabSubTab] = useState("WAF");
  const [wafInput, setWafInput] = useState("");
  const [wafStatus, setWafStatus] = useState("WAITING");
  const [ddosTarget, setDdosTarget] = useState("");
  const [ddosLogs, setDdosLogs] = useState<string[]>([]);
  const [ddosStatus, setDdosStatus] = useState("STANDBY");

  useEffect(() => {
    const interval = setInterval(() => {
      const layer = Math.random() > 0.5 ? 1 : 0;
      setElements(prev => [...prev, {
        id: Math.random(),
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        left: Math.random() * 85,
        duration: layer === 0 ? 5 : 10,
        opacity: layer === 1 ? 0.95 : 0.4, 
        color: layer === 1 ? "text-cyan-400" : "text-blue-500",
        zIndex: layer === 1 ? 20 : 10,
      }]);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (proj: ProjectStructure) => {
    if (proj.actionType === "LINK") {
      window.open(proj.target, "_blank");
    } else {
      setActiveTab(proj.target);
      if (proj.target === "LAB") setLabSubTab(proj.title.includes("WAF") ? "WAF" : "DDOS");
    }
  };

  const startDdosSimulation = () => {
    if(!ddosTarget) return alert("ENTER TARGET SUBNET PORT FIRST!");
    setDdosStatus("FLOODING TARGET"); setDdosLogs([]);
    let counter = 0;
    const interval = setInterval(() => {
      if(counter < 10) {
        setDdosLogs(prev => [...prev, `[SEND]: Packet size 64KB -> ${ddosTarget}:8080 [SYN_FLOOD] -> STATUS: 200 OK (REQ_OVERFLOW)`]);
        counter++;
      } else {
        setDdosLogs(prev => [...prev, `[CRITICAL]: Buffer pool exhausted on ${ddosTarget} // TARGET COLLAPSED.`]);
        setDdosStatus("TARGET DROPPED");
        clearInterval(interval);
      }
    }, 250);
  };

  const navItems = [
    { id: "HOME", label: "HOME", icon: "◈" },
    { id: "MEDIA", label: "MEDIA", icon: "◪" },
    { id: "ARSENAL", label: "PROJECTS NOW", icon: "⚔" },
    { id: "INTELLIGENCE", label: "INTELLIGENCE", icon: "📜" },
    { id: "TOOLS", label: "TOOLS", icon: "⬢" },
    { id: "LAB", label: "LAB", icon: "🧪" },
  ];

  // PENYEMBUHAN TOTAL ERROR: Memberikan tipe data 'Variants' serta mengunci nilai string literal spring
  const stackCardVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, z: -100, x: 120, filter: "blur(3px)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      z: 0, 
      x: 0, 
      filter: "blur(0px)", 
      transition: { type: "spring" as const, stiffness: 150, damping: 18 } 
    },
    exit: { opacity: 0, scale: 0.9, z: -100, x: -120, filter: "blur(3px)", transition: { duration: 0.22 } }
  };

  const containerGridVariants = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  const toolItemVariants = {
    initial: { opacity: 0, y: 15, scale: 0.92 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 14 } }
  };

  const kaliGlitchVariants = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { 
      opacity: [1, 0.9, 1, 0.4, 1, 0.8, 1],
      x: [0, -3, 3, -1, 2, -3, 0],
      y: [0, 2, -2, 1, -1, 2, 0],
      scale: 1,
      transition: {
        opacity: { duration: 0.4 },
        x: { repeat: Infinity, duration: 0.28, ease: "linear" as const, repeatType: "mirror" as const },
        y: { repeat: Infinity, duration: 0.22, ease: "linear" as const, repeatType: "mirror" as const }
      }
    }
  };

  return (
    <div className="relative bg-[#050507] text-white min-h-screen font-sans select-none overflow-x-hidden perspective-1000">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {elements.map((el) => (
          <motion.div key={el.id} className="absolute" initial={{ y: "110vh", opacity: 0 }} animate={{ y: "-40vh", opacity: el.opacity }} transition={{ duration: el.duration, ease: "linear" }} style={{ left: `${el.left}%`, zIndex: el.zIndex }} onAnimationComplete={() => setElements((prev) => prev.filter((item) => item.id !== el.id))}>
            <TypingSnippet text={el.text} color={el.color} opacity={el.opacity} />
          </motion.div>
        ))}
      </div>

      <nav className="fixed top-0 left-0 w-full z-40 hidden md:flex justify-center items-center py-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-2 md:gap-10">
          {navItems.map((item) => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} className="group flex flex-col items-center cursor-pointer">
              <span className={`text-lg transition-all ${activeTab === item.id ? "text-purple-400 scale-125" : "text-gray-500 group-hover:text-white"}`}>{item.icon}</span>
              <span className={`text-[9px] tracking-[0.2em] mt-2 font-bold transition-all ${activeTab === item.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>{item.label}</span>
              {activeTab === item.id && <motion.div layoutId="nav-line" className="w-full h-[2px] bg-purple-500 mt-1 shadow-[0_0_10px_#a855f7]" />}
            </div>
          ))}
        </div>
      </nav>

      <header className="fixed top-0 left-0 w-full z-50 flex md:hidden justify-between items-center px-6 py-4 bg-[#060608]/90 backdrop-blur-md border-b border-white/5">
        <h2 className="text-xs font-mono font-black tracking-widest text-purple-400">SHADOW_A2234</h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex flex-col gap-1.5 cursor-pointer">
          <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: "100%" }} transition={{ type: "tween", ease: "easeInOut" }} className="fixed inset-0 z-40 bg-[#060609]/98 p-8 pt-24 flex flex-col gap-4 md:hidden backdrop-blur-lg">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full text-left font-mono text-sm font-black tracking-widest py-3 border-b border-white/5 flex items-center gap-4 ${activeTab === item.id ? "text-purple-400 pl-4 border-l-2 border-purple-500 bg-purple-500/5" : "text-gray-400"}`}>
                <span className="text-cyan-400">{item.icon}</span>{item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-30 pt-24 md:pt-32 px-4 md:px-16 h-[calc(100vh-100px)] overflow-y-auto bg-transparent flex flex-col justify-start">
        <AnimatePresence mode="wait">
          
          {activeTab === "HOME" && (
            <motion.section key="home" variants={stackCardVariants} initial="initial" animate="animate" exit="exit" className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-auto lg:h-5/6 bg-transparent pb-12">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-cyan-400 font-mono tracking-widest text-xs">SYSTEM EXECUTIVE PROFILE</span>
                <div className="mt-2 space-y-1">
                  <h3 className="text-sm md:text-base font-sans font-light text-gray-400">Hi, I'm</h3>
                  <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none font-sans bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-[length:200%_auto] text-transparent bg-clip-text animate-gradientFlow drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                    Muhammad Abdi
                  </h1>
                </div>

                <DynamicRoles />
                <HomeBiography activeTab={activeTab} />

                <div className="flex flex-wrap items-center gap-4 pt-6 font-mono text-xs">
                  <button onClick={() => setActiveTab("ARSENAL")} className="bg-gradient-to-r from-purple-600 to-cyan-500 text-black px-6 py-3 font-black rounded hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer">
                    View My Work →
                  </button>
                  <a href={mediaData.cvDownloadLink} target="_blank" className="border border-white/10 bg-white/5 text-white px-6 py-3 font-bold rounded hover:bg-white/10 transition-all text-center">
                    Download CV
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-end items-center relative w-full pt-6 lg:pt-0 pl-0 lg:pl-12">
                <div className="relative w-76 h-85 md:w-96 md:h-110 bg-[#0a0a0f] border border-white/5 p-3 rounded-2xl shadow-2xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)" }}>
                  <div className="w-full h-full bg-[#111] rounded-xl overflow-hidden border border-white/5 relative">
                    <img src={mediaData.devAvatar} alt="Shadow Developer Profile" className="w-full h-full object-cover grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute -top-4 -right-3 bg-purple-950/90 border border-purple-500/30 font-mono px-3 py-1.5 rounded-xl text-center shadow-lg backdrop-blur-md">
                    <div className="text-[8px] text-purple-400 font-bold tracking-wider">PROJECTS</div>
                    <div className="text-sm font-black text-white mt-0.5">20+ Accum</div>
                  </div>
                  <div className="absolute -bottom-2 -left-3 bg-cyan-950/90 border border-cyan-500/30 font-mono px-4 py-1.5 rounded-xl text-center shadow-lg backdrop-blur-md">
                    <div className="text-[8px] text-cyan-400 font-bold">STATUS STATUS</div>
                    <div className="text-xs font-black text-white mt-0.5">Active Ready 2026</div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === "MEDIA" && (
            <motion.section key="media" variants={stackCardVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 bg-transparent">
               <div className="bg-[#0c0c10]/95 border border-purple-500/20 p-8 flex flex-col justify-between shadow-xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 95% 100%, 0 100%)" }}>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400">HIMA TI CAMPAIGN RECORD</span>
                    <h3 className="text-3xl font-black mt-2 mb-4 italic text-white font-mono">INSTAGRAM ENGINE</h3>
                    <p className="text-gray-400 mb-6 text-xs font-light">Manajemen rekayasa pertumbuhan konten video taktis pada platform komunikasi himpunan mahasiswa.</p>
                    
                    <div className="bg-purple-950/20 border border-purple-500/10 p-4 font-mono text-center mb-6">
                      <div className="text-[10px] text-purple-400 tracking-widest">TOTAL ACCUMULATED VIEWS</div>
                      <div className="text-3xl font-black text-white mt-1">
                        <CountUpMatrix value={mediaData.igViews} suffix="+" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 font-mono text-xs border-t border-white/5 pt-4">
                      <div className="text-[10px] text-gray-500">FEATURED REELS VIDEO LINKS:</div>
                      <a href={mediaData.igVideoLink1} target="_blank" className="block text-cyan-400 hover:underline truncate text-[11px]">{" > "} Live Production Asset 01 ↗</a>
                      <a href={mediaData.igVideoLink2} target="_blank" className="block text-cyan-400 hover:underline truncate text-[11px]">{" > "} Live Production Asset 02 ↗</a>
                    </div>
                  </div>
               </div>

               <div className="bg-[#0c0c10]/95 border border-cyan-500/20 p-8 flex flex-col justify-between shadow-xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 95% 100%, 0 100%)" }}>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400">NETWORK SYNDICATE</span>
                    <h3 className="text-3xl font-black mt-2 mb-4 italic text-white font-mono">YOUTUBE METRICS</h3>
                    <p className="text-gray-400 mb-6 text-xs font-light">Penyebaran aset video edukasi berskala global dengan traksi audiens organik tinggi.</p>
                    
                    <div className="grid grid-cols-2 gap-3 font-mono text-center mb-6">
                      <div className="bg-cyan-950/20 border border-cyan-500/10 p-3">
                        <div className="text-[9px] text-cyan-400">SUBSCRIBERS</div>
                        <div className="text-lg font-black text-cyan-400">
                          <CountUpMatrix value={mediaData.ytSubs} />
                        </div>
                      </div>
                      <div className="bg-purple-950/20 border border-purple-500/10 p-3">
                        <div className="text-[9px] text-purple-400">TOTAL VIEWS</div>
                        <div className="text-lg font-black">
                          <CountUpMatrix value={mediaData.ytViews} />
                        </div>
                      </div>
                      <div className="bg-[#111] border border-white/5 p-3">
                        <div className="text-[9px] text-gray-400">LIKES</div>
                        <div className="text-lg font-black">
                          <CountUpMatrix value={mediaData.ytLikes} />
                        </div>
                      </div>
                      <div className="bg-[#111] border border-white/5 p-3">
                        <div className="text-[9px] text-gray-400">SHARES</div>
                        <div className="text-lg font-black">
                          <CountUpMatrix value={mediaData.ytShares} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href={mediaData.ytLink} target="_blank" className="text-xs font-mono text-purple-400 font-bold hover:underline"> CONNECT TARGET BROADCAST HOST ➔</a>
               </div>
            </motion.section>
          )}

          {activeTab === "ARSENAL" && (
            <motion.section key="arsenal" variants={stackCardVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl mx-auto pb-12 bg-transparent flex flex-col gap-6 w-full">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 {projectsList.map((p, i) => (
                   <div key={i} onClick={() => handleProjectClick(p)} className="bg-[#0d0d12]/95 border border-white/5 p-6 flex flex-col justify-between cursor-pointer hover:border-purple-500 hover:shadow-[0_0_12px_rgba(147,51,234,0.12)] transition-all group" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)" }}>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono text-purple-400">{p.type.toUpperCase()}</span>
                          <span className="text-[9px] font-mono bg-purple-950 text-cyan-400 px-2 py-0.5 rounded-sm border border-purple-500/20">{p.status}</span>
                        </div>
                        <h3 className="text-2xl font-black mt-2 group-hover:text-purple-400 transition-colors font-mono">{p.title}</h3>
                        <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed mb-4">{p.desc}</p>
                        <p className="text-[10px] text-gray-500 font-mono">CORE_STACK: {p.tech}</p>
                      </div>
                      <div className="text-xs font-mono text-cyan-400 mt-6 font-bold group-hover:translate-x-1 transition-transform">
                        {p.actionType === "LINK" ? "DEPLOYED HOST TRIGGER ➔" : `INITIALIZE CORE MODULE COMPONENT [${p.target}] ➔`}
                      </div>
                   </div>
                 ))}
               </div>
               <div className="w-full flex justify-center mt-4">
                 <a href="https://github.com/Shadow-A2234" target="_blank" className="font-mono text-xs text-purple-400 border border-purple-500/20 px-8 py-3 rounded-full hover:bg-purple-500 hover:text-black hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all tracking-widest uppercase font-bold">
                   [ + READ COMPLETE ARSENAL DATABASE ON GITHUB ]
                 </a>
               </div>
            </motion.section>
          )}

          {activeTab === "INTELLIGENCE" && (
            <motion.section key="intelligence" variants={stackCardVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl mx-auto w-full bg-[#0d0d0d]/90 p-10 border-l-4 border-red-600 pb-12 shadow-xl">
               <span className="text-red-500 font-mono font-bold text-xs opacity-50">DATA INTEL DISCLOSURES REPORT</span>
               <h3 className="text-3xl font-black mt-2 mb-6 italic text-red-500 font-mono">GOV-SYSTEM PENETRATION LOGS</h3>
               <div className="space-y-4 font-mono text-xs text-gray-400 leading-relaxed">
                 <p>{" > "}[AUDIT]: Penemuan celah SQL Injection kritis pada server publik milik instansi pemerintah.</p>
                 <p>{" > "}[DISCLOSURE]: Dokumen Proof of Concept (PoC) serangan berhasil dianalisis dan diamankan ke repositori internal.</p>
                 <p className="bg-red-950/20 p-3 border border-red-900/40 text-red-400 text-xs">Aksi peretasan etis (Ethical Hacking) ini membuktikan kapabilitas penetrasi dunia nyata secara mutlak di luar sekadar teori kelas.</p>
               </div>
            </motion.section>
          )}

          {activeTab === "TOOLS" && (
            <motion.section key="tools" variants={stackCardVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl mx-auto w-full pb-12 bg-transparent space-y-10">
               <div>
                 <div className="text-xs font-mono text-purple-400 mb-4 tracking-widest">CODING & PENETRATION ARSENAL</div>
                 <motion.div variants={containerGridVariants} initial="initial" animate="animate" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {codeTools.map((tool, i) => (
                     <motion.div key={i} variants={tool.animateType === "glitch" ? kaliGlitchVariants : toolItemVariants} className="p-6 border border-white/5 bg-[#0c0c11]/90 flex flex-col items-center justify-center rounded-xs hover:border-purple-500/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.1)] transition-all">
                       <img src={tool.logo} alt={tool.name} className={`w-12 h-12 mb-3 object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.15)] ${tool.animateType === "glitch" ? "animate-pulse" : ""}`} />
                       <div className="font-mono font-bold text-xs text-white text-center tracking-tight">{tool.name}</div>
                       <div className="text-[9px] font-mono text-gray-500 mt-1 uppercase">{tool.type}</div>
                     </motion.div>
                   ))}
                 </motion.div>
               </div>

               <div>
                 <div className="text-xs font-mono text-cyan-400 mb-4 tracking-widest">CREATIVE MEDIA EDITING LAB</div>
                 <motion.div variants={containerGridVariants} initial="initial" animate="animate" className="grid grid-cols-2 md:grid-cols-5 gap-4">
                   {designTools.map((tool, i) => (
                     <motion.div key={i} variants={toolItemVariants} className="p-4 border border-white/5 bg-[#0c0c11]/90 flex flex-col items-center justify-center rounded-xs hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(34,211,238,0.1)] transition-all">
                       <img src={tool.logo} alt={tool.name} className="w-10 h-10 mb-2 object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.15)]" />
                       <div className="font-mono font-bold text-[11px] text-white text-center tracking-tight truncate w-full">{tool.name}</div>
                       <div className="text-[8px] font-mono text-gray-500 mt-1 uppercase">{tool.type}</div>
                     </motion.div>
                   ))}
                 </motion.div>
               </div>
            </motion.section>
          )}

          {activeTab === "LAB" && (
            <motion.section key="lab" variants={stackCardVariants} initial="initial" animate="animate" exit="exit" className="max-w-3xl mx-auto w-full pb-12 bg-transparent">
               <div className="w-full bg-[#0d0d12]/90 border border-purple-500/10 p-8 rounded-xs shadow-2xl">
                  <div className="flex gap-4 border-b border-white/5 pb-3 font-mono text-xs mb-6">
                    <button onClick={() => setLabSubTab("WAF")} className={`pb-2 transition-all ${labSubTab === "WAF" ? "text-cyan-400 border-b border-cyan-400" : "text-gray-500"}`}>[ RANDOM FOREST WAF FILTER ]</button>
                    <button onClick={() => setLabSubTab("DDOS")} className={`pb-2 transition-all ${labSubTab === "DDOS" ? "text-purple-400 border-b border-purple-400" : "text-gray-500"}`}>[ VOID BREAKER DDoS MATRIX ]</button>
                  </div>
                  {labSubTab === "WAF" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <input type="text" value={wafInput} onChange={(e) => setWafInput(e.target.value)} placeholder="Payload input, contoh: ' OR SELECT * FROM users --" className="w-full bg-[#050507] border border-white/10 p-4 font-mono text-purple-400 text-sm outline-none focus:border-purple-500" />
                      <button onClick={() => {
                        setWafStatus("CLASSIFYING MATRIX...");
                        setTimeout(() => {
                          const lower = wafInput.toUpperCase();
                          if(lower.includes("'") || lower.includes("SELECT")) setWafStatus("CRITICAL MALICIOUS PAYLOAD: BLOCKED BY RANDOM FOREST PROTOCOL");
                          else setWafStatus("CLEAR SECURE PASS: VERIFIED COMPLIANT");
                        }, 1000);
                      }} className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-black font-black text-xs tracking-widest py-3">RUN MACHINE LEARNING DEEP ANALYSIS</button>
                      <div className="p-4 bg-black border border-white/5 font-mono text-xs text-center text-purple-400 font-bold">STATE OUTPUT: {wafStatus}</div>
                    </motion.div>
                  )}
                  {labSubTab === "DDOS" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <p className="text-xs text-gray-500 font-mono">TARGET VECTOR EXPLOIT CONFIGURATION:</p>
                      <input type="text" value={ddosTarget} onChange={(e) => setDdosTarget(e.target.value)} placeholder="Masukkan subnet IP Target, contoh: 192.168.100.22" className="w-full bg-[#050507] border border-white/10 p-3 font-mono text-cyan-400 text-xs outline-none focus:border-cyan-500" />
                      <button onClick={startDdosSimulation} disabled={ddosStatus.includes("FLOODING")} className="px-6 py-2.5 bg-red-950 border border-red-600 text-red-400 font-mono text-xs font-bold disabled:opacity-40">LAUNCH INTENSE FLOOD ATTACK</button>
                      <div className="w-full h-36 bg-black p-4 font-mono text-[10px] text-red-500 overflow-y-auto space-y-1 border border-white/5">
                        {ddosLogs.length === 0 && <span>// STRESS TEST TARGET SYSTEM STANDBY...</span>}
                        {ddosLogs.map((l, i) => <div key={i}>{l}</div>)}
                      </div>
                      <div className="font-mono text-xs text-right text-purple-400 font-bold">CORE STATUS: {ddosStatus}</div>
                    </motion.div>
                  )}
               </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {isLocalhost && (
        <div className="fixed bottom-14 right-6 z-50">
          <button onClick={() => setIsAdminOpen(!isAdminOpen)} className="font-mono text-[10px] text-purple-500/80 hover:text-purple-400 bg-black/50 px-3 py-1 border border-purple-500/20 rounded-xs shadow-md">
            [ ACCESS_OVERRIDE_GATE ]
          </button>
          <AnimatePresence>
            {isAdminOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-8 right-0 bg-[#07070a] border border-purple-500/30 p-6 w-80 shadow-2xl rounded-sm font-mono text-xs z-50">
                {!isAuthorized ? (
                  <div className="space-y-3">
                    <div className="text-purple-400 text-[10px]">PIN ACCESS VERIFICATION</div>
                    <input type="password" placeholder="ENTER MASTER SECURITY KEY" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 p-2 text-purple-400 outline-none text-xs" />
                    <button onClick={() => { if(adminPassword === "shadow2026") setIsAuthorized(true); else alert("AUTHENTICATION REJECTED"); }} className="w-full bg-purple-700 text-white p-2 font-bold text-[10px] tracking-widest">SUBMIT PASSPHRASE</button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    <div className="text-cyan-400 text-[10px]">SYSTEM INTERCEPT MASTER ONLINE</div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-500">DEV AVATAR URL (FOTO PROFIL)</label>
                      <input type="text" value={mediaData.devAvatar} onChange={(e) => setMediaData({...mediaData, devAvatar: e.target.value})} className="w-full bg-black border border-white/10 p-1.5 text-xs text-white outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-500">CV DOWNLOAD LINK URL</label>
                      <input type="text" value={mediaData.cvDownloadLink} onChange={(e) => setMediaData({...mediaData, cvDownloadLink: e.target.value})} className="w-full bg-black border border-white/10 p-1.5 text-xs text-white outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-500">IG VIEWS COUNTER (Contoh: 700K)</label>
                      <input type="text" value={mediaData.igViews} onChange={(e) => setMediaData({...mediaData, igViews: e.target.value})} className="w-full bg-black border border-white/10 p-1.5 text-xs text-white outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-500">YT VIEWS COUNTER (Contoh: 5.5M)</label>
                      <input type="text" value={mediaData.ytViews} onChange={(e) => setMediaData({...mediaData, ytViews: e.target.value})} className="w-full bg-black border border-white/10 p-1.5 text-xs text-white outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-500">YT SUBS COUNTER</label>
                      <input type="text" value={mediaData.ytSubs} onChange={(e) => setMediaData({...mediaData, ytSubs: e.target.value})} className="w-full bg-black border border-white/10 p-1.5 text-xs text-white outline-none" />
                    </div>
                    <button onClick={() => { setIsAdminOpen(false); setIsAuthorized(false); setAdminPassword(""); }} className="w-full bg-cyan-500 text-black p-2 font-black text-[10px] tracking-wider mt-2">LOCK ARCHIVES</button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center text-[10px] text-gray-600 font-mono border-t border-white/5 bg-[#050507] z-40">
        <span>© 2026 SHADOW_RESONANCE.A2234</span>
        <span className="text-purple-500/50">SPECS: ZERO-BUG COMPILE MATURED</span>
      </footer>

      <style jsx global>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientFlow {
          background-size: 200% auto;
          animation: gradientFlow 6s linear infinite;
        }
      `}</style>

    </div>
  );
}