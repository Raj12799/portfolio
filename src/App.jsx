import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronRight, Code, PenTool, Database, Briefcase, Zap, Globe, ShieldCheck, Layers, CheckCircle, Rocket, Mail, LineChart, ShoppingCart, Palette, LayoutGrid, BookOpen, Newspaper, ArrowLeft } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Assets & Icons ---
const MascotSVG = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ears/Antennae */}
    <rect x="35" y="15" width="8" height="15" rx="4" fill="#d93b4a" transform="rotate(-20 35 15)" />
    <rect x="77" y="15" width="8" height="15" rx="4" fill="#d93b4a" transform="rotate(20 77 15)" />
    
    {/* Body */}
    <ellipse cx="60" cy="55" rx="45" ry="40" fill="#f45b69" />
    
    {/* Arms */}
    <ellipse cx="12" cy="55" rx="8" ry="12" fill="#f45b69" transform="rotate(-30 12 55)" />
    <ellipse cx="108" cy="55" rx="8" ry="12" fill="#f45b69" transform="rotate(30 108 55)" />
    
    {/* Legs */}
    <rect x="42" y="85" width="12" height="16" rx="3" fill="#f45b69" />
    <rect x="66" y="85" width="12" height="16" rx="3" fill="#f45b69" />
    
    {/* Eyes */}
    <circle cx="45" cy="50" r="4.5" fill="#111827" />
    <circle cx="75" cy="50" r="4.5" fill="#111827" />
  </svg>
);

// --- Data ---
const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Building responsive, fast, and modern websites tailored to your specific business needs and goals.",
    Icon: Code,
    filename: "App.jsx"
  },
  {
    id: 2,
    title: "Designing",
    description: "Creating visually appealing, user-centric interfaces and graphics that perfectly represent your brand identity.",
    Icon: PenTool,
    filename: "banner_design.fig"
  },
  {
    id: 3,
    title: "Data Solutions",
    description: "Organizing, analyzing, and managing your data efficiently to help you drive actionable insights.",
    Icon: Database,
    filename: "data_analysis.xlsx"
  },
  {
    id: 4,
    title: "Admin Support",
    description: "Providing reliable administrative assistance to streamline your daily operations and save you time.",
    Icon: Briefcase,
    filename: "admin_workspace.app"
  }
];

const workProcessSteps = [
  {
    title: "Client & Project Setup",
    desc: "The spark begins with your initial message! We lock in the core requirements, assign resources, and establish the functional contract for your vision.",
    icon: Mail,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-[#1c1611]",
    border: "border-amber-200"
  },
  {
    title: "Deep Strategy & Planning",
    desc: "The requirement hits our desk. We extensively brainstorm the architecture, finalize core infrastructure, and draft a robust implementation strategy.",
    icon: Briefcase,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-[#1a1114]",
    border: "border-rose-200"
  },
  {
    title: "Active Development",
    desc: "Engineers begin coding. We translate the strategic blueprints into high-performance, cutting-edge, and pixel-perfect scalable features.",
    icon: Code,
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-[#0f1717]",
    border: "border-teal-200"
  },
  {
    title: "Quality Verification",
    desc: "Every pixel, function, and edge-case scenario is stress-tested rigorously. We perform heavy auditing to verify perfection.",
    icon: ShieldCheck,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-[#11131c]",
    border: "border-indigo-200"
  },
  {
    title: "48-Hour Client Review",
    desc: "The masterpiece is handed over for your dedicated evaluation. You suggest final tweaks in a rapid 48-hour revision window to optimize the end result.",
    icon: CheckCircle,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50 dark:bg-[#1c111c]",
    border: "border-fuchsia-200"
  },
  {
    title: "Finalization & Launch",
    desc: "Once confirmed, we apply the final polish, push the product to a live production state, and officially launch your digital brand into the world.",
    icon: Rocket,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-[#0f1c16]",
    border: "border-emerald-200"
  }
];

const portfolioProjects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    desc: "A comprehensive financial dashboard with real-time data visualization, user management, and seamless transaction tracking.",
    color: "from-blue-400 to-indigo-600",
    tags: ["React", "Data"],
    mockupType: "dashboard"
  },
  {
    id: 2,
    title: "Lumina E-Commerce",
    desc: "A modern, high-performance e-commerce platform featuring a custom cart, dynamic product filtering, and Stripe integration.",
    color: "from-rose-400 to-orange-500",
    tags: ["Web Dev", "UI/UX"],
    mockupType: "ecommerce"
  },
  {
    id: 3,
    title: "Nova Brand Identity",
    desc: "Complete visual identity overhaul for a tech startup, including logo design, typography, and marketing collaterals.",
    color: "from-teal-400 to-emerald-500",
    tags: ["Designing", "Branding"],
    mockupType: "design"
  }
];

const integrationBadges = [
  { label: 'React', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/></svg> },
  { label: 'JavaScript', icon: <svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 3h18v18H3V3zm11.7 13.5c.2-.5.6-1 1-1.5.4-.4.8-.6 1.3-.6.6 0 1 .2 1.3.6.3.4.4.9.4 1.5 0 .7-.1 1.2-.4 1.7-.3.5-.7.8-1.2 1.1-.6.2-1.3.3-2.2.3-1.1 0-2.1-.2-2.9-.6l.6-1.8c.6.3 1.3.5 2 .5.4 0 .7-.1.9-.2.2-.1.3-.3.3-.6 0-.3-.1-.5-.4-.7-.2-.2-.6-.3-1.1-.5-.8-.3-1.4-.6-1.7-1-.3-.4-.5-1-.5-1.7 0-.7.2-1.2.6-1.7.4-.5 1.1-.7 1.9-.7 1 0 1.9.2 2.6.6l-.6 1.6c-.6-.3-1.2-.4-1.8-.4-.3 0-.6.1-.8.2-.2.1-.3.3-.3.6 0 .3.1.5.4.7.2.2.6.4 1.1.5.8.3 1.4.6 1.8 1 .4.4.6.9.6 1.6 0 .8-.2 1.4-.7 1.9-.5.5-1.2.8-2.2.8-1.2 0-2.4-.3-3.4-.8l.7-1.8zm-7.4 3.1c1.1 0 1.9-.2 2.5-.7.6-.5.9-1.2.9-2.3V8.8h-2v5.7c0 .6-.1 1-.3 1.2-.2.2-.5.3-.9.3-.4 0-.9-.1-1.3-.4l-.6 1.7c.6.4 1.2.6 1.7.6z"/></svg> },
  { label: 'Tailwind CSS', icon: <svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M12 6.5a5.5 5.5 0 00-5.5 5.5h3a2.5 2.5 0 012.5-2.5c2.3 0 3.3 1.5 4.5 3.5 1.5 2.5 4 4 7 4a5.5 5.5 0 00-5.5-5.5h-3a2.5 2.5 0 01-2.5 2.5c-2.3 0-3.3-1.5-4.5-3.5-1.5-2.5-4-4-7-4z"/></svg> },
  { label: 'HTML5', icon: <svg viewBox="0 0 24 24" fill="#E34F26"><path d="M2 2h20l-1.8 18L12 23l-8.2-3L2 2zm15.5 5H6.5l.3 3h9.6l-.5 4.5-4.4 1.2-4.4-1.2-.2-2.5H4.8l.4 5 6.8 2 6.8-2L20 7h-2.5z"/></svg> },
  { label: 'Node.js', icon: <svg viewBox="0 0 24 24" fill="#339933"><path d="M12 2L1.8 7.8v8.3L12 22l10.2-5.9V7.8L12 2zm-1 14.5v-7l-4.5 2.6v5.2l4.5-2.5zm2 0l4.5 2.5v-5.2l-4.5-2.6v7zm-1-8.3L7.5 5.6 12 3l4.5 2.6-4.5 2.6z"/></svg> },
  { label: 'Figma', icon: <svg viewBox="0 0 24 24"><path fill="#F24E1E" d="M8 2h4v6H8z"/><path fill="#A259FF" d="M8 8h4v6H8z"/><path fill="#1ABCFE" d="M12 8h4v6h-4z"/><path fill="#0ACF83" d="M8 14h4v4a3 3 0 1 1-4-4z"/><path fill="#FF7262" d="M8 5a3 3 0 1 1 4-3H8v3z"/><path fill="#1ABCFE" d="M12 5a3 3 0 1 1 4 3h-4V5z"/></svg> },
  { label: 'Photoshop', icon: <svg viewBox="0 0 24 24" fill="#31A8FF"><rect width="24" height="24" rx="3"/><path fill="#001D26" d="M6 6h4.5c2 0 3.5 1 3.5 3s-1.5 3-3.5 3H8v5H6V6zm2 4.5h2.5c1 0 1.5-.5 1.5-1.5s-.5-1.5-1.5-1.5H8v3zm6-1c.5-.5 1.5-.5 2.5-.5s2 .5 2 1.5c0 1.5-3 1.5-3 2.5 0 .5.5 1 1.5 1s2-.5 2.5-1v1.5c-.5.5-1.5 1-2.5 1s-2.5-.5-2.5-2c0-1.5 3-2 3-2.5 0-.5-.5-1-1.5-1s-1.5.5-2 1v-1.5z"/></svg> },
  { label: 'Canva', icon: <svg viewBox="0 0 24 24" fill="#00C4CC"><circle cx="12" cy="12" r="10"/><path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6h-2c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c1.1 0 2.1.4 2.8 1.2l1.4-1.4C14.8 6.6 13.5 6 12 6z" fill="#fff"/></svg> },
  { label: 'Python', icon: <svg viewBox="0 0 24 24"><path fill="#3776AB" d="M12.01 2.05c-5.46 0-5.23 2.37-5.23 2.37v2.54h5.36V8.3H6.84C4.33 8.3 3.5 9.94 3.5 12.01s.83 3.71 3.34 3.71h1.34v-2.37c0-2.09 1.74-3.8 3.83-3.8h5.36V7.41c0-2.95-2.38-5.36-5.36-5.36zM9.54 3.7c.39 0 .7.31.7.7 0 .39-.31.7-.7.7-.39 0-.7-.31-.7-.7 0-.39.31-.7.7-.7z"/><path fill="#FFD43B" d="M11.99 21.95c5.46 0 5.23-2.37 5.23-2.37v-2.54h-5.36v-1.34h5.31c2.51 0 3.34-1.64 3.34-3.71s-.83-3.71-3.34-3.71h-1.34v2.37c0 2.09-1.74 3.8-3.83 3.8H6.64v2.14c0 2.95 2.38 5.36 5.36 5.36zM14.46 20.3c-.39 0-.7-.31-.7-.7 0-.39.31-.7.7-.7.39 0 .7.31.7.7 0 .39-.31.7-.7.7z"/></svg> },
  { label: 'SQL', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#4479A1" strokeWidth="2"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg> },
  { label: 'Excel', icon: <svg viewBox="0 0 24 24" fill="#217346"><rect width="24" height="24" rx="2"/><path fill="#fff" d="M14.8 12.1l4.5-6.8h-2.8l-2.9 5.1-3.1-5.1H7.8l4.4 6.8-4.7 7.2h2.8l3.3-5.5 3.3 5.5h2.8l-4.9-7.2z"/></svg> },
  { label: 'Notion', icon: <svg viewBox="0 0 24 24" fill="#000"><path d="M4.2 3.5l14.8-1v19l-14.8 1v-19zm2.4 3v13h2.1V9.2L14.4 18h2.6V6.5h-2.1v10.3L9.2 6.5H6.6z"/></svg> },
  { label: 'Google Drive', icon: <svg viewBox="0 0 24 24"><path fill="#FFC107" d="M8.3 22l-4.1-7.1L12.3 1h8.2L12.4 22z"/><path fill="#1976D2" d="M16.5 15l4.1 7.1H4.1l4.2-7.1h8.2z"/><path fill="#4CAF50" d="M8.2 22H0l8.2-14.2 4.1 7.1L8.2 22z"/></svg> },
  { label: 'Slack', icon: <svg viewBox="0 0 24 24" fill="#E01E5A"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg> },
  { label: 'Trello', icon: <svg viewBox="0 0 24 24" fill="#0052CC"><rect width="20" height="20" x="2" y="2" rx="3"/><rect width="5" height="11" x="6" y="6" fill="#fff" rx="1"/><rect width="5" height="7" x="13" y="6" fill="#fff" rx="1"/></svg> }
];

// --- 1. Web Dev Animated Terminal (Recreated Premium Layout) ---
const reactCodeSegments = [
  { text: "// Crafting a high-performance, immersive digital experience\n", style: "text-[#64748b] dark:text-[#94a3b8] italic mb-3 inline-block transition-colors" },
  { text: "import ", style: "text-[#f43f5e] dark:text-[#fb7185] transition-colors" },
  { text: "{ motion } ", style: "text-[#79c0ff] transition-colors" },
  { text: "from ", style: "text-[#f43f5e] dark:text-[#fb7185] transition-colors" },
  { text: "'framer-motion';\n", style: "text-[#0f766e] dark:text-[#2dd4bf] transition-colors" },
  { text: "import ", style: "text-[#f43f5e] dark:text-[#fb7185] transition-colors" },
  { text: "React ", style: "text-[#79c0ff] transition-colors" },
  { text: "from ", style: "text-[#f43f5e] dark:text-[#fb7185] transition-colors" },
  { text: "'react';\n\n", style: "text-[#0f766e] dark:text-[#2dd4bf] transition-colors" },
  { text: "export default function ", style: "text-[#f43f5e] dark:text-[#fb7185] transition-colors" },
  { text: "AgencyHero() {\n", style: "dark:text-[#f8fafc] font-bold transition-colors" },
  { text: "  return ", style: "text-[#f43f5e] dark:text-[#fb7185] transition-colors" },
  { text: "(\n    <", style: "text-[#c9d1d9] transition-colors" },
  { text: "motion.main\n", style: "text-[#7ee787] font-bold transition-colors" },
  { text: "      initial=", style: "text-[#79c0ff] transition-colors" }, { text: "{{ opacity: 0 }}\n", style: "text-[#d2a8ff] transition-colors" },
  { text: "      animate=", style: "text-[#79c0ff] transition-colors" }, { text: "{{ opacity: 1 }}\n", style: "text-[#d2a8ff] transition-colors" },
  { text: "      className=", style: "text-[#79c0ff] transition-colors" }, { text: "\"premium-dark-theme\"\n", style: "text-[#a5d6ff] transition-colors" },
  { text: "    >\n      <", style: "text-[#c9d1d9] transition-colors" },
  { text: "div ", style: "text-[#7ee787] font-bold transition-colors" }, { text: "className=", style: "text-[#79c0ff] transition-colors" }, { text: "\"mesh-gradient\" ", style: "text-[#a5d6ff] transition-colors" }, { text: "/>\n", style: "text-[#c9d1d9] transition-colors" },
  { text: "      <", style: "text-[#c9d1d9] transition-colors" }, { text: "h1 ", style: "text-[#7ee787] font-bold transition-colors" }, { text: "className=", style: "text-[#79c0ff] transition-colors" }, { text: "\"text-glowing\"\n", style: "text-[#a5d6ff] transition-colors" }, { text: "      >\n", style: "text-[#c9d1d9] transition-colors" },
  { text: "        Digital Excellence\n", style: "text-white font-extrabold transition-colors" },
  { text: "      </", style: "text-[#c9d1d9] transition-colors" }, { text: "h1", style: "text-[#7ee787] font-bold transition-colors" }, { text: ">\n", style: "text-[#c9d1d9] transition-colors" },
  { text: "    </", style: "text-[#c9d1d9] transition-colors" }, { text: "motion.main", style: "text-[#7ee787] font-bold transition-colors" }, { text: ">\n  );\n}", style: "text-[#c9d1d9] transition-colors" }
];
const totalReactChars = reactCodeSegments.reduce((sum, seg) => sum + seg.text.length, 0);

const WebDevAnimatedTerminal = () => {
  const [viewMode, setViewMode] = useState('code');
  const [mousePhase, setMousePhase] = useState('hidden');
  const [isFading, setIsFading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const codeContainerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const runCycle = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      while(mounted) {
        setViewMode('code'); setMousePhase('hidden'); setScrollTop(0); setIsFading(false); setCharIndex(0);
        await wait(500); if(!mounted) break;
        
        // Typing code smoothly & fast
        for(let i=1; i<=totalReactChars; i+=2) {
          if(!mounted) break; 
          setCharIndex(i);
          if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
          }
          await wait(20); 
        }
        if(mounted) setCharIndex(totalReactChars);
        await wait(1000); if(!mounted) break;
        
        // Cursor moves to toggle button
        setMousePhase('move_to_toggle'); await wait(1200); if(!mounted) break;
        
        // Clicks toggle button
        setMousePhase('click_toggle'); await wait(400); if(!mounted) break;
        
        // Fade to preview, hide cursor
        setIsFading(true); setMousePhase('hidden'); await wait(400); if(!mounted) break;
        setViewMode('preview'); setIsFading(false); await wait(1000); if(!mounted) break;
        
        // Auto scroll preview completely to bottom to showcase the beautiful page
        setScrollTop(350); await wait(5000); if(!mounted) break;
        
        // Scroll back up
        setScrollTop(0); await wait(2500); if(!mounted) break;
        
        // Cursor comes up to click back to Code
        setMousePhase('move_to_toggle_back'); await wait(1200); if(!mounted) break;
        setMousePhase('click_toggle_back'); await wait(400); if(!mounted) break;
        
        // Fade back to code
        setIsFading(true); setMousePhase('hidden'); await wait(400);
      }
    };
    runCycle();
    return () => { mounted = false; };
  }, []);

  const getMouseStyle = () => {
    const baseTransition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)"; 
    const fastTransition = "all 0.15s ease-in-out";
    
    switch(mousePhase) {
      case 'hidden': return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: fastTransition };
      case 'move_to_toggle': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_toggle': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_toggle_back': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_toggle_back': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(0.8)', transition: fastTransition };
      default: return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: baseTransition };
    }
  };

  const renderTypedText = () => {
    let rendered = []; let currentChars = 0;
    for (let i = 0; i < reactCodeSegments.length; i++) {
      const seg = reactCodeSegments[i]; const segLen = seg.text.length;
      if (charIndex >= currentChars + segLen) { 
        rendered.push(<span key={i} className={seg.style}>{seg.text}</span>); 
        currentChars += segLen; 
      } else { 
        const remaining = charIndex - currentChars; 
        if (remaining > 0) rendered.push(<span key={i} className={seg.style}>{seg.text.substring(0, remaining)}</span>); break; 
      }
    }
    return rendered;
  };

  return (
    <div className="w-full relative h-[380px] group transition-all duration-500 hover:-translate-y-2 perspective-1000">
      
      {/* Animated SVG Cursor */}
      <svg className="absolute z-50 pointer-events-none" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: 'top left', ...getMouseStyle() }}>
        <path d="M7.39999 21.05V3L21.5 12.06L14.15 13.3L16.27 19.95L13.14 20.95L11 14.28L7.39999 21.05Z" fill="#1e293b" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      
      <div className={`w-full h-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        
        {viewMode === 'code' ? (
          
          <div className="w-full h-full flex flex-col bg-[#0d1117] border border-slate-900 dark:border-white/30 rounded-[20px] overflow-hidden relative group">
            
            {/* Header: IDE */}
            <div className="h-12 border-b border-slate-700/80 flex items-center px-4 bg-[#161b22] shrink-0 justify-between relative z-30">
               <div className="flex gap-2 w-20">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
               </div>
               
               <div className="flex-1 flex justify-center opacity-80">
                  <span className="text-slate-400 text-[11px] font-mono tracking-wider flex items-center gap-2"><Code size={13} className="text-sky-400"/> AgencyHero.jsx</span>
               </div>
               
               <div className="w-24 flex justify-end">
                 <div className="px-3 py-1.5 rounded-lg text-white text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 bg-rose-500/90 border border-rose-400/50">
                   Preview
                 </div>
               </div>
            </div>
            
            {/* Body: IDE Line Numbers and Code */}
            <div className="flex-1 flex overflow-hidden relative pb-4">
                <div className="w-10 flex flex-col items-center py-6 bg-[#0d1117] border-r border-slate-800/80 text-xs text-slate-600 font-mono gap-[5px] select-none shrink-0 pr-1">
                  {Array.from({length: 15}).map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
                <div ref={codeContainerRef} className="flex-1 p-6 pt-6 font-mono text-[13px] leading-[1.7] text-slate-300 overflow-y-auto scroll-smooth whitespace-pre-wrap break-words [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="pb-8">{renderTypedText()}{charIndex < totalReactChars && <span className="inline-block w-2.5 h-4 bg-rose-400 animate-pulse align-middle ml-1" />}</div>
                </div>
            </div>
            
          </div>
          
        ) : (
            
          <div className="w-full h-full flex flex-col bg-[#0f172a] border border-slate-900 dark:border-white/30 rounded-[20px] overflow-hidden relative group">
            
            {/* Header: Browser Canvas */}
            <div className="h-12 border-b border-slate-800/80 flex items-center px-4 bg-slate-900 shrink-0 justify-between relative z-40 backdrop-blur-xl">
               <div className="flex gap-2 w-20">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
               </div>
               
               <div className="flex-1 flex justify-center">
                  <div className="w-full max-w-[220px] h-7 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                    <span className="text-[10px] font-medium text-slate-400 font-mono flex items-center gap-1.5"><Globe size={10} className="text-slate-500"/> next-gen-agency.dev</span>
                  </div>
               </div>
               
               <div className="w-24 flex justify-end">
                 <div className="px-3 py-1.5 rounded-lg text-white text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 bg-sky-600/90 border border-sky-500/50">
                   Code
                 </div>
               </div>
            </div>
            
            {/* Body: scrolling beautifully crafted site */}
            <div className="flex-1 overflow-hidden relative bg-[#0B0F19]">
              <div className="w-full transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] duration-[5000ms]" style={{ transform: `translateY(-${scrollTop}px)` }}>
                
                {/* 1. Hero Section */}
                <div className="relative h-[250px] w-full flex flex-col items-center justify-center overflow-hidden">
                   {/* No decorative background circles */}
                   
                   <div className="relative z-10 flex flex-col items-center text-center px-6">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-indigo-400 mb-2 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">V2.0 Launched</span>
                      <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">Immersive<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">Digital Design</span></h2>
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-5"></div>
                      <div className="px-6 py-2.5 bg-white text-slate-900 text-[11px] font-bold rounded-lg">Get Started</div>
                   </div>
                   
                   {/* Hero Bottom fading overlay */}
                   <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#0B0F19] to-transparent z-10"></div>
                </div>

                {/* 2. Bento Grid Section */}
                <div className="py-6 px-6 w-full flex flex-col gap-4 z-20 relative">
                   <div className="grid grid-cols-2 gap-4 h-36">
                       {/* Bento item 1 */}
                       <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4 flex flex-col justify-end backdrop-blur-md relative overflow-hidden group/card">
                           <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-sky-500/20 rounded-full group-hover/card:scale-150 transition-transform duration-700"></div>
                           <Layers size={20} className="text-sky-400 absolute top-4 left-4" />
                           <h3 className="text-white font-bold text-sm tracking-tight mb-1">Architecture</h3>
                           <p className="text-slate-400 text-[10px] leading-snug font-medium">Scalable structures built to perform universally.</p>
                       </div>
                       {/* Bento item 2 */}
                       <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4 flex flex-col justify-end backdrop-blur-md relative overflow-hidden group/card">
                           <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-rose-500/20 rounded-full group-hover/card:scale-150 transition-transform duration-700"></div>
                           <Zap size={20} className="text-rose-400 absolute top-4 left-4" />
                           <h3 className="text-white font-bold text-sm tracking-tight mb-1">Performance</h3>
                           <p className="text-slate-400 text-[10px] leading-snug font-medium">Lightning-fast delivery with optimized assets.</p>
                       </div>
                   </div>
                   
                   {/* Wide Bento Item */}
                   <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md relative overflow-hidden h-28">
                       <div className="absolute left-[-20%] bottom-[-50%] w-full h-full bg-emerald-500/10 rotate-12 pointer-events-none"></div>
                       <div className="flex flex-col flex-1">
                          <h3 className="text-white font-extrabold text-base mb-1">Security Standard</h3>
                          <div className="h-2 w-32 bg-slate-700 rounded-full overflow-hidden mt-1"><div className="h-full w-[80%] bg-emerald-400"></div></div>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} className="text-emerald-400"/>
                       </div>
                   </div>
                </div>

                {/* 3. Footer / Bottom Visual */}
                <div className="h-[200px] w-full flex flex-col items-center justify-center relative bg-[#070b14] mt-4 border-t border-slate-800/80">
                   <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center mb-4"><span className="text-white text-xs font-serif font-bold italic">K</span></div>
                   <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Bringing Visions to Life</div>
                </div>
                
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};



// --- 2. Designing Animated Terminal (Clean Premium Layout) ---
const DesigningAnimatedTerminal = () => {
  const [viewMode, setViewMode] = useState('workspace');
  const [mousePhase, setMousePhase] = useState('hidden');
  const [isFading, setIsFading] = useState(false);
  const [canvasStep, setCanvasStep] = useState(0);

  useEffect(() => {
    let mounted = true;
    const runCycle = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      while(mounted) {
        setViewMode('workspace'); setMousePhase('hidden'); setIsFading(false); setCanvasStep(0);
        await wait(800); if(!mounted) break;
        
        // 1. Move to Shape Tool (Top Bar)
        setMousePhase('move_to_shape'); await wait(1000); if(!mounted) break;
        setMousePhase('click_shape'); await wait(300); if(!mounted) break;
        
        // 2. Draw on Canvas
        setMousePhase('move_to_canvas'); await wait(1000); if(!mounted) break;
        setCanvasStep(1); // Box structure appears
        setMousePhase('drag_canvas'); await wait(800); if(!mounted) break;
        
        // 3. Move to Color Picker (Top Bar)
        setMousePhase('move_to_color'); await wait(1000); if(!mounted) break;
        setMousePhase('click_color'); await wait(300); if(!mounted) break;
        setCanvasStep(2); // Fills with gradient and text
        await wait(1200); if(!mounted) break;
        
        // 4. Move to Export / Present Button
        setMousePhase('move_to_present'); await wait(1200); if(!mounted) break;
        setMousePhase('click_present'); await wait(400); if(!mounted) break;
        
        // 5. Fade to Presentation Mode
        setIsFading(true); setMousePhase('hidden'); await wait(400); if(!mounted) break;
        setViewMode('presentation'); setIsFading(false); await wait(1000); if(!mounted) break;
        
        // Stay in Presentation
        setCanvasStep(3); // Trigger extra glowing/floating animation
        await wait(6000); if(!mounted) break;
        
        // 6. Move to Close
        setMousePhase('move_to_close'); await wait(1200); if(!mounted) break;
        setMousePhase('click_close'); await wait(400); if(!mounted) break;
        
        // Fade back
        setIsFading(true); setMousePhase('hidden'); await wait(400);
      }
    };
    runCycle();
    return () => { mounted = false; };
  }, []);

  const getMouseStyle = () => {
    const baseTransition = "all 0.9s cubic-bezier(0.3, 1, 0.4, 1)"; 
    const fastTransition = "all 0.15s ease-in-out";
    
    switch(mousePhase) {
      case 'hidden': return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: fastTransition };
      case 'move_to_shape': return { opacity: 1, top: '24px', left: 'calc(50% - 40px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_shape': return { opacity: 1, top: '24px', left: 'calc(50% - 40px)', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_canvas': return { opacity: 1, top: '115px', left: '12.5%', transform: 'scale(1)', transition: baseTransition };
      case 'drag_canvas': return { opacity: 1, top: '314px', left: '87.5%', transform: 'scale(0.8)', transition: "all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)" };
      case 'move_to_color': return { opacity: 1, top: '24px', left: 'calc(50% + 40px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_color': return { opacity: 1, top: '24px', left: 'calc(50% + 40px)', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_present': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_present': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_close': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_close': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(0.8)', transition: fastTransition };
      default: return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: baseTransition };
    }
  };

  return (
    <div className="w-full relative h-[380px] group transition-all duration-500 hover:-translate-y-2 perspective-1000">
      
      {/* Animated SVG Cursor */}
      <svg className="absolute z-[100] pointer-events-none" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: 'top left', ...getMouseStyle() }}>
        <path d="M7.39999 21.05V3L21.5 12.06L14.15 13.3L16.27 19.95L13.14 20.95L11 14.28L7.39999 21.05Z" fill="#1e293b" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      
      <div className={`w-full h-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        
        {viewMode === 'workspace' ? (
          
          /* Clean Minimalist Workspace */
          <div className="w-full h-full flex flex-col bg-[#0F1115] border border-slate-900 dark:border-white/30 rounded-[20px] overflow-hidden relative group">
            
            {/* Minimal Topbar */}
            <div className="h-12 border-b border-[#252830] flex items-center px-4 bg-[#14161C] shrink-0 justify-between relative z-40">
               <div className="flex gap-2 w-24">
                  <div className="w-3 h-3 rounded-full bg-[#f46b5d]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f9bd4e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#57c353]"></div>
               </div>
               
               <div className="flex-1 flex gap-2 justify-center items-center text-[#7C859D]">
                 <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${canvasStep === 1 ? 'bg-[#2B2F3A] text-white' : 'hover:bg-[#1E2028]'}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>
                 <div className="w-8 h-8 rounded flex items-center justify-center hover:bg-[#1E2028]"><span className="text-sm font-extrabold leading-none">T</span></div>
                 <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${canvasStep === 2 ? 'bg-[#2B2F3A] text-white' : 'hover:bg-[#1E2028]'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
               </div>
               
               <div className="w-24 flex justify-end">
                 <div className="px-3 py-1.5 rounded-md text-white text-[10px] uppercase tracking-wider font-bold transition-all duration-300 bg-sky-500/90 hover:bg-sky-400">
                   Export
                 </div>
               </div>
            </div>
            
            {/* Center Canvas */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(#252830_1px,transparent_1px)] [background-size:24px_24px]">
               
               {/* Frame Outline (Step 1+) */}
               <div className={`absolute left-[12.5%] top-[20%] transition-all z-20 ${canvasStep === 0 ? 'w-0 h-0 opacity-0' : canvasStep === 1 ? 'w-[75%] h-[60%] border-2 border-dashed border-sky-400/50 bg-sky-400/5 rounded-2xl opacity-100 flex items-center justify-center' : 'w-[75%] h-[60%] border-none rounded-2xl opacity-100 overflow-hidden bg-[#0A0F1D]'}`} style={{transitionDuration: canvasStep === 1 ? '900ms' : '800ms', transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'}}>
                   
                   {canvasStep === 1 && (
                      <span className="text-[10px] font-mono text-sky-400/80 uppercase">New Frame</span>
                   )}

                   {/* Painted Elements (Step 2+) */}
                   {canvasStep >= 2 && (
                      <div className="w-full h-full flex flex-col items-center justify-center relative p-6">
                        {/* No decorative background circles */}
                        
                        <div className="relative z-10 w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-200">
                           <div className="w-12 h-12 bg-white/10 rounded-xl border border-white/20 mb-4 backdrop-blur-sm flex items-center justify-center"><Zap size={20} className="text-yellow-400"/></div>
                           <h3 className="text-lg sm:text-2xl font-extrabold text-white text-center leading-tight mb-2">High Fidelity<br/>Visuals</h3>
                           <div className="h-1.5 w-16 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full"></div>
                        </div>
                      </div>
                   )}

               </div>
            </div>
            
          </div>
          
        ) : (
            
          /* Presentation Mode (Premium Showcase perfectly visible) */
          <div className="w-full h-full flex flex-col bg-black border border-slate-900 dark:border-white/30 rounded-[20px] overflow-hidden relative group">
            
            {/* Header: Viewer */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 bg-white/5 backdrop-blur-xl shrink-0 justify-between relative z-40">
               <div className="flex flex-col gap-0.5 w-24">
                  <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Preview</div>
               </div>
               
               <div className="flex-1 flex justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
               </div>
               
               <div className="w-24 flex justify-end">
                 <div className="px-3 py-1.5 rounded-md text-slate-300 text-[10px] uppercase tracking-wider font-bold transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white">
                   Close
                 </div>
               </div>
            </div>
            
            {/* Body: Full Premium Immersive View */}
            <div className="flex-1 relative overflow-hidden bg-[#020205] flex items-center justify-center perspective-1000">
               
               {/* Animated Background Mesh */}
               <div className="absolute inset-0 z-0">
                  <div className={`absolute top-0 left-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900/10 to-[#020205] -translate-x-1/4 -translate-y-1/4 transition-transform duration-[6000ms] ${canvasStep === 3 ? 'scale-110' : 'scale-100'}`}></div>
               </div>

               {/* Floating Premium Card */}
               <div className={`w-[85%] h-[80%] rounded-[24px] border border-white/10 p-1 flex flex-col relative z-20 transition-all ease-out bg-gradient-to-b from-white/10 to-transparent backdrop-blur-3xl overflow-hidden ${canvasStep === 3 ? 'rotate-y-[-4deg] rotate-x-[4deg] scale-[1.02]' : ''}`} style={{transitionDuration: '4s'}}>
                   
                   <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10 pointer-events-none"></div>
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                   
                   {/* Card Content rendered out perfectly */}
                   <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0A0F1D]/60 rounded-[20px] relative overflow-hidden">
                       {/* No decorative background circles */}
                       
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-5">
                           <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-[1.2rem] border border-white/20 backdrop-blur-md flex items-center justify-center">
                              <Zap size={28} className="text-yellow-400"/>
                           </div>
                           
                           <div className="flex flex-col items-center text-center gap-1.5">
                               <h2 className="text-[32px] sm:text-[40px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight leading-[1.1]">
                                  High Fidelity<br/>Visuals
                               </h2>
                               <p className="text-slate-400 text-[11px] font-medium tracking-wide max-w-[200px]">Next-generation interfaces crafted with endless precision.</p>
                           </div>
                           
                           <div className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-transform mt-2">
                              Explore Now
                           </div>
                       </div>
                   </div>
               </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. Data Solutions Terminal (Premium Office Data Suite) ---
const ExcelIcon = ({ size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" fill="#059669"/><path d="M7 6H17V18H7V6Z" fill="white"/><path d="M10 9L14 15M14 9L10 15" stroke="#059669" strokeWidth="2" strokeLinecap="round"/></svg>);
const DocIcon = ({ size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" fill="#2563EB"/><path d="M7 6H17V18H7V6Z" fill="white"/><path d="M9 10L10.5 15L12 11L13.5 15L15 10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);

const DataSolutionsAnimatedTerminal = () => {
  const [viewMode, setViewMode] = useState('sheet'); // 'sheet' or 'report'
  const [mousePhase, setMousePhase] = useState('hidden');
  const [isFading, setIsFading] = useState(false);
  const [dataStep, setDataStep] = useState(0);

  useEffect(() => {
    let mounted = true;
    const runCycle = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      while(mounted) {
        setViewMode('sheet'); setMousePhase('hidden'); setIsFading(false); setDataStep(0);
        await wait(800); if(!mounted) break;
        
        // 1. Move to a Cell
        setMousePhase('move_to_cell'); await wait(1000); if(!mounted) break;
        setMousePhase('click_cell'); await wait(300); if(!mounted) break;
        setDataStep(1); // Cell turns green/processing
        await wait(800); if(!mounted) break;
        
        // 2. Move to "Generate Report"
        setMousePhase('move_to_generate'); await wait(1000); if(!mounted) break;
        setMousePhase('click_generate'); await wait(300); if(!mounted) break;
        
        // 3. Fade to Document Reporting
        setIsFading(true); setMousePhase('hidden'); await wait(400); if(!mounted) break;
        setViewMode('report'); setIsFading(false); await wait(600); if(!mounted) break;
        
        // 4. Type out report content magically
        setDataStep(2); 
        await wait(5500); if(!mounted) break;
        
        // 5. Move to Share Button
        setMousePhase('move_to_share'); await wait(1200); if(!mounted) break;
        setMousePhase('click_share'); await wait(400); if(!mounted) break;
        
        // Fade back
        setIsFading(true); setMousePhase('hidden'); await wait(400);
      }
    };
    runCycle();
    return () => { mounted = false; };
  }, []);

  const getMouseStyle = () => {
    const baseTransition = "all 0.9s cubic-bezier(0.3, 1, 0.4, 1)"; 
    const fastTransition = "all 0.15s ease-in-out";
    
    switch(mousePhase) {
      case 'hidden': return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: fastTransition };
      case 'move_to_cell': return { opacity: 1, top: '168px', left: '70%', transform: 'scale(1)', transition: baseTransition };
      case 'click_cell': return { opacity: 1, top: '168px', left: '70%', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_generate': return { opacity: 1, top: '24px', left: 'calc(100% - 100px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_generate': return { opacity: 1, top: '24px', left: 'calc(100% - 100px)', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_share': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(1)', transition: baseTransition };
      case 'click_share': return { opacity: 1, top: '24px', left: 'calc(100% - 60px)', transform: 'scale(0.8)', transition: fastTransition };
      default: return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: baseTransition };
    }
  };

  return (
    <div className="w-full relative h-[380px] group transition-all duration-500 hover:-translate-y-2 perspective-1000">
      
      {/* Animated SVG Cursor */}
      <svg className="absolute z-[100] pointer-events-none" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: 'top left', ...getMouseStyle() }}>
        <path d="M7.39999 21.05V3L21.5 12.06L14.15 13.3L16.27 19.95L13.14 20.95L11 14.28L7.39999 21.05Z" fill="#1e293b" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      
      <div className={`w-full h-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        
        {viewMode === 'sheet' ? (
          
          /* Modern Data Spreadsheet */
          <div className="w-full h-full flex flex-col bg-[#0F1115] border border-slate-900 dark:border-white/30 rounded-[20px] overflow-hidden relative group">
            
            {/* Minimal Topbar */}
            <div className="h-12 border-b border-[#252830] flex items-center px-4 bg-[#14161C] shrink-0 justify-between relative z-40">
               <div className="flex gap-2 w-24">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
               </div>
               
               <div className="flex-1 flex justify-center items-center">
                 <div className="flex bg-[#252830] px-3 py-1.5 rounded-md border border-slate-700/50 items-center gap-2">
                    <ExcelIcon />
                    <span className="text-[11px] font-bold text-slate-200">Q3_Operations.xlsx</span>
                 </div>
               </div>
               
               <div className="w-36 flex justify-end">
                 <div className="px-3 py-1.5 rounded-md text-white text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 bg-emerald-600/90 border border-emerald-500/50 hover:bg-emerald-500 flex items-center gap-1.5">
                   <Zap size={10} className="fill-white"/> Auto-Report
                 </div>
               </div>
            </div>
            
            {/* Sheet Content area */}
            <div className="flex-1 relative overflow-hidden flex flex-col bg-[#14161C]">
               {/* Formula bar */}
               <div className="h-8 border-b border-[#252830] bg-[#1A1D24] px-4 flex items-center gap-2">
                 <span className="text-slate-400 font-mono text-xs italic">fx</span>
                 <div className="h-5 w-px bg-slate-700 mx-1"></div>
                 <span className="text-slate-300 font-mono text-[11px] tracking-wider">=SUM(B2:B12) * INDEX(Data,1)</span>
               </div>
               
               {/* Table Headers */}
               <div className="flex h-8 bg-[#1B1E26] border-b border-[#2B2F3A] text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <div className="w-12 border-r border-[#2B2F3A] flex items-center justify-center bg-[#15171D]"></div>
                 <div className="flex-1 border-r border-[#2B2F3A] flex items-center px-4">Client Name</div>
                 <div className="flex-[0.8] border-r border-[#2B2F3A] flex items-center px-4">Revenue</div>
                 <div className="flex-[0.8] flex items-center px-4">Status</div>
               </div>

               {/* Table Rows */}
               <div className="flex flex-col flex-1 pb-4">
                  {[
                    { c: 'Nexus Corp', v: '$45,000', s: 'Complete' },
                    { c: 'Stark Industries', v: '$124,000', s: 'Pending' },
                    { c: 'Wayne Tech', v: '$89,500', s: 'Processing' },
                    { c: 'Oscorp', v: '$12,000', s: 'Complete' },
                    { c: 'Aperture Science', v: '$67,000', s: 'In Review' },
                  ].map((row, i) => (
                    <div key={i} className={`flex h-10 border-b border-[#1E212A] text-[12px] group/row transition-colors ${i === 1 && dataStep === 1 ? 'bg-emerald-500/10' : 'hover:bg-[#1A1D24]'}`}>
                      <div className="w-12 border-r border-[#1E212A] flex items-center justify-center text-slate-600 text-[10px] font-mono group-hover/row:text-emerald-400 transition-colors">
                        {i + 1}
                      </div>
                      <div className="flex-1 border-r border-[#1E212A] flex items-center px-4 font-bold text-slate-300">
                        {row.c}
                      </div>
                      <div className="flex-[0.8] border-r border-[#1E212A] flex items-center px-4 font-mono text-xs text-slate-400">
                        {row.v}
                      </div>
                      <div className="flex-[0.8] flex items-center px-4 relative">
                        {i === 1 && dataStep === 1 ? (
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">Approved</span>
                        ) : (
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400`}>{row.s}</span>
                        )}
                        {/* Glow effect on cell click */}
                        {i === 1 && dataStep === 1 && (
                            <div className="absolute inset-0 border-2 border-emerald-500 z-10"></div>
                        )}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
            
          </div>
          
        ) : (
            
          /* Modern Report View (Notion/Doc Style) */
          <div className="w-full h-full flex flex-col bg-[#050B14] border border-[#152336] rounded-[20px] overflow-hidden relative group">
            
            {/* Header: Viewer */}
            <div className="h-12 border-b border-[#152336] flex items-center px-4 bg-[#0A111C]/80 backdrop-blur-xl shrink-0 justify-between relative z-40">
               <div className="flex flex-col gap-0 w-32">
                  <div className="text-[10px] text-blue-400 font-bold tracking-widest uppercase flex items-center gap-1"><DocIcon/> Document</div>
               </div>
               
               <div className="flex-1 flex justify-center">
                   <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[10px] font-bold text-slate-300 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      GENERATING INSIGHTS
                   </div>
               </div>
               
               <div className="w-32 flex justify-end">
                 <div className="px-3 py-1.5 rounded-md text-white text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 bg-blue-600 hover:bg-blue-500 flex items-center">
                   Share
                 </div>
               </div>
            </div>
            
            {/* Body: Document Canvas */}
            <div className="flex-1 relative overflow-hidden bg-[#0F131A] p-6 lg:p-8 flex flex-col perspective-1000">
               
               <div className="absolute top-[-50px] left-[-30px] w-64 h-64 bg-blue-600/10 rounded-full"></div>

               {/* Document Base */}
               <div className="w-full max-w-sm mx-auto h-full flex flex-col pt-2 relative z-10 animate-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-2xl font-serif text-slate-100 font-bold mb-4 flex items-center gap-3">
                    Q3 Operations Report
                  </h2>
                  
                  {dataStep === 2 && (
                    <div className="flex flex-col gap-3">
                       {/* Animated text line 1 */}
                       <div className="h-4 w-[90%] bg-slate-800 rounded animate-pulse overflow-hidden relative">
                         <div className="absolute top-0 left-0 h-full bg-blue-500/20 w-[60%] slide-right-fast"></div>
                       </div>
                       {/* Animated text line 2 */}
                       <div className="h-4 w-[75%] bg-slate-800 rounded animate-pulse overflow-hidden relative">
                         <div className="absolute top-0 left-0 h-full bg-blue-500/20 w-[40%] slide-right-fast"></div>
                       </div>
                       
                       {/* Mini Dashboard inserted into Document */}
                       <div className="w-full mt-4 bg-[#141924] border border-[#1F2636] rounded-xl p-4 flex items-center gap-4 animate-in zoom-in-95 delay-500 duration-500 fill-mode-both">
                          <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 flex items-center justify-center">
                             <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-white font-bold text-[10px]">94%</div>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-slate-200 text-sm font-bold">Target Achieved</span>
                             <span className="text-slate-500 text-[10px] font-medium">+15% comparing to Q2 data.</span>
                          </div>
                       </div>
                       
                       {/* Animated text line 3 */}
                       <div className="h-4 w-[85%] bg-slate-800 rounded animate-pulse overflow-hidden relative mt-4"></div>
                       <div className="h-4 w-[40%] bg-slate-800 rounded animate-pulse overflow-hidden relative"></div>
                    </div>
                  )}
               </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. Admin Support Terminal (Premium Command Center) ---
const AdminSupportAnimatedTerminal = () => {
  const [view, setView] = useState('list'); // 'list' or 'task'
  const [mousePhase, setMousePhase] = useState('hidden');
  const [isFading, setIsFading] = useState(false);
  const [taskState, setTaskState] = useState('pending'); // 'pending' | 'hovered' | 'approved'
  const [showNotif, setShowNotif] = useState(false);
  const [notifOffset, setNotifOffset] = useState(0);

  useEffect(() => {
    let mounted = true;
    const runCycle = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      while(mounted) {
        // RESET STATE
        setView('list'); setMousePhase('hidden'); setIsFading(false); setTaskState('pending'); setShowNotif(false); setNotifOffset(0);
        await wait(800); if(!mounted) break;
        
        // 1. Move to QA Audit Task
        setMousePhase('move_to_task'); await wait(1000); if(!mounted) break;
        setTaskState('hovered'); await wait(400); if(!mounted) break;
        setMousePhase('click_task'); await wait(300); if(!mounted) break;
        
        // 2. Open Task Workspace
        setIsFading(true); setMousePhase('hidden'); await wait(400); if(!mounted) break;
        setView('task'); setIsFading(false); await wait(600); if(!mounted) break;
        
        // 3. Move to Complete Button
        setMousePhase('move_to_button'); await wait(1000); if(!mounted) break;
        setMousePhase('hover_button'); await wait(400); if(!mounted) break;
        setMousePhase('click_button'); await wait(300); if(!mounted) break;
        
        // 4. Processing & Success
        setTaskState('approved'); setShowNotif(true); await wait(1500); if(!mounted) break;
        
        // 5. Swipe Notification Away
        setMousePhase('move_to_notif'); await wait(800); if(!mounted) break;
        setMousePhase('swipe_notif_start'); await wait(200); if(!mounted) break;
        setMousePhase('swipe_notif_end'); setNotifOffset(120); await wait(400); if(!mounted) break;
        setShowNotif(false); await wait(500); if(!mounted) break;
        
        // 6. Return to List
        setIsFading(true); setMousePhase('hidden'); await wait(400); if(!mounted) break;
      }
    };
    runCycle();
    return () => { mounted = false; };
  }, []);

  const getMouseStyle = () => {
    const baseTransition = "all 0.9s cubic-bezier(0.3, 1, 0.4, 1)"; 
    const fastTransition = "all 0.15s ease-in-out";
    const swipeTransition = "all 0.4s ease-out";
    
    switch(mousePhase) {
      case 'hidden': return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: fastTransition };
      case 'move_to_task': return { opacity: 1, top: '185px', left: '40%', transform: 'scale(1)', transition: baseTransition };
      case 'click_task': return { opacity: 1, top: '185px', left: '40%', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_button': return { opacity: 1, top: '280px', left: '50%', transform: 'scale(1)', transition: baseTransition };
      case 'hover_button': return { opacity: 1, top: '280px', left: '50%', transform: 'scale(1)', transition: fastTransition };
      case 'click_button': return { opacity: 1, top: '280px', left: '50%', transform: 'scale(0.8)', transition: fastTransition };
      case 'move_to_notif': return { opacity: 1, top: '80px', left: '70%', transform: 'scale(1)', transition: baseTransition };
      case 'swipe_notif_start': return { opacity: 1, top: '80px', left: '70%', transform: 'scale(0.9)', transition: fastTransition };
      case 'swipe_notif_end': return { opacity: 0, top: '80px', left: '85%', transform: 'scale(0.9)', transition: swipeTransition };
      default: return { opacity: 0, top: '90%', left: '50%', transform: 'scale(1)', transition: baseTransition };
    }
  };

  return (
    <div className="w-full relative h-[380px] group transition-all duration-500 hover:-translate-y-2 perspective-1000">
      <div className={`w-full h-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full h-full flex flex-col bg-[#050914] border border-[#141C2B] rounded-[20px] overflow-hidden relative group">
           
           {/* Animated SVG Cursor (Moved INSIDE overflow-hidden box!) */}
           <svg className="absolute z-[100] pointer-events-none" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: 'top left', ...getMouseStyle() }}>
             <path d="M7.39999 21.05V3L21.5 12.06L14.15 13.3L16.27 19.95L13.14 20.95L11 14.28L7.39999 21.05Z" fill="#1e293b" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
           </svg>

           {/* Common Mockup Topbar */}
           <div className="h-12 border-b border-[#141C2B] flex items-center px-4 bg-[#0A0D14] shrink-0 justify-between relative z-40">
              <div className="flex gap-2 w-24">
                 <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              
              <div className="flex-1 flex justify-center">
                 <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} className="text-blue-400" />
                    Admin Command
                 </div>
              </div>
              
              <div className="w-24"></div>
           </div>

           {/* Floating Notification */}
           {showNotif && (
             <div 
               className="absolute top-16 right-4 z-50 transition-transform duration-400 ease-out"
               style={{ transform: `translateX(${notifOffset}%)`, opacity: notifOffset > 50 ? 0 : 1 }}
             >
               <div className="flex items-center gap-3 bg-[#0A0D14]/90 backdrop-blur-md border border-emerald-500/30 px-4 py-3 rounded-xl animate-in slide-in-from-right-8 duration-300">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                     <CheckCircle size={16} />
                  </div>
                  <div className="flex flex-col pr-2">
                     <span className="text-[11px] font-bold text-slate-200 uppercase tracking-widest leading-none">Task Completed</span>
                     <span className="text-[9px] text-emerald-400/80 font-medium">Audit report dispatched.</span>
                  </div>
               </div>
             </div>
           )}

           <div className="flex-1 relative overflow-hidden bg-[#050914]">
             {view === 'list' ? (
                /* Task Queue View */
                <div className="p-6 h-full flex flex-col pt-8">
                   <div className="flex justify-between items-end mb-6">
                      <div>
                        <h3 className="text-xl font-black text-white tracking-tight mb-1">Queue</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">3 Tasks prioritize today</p>
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">Sort: Priority</div>
                   </div>

                   <div className="flex flex-col gap-3">
                      {/* Task 1: QA Audit */}
                      <div className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border ${taskState === 'hovered' ? 'bg-[#0A0D14] border-blue-500/40 scale-[1.01]' : 'bg-[#0A0D14]/50 border-[#141C2B] hover:border-white/10'}`}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${taskState === 'hovered' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                            <ShieldCheck size={22} />
                         </div>
                         <div className="flex-1 flex flex-col">
                            <h4 className={`text-sm font-bold transition-colors ${taskState === 'hovered' ? 'text-white' : 'text-slate-300'}`}>Quality Assurance Audit</h4>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-widest"><span className="text-amber-500">High Priority</span> • pending</p>
                         </div>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-opacity ${taskState === 'hovered' ? 'opacity-100 bg-white/10' : 'opacity-0'}`}>
                            <ChevronRight size={16} className="text-white" />
                         </div>
                      </div>

                      {/* Task 2: Background noise */}
                      <div className="p-4 rounded-2xl flex items-center gap-4 bg-[#0A0D14]/50 border border-[#141C2B] opacity-50">
                         <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                            <Database size={22} />
                         </div>
                         <div className="flex-1 flex flex-col">
                            <div className="w-32 h-3 bg-slate-700/50 rounded-full mb-2"></div>
                            <div className="w-20 h-2 bg-slate-800 rounded-full"></div>
                         </div>
                      </div>
                   </div>
                </div>
             ) : (
                /* Task Detail Workspace Mode */
                <div className="p-6 h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
                   <div className="w-full max-w-sm bg-[#0A0D14] border border-[#141C2B] rounded-3xl p-5 relative overflow-hidden">
                      {/* Background Glares */}
                      {/* No decorative background circles */}

                      <div className="relative z-10 flex flex-col items-center text-center">
                         <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-3 border border-blue-500/20">
                            <ShieldCheck size={28} />
                         </div>
                         <h2 className="text-lg font-black text-white mb-2">Quality Assurance Audit</h2>
                         <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-4 px-2 leading-relaxed">
                            Internal System Check #QA-812 <br/> Required before end of day.
                         </p>

                         {/* Action Button */}
                         <div className={`w-full py-3 rounded-xl font-black uppercase text-[11px] tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                            ${taskState === 'approved' 
                               ? 'bg-emerald-500 text-white' 
                               : mousePhase === 'hover_button' 
                                  ? 'bg-emerald-500/90 text-white scale-[1.02]' 
                                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}>
                            
                            {taskState === 'approved' ? (
                               <><CheckCircle size={14} className="animate-in zoom-in duration-300"/> Audit Complete</>
                            ) : (
                               <><CheckCircle size={14} /> Mark as Resolved</>
                            )}
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div> Secure Admin Session Active
                   </div>
                </div>
             )}
           </div>

        </div>
      </div>
    </div>
  );
};

const row1Badges = [...integrationBadges];
const row2Badges = [...integrationBadges].reverse();
const row3Badges = [...integrationBadges.slice(7), ...integrationBadges.slice(0, 7)];

const BadgeItem = ({ badge }) => (
  <div className="flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-[#0a0a0a] border border-slate-900 dark:border-white/30 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0">
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">{badge.icon}</div>
    <span className="text-[15px] font-medium text-slate-600 dark:text-[#94a3b8] tracking-tight whitespace-nowrap">{badge.label}</span>
  </div>
);

// --- 5. Work Process Section ---
const WorkProcessSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Advance the spark every 3.5 seconds down the sequence infinitely.
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workProcessSteps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full relative py-20 mt-16 flex flex-col items-center overflow-hidden">
      <style>{`
        .draw-icon {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawOutline 1s ease-out forwards;
        }
        @keyframes drawOutline {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fallSpark {
          0% { height: 0%; top: 0; opacity: 0; }
          20% { height: 100%; top: 0; opacity: 1; }
          80% { height: 100%; top: 0; opacity: 1; }
          100% { height: 0%; top: 100%; opacity: 0; }
        }
      `}</style>
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1200px] z-10 flex flex-col">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-24">
          <div className="flex flex-col items-start text-left shrink-0">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 w-max rounded-xl bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] mb-6">
              <Zap size={12} className="animate-pulse" /> Work Process
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              The Blueprint to<br/><span className="text-[#e94351]">Digital Excellence.</span>
            </h3>
          </div>
          <div className="flex-1 flex md:justify-end text-left md:text-right pt-2 md:pt-0">
            <p className="text-[15px] sm:text-[16px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm ml-auto">
              A clear, step-by-step roadmap from your first idea to the final live product. Watch how it works below.
            </p>
          </div>
        </div>

        <div className="relative w-full py-0">
          <div className="flex flex-col gap-16 md:gap-24 relative">
            {workProcessSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeIndex === index;
              const isPast = activeIndex > index; // Highlight completed steps

              return (
                <div key={index} className={`flex flex-col md:flex-row items-center w-full relative group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Vertical line traveling to NEXT node - exactly contained between circles */}
                  {index < workProcessSteps.length - 1 && (
                    <div className="absolute left-[36px] md:left-1/2 top-[calc(50%+32px)] w-[2px] h-full md:h-[calc(100%+32px)] bg-slate-200 dark:bg-white/5 transform -translate-x-1/2 z-0 overflow-hidden">
                      {isActive && (
                        <div className="absolute -left-px w-[4px] bg-gradient-to-b from-transparent via-[#e94351] to-transparent rounded-full z-10" style={{ animation: 'fallSpark 1.5s ease-in-out 1.5s forwards' }}></div>
                      )}
                    </div>
                  )}
                  
                  {/* Big Glowing Node on Spine with Icon! */}
                  <div className={`absolute left-[36px] md:left-1/2 top-1/2 w-16 h-16 rounded-full flex items-center justify-center border-[3px] transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ease-in-out ${
                    isActive 
                        ? 'bg-white dark:bg-[#0a0203] border-[#e94351] scale-110' 
                        : isPast 
                          ? 'bg-white dark:bg-[#030303] border-[#e94351]/40'
                          : 'bg-white dark:bg-[#030303] border-slate-200 dark:border-white/10'
                    }`}>
                      <step.icon 
                        size={28} 
                        className={`transition-colors duration-500 ${isActive ? 'text-[#e94351] draw-icon' : isPast ? 'text-[#e94351]/40' : 'text-slate-300 dark:text-slate-700'}`} 
                      />
                  </div>
                  
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                  
                  <div className={`w-full pl-[90px] md:pl-0 md:w-1/2 ${isEven ? 'md:pr-24 lg:pr-32 text-left' : 'md:pl-24 lg:pl-32 text-left'}`}>
                    <div className={`bg-white dark:bg-[#030303] p-8 sm:p-10 rounded-[32px] border transition-all duration-700 relative overflow-hidden ${isActive ? 'border-[#e94351] -translate-y-2' : 'border-slate-900 dark:border-white/30 hover:border-slate-800 dark:hover:border-white/40'}`}>
                      
                      {/* Live Connecting Horizontal Line Component */}
                      <div className={`hidden md:block absolute top-1/2 w-20 lg:w-28 h-[3px] overflow-hidden transition-all duration-700 transform -translate-y-1/2 ${isEven ? '-right-20 lg:-right-28' : '-left-20 lg:-left-28'}`}>
                         <div className={`w-full h-full bg-gradient-to-${isEven ? 'l' : 'r'} from-[#e94351] to-transparent transition-all duration-[1500ms] ${isActive ? 'opacity-100 translate-x-0 delay-700' : 'opacity-0 translate-x-full'}`}></div>
                      </div>


                      <h4 className={`text-xl sm:text-2xl font-extrabold mb-3 tracking-tight transition-colors duration-700 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {step.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-[15px] sm:text-[16px]">{step.desc}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. Portfolio Section (Premium Responsive Grid) ---
const PortfolioSection = () => {
  return (
    <section className="w-full relative py-20 mt-16 flex flex-col items-center">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1200px] z-10 flex flex-col">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div className="md:w-7/12 flex flex-col items-start text-left">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 w-max rounded-xl bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] mb-6">
              <Code size={12} /> Portfolio
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Discover My<br/><span className="text-[#e94351]">Masterpieces.</span>
            </h3>
          </div>
          <div className="md:w-5/12 flex md:justify-end text-left md:text-right">
            <p className="text-[15px] sm:text-[16px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              A handpicked selection of my fastest and best-looking projects that bring real results. Explore them below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {portfolioProjects.map((project) => {
             // Assign a dynamic icon based on mockupType/tags for the drawing animation
             const IconComponent = project.mockupType === 'dashboard' ? LineChart : 
                                   project.mockupType === 'ecommerce' ? ShoppingCart : Palette;
             
             return (
              <div 
                key={project.id} 
                tabIndex="0"
                className="w-full aspect-[5/4] sm:aspect-square rounded-3xl lg:rounded-[32px] bg-white dark:bg-[#030303] border border-slate-900 dark:border-white/30 hover:border-[#e94351] dark:hover:border-[#e94351] focus:border-[#e94351] dark:focus:border-[#e94351] relative group overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 focus:-translate-y-2 focus:outline-none shadow-none"
              >
                {/* Main Content (Blurred on hover) */}
                <div className="absolute inset-0 w-full h-full transition-all duration-500 group-hover:blur-sm group-focus:blur-sm">
                   {/* Visual Graphic Layer */}
                   <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${project.color} transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-start overflow-hidden pt-12`}>
                     <div className="w-[85%] h-[80%] mt-8 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-12 group-focus:-translate-y-12 group-hover:scale-95 group-focus:scale-95">
                       {project.mockupType === 'dashboard' && (
                          <div className="w-full h-full bg-white/30 dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded-t-xl border-x border-t border-white/40 flex gap-3 p-3">
                            <div className="w-[20%] h-full bg-white/60 dark:bg-white/10 rounded-lg"></div>
                            <div className="w-[80%] h-full flex flex-col gap-3">
                              <div className="w-full h-10 bg-white/60 dark:bg-white/10 rounded-lg"></div>
                              <div className="flex-1 bg-white/50 dark:bg-white/5 rounded-lg flex gap-3 p-3">
                                 <div className="flex-1 bg-white/40 dark:bg-white/10 rounded-md"></div>
                                 <div className="flex-1 bg-white/40 dark:bg-white/10 rounded-md"></div>
                              </div>
                            </div>
                          </div>
                       )}
                       {project.mockupType === 'ecommerce' && (
                          <div className="w-full h-full bg-white/30 dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded-t-xl border-x border-t border-white/40 flex flex-col p-4 gap-4">
                            <div className="flex justify-between items-center"><div className="w-1/4 h-4 bg-white/60 dark:bg-white/20 rounded-full"></div><div className="w-8 h-8 rounded-full bg-white/60 dark:bg-white/20"></div></div>
                            <div className="grid grid-cols-2 gap-3 flex-1"><div className="bg-white/50 dark:bg-white/10 rounded-xl"></div><div className="bg-white/50 dark:bg-white/10 rounded-xl"></div></div>
                          </div>
                       )}
                       {project.mockupType === 'design' && (
                          <div className="w-[90%] mx-auto h-[90%] bg-white/30 dark:bg-[#0a0a0a]/30 backdrop-blur-sm rounded-[40px] border-[10px] border-white/40 flex items-center justify-center">
                            <div className="w-[50%] h-[50%] bg-white/60 dark:bg-white/20 rounded-full flex items-center justify-center"><div className="w-1/3 h-1/3 bg-white/80 dark:bg-white/40 rounded-full"></div></div>
                          </div>
                       )}
                     </div>
                   </div>

                   {/* Content Swipe-Up Overlay Layer */}
                   <div className="absolute inset-0 z-20 flex flex-col justify-end">
                      {/* Gradient shading transitioning in */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 dark:from-[#030303] dark:via-[#030303]/95 to-transparent opacity-0 translate-y-8 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                      
                      <div className="relative z-30 p-6 lg:p-8 flex flex-col gap-2 xl:gap-3 opacity-0 translate-y-8 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 transition-all duration-500 delay-75 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        
                        <h4 className="text-[22px] xl:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center justify-between gap-3">
                          {project.title}
                          <IconComponent size={24} className="text-[#e94351] opacity-20 group-hover:opacity-100 transition-all duration-500" />
                        </h4>

                        <div className="flex flex-wrap gap-2.5 mb-1">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-slate-500 dark:text-slate-400 text-[12px] font-black tracking-wider uppercase transition-colors duration-500 group-hover:text-[#e94351] group-focus:text-[#e94351] flex items-center">
                              <span className="text-[#e94351] font-extrabold mr-0.5">#</span>{tag}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-[13px] xl:text-[15px] mb-1 xl:mb-2 line-clamp-3">
                          {project.desc}
                        </p>

                        <button className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-[13px] xl:text-[15px] group/btn w-max mt-1 xl:mt-2">
                          Explore Case Study <ChevronRight size={16} strokeWidth={3} className="text-[#e94351] transition-transform group-hover/btn:translate-x-1.5" />
                        </button>
                        
                      </div>
                   </div>
                </div>

                {/* Temporary "Project Add Soon" Overlay (Appears on Hover) */}
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-500 flex items-center justify-center pointer-events-none">
                   <div className="bg-white/80 dark:bg-[#030303]/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#e94351]/30 rotate-[-5deg] scale-90 group-hover:scale-100 transition-transform duration-500 ease-out shadow-none">
                      <span className="text-[#e94351] text-lg lg:text-xl font-black uppercase tracking-widest flex items-center gap-3">
                        <Rocket size={20} className="animate-bounce" /> Project Add Soon
                      </span>
                   </div>
                </div>

              </div>
             );
          })}
        </div>
        
      </div>
    </section>
  );
};
// --- 7. CTA & Footer Section ---
const CTASection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactInfo: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contactInfo || !formData.service || !formData.message) {
        alert("Please fill out all mandatory fields before sending a message.");
        return;
    }
    const text = `Hi Shree, my name is ${formData.fullName}.\n\n*Service Needed:* ${formData.service}\n*Contact Info:* ${formData.contactInfo}\n\n*Message:*\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919405173048?text=${encodedText}`, '_blank');
  };

  return (
    <section className="w-full relative py-16 md:py-24 flex flex-col items-center">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1100px] z-10 flex flex-col gap-12 lg:gap-16">
        
        {/* Top: Header & Description Side-by-Side */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-col items-start text-left shrink-0">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 w-max rounded-xl bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] mb-6">
              <Mail size={12} /> Contact Me
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Let's Build Something<br/><span className="text-[#e94351]">Extraordinary.</span>
            </h2>
          </div>
          <div className="flex-1 flex md:justify-end text-left md:text-right pt-2 md:pt-0">
            <p className="text-[15px] sm:text-[16px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md ml-auto">
              Ready to start your project? Fill out the short form below to give me context, or just chat with me directly on WhatsApp. Let's build something awesome.
            </p>
          </div>
        </div>
        
        {/* Bottom: Side-by-Side Illustration and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 lg:gap-16 w-full items-center">
          
          {/* Left Side: Floating Illustration Image */}
          <div className="w-full relative h-auto py-4 sm:py-0 sm:h-[400px] lg:h-[500px] flex items-center justify-center group perspective-1000 order-1 md:order-1">
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#e94351]/15 rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-[1.2] group-hover:bg-[#e94351]/20"></div>
             <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-indigo-500/10 rounded-full pointer-events-none transition-transform duration-1000 group-hover:-translate-y-8 group-hover:scale-110"></div>
             
             {/* Illustration Image */}
              <div className="relative w-[90%] lg:w-full max-w-[500px] flex items-center justify-center transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.03]">
                 <div className="relative w-full aspect-square bg-white dark:bg-white/95 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/20 hover:border-[#e94351]/50 transition-colors duration-500 shadow-none">
                    <img 
                      src="/assets/cta.svg" 
                      alt="Let's Collaborate" 
                      className="w-full h-full object-cover relative z-10" 
                    />
                 </div>
              </div>
          </div>

          {/* Right Side: Compact Form */}
          <div className="w-full flex justify-center md:justify-end order-2 md:order-2">
            <form className="w-full max-w-[550px] bg-transparent relative flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest pl-1">Full Name</label>
              <input 
                type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" 
                className="w-full bg-white dark:bg-[#030303] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#e94351] focus:ring-1 focus:ring-[#e94351] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" required />
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest pl-1">Email or WhatsApp Number</label>
              <input 
                type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="john@example.com or +91..." 
                className="w-full bg-white dark:bg-[#030303] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#e94351] focus:ring-1 focus:ring-[#e94351] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" required />
            </div>

            <div className="w-full flex flex-col gap-1.5 relative">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest pl-1">Topic</label>
              <select 
                name="service" value={formData.service} onChange={handleChange}
                className={`w-full bg-white dark:bg-[#030303] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#e94351] focus:ring-1 focus:ring-[#e94351] transition-all appearance-none cursor-pointer ${!formData.service ? 'text-slate-400 dark:text-slate-500' : ''}`} required>
                <option value="" disabled>Select a Service</option>
                <option value="Web Development" className="text-slate-900 dark:text-white">Web Development</option>
                <option value="Designing & UI/UX" className="text-slate-900 dark:text-white">Designing & UI/UX</option>
                <option value="Data Solutions" className="text-slate-900 dark:text-white">Data Solutions</option>
                <option value="Admin Support" className="text-slate-900 dark:text-white">Admin Support</option>
                <option value="Other / General Inquiry" className="text-slate-900 dark:text-white">Other</option>
              </select>
              <div className="absolute right-4 bottom-[14px] pointer-events-none text-slate-400 text-xs">▼</div>
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-end pl-1 pr-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest opacity-80">Message <span className="text-[#e94351] align-top">*</span></label>
                <span className={`text-[10px] font-bold ${formData.message.length >= 250 ? 'text-[#e94351]' : 'text-slate-400'}`}>{formData.message.length}/250</span>
              </div>
              <textarea 
                name="message" value={formData.message} onChange={handleChange} maxLength={250} disabled={!formData.service} rows={3}
                placeholder={formData.service ? "Type your message here..." : "Please select a service first."}
                className="w-full bg-white dark:bg-[#030303] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#e94351] focus:ring-1 focus:ring-[#e94351] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
              ></textarea>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3 mt-2">
              <button type="submit" className="w-full sm:w-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl px-5 py-3 font-extrabold text-sm hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                Send <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button type="button" onClick={handleWhatsApp} className="w-full sm:w-1/2 bg-[#25D366] text-white rounded-xl px-5 py-3 font-extrabold text-sm hover:bg-[#20b858] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </button>
            </div>
          </form>
        </div>
        </div>

      </div>
    </section>
  );
};

// --- 8. Footer Section ---
const FooterSection = () => {
  return (
    <footer className="w-full relative flex flex-col items-center justify-center py-10 md:py-12 overflow-hidden mt-8 md:mt-10 backdrop-blur-sm z-10 border-t border-gray-100 dark:border-white/5 bg-white/30 dark:bg-[#020205]/30">
      
      {/* Background ripples/concentric rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-40 dark:opacity-[0.15] z-0">
         <div className="absolute w-[600px] h-[200px] sm:w-[800px] sm:h-[250px] rounded-full border border-slate-200 dark:border-slate-700"></div>
         <div className="absolute w-[900px] h-[300px] sm:w-[1200px] sm:h-[350px] rounded-full border border-slate-200 dark:border-slate-700"></div>
         <div className="absolute w-[1200px] h-[400px] sm:w-[1600px] sm:h-[450px] rounded-full border border-slate-200 dark:border-slate-700"></div>
         <div className="absolute w-[1500px] h-[500px] sm:w-[2000px] sm:h-[550px] rounded-full border-[0.5px] border-slate-100 dark:border-slate-800"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full cursor-default">
        {/* Row 1: Primary Links */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[#e94351] font-bold text-xs sm:text-sm md:text-[15px] tracking-wide mb-4">
          <Link to="/" className="hover:text-rose-600 dark:hover:text-[#ff5c6a] transition-colors">About</Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
          <Link to="/" className="hover:text-rose-600 dark:hover:text-[#ff5c6a] transition-colors">Services</Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
          <Link to="/all-portfolio" className="hover:text-rose-600 dark:hover:text-[#ff5c6a] transition-colors">All Portfolio</Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
          <Link to="/education" className="hover:text-rose-600 dark:hover:text-[#ff5c6a] transition-colors">Education</Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
          <Link to="/blog" className="hover:text-rose-600 dark:hover:text-[#ff5c6a] transition-colors">Blog</Link>
        </div>

        {/* Row 2: Built By */}
        <div className="text-slate-500 dark:text-slate-400 font-medium text-[10px] sm:text-sm leading-relaxed mb-1.5 sm:mb-2 max-w-2xl px-2 whitespace-nowrap overflow-hidden text-ellipsis">
          Built with <span className="text-[#e94351] font-bold">passion</span> and <span className="text-[#e94351] font-bold">precision</span> by <Link to="/" className="text-[#e94351] hover:text-rose-600 dark:hover:text-[#ff5c6a] transition-colors font-bold">Kamlesh Suryavanshi 🚀</Link>
        </div>

        {/* Row 3: Disclaimer */}
        <div className="text-slate-400 dark:text-slate-500 font-medium text-[9px] sm:text-[11.5px] leading-snug max-w-xl mx-auto px-4 opacity-90 whitespace-nowrap overflow-hidden text-ellipsis">
          Independent freelance project. Dedicated to crafting premium digital experiences.
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components & Pages ---
const UnderConstructionPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] flex flex-col items-center relative overflow-hidden">
      <div className="sticky top-0 w-full z-[100] bg-[#e94351] text-white py-2 text-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] transition-none animate-pulse">
         ⚠️ Portfolio Under Construction ⚠️
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative w-full">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#e94351]/10 rounded-full blur-[80px] pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="w-20 h-20 bg-[#e94351]/10 rounded-3xl flex items-center justify-center border border-[#e94351]/20 transition-transform duration-500 hover:rotate-6">
              <Rocket size={40} className="text-[#e94351] animate-pulse" />
            </div>
            
            <div className="flex flex-col gap-3">
              <h2 className="text-[#e94351] text-[12px] font-black uppercase tracking-[0.3em]">WORK IN PROGRESS</h2>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                 Portfolio <br/>
                 <span className="text-[#e94351]">Under Construction</span>
              </h1>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-md font-medium leading-relaxed opacity-80">
               I'm currently building a more robust experience for this section. <br/>
               The code is being refined and content is on the way.
            </p>
            
            <Link to="/" className="mt-4 flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:bg-[#e94351] dark:hover:bg-[#e94351] hover:text-white dark:hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-xl group">
               <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
         </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

const ResumePage = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f6] dark:bg-[#050810] flex flex-col items-center relative transition-colors duration-300">
      {/* Top Banner - Hidden on Print */}
      <div className="print:hidden sticky top-0 w-full z-[100] bg-[#e94351] text-white py-2 text-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] animate-pulse">
         ⚠️ ATS Friendly Master Resume ⚠️
      </div>

      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body { background: white !important; color: black !important; padding: 0 !important; }
            .resume-wrapper { padding: 0 !important; margin: 0 !important; background: white !important; }
            .resume-card {
              box-shadow: none !important;
              border: none !important;
              padding: 10mm 15mm !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: none !important;
              background: white !important;
              color: #333 !important;
            }
            .resume-card h1, .resume-card h2, .resume-card .item-title { color: #1a2a3a !important; }
            .resume-card .item-subtitle { color: #2c3e50 !important; }
            .resume-card .contact-line, .resume-card p, .resume-card li { color: #444 !important; }
            .no-print { display: none !important; }
            section { break-inside: avoid; }
          }

          .resume-card {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.45;
            color: #333333;
            max-width: 210mm;
            width: 92%;
            background: #ffffff;
            margin: 20px auto;
            padding: 10mm 14mm;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            border-radius: 4px;
            transition: all 0.3s ease;
          }

          .dark .resume-card {
            background: #0f172a; 
            color: #f1f5f9;
            border: 1px solid rgba(255,255,255,0.05);
          }
          .dark .resume-card h1, .dark .resume-card h2, .dark .resume-card .item-title { color: #ffffff; }
          .dark .resume-card .item-subtitle { color: #e94351; }
          .dark .resume-card .contact-line, .dark .resume-card p, .dark .resume-card li { color: #cbd5e1; }
          .dark .resume-card h2 { border-bottom-color: rgba(255,255,255,0.15); }

          .resume-card h1 { color: #2c3e50; font-size: 2.0em; margin-bottom: 2px; font-weight: 800; letter-spacing: -0.015em; }
          .resume-card h2 { 
            font-size: 0.95em; 
            color: #2c3e50; 
            text-transform: uppercase; 
            letter-spacing: 1.2px; 
            border-bottom: 2px solid #bdc3c7; 
            padding-bottom: 2px; 
            margin-bottom: 8px; 
            margin-top: 14px;
            font-weight: 700;
          }
          .resume-card .contact-line { font-size: 0.85em; color: #555; margin-bottom: 12px; }
          .resume-card .item-title { font-weight: 800; color: #111; font-size: 1.0em; }
          .resume-card .item-subtitle { font-style: italic; color: #2c3e50; font-weight: 600; font-size: 0.9em; }
          .resume-card .item-date { font-weight: 700; color: #666; font-size: 0.85em; }
          .resume-card ul { padding-left: 20px; margin: 4px 0; list-style-type: disc; }
          .resume-card li { margin-bottom: 3px; font-size: 0.9em; }
          .resume-card p { font-size: 0.9em; margin-bottom: 6px; }
          
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px 24px;
            list-style-type: disc;
          }

          @media (max-width: 640px) {
            .resume-card { padding: 6mm 8mm; margin: 10px auto; width: 95%; }
            .skills-grid { grid-template-columns: 1fr; gap: 1px; }
            .resume-card h1 { font-size: 1.6em; }
          }
        `}
      </style>

      {/* Floating Controls */}
      <div className="no-print mt-8 mb-2 flex items-center gap-4 z-50">
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-[#e94351] text-white font-black rounded-xl hover:bg-rose-600 transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2"
        >
          <Rocket size={18} /> Print / Save as PDF
        </button>
        <Link to="/" className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
          <ArrowLeft size={18} /> Back
        </Link>
      </div>
      
      <main className="resume-wrapper w-full flex-1 pb-12">
        <div className="resume-card">
            {/* Header */}
            <header className="text-left">
                <h1>Kamlesh Suryawanshi</h1>
                <div className="contact-line">
                    Nandurbar, India <span className="mx-1 text-slate-300">|</span> 
                    9405173048 <span className="mx-1 text-slate-200">|</span> 
                    kamleshsuryavanshi@gmail.com <span className="mx-1 text-slate-200">|</span> 
                    <Link to="/" className="text-[#2c3e50] font-bold border-b border-[#2c3e50]/20 pb-0.5">kamleshp.com</Link>
                </div>
            </header>

            {/* Summary */}
            <section className="mb-3">
                <h2>Professional Summary</h2>
                <p>MCA graduate and fresher with exposure to administration support and data operations during training at District Hospital, Nandurbar. Equipped with skills in data entry, documentation, record maintenance, and Excel-based work, along with basic academic knowledge of Web Development and Data Operations acquired during MCA studies.</p>
            </section>

            {/* Skills */}
            <section className="mb-3">
                <h2>Core Skills</h2>
                <ul className="skills-grid">
                    <li>Data Entry & Record Management</li>
                    <li>Computer Operations & Troubleshooting</li>
                    <li>Microsoft Office (Word, Excel, PowerPoint)</li>
                    <li>Administrative & Office Support</li>
                    <li>Team Collaboration & Communication</li>
                    <li>Problem Solving</li>
                    <li>Typing: English (40 WPM), Marathi (30 WPM)</li>
                    <li>Time Management & Organization</li>
                </ul>
            </section>

            {/* Experience */}
            <section className="mb-3">
                <h2>Professional Experience</h2>
                <div className="mb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-0.5">
                        <div className="flex flex-col">
                            <span className="item-title">Data Entry Operator</span>
                            <span className="item-subtitle text-[#e94351] dark:text-[#e94351]">District Hospital, Nandurbar</span>
                        </div>
                        <span className="item-date mt-1 sm:mt-0 whitespace-nowrap">Jan 2024 &ndash; Mar 2025</span>
                    </div>
                    <ul>
                        <li>Conducted data entry and maintained up-to-date, accurate official records.</li>
                        <li>Handled administrative documentation and ensured proper register maintenance.</li>
                        <li>Managed file handling, inward-outward entries, and overall record organization.</li>
                    </ul>
                </div>
            </section>

            {/* Education */}
            <section className="mb-3">
                <h2>Education</h2>
                <div className="mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-0.5">
                        <div className="flex flex-col">
                            <span className="item-title">Master of Computer Applications (MCA)</span>
                            <span className="item-subtitle text-[#e94351] dark:text-[#e94351]">Manipal University Jaipur (Online Edition)</span>
                        </div>
                        <span className="item-date mt-1 sm:mt-0 whitespace-nowrap">2023 &ndash; 2025</span>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                        <div className="flex flex-col">
                            <span className="item-title">Bachelor of Science in Computer Science</span>
                            <span className="item-subtitle text-[#e94351] dark:text-[#e94351]">NMU Jalgaon</span>
                        </div>
                        <span className="item-date mt-1 sm:mt-0 whitespace-nowrap">2018 &ndash; 2022</span>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="mb-3">
                <h2>Certifications</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <li>Google Data Analytics Professional</li>
                    <li>Generative AI Prompt Engineering (IBM)</li>
                    <li>MS-CIT Certification</li>
                    <li>GCC-TBC Typing: Eng 40 / Mar 30</li>
                </ul>
            </section>

            {/* Workshops */}
            <section className="mb-3">
                <h2>Workshops & Training</h2>
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-0.5">
                        <span className="item-title text-[0.95em]">Two-Day AI Tool Workshop</span>
                        <span className="item-date">BE10X</span>
                    </div>
                    <ul>
                        <li>Created impactful presentations and analyzed data using AI tools.</li>
                        <li>Learned to write and debug code using AI assistance efficiently.</li>
                    </ul>
                </div>
            </section>

            {/* Languages */}
            <section className="mt-5 border-t pt-3 border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center">
                  <span className="text-[0.75em] font-black text-slate-400 uppercase tracking-widest mr-5">Languages</span>
                  <span className="text-[0.95em] font-bold text-slate-700 dark:text-slate-300 flex gap-4">
                    <span>Marathi</span> <span className="text-slate-200 dark:text-white/10">/</span>
                    <span>English</span> <span className="text-slate-200 dark:text-white/10">/</span>
                    <span>Hindi</span>
                  </span>
                </div>
                <div className="text-[0.75em] font-medium text-slate-400 italic mt-2 sm:mt-0">Self-Verified Profile</div>
            </section>
        </div>
      </main>

      <div className="print:hidden w-full">
        <FooterSection />
      </div>
    </div>
  );
};

const HomePage = ({ toggleTheme, theme }) => {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden bg-white dark:bg-[#020205] font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-[#e94351]/20 selection:text-[#e94351]">
      <div className="sticky top-0 w-full z-[100] bg-[#e94351] text-white py-2 text-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] transition-none animate-pulse">
         ⚠️ Portfolio Under Construction ⚠️
      </div>

      <div className="stars-overlay pointer-events-none fixed inset-0 z-0"></div>

      <header className="absolute top-0 w-full p-6 flex justify-end items-center gap-3 z-[110]">
        <Link to="/resume" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-widest hover:bg-[#e94351] dark:hover:bg-[#e94351] hover:text-white dark:hover:text-white transition-all duration-300 shadow-sm">
           Resume
        </Link>
        <button onClick={toggleTheme} className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111115] transition-colors cursor-pointer hover:border-[#e94351]/50">
          {theme === 'light' ? <Moon className="w-5 h-5 text-gray-500" strokeWidth={1.5} /> : <Sun className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 w-full">
        {/* --- 1. Hero Section --- */}
        <section className="flex flex-col items-center text-center w-full max-w-5xl px-4 z-10">
          <div className="mb-10 mt-8 sm:mt-0 relative w-56 h-56 md:w-52 md:h-52 aspect-square bg-white dark:bg-white/95 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/20 hover:border-[#e94351]/50 transition-all duration-500 group/hero shadow-none">
             <img 
               src="/assets/hero.svg" 
               alt="Kamlesh Suryavanshi" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover/hero:scale-110" 
             />
          </div>
          <h2 className="inline-flex items-center justify-center gap-2 w-max text-[#e94351] text-[10px] font-extrabold uppercase tracking-[0.25em] mb-4">HI, IT'S ME</h2>
          <h1 className="w-full text-[2.5rem] sm:text-[4rem] md:text-[5vw] font-[800] tracking-[-0.04em] text-[#e94351] leading-tight sm:leading-none mb-8">
            Kamlesh Suryavanshi
          </h1>
          <p className="text-[#4b5563] dark:text-slate-400 text-lg sm:text-xl md:text-2xl font-medium max-w-3xl leading-relaxed px-4">
            I specialize in Web Development, Designing, Data Solutions, and Administration Support. Let's build something great together.
          </p>

          <div className="mt-12 flex items-center border border-gray-200 dark:border-white/10 hover:border-[#e94351]/50 rounded-2xl py-1.5 pl-1.5 pr-0 bg-white dark:bg-[#0a0a0a] w-[90%] max-w-[600px] overflow-hidden relative h-[42px] transition-all duration-500 shadow-none group/marquee">
            <div className="bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold px-4 py-2 rounded-xl tracking-[0.15em] z-10 flex-shrink-0 whitespace-nowrap">AVAILABLE</div>
            <div className="flex-1 overflow-hidden relative h-full flex items-center ml-2 marquee-mask">
              <div className="animate-marquee items-center">
                <span className="text-sm text-[#4b5563] dark:text-slate-400 font-medium px-4 flex items-center gap-4 whitespace-nowrap">
                  Currently accepting new freelance projects <span className="text-[#e94351]">✦</span>
                  Crafting premium digital experiences <span className="text-[#e94351]">✦</span>
                  Turning ideas into reality <span className="text-[#e94351]">✦</span>
                  Let's build something amazing together <span className="text-[#e94351]">✦</span>
                </span>
                <span className="text-sm text-[#4b5563] dark:text-slate-400 font-medium px-4 flex items-center gap-4 whitespace-nowrap">
                  Currently accepting new freelance projects <span className="text-[#e94351]">✦</span>
                  Crafting premium digital experiences <span className="text-[#e94351]">✦</span>
                  Turning ideas into reality <span className="text-[#e94351]">✦</span>
                  Let's build something amazing together <span className="text-[#e94351]">✦</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. Specialized Services --- */}
        <section className="w-full mt-28 flex flex-col px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1200px]">
          <div className="w-full flex flex-col items-start text-left mb-24">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 w-max rounded-xl bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] mb-6 dark:shadow-none">
              <Code size={12} /> Specialized Services
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              My Expertise &<br/><span className="text-[#e94351]">Core Solutions.</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] sm:text-base font-medium leading-relaxed w-full">
              Turning your ideas into beautiful, lightning-fast, and highly reliable digital products.
            </p>
          </div>

          <div className="w-full flex flex-col gap-16 md:gap-24">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col md:flex-row items-start justify-between gap-10 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div tabIndex="0" className="w-full md:w-5/12 flex flex-col items-start text-left group cursor-pointer focus:outline-none md:pt-2">
                  <div className="mb-6 p-4 bg-slate-100 dark:bg-white/5 rounded-2xl group-hover:bg-[#e94351]/10 group-active:bg-[#e94351]/10 group-focus:bg-[#e94351]/10 group-hover:scale-110 group-active:scale-110 group-focus:scale-110 group-hover:-rotate-6 group-active:-rotate-6 group-focus:-rotate-6 transition-all duration-300 origin-left">
                    <service.Icon size={32} strokeWidth={2} className="text-[#e94351] draw-on-hover" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 group-hover:text-[#e94351] group-active:text-[#e94351] group-focus:text-[#e94351] transition-colors duration-300">{service.title}</h4>
                  <p className="text-[15px] sm:text-base xl:text-[17px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-sm">{service.description}</p>
                </div>

                <div className="w-full md:w-1/2 relative flex justify-center items-start">
                  <div tabIndex="0" className="w-full max-w-[480px] hover:scale-[1.02] active:scale-[1.02] focus:scale-[1.02] transition-transform duration-500 focus:outline-none">
                    {service.id === 1 ? ( <WebDevAnimatedTerminal /> ) : 
                     service.id === 2 ? ( <DesigningAnimatedTerminal /> ) : 
                     service.id === 3 ? ( <DataSolutionsAnimatedTerminal /> ) : 
                     ( <AdminSupportAnimatedTerminal /> )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 3. Technology Section --- */}
        <section className="w-full relative py-20 mt-10 flex flex-col items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1200px] z-10 flex flex-col items-center text-center">
            
            <div className="w-full flex flex-col items-center text-center mb-16 mx-auto px-4">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 w-max rounded-xl bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] mb-6 dark:shadow-none">
                <Database size={12} /> My Arsenal
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                Technologies That <span className="text-[#e94351]">I Command.</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] sm:text-base font-medium leading-relaxed w-full">
                Using modern and powerful technologies to build robust, blazing-fast, and scalable websites.
              </p>
            </div>

            <div className="w-full flex flex-col gap-6 marquee-mask overflow-hidden pt-4 pb-8 px-2 relative">
              <div className="animate-marquee-ltr pause-on-hover hover:z-20 flex w-max">
                {[...Array(2)].map((_, i) => (<div key={i} className="flex gap-6 pr-6">{row1Badges.map((badge, idx) => (<BadgeItem key={`${i}-${idx}`} badge={badge} />))}</div>))}
              </div>
              <div className="animate-marquee-rtl pause-on-hover hover:z-20 flex w-max">
                {[...Array(2)].map((_, i) => (<div key={i} className="flex gap-6 pr-6">{row2Badges.map((badge, idx) => (<BadgeItem key={`${i}-${idx}`} badge={badge} />))}</div>))}
              </div>
              <div className="animate-marquee-ltr pause-on-hover hover:z-20 flex w-max">
                {[...Array(2)].map((_, i) => (<div key={i} className="flex gap-6 pr-6">{row3Badges.map((badge, idx) => (<BadgeItem key={`${i}-${idx}`} badge={badge} />))}</div>))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. Why Me Section --- */}
        <section className="w-full relative py-20 mt-16 flex flex-col items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1200px] z-10 flex flex-col">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8 overflow-hidden w-full">
              <div className="flex flex-col items-start text-left shrink-0">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 w-max rounded-xl bg-gradient-to-r from-[#e94351] to-rose-600 border border-rose-500/30 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] mb-6 dark:shadow-none">
                  <CheckCircle size={12} /> Why Me
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Your Unfair<br/><span className="text-[#e94351]">Digital Advantage.</span>
                </h3>
              </div>
              <div className="flex-1 flex md:justify-end text-left md:text-right pt-2 md:pt-0 pl-0 md:pl-6 overflow-hidden">
                <p className="text-[15px] sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl md:max-w-sm ml-auto">
                  Delivering top-quality work with a sharp focus on fast performance, clean code, and great user experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 lg:gap-14 w-full mt-4 max-w-[1100px] mx-auto items-center">
              <div className="w-full flex flex-col gap-4 relative order-2 md:order-1">
                {[
                  { icon: Zap, title: "Zero Configuration", desc: "Fast & seamless setup for your projects without the hassle of complex settings or dependencies." },
                  { icon: Globe, title: "Universal Support", desc: "Works beautifully across all platforms, ensuring a consistent and premium experience for every user." },
                  { icon: ShieldCheck, title: "Secure by Default", desc: "Reliable, optimized, and safe code structure built with modern security best practices in mind." }
                ].map((item, i) => (
                  <div key={i} tabIndex="0" className="w-full bg-white dark:bg-[#030303] rounded-3xl p-5 md:p-6 border border-slate-900 dark:border-white/30 hover:border-[#e94351]/50 focus:border-[#e94351]/50 focus:ring-0 transition-all duration-500 flex items-center gap-5 md:gap-6 group overflow-hidden cursor-pointer focus:outline-none hover:-translate-y-1">
                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl group-hover:bg-[#e94351]/10 group-active:bg-[#e94351]/10 group-focus:bg-[#e94351]/10 group-hover:scale-110 group-active:scale-110 group-focus:scale-110 group-hover:-rotate-3 group-active:-rotate-3 group-focus:-rotate-3 transition-transform duration-500 ease-out shrink-0">
                      <item.icon size={28} strokeWidth={2} className="text-[#e94351]" />
                    </div>
                    <div className="flex-1 flex flex-col items-start text-left">
                      <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-[#e94351] transition-colors duration-300">{item.title}</h4>
                      <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full relative h-auto py-4 sm:py-0 sm:h-[450px] lg:h-[500px] flex items-center justify-center group perspective-1000 pl-0 md:pl-8 lg:pl-10 order-1 md:order-2">
                <div className="relative w-full max-w-[500px] flex items-center justify-center transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.03]">
                   <div className="relative w-full aspect-square bg-white dark:bg-white/95 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/20 hover:border-[#e94351]/50 transition-colors duration-500 shadow-none">
                      <img 
                       src="/assets/why_me.svg" 
                       alt="Creative Collaboration" 
                       className="w-full h-full object-cover relative z-10" 
                     />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. Work Process Section --- */}
        <WorkProcessSection />

        {/* --- 6. Portfolio Section --- */}
        <PortfolioSection />

        {/* --- 7. CTA Section --- */}
        <CTASection />

      </main>
      
      <FooterSection />
    </div>
  );
};

// --- Main Application ---
export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <Router>
       <Routes>
          <Route path="/" element={<HomePage toggleTheme={toggleTheme} theme={theme} />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/all-portfolio" element={<UnderConstructionPage />} />
          <Route path="/education" element={<UnderConstructionPage />} />
          <Route path="/blog" element={<UnderConstructionPage />} />
          <Route path="*" element={<HomePage toggleTheme={toggleTheme} theme={theme} />} />
       </Routes>
       <style>
         {`
           :root { --brand-red: #e94351; }
           body {
             font-family: 'Inter', system-ui, -apple-system, sans-serif;
             background-color: #fcfeff;
             background-attachment: fixed;
             overflow-x: hidden;
             color: #0b1220;
             transition: background-color 0.4s ease, color 0.4s ease;
           }
           :root.dark body {
             background-color: #050810;
             color: #f0f4ff;
           }
           .stars-overlay {
             position: fixed; top: 0; left: 0; right: 0; bottom: 0;
             pointer-events: none; z-index: -1;
             background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Ccircle cx='50' cy='50' r='1.5' fill='rgba(255,255,255,0.7)'/%3E%3Ccircle cx='250' cy='150' r='2' fill='rgba(0,229,204,0.5)'/%3E%3Ccircle cx='150' cy='300' r='1' fill='rgba(255,77,77,0.3)'/%3E%3Ccircle cx='350' cy='250' r='1.5' fill='rgba(255,255,255,0.5)'/%3E%3Ccircle cx='80' cy='350' r='2' fill='rgba(0,229,204,0.3)'/%3E%3Ccircle cx='300' cy='50' r='1' fill='rgba(255,77,77,0.4)'/%3E%3Ccircle cx='180' cy='80' r='1' fill='rgba(255,255,255,0.6)'/%3E%3Ccircle cx='320' cy='350' r='1.5' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E");
             background-repeat: repeat;
             opacity: 0.15;
           }
           :root.dark .stars-overlay {
             opacity: 0.4;
             filter: brightness(1.2) contrast(1.1);
           }
           .marquee-mask {
             mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
           }
           .animate-marquee {
             display: flex;
             animation: marquee 30s linear infinite;
             width: max-content;
           }
           @keyframes marquee {
             0% { transform: translateX(0); }
             100% { transform: translateX(-50%); }
           }
           @keyframes slide-right-fast {
             from { transform: translateX(-100%); }
             to { transform: translateX(300%); }
           }
           .slide-right-fast {
             animation: slide-right-fast 2s infinite linear;
           }
           @keyframes drawFromScratch {
             0% { stroke-dasharray: 500; stroke-dashoffset: 500; }
             100% { stroke-dasharray: 500; stroke-dashoffset: 0; }
           }
           .group:hover .draw-on-hover path, 
           .group:hover .draw-on-hover circle, 
           .group:hover .draw-on-hover line, 
           .group:hover .draw-on-hover polyline, 
           .group:hover .draw-on-hover rect {
             animation: drawFromScratch 2.5s ease-in-out forwards;
           }
         `}
       </style>
    </Router>
  );
}
