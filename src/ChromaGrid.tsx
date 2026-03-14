import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: 'https://cdn.simpleicons.org/github/F5F5F7',
      title: 'GitHub Education',
      subtitle: '100+ dev tools permanently free',
      handle: 'Dev',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://education.github.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/figma/F5F5F7',
      title: 'Figma',
      subtitle: 'Free Pro design workspace',
      handle: 'Design',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.figma.com/education/'
    },
    {
      image: 'https://cdn.simpleicons.org/cursor/F5F5F7',
      title: 'Cursor Pro',
      subtitle: 'The AI code editor for free',
      handle: 'AI',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://cursor.sh'
    },
    {
      image: 'https://cdn.simpleicons.org/digitalocean/F5F5F7',
      title: 'DigitalOcean',
      subtitle: '$200 in premium cloud credits',
      handle: 'Cloud',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.digitalocean.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/jetbrains/F5F5F7',
      title: 'JetBrains',
      subtitle: 'Every pro IDE completely free',
      handle: 'Dev',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.jetbrains.com/community/education/'
    },
    {
      image: 'https://cdn.simpleicons.org/notion/F5F5F7',
      title: 'Notion Plus',
      subtitle: 'Unlimited workspace & pages',
      handle: 'Office',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.notion.so/students'
    },
    {
      image: 'https://cdn.simpleicons.org/vercel/F5F5F7',
      title: 'Vercel Pro',
      subtitle: '6-months of premium hosting',
      handle: 'Cloud',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://vercel.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/replit/F5F5F7',
      title: 'Replit Pro',
      subtitle: 'High-power cloud dev envs',
      handle: 'Dev',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://replit.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/framer/F5F5F7',
      title: 'Framer',
      subtitle: 'Free workspace for students',
      handle: 'Design',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.framer.com/education/'
    },
    {
      image: 'https://cdn.simpleicons.org/supabase/F5F5F7',
      title: 'Supabase',
      subtitle: 'Open source Firebase alternative',
      handle: 'Backend',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://supabase.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/raycast/F5F5F7',
      title: 'Raycast',
      subtitle: 'Ultimate pro productivity',
      handle: 'Toolkit',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.raycast.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/perplexity/F5F5F7',
      title: 'Perplexity Pro',
      subtitle: 'Free 1-year Pro subscription',
      handle: 'Search',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.perplexity.ai/'
    },
    {
      image: 'https://cdn.simpleicons.org/postman/F5F5F7',
      title: 'Postman',
      subtitle: 'Student API platform access',
      handle: 'API',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.postman.com/student-program/'
    },
    {
      image: 'https://cdn.simpleicons.org/docker/F5F5F7',
      title: 'Docker',
      subtitle: 'Industry standard containers',
      handle: 'DevOps',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.docker.com/community/education/'
    },
    {
      image: 'https://cdn.simpleicons.org/netlify/F5F5F7',
      title: 'Netlify',
      subtitle: 'Modern web hosting platform',
      handle: 'Hosting',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://www.netlify.com/'
    },
    {
      image: 'https://cdn.simpleicons.org/linear/F5F5F7',
      title: 'Linear',
      subtitle: 'Pro issue tracking tool',
      handle: 'Productivity',
      gradient: 'linear-gradient(160deg, #13131A 0%, #0B0B0E 100%)',
      url: 'https://linear.app/'
    }
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-4 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-[280px] h-[340px] md:w-[300px] md:h-[360px] rounded-[32px] overflow-hidden border border-brand-surface/50 hover:border-brand-surface hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer"
          style={
            {
              background: c.gradient || '#111116',
              '--spotlight-color': 'rgba(255,255,255,0.06)'
            } as React.CSSProperties
          }
        >
          {/* Spotlight Effect Core */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)'
            }}
          />
          
          {/* Ambient center glow that pulses up on hover */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Logo Container */}
          <div className="relative z-10 flex-1 p-8 box-border flex items-center justify-center">
            <img src={c.image} alt={c.title} loading="lazy" className="w-[72px] h-[72px] object-contain opacity-50 group-hover:opacity-100 transition-all group-hover:scale-[1.12] group-hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.25)] duration-500" />
          </div>
          
          {/* Footer UI Container */}
          <footer className="relative z-10 p-7 flex flex-col justify-end shadow-[0_-40px_40px_-20px_rgba(0,0,0,0.8)_inset]">
            <div className="flex justify-between items-end mb-3 gap-4">
              <h3 className="m-0 text-xl font-display font-medium tracking-wide text-brand-accent group-hover:text-white transition-colors">{c.title}</h3>
              {c.handle && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[#0E0E14] text-brand-muted border border-brand-surface shrink-0 group-hover:border-brand-muted/50 transition-colors">
                  {c.handle}
                </span>
              )}
            </div>
            <p className="m-0 text-[15px] font-light text-brand-muted/70 leading-relaxed">{c.subtitle}</p>
          </footer>
        </article>
      ))}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;