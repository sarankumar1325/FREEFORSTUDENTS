import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, ChevronDown, Search } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DIRECTORY_CATEGORIES } from './data';
import ChromaGrid from './ChromaGrid';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, { slug: string, legacy?: boolean }> = {
  "github": { slug: "github" },
  "copilot": { slug: "github" },
  "cursor": { slug: "cursor" },
  "zed": { slug: "zedindustries" },
  "jetbrains": { slug: "jetbrains" },
  "replit": { slug: "replit" },
  "gitkraken": { slug: "gitkraken" },
  "postman": { slug: "postman" },
  "aws": { slug: "amazonwebservices", legacy: true },
  "azure": { slug: "microsoftazure", legacy: true },
  "google cloud": { slug: "googlecloud" },
  "digitalocean": { slug: "digitalocean" },
  "oracle": { slug: "oracle", legacy: true },
  "heroku": { slug: "heroku", legacy: true },
  "vercel": { slug: "vercel" },
  "netlify": { slug: "netlify" },
  "railway": { slug: "railway" },
  "cloudflare": { slug: "cloudflare" },
  "mongodb": { slug: "mongodb" },
  "figma": { slug: "figma" },
  "canva": { slug: "canva", legacy: true },
  "sketch": { slug: "sketch" },
  "autodesk": { slug: "autodesk" },
  "miro": { slug: "miro" },
  "blender": { slug: "blender" },
  "educative": { slug: "educative" },
  "linkedin": { slug: "linkedin", legacy: true },
  "coursera": { slug: "coursera" },
  "udemy": { slug: "udemy" },
  "pluralsight": { slug: "pluralsight" },
  "ibm": { slug: "ibm", legacy: true },
  "meta": { slug: "meta" },
  "microsoft": { slug: "microsoft", legacy: true },
  "leetcode": { slug: "leetcode" },
  "hackerrank": { slug: "hackerrank" },
  "red hat": { slug: "redhat" },
  "sap": { slug: "sap" },
  "namecheap": { slug: "namecheap" },
  "let's encrypt": { slug: "letsencrypt" },
  "notion": { slug: "notion" },
  "grammarly": { slug: "grammarly" },
  "obsidian": { slug: "obsidian" },
  "todoist": { slug: "todoist" },
  "evernote": { slug: "evernote" },
  "linear": { slug: "linear" },
  "clickup": { slug: "clickup" },
  "asana": { slug: "asana" },
  "airtable": { slug: "airtable" },
  "loom": { slug: "loom" },
  "zoom": { slug: "zoom" },
  "slack": { slug: "slack", legacy: true },
  "spotify": { slug: "spotify" },
  "apple": { slug: "apple" },
  "youtube": { slug: "youtube" },
  "amazon": { slug: "amazon", legacy: true },
  "samsung": { slug: "samsung" },
  "perplexity": { slug: "perplexity" }
};

function getIconData(name: string): { url: string, invert: boolean } | null {
  const lowerName = name.toLowerCase();
  const matchedKey = Object.keys(ICON_MAP).find(key => lowerName.includes(key));
  if (matchedKey) {
    const icon = ICON_MAP[matchedKey];
    if (icon.legacy) {
      return { 
        url: `https://cdn.jsdelivr.net/npm/simple-icons@12.0.0/icons/${icon.slug}.svg`, 
        invert: true 
      };
    }
    return { 
      url: `https://cdn.simpleicons.org/${icon.slug}/F5F5F7`, 
      invert: false 
    };
  }
  return null;
}

/* const ESSENTIALS = [
  { name: 'GitHub Student Pack', desc: 'The ultimate developer toolkit.', group: 'Development', logo: 'https://cdn.simpleicons.org/github/F5F5F7' },
  { name: 'Figma Education', desc: 'Professional design access.', group: 'Design', logo: 'https://cdn.simpleicons.org/figma/F5F5F7' },
  { name: 'Notion Plus', desc: 'Workspace and note-taking.', group: 'Productivity', logo: 'https://cdn.simpleicons.org/notion/F5F5F7' },
  { name: 'DigitalOcean', desc: '$200 in cloud credits.', group: 'Infrastructure', logo: 'https://cdn.simpleicons.org/digitalocean/F5F5F7' },
]; */

export default function App() {
  const [view, setView] = useState<'home' | 'directory' | 'submit'>('home');

  return (
    <div className="min-h-screen relative bg-brand-bg text-brand-accent overflow-x-hidden">
      <div className="fixed inset-0 ambient-glow pointer-events-none z-0 opacity-100" />
      <Navbar view={view} setView={setView} />
      
      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'directory' && <DirectoryView />}
        {view === 'submit' && <SubmitView />}
      </main>

      <Footer />
    </div>
  );
}

function Navbar({ view, setView }: { view: 'home' | 'directory' | 'submit', setView: (v: 'home' | 'directory' | 'submit') => void }) {
  return (
    <nav className="w-full absolute top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 h-24 flex items-center justify-between">
        <button 
          onClick={() => { setView('home'); window.scrollTo(0, 0); }}
          className="nav-item font-display font-medium text-lg tracking-wide hover:text-brand-highlight flex items-center gap-2 transition-colors outline-none border-none focus:outline-none ring-0"
        >
          FreeForStudents.
        </button>
        <div className="flex items-center gap-8 text-sm text-brand-muted">
          <button 
            onClick={() => { setView('directory'); window.scrollTo(0, 0); }}
            className={`nav-item transition-all hover:text-brand-accent outline-none border-none focus:outline-none ring-0 ${view === 'directory' ? 'text-brand-accent font-medium' : ''}`}
          >
            Directory
          </button>
          <button 
            onClick={() => { setView('submit'); window.scrollTo(0, 0); }}
            className={`nav-item transition-all hover:text-brand-accent outline-none border-none focus:outline-none ring-0 ${view === 'submit' ? 'text-brand-accent font-medium' : ''}`}
          >
            Submit
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomeView({ setView }: { setView: (v: 'home' | 'directory' | 'submit') => void }) {
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
            onClick={() => { setView('directory'); window.scrollTo(0, 0); }}
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
            onClick={() => { setView('directory'); window.scrollTo(0, 0); }}
            className="gsap-surface-panel text-sm font-medium hover:text-brand-highlight transition-colors flex items-center gap-2"
          >
            View all categories <ArrowRight size={16} />
          </button>
        </div>
<div className="w-full flex justify-center items-center py-10 min-h-[400px]">
            <ChromaGrid radius={400} damping={0.45} fadeOut={0.6} ease="power3.out" />
        </div>
      </section>

      <section className="py-32 md:py-48 flex flex-col items-center text-center overflow-hidden">
        <h2 className="gsap-surface-panel font-display text-5xl md:text-7xl font-medium mb-8">Built by community.</h2>
        <p className="gsap-surface-panel text-brand-muted text-xl max-w-2xl text-balance mb-12">
          This directory is open source and maintained by students around the world. Missing a tool? Submit it.
        </p>
        <div className="flex gap-4">
          <motion.a 
            href="https://github.com/sarankumar1325/FREEFORSTUDENTS.git" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gsap-surface-panel h-14 px-8 rounded-full border border-brand-surface bg-transparent hover:bg-brand-surface text-brand-accent font-medium flex items-center gap-3 transition-colors"
          >
            <Github size={20} />
            GitHub
          </motion.a>
          <motion.button 
            onClick={() => { setView('submit'); window.scrollTo(0, 0); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gsap-surface-panel h-14 px-8 rounded-full bg-brand-accent text-brand-bg font-medium flex items-center gap-3 transition-colors hover:bg-white"
          >
            Submit a Tool
          </motion.button>
        </div>
      </section>
    </div>
  );
}

function Metric({ number, unit, label }: { number: string, unit: string, label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!numRef.current) return;
    const isNum = !isNaN(Number(number));
    if (isNum) {
      gsap.fromTo(
        numRef.current,
        { textContent: 0 },
        {
          textContent: number,
          duration: 2.5,
          ease: 'power3.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: '.metrics-section', start: 'top 80%' }
        }
      );
    }
  }, { scope: numRef });

  return (
    <div className="metric-item flex flex-col">
      <div className="font-display font-medium text-5xl md:text-6xl lg:text-7xl mb-2 flex items-baseline">
        <span ref={numRef}>{number}</span><span className="text-2xl md:text-3xl lg:text-4xl text-brand-muted ml-1">{unit}</span>
      </div>
      <div className="text-sm md:text-base text-brand-muted uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

function DirectoryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allItems = React.useMemo(() => {
    return DIRECTORY_CATEGORIES.flatMap(cat => 
      cat.items.map(item => ({
        ...item,
        categoryId: cat.id,
        categoryTitle: cat.title
      }))
    );
  }, []);

  const filteredItems = React.useMemo(() => {
    return allItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.categoryId === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allItems, selectedCategory, searchQuery]);

  useGSAP(() => {
    gsap.fromTo('.dir-header', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    gsap.fromTo('.dir-filter', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );
    
    gsap.fromTo('.dir-table', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-32 pb-32 min-h-screen">
      <div className="dir-header mb-12 md:mb-16">
        <h1 className="font-display text-5xl md:text-7xl font-medium mb-6">Directory.</h1>
        <p className="text-brand-muted text-xl md:text-2xl max-w-2xl font-light">
          Filter and search through 70+ premium student subscriptions.
        </p>
      </div>

      <div className="dir-filter mb-8 flex flex-col md:flex-row gap-4 justify-between items-center relative z-20">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search tools or categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-[#111116] border border-brand-surface rounded-full pl-12 pr-6 text-brand-accent focus:outline-none focus:border-brand-muted transition-colors placeholder:text-brand-muted/50"
          />
        </div>

        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full md:w-64 h-12 bg-[#111116] border border-brand-surface rounded-full px-6 flex items-center justify-between text-brand-accent hover:border-brand-muted transition-colors"
          >
            <span className="truncate pr-4">
              {selectedCategory === 'All' ? 'All Categories' : DIRECTORY_CATEGORIES.find(c => c.id === selectedCategory)?.title}
            </span>
            <ChevronDown size={18} className={`transition-transform duration-300 text-brand-muted ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full md:w-64 bg-[#111116] border border-brand-surface rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <button 
                  onClick={() => { setSelectedCategory('All'); setIsDropdownOpen(false); }}
                  className={`text-left px-6 py-4 hover:bg-brand-surface/50 transition-colors ${selectedCategory === 'All' ? 'text-brand-highlight font-medium' : 'text-brand-muted'}`}
                >
                  All Categories
                </button>
                {DIRECTORY_CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setIsDropdownOpen(false); }}
                    className={`text-left px-6 py-4 hover:bg-brand-surface/50 transition-colors border-t border-brand-surface/30 ${selectedCategory === cat.id ? 'text-brand-highlight font-medium' : 'text-brand-muted'}`}
                  >
                    {cat.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="dir-table w-full overflow-x-auto pb-12">
        <div className="min-w-[800px] w-full border border-brand-surface rounded-2xl overflow-hidden bg-[#0a0a0c]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-brand-surface bg-[#111116]">
            <div className="col-span-5 text-xs font-semibold uppercase tracking-widest text-brand-muted">Tool</div>
            <div className="col-span-4 text-xs font-semibold uppercase tracking-widest text-brand-muted">Category</div>
            <div className="col-span-3 text-xs font-semibold uppercase tracking-widest text-brand-muted text-right">Offer</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {filteredItems.length === 0 ? (
              <div className="px-6 py-12 text-center text-brand-muted">No tools found matching your criteria.</div>
            ) : (
              filteredItems.map((item, i) => {
                const iconData = getIconData(item.name);
                return (
                  <motion.div 
                    key={i}
                    whileHover={{ backgroundColor: 'rgba(17, 17, 22, 0.8)' }}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-brand-surface/50 last:border-0 items-center transition-colors group cursor-default"
                  >
                    <div className="col-span-5 font-medium text-brand-accent group-hover:text-brand-highlight flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center shrink-0 border border-brand-surface text-brand-muted transition-colors overflow-hidden ${!iconData ? 'group-hover:bg-brand-highlight group-hover:text-brand-bg' : 'group-hover:border-brand-muted'}`}>
                        {iconData ? (
                          <img 
                            src={iconData.url} 
                            alt={`${item.name} logo`} 
                            className={`w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity ${iconData.invert ? 'invert brightness-0 dark:invert' : ''}`} 
                          />
                        ) : (
                          item.name.charAt(0)
                        )}
                      </div>
                      <span className="truncate group-hover:pl-1 transition-all duration-300">{item.name}</span>
                    </div>
                    <div className="col-span-4 text-sm text-brand-muted truncate">
                      {item.categoryTitle}
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <div className="bg-[#111116] border border-brand-surface px-3 py-1.5 flex items-center justify-center rounded-lg font-medium text-xs text-brand-muted group-hover:text-brand-accent transition-colors max-w-full text-right w-full sm:w-auto overflow-hidden">
                        <span className="truncate">{item.offer}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitView() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      toolName: formData.get('toolName'),
      toolUrl: formData.get('toolUrl'),
      offer: formData.get('offer'),
      description: formData.get('description'),
      category: formData.get('category'),
      _subject: 'New Tool Submission - FreeForStudents'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/7fec4fcce2baf3bb4a3ac2db9035c414', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="py-32 md:py-48 max-w-2xl mx-auto flex flex-col items-center w-full min-h-screen">
      <h2 className="font-display text-4xl md:text-6xl font-medium mb-6 text-center">Submit a Tool</h2>
      <p className="text-brand-muted text-center mb-12 text-lg text-balance">
        Know a great software that offers free tiers for students?<br/>
        Let us know and we'll add it to the directory.
      </p>

      {status === 'success' ? (
        <div className="surface-panel p-8 text-center text-emerald-400 border border-emerald-500/20 w-full rounded-2xl animate-in fade-in">
          <p className="text-2xl font-medium mb-2">Thank you!</p>
          <p className="text-emerald-400/80">Your submission has been sent to our team.</p>
          <button 
            onClick={() => setStatus('idle')} 
            className="mt-6 text-sm text-brand-muted hover:text-brand-accent transition-colors"
          >
            Submit another tool
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="surface-panel p-8 md:p-10 w-full flex flex-col gap-6 rounded-2xl">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-muted">Tool Name *</label>
            <input required type="text" name="toolName" className="bg-[#0b0b0e] border border-brand-surface rounded-xl px-4 py-3.5 text-brand-accent focus:outline-none focus:border-brand-highlight transition-colors" placeholder="e.g. Acme Editor" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-muted">Website URL</label>
            <input type="url" name="toolUrl" className="bg-[#0b0b0e] border border-brand-surface rounded-xl px-4 py-3.5 text-brand-accent focus:outline-none focus:border-brand-highlight transition-colors" placeholder="https://..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-muted">Category</label>
            <select name="category" className="bg-[#0b0b0e] border border-brand-surface rounded-xl px-4 py-3.5 text-brand-accent focus:outline-none focus:border-brand-highlight transition-colors appearance-none cursor-pointer">
              {['Development', 'Cloud', 'Design', 'Productivity', 'Learning', 'Other'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-muted">What is the student offer? *</label>
            <input required type="text" name="offer" className="bg-[#0b0b0e] border border-brand-surface rounded-xl px-4 py-3.5 text-brand-accent focus:outline-none focus:border-brand-highlight transition-colors" placeholder="e.g. 1 year free, $100 credits" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-muted">Additional Notes (Optional)</label>
            <textarea name="description" rows={4} className="bg-[#0b0b0e] border border-brand-surface rounded-xl px-4 py-3.5 text-brand-accent focus:outline-none focus:border-brand-highlight transition-colors resize-y" placeholder="Any other details..." />
          </div>

          {status === 'error' && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">Failed to submit. Please try again later.</div>
          )}

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="h-14 mt-4 w-full rounded-xl bg-brand-accent text-brand-bg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Tool'}
          </button>
          
          <div className="text-xs text-brand-muted text-center mt-2 opacity-50">
            Powered by FormSubmit
          </div>
        </form>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-brand-surface py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-brand-muted">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <span>© {new Date().getFullYear()} FreeForStudents.</span>
          <span className="hidden md:inline text-brand-surface">|</span>
          <a href="https://github.com/sarankumar1325/FREEFORSTUDENTS" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-1.5 hover:text-brand-accent transition-colors bg-brand-surface/30 px-3 py-1.5 rounded-full border border-brand-surface/50">
            <Github size={14} />
            Proudly Open Source
          </a>
        </div>
        <div className="flex items-center gap-8">
          <a href="https://x.com/iamsaranhere" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Twitter</a>
          <a href="https://github.com/sarankumar1325/FREEFORSTUDENTS" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

