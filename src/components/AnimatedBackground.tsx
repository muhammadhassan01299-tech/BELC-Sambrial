import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pencil,
  PenTool,
  BookOpen,
  GraduationCap,
  Ruler,
  Lightbulb,
  Highlighter,
  Library,
  Languages,
  type LucideIcon,
} from 'lucide-react';

/**
 * Animated background for the whole website (replaces GlossyBackground).
 *
 * Layers (back to front):
 *  1. Colourful gradient  -> never plain black / plain white
 *  2. Soft glowing orbs
 *  3. Floating pencils, pens, books, caps, rulers (pure CSS animation)
 *  4. Canvas: drifting particles + connecting lines + random thunder bolts
 *  5. White flash when thunder strikes
 */

interface Props {
  theme: 'dark' | 'light';
}

const ICONS: LucideIcon[] = [Pencil, PenTool, BookOpen, GraduationCap, Ruler, Lightbulb, Highlighter, Library, Languages];

interface Bolt {
  points: { x: number; y: number }[];
  branches: { x: number; y: number }[][];
  born: number;
}

// Build a jagged lightning path using "midpoint displacement"
function makeBoltPath(x1: number, y1: number, x2: number, y2: number, spread: number): { x: number; y: number }[] {
  let pts = [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
  let offset = spread;
  for (let i = 0; i < 6; i++) {
    const next: { x: number; y: number }[] = [];
    for (let j = 0; j < pts.length - 1; j++) {
      const a = pts[j];
      const b = pts[j + 1];
      const mx = (a.x + b.x) / 2 + (Math.random() - 0.5) * offset;
      const my = (a.y + b.y) / 2 + (Math.random() - 0.5) * offset * 0.3;
      next.push(a, { x: mx, y: my });
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    offset *= 0.55;
  }
  return pts;
}

export const AnimatedBackground: React.FC<Props> = ({ theme }) => {
  const isDark = theme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flashKey, setFlashKey] = useState(0);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Floating school items: random but created only once
  const floaters = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 9 : 18;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      Icon: ICONS[i % ICONS.length],
      left: Math.random() * 100,
      size: 22 + Math.random() * 30,
      dur: 22 + Math.random() * 26,
      delay: -Math.random() * 40,
      dx: (Math.random() - 0.5) * 160,
      r0: Math.random() * 360,
      o: 0.1 + Math.random() * 0.14,
    }));
  }, []);

  // Particles + thunder (canvas)
  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = w < 768;
    const N = isMobile ? 38 : 85;
    const LINK = isMobile ? 90 : 130;

    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      hue: Math.random() < 0.6 ? 350 : Math.random() < 0.5 ? 215 : 40, // red / blue / gold
    }));

    let bolts: Bolt[] = [];
    let nextStrike = performance.now() + 2500 + Math.random() * 3000;
    let raf = 0;
    let running = true;

    const strike = () => {
      const x1 = w * (0.1 + Math.random() * 0.8);
      const x2 = x1 + (Math.random() - 0.5) * w * 0.25;
      const y2 = h * (0.45 + Math.random() * 0.4);
      const points = makeBoltPath(x1, -10, x2, y2, w * 0.14);
      const branches: { x: number; y: number }[][] = [];
      const branchCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < branchCount; i++) {
        const start = points[Math.floor(points.length * (0.2 + Math.random() * 0.5))];
        const dir = Math.random() < 0.5 ? -1 : 1;
        branches.push(
          makeBoltPath(start.x, start.y, start.x + dir * (60 + Math.random() * 140), start.y + 80 + Math.random() * 160, 60)
        );
      }
      bolts.push({ points, branches, born: performance.now() });
      setFlashKey((k) => k + 1);
    };

    const drawPath = (pts: { x: number; y: number }[]) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    };

    const render = (now: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const dark = isDarkRef.current;

      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
      for (let i = 0; i < N; i++) {
        const a = particles[i];
        for (let j = i + 1; j < N; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = dark
              ? `rgba(148,163,255,${(1 - d / LINK) * 0.22})`
              : `rgba(79,70,229,${(1 - d / LINK) * 0.16})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? `hsla(${p.hue},90%,72%,0.85)` : `hsla(${p.hue},75%,50%,0.55)`;
        ctx.fill();
      }

      // thunder
      if (now >= nextStrike) {
        strike();
        if (Math.random() < 0.35) setTimeout(() => running && strike(), 160); // double flash
        nextStrike = now + 5000 + Math.random() * 7000;
      }
      bolts = bolts.filter((b) => now - b.born < 650);
      for (const b of bolts) {
        const age = (now - b.born) / 650;
        const flicker = age < 0.35 ? 1 : Math.random() > 0.5 ? 0.6 : 0.15;
        const alpha = (1 - age) * flicker * (dark ? 1 : 0.55);
        ctx.save();
        ctx.lineJoin = 'round';
        ctx.shadowColor = dark ? '#7dd3fc' : '#6366f1';
        ctx.shadowBlur = 22;
        ctx.strokeStyle = `rgba(147,197,253,${alpha * 0.55})`;
        ctx.lineWidth = 7;
        drawPath(b.points);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 2.2;
        drawPath(b.points);
        ctx.lineWidth = 1.2;
        for (const br of b.branches) drawPath(br);
        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    // Stop animating when the tab is hidden (saves battery)
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden" aria-hidden="true">
      {/* 1. Gradient base */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(1200px 700px at 15% 0%, #3b0f2e 0%, transparent 60%), radial-gradient(1000px 700px at 90% 25%, #1b2a6b 0%, transparent 60%), linear-gradient(180deg, #0b1020 0%, #111a3a 55%, #1a0f2b 100%)'
            : 'radial-gradient(1100px 700px at 10% 0%, #fecdd3 0%, transparent 60%), radial-gradient(900px 700px at 95% 30%, #bfdbfe 0%, transparent 60%), linear-gradient(180deg, #fff7ed 0%, #eef2ff 55%, #fdf2f8 100%)',
        }}
      />

      {/* 2. Glowing orbs */}
      <div
        className={`absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-[130px] animate-pulse-subtle ${
          isDark ? 'bg-rose-600/30' : 'bg-rose-400/30'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full blur-[140px] ${
          isDark ? 'bg-indigo-500/30' : 'bg-sky-400/30'
        }`}
        style={{ animation: 'pulse-subtle 7s ease-in-out infinite alternate' }}
      />
      <div
        className={`absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${
          isDark ? 'bg-amber-500/15' : 'bg-amber-300/30'
        }`}
        style={{ animation: 'pulse-subtle 9s ease-in-out infinite alternate' }}
      />

      {/* 3. Floating pencils / pens / books */}
      {!reduceMotion &&
        floaters.map(({ id, Icon, left, size, dur, delay, dx, r0, o }) => (
          <div
            key={id}
            className={`belc-float-item ${isDark ? 'text-sky-200' : 'text-indigo-700'}`}
            style={
              {
                left: `${left}%`,
                '--dur': `${dur}s`,
                '--delay': `${delay}s`,
                '--dx': `${dx}px`,
                '--r0': `${r0}deg`,
                '--o': o,
              } as React.CSSProperties
            }
          >
            <Icon width={size} height={size} strokeWidth={1.4} />
          </div>
        ))}

      {/* 4. Particles + lightning */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 5. Screen flash when thunder strikes */}
      {flashKey > 0 && !reduceMotion && (
        <div
          key={flashKey}
          className="belc-flash absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 20%, rgba(186,230,253,0.22), transparent 70%)'
              : 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.55), transparent 70%)',
          }}
        />
      )}
    </div>
  );
};
