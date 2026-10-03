import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

export const ThunderCursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      '#EF4444', // Red
      '#F43F5E', // Rose
      '#F59E0B', // Amber
      '#38BDF8', // Cyan electric
      '#818CF8', // Indigo spark
      '#FFFFFF', // Electric white
    ];

    const addSparks = (x: number, y: number, count = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 22 + 12,
          color,
          size: Math.random() * 2.5 + 1.2,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const pt = { x: e.clientX, y: e.clientY, time: now };
      pointsRef.current.push(pt);

      if (lastMouseRef.current) {
        const dx = pt.x - lastMouseRef.current.x;
        const dy = pt.y - lastMouseRef.current.y;
        const dist = Math.hypot(dx, dy);

        // Add sparks if cursor moves
        if (dist > 4) {
          addSparks(pt.x, pt.y, Math.min(4, Math.floor(dist / 8) + 1));
        }
      }

      lastMouseRef.current = { x: pt.x, y: pt.y };

      // Keep recent points
      if (pointsRef.current.length > 18) {
        pointsRef.current.shift();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < 350);

      const pts = pointsRef.current;

      // Draw subtle electric lightning / spark beam between recent points
      if (pts.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer glow
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const xc = (pts[i].x + pts[i - 1].x) / 2;
          const yc = (pts[i].y + pts[i - 1].y) / 2;
          ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#EF4444';
        ctx.stroke();

        // Inner electric core
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          // slight jitter for lightning effect
          const jitterX = (Math.random() - 0.5) * 2;
          const jitterY = (Math.random() - 0.5) * 2;
          ctx.lineTo(pts[i].x + jitterX, pts[i].y + jitterY);
        }
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38BDF8';
        ctx.stroke();

        ctx.restore();
      }

      // Update and draw particles
      const remainingParticles: Particle[] = [];
      for (const p of particlesRef.current) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        const progress = p.life / p.maxLife;
        if (progress < 1) {
          const alpha = 1 - progress;
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
          remainingParticles.push(p);
        }
      }
      particlesRef.current = remainingParticles;

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
