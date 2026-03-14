const fs = require('fs');

const appCode = `import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DIRECTORY_CATEGORIES } from './data';

gsap.registerPlugin(ScrollTrigger);

const ESSENTIALS = [
  { name: 'GitHub Student Pack', desc: 'The ultimate developer toolkit.', group: 'Development', logo: 'https://cdn.simpleicons.org/github/F5F5F7' },
  { name: 'Figma Education', desc: 'Professional design access.', group: 'Design', logo: 'https://cdn.simpleicons.org/figma/F5F5F7' },
  { name: 'Notion Plus', desc: 'Workspace and note-taking.', group: 'Productivity', logo: 'https://cdn.simpleicons.org/notion/F5F5F7' },
  { name: 'DigitalOcean', desc: '$200 in cloud credits.', group: 'Infrastructure', logo: 'https://cdn.simpleicons.org/digitalocean/F5F5F7' },
];

export default function App() {
  const [view, setView] = useState<'home' | 'directory'>('home');

  // Simple scroll-to-top handler on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen relative bg-brand-bg text-brand-accent overflow-x-hidden">
      <div className="fixed inset-0 ambient-glow pointer-events-none z-0 opacity-100" />
      <Navbar view={view} setView={setView} />
      
      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <HomeView setView={setView} />
            </motion.div>
          )}
          {view === 'directory' && (
            <motion.div 
              key="directory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <DirectoryView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Navbar({ view, setView }: { view: 'home' | 'directory', setView: (v: 'home' | 'directory') => void }) {
  return (
    <nav className="w-full absolute top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 h-24 flex items-center justify-between">
        <button 
          onClick={() => setView('home')}
          className="nav-item font-display font-medium text-lg tracking-wide hover:text-brand-highlight flex items-center gap-2 transition-colors"
        >
          FreeForStudents.
        </button>
        <div className="flex items-center gap-8 text-sm text-brand-muted">
          <button 
            onClick={() => setView('directory')}
            className={\`nav-item transition-all hover:text-brand-accent \${view === 'directory' ? 'text-brand-accent font-medium' : ''}\`}
          >
            Directory
          </button>
          <a href="#" className="nav-item hover:text-brand-accent transition-colors">Submit</a>
        </div>
      </div>
    </nav>
  );
}

function HomeView({ setView }: { setView: (v: 'home' | 'directory') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.hero-text-line',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' }
    );
    tl.fromTo('.hero-desc',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );
    tl.fromTo('.hero-btn',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
      "-=0.6"
    );

    gsap.fromTo('.metric-item',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.metrics-section', start: 'top 80%' } }
    );

    gsap.fromTo('.gsap-surface-panel',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.essentials-section', start: 'top 75%' } }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 flex flex-col items-start max-w-4xl">
        <h1 className="font-display text-[12vw] leading-[0.9] tracking-[-0.03em] md:text-8xl lg:text-9xl font-medium text-balance overflow-hidden">
          <div className="hero-text-line block">Everything free</div>
          <div className="hero-text-line block text-brand-muted">for students.</div>
        </h1>
        <p className="hero-desc mt-12 text-xl md:text-2xl text-brand-muted max-w-2xl text-balance leading-relaxed font-light">
          A curated directory of software, tools, and services available at no cost to verified students worldwide.
        </p>
        <div className="hero-btn mt-16">
          <motion.button 
            onClick={() => setView('directory')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="h-14 px-8 rounded-full bg-brand-accent text-brand-bg text-base font-semibold flex items-center gap-3 transition-colors hover:bg-white"
          >
            Explore Directory
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      <section className="metrics-section py-20 md:py-32 border-t border-brand-surface">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <Metric number="70" unit="+" label="Curated Tools" />
          <Metric number="13" unit="" label="Categories" />
          <Metric number="10" unit="k+" label="Saved Yearly" />
          <Metric number="0" unit="$" label="Cost Forever" />
        </div>
      </section>

      <section className="essentials-section py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 overflow-hidden">
          <div>
            <h2 className="gsap-surface-panel font-display text-4xl md:text-5xl font-medium mb-4">The Essentials.</h2>
            <p className="gsap-surface-panel text-brand-muted text-lg">Foundational tools to start your journey.</p>
          </div>
          <button 
            onClick={() => setView('directory')}
            className="gsap-surface-panel text-sm font-medium hover:text-brand-highlight transition-colors flex items-center gap-2"
          >
            View all categories <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ESSENTIALS.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="gsap-surface-panel group surface-panel p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-brand-surface-hover"
            >
              <div className="flex items-start sm:items-center gap-5 md:gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#111116] border border-brand-surface flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                  <img src={item.logo} alt={\`\${item.name} logo\`} className="w-7 h-7 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2 group-hover:text-brand-highlight transition-colors">{item.group}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">{item.name}</h3>
                  <p className="text-brand-muted text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-bg flex items-center justify-center text-brand-muted group-hover:text-brand-accent group-hover:bg-brand-highlight group-hover:-rotate-12 transition-all duration-300 shrink-0 self-end md:self-auto">
                <ExternalLink size={20} className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 md:py-48 flex flex-col items-center text-center overflow-hidden">
        <h2 className="gsap-surface-panel font-display text-5xl md:text-7xl font-medium mb-8">Built by community.</h2>
        <p className="gsap-surface-panel text-brand-muted text-xl max-w-2xl text-balance mb-12">
          This directory is open source and maintained by students around the world. Missing a tool? Submit it.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gsap-surface-panel h-14 px-8 rounded-full border border-brand-surface bg-transparent hover:bg-brand-surface text-brand-accent font-medium flex items-center gap-3 transition-colors"
        >
          <Github size={20} />
          Contribute on GitHub
        </motion.button>
      </section>
    </div>
  );
}

function Metric({ number, unit, label }: { number: string, unit: string, label: string }) {
  return (
    <div className="metric-item flex flex-col">
      <div className="font-display font-medium text-5xl md:text-6xl lg:text-7xl mb-2 flex items-baseline">
        {number}<span className="text-2xl md:text-3xl lg:text-4xl text-brand-muted ml-1">{unit}</span>
      </div>
      <div className="text-sm md:text-base text-brand-muted uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

function DirectoryView() {
  const [activeCategory, setActiveCategory] = useState(DIRECTORY_CATEGORIES[0].id);

  // Sync scroll positioning with categories
  useEffect(() => {
    const handleScroll = () => {
      const sections = DIRECTORY_CATEGORIES.map(cat => document.getElementById(cat.id));
      const scrollPos = window.scrollY + 200; // Offset for stickiness
      
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
          setActiveCategory(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-32 pb-32 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h1 className="font-display text-5xl md:text-7xl font-medium mb-6">Directory.</h1>
        <p className="text-brand-muted text-xl md:text-2xl max-w-2xl font-light">
          Over 70 premium subscriptions, completely free. Save $10,000+ a year by claiming these student offers.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
        {/* Sidebar Sticky Categories */}
        <motion.aside 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:flex w-64 flex-col gap-2 sticky top-32 shrink-0 border-l border-brand-surface pl-6"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-4">Categories</div>
          {DIRECTORY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={\`text-left text-sm py-1.5 transition-all duration-300 font-medium \${
                activeCategory === cat.id ? 'text-brand-accent pl-2 border-l border-brand-accent -ml-[25px]' : 'text-brand-muted hover:text-brand-accent'
              }\`}
            >
              {cat.title}
            </button>
          ))}
        </motion.aside>

        {/* Main List */}
        <div className="flex-1 flex flex-col gap-16 md:gap-24 pointer-events-auto w-full pb-32">
          {DIRECTORY_CATEGORIES.map((category, index) => (
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
              key={category.id} 
              id={category.id} 
              className="scroll-mt-32 w-full"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">{category.title}</h2>
                <p className="text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl">{category.note}</p>
              </div>

              <div className="flex flex-col">
                {category.items.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="group border-t border-brand-surface py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-brand-surface/20 transition-colors -mx-4 px-4 rounded-xl cursor-default"
                  >
                    <div className="font-medium text-lg md:text-xl text-brand-accent group-hover:text-brand-highlight transition-colors flex items-center gap-3">
                      {item.name}
                    </div>
                    <div className="text-sm flex items-center md:justify-end md:w-1/2">
                      <div className="bg-[#111116] border border-brand-surface px-4 py-1.5 flex items-center justify-center rounded-lg font-medium text-xs md:text-sm whitespace-break-spaces text-right text-brand-muted group-hover:text-brand-accent transition-colors shadow-sm">
                        {item.offer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-brand-surface py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-brand-muted">
        <div>© {new Date().getFullYear()} FreeForStudents.</div>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-brand-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-accent transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/App.tsx', appCode);
console.log('Done rewriting App.tsx via fs');
