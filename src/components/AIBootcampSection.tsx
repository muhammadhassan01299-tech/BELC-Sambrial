import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Video,
  Terminal,
  Layers,
  Code2,
  Workflow,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Clock,
  Calendar,
  Zap,
  Award,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface AIBootcampSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const AIBootcampSection: React.FC<AIBootcampSectionProps> = ({ theme, isUrdu }) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'prompt' | 'vibe' | 'video' | 'automation'>('vibe');

  const isDark = theme === 'dark';

  const pillars = [
    {
      icon: <Video className="w-6 h-6 text-rose-500" />,
      title: 'Cinematic AI Video Generation',
      urduTitle: 'اے آئی ویڈیو جنریشن',
      desc: 'Master photorealistic image synthesis and high-definition video prompting with Midjourney, Kling, Runway Gen-3, and ElevenLabs voice cloning.',
      urduDesc: 'جدید اے آئی ماڈلز کے ذریعے فلمی کوالٹی کی ویڈیوز اور وائس اوور تیار کرنا سیکھیں۔',
      tools: ['Midjourney v6', 'Runway Gen-3', 'Kling AI', 'ElevenLabs'],
    },
    {
      icon: <Terminal className="w-6 h-6 text-amber-500" />,
      title: 'Advanced Prompt Engineering',
      urduTitle: 'پرامپٹ انجینئرنگ',
      desc: 'Formulate deterministic system prompts, chain-of-thought logic, context windows, and multi-turn workflows across Claude 3.7, GPT-4o, and Gemini 2.5.',
      urduDesc: 'چیٹ جی پی ٹی، کلاڈ اور جیمنائی سے درست اور پروفیشنل کام لینے کے جدید طریقے اور فریم ورکس۔',
      tools: ['System Prompts', 'Context Caching', 'Few-Shot Logic', 'JSON Outputs'],
    },
    {
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      title: '"Vibe Coding" & Modern AI Dev',
      urduTitle: 'وائب کوڈنگ و سافٹ ویئر میکنگ',
      desc: 'Build full-stack web applications, landing pages, and interactive dashboards without syntax memorization using Cursor, Windsurf, and AI copilots.',
      urduDesc: 'بغیر کوڈنگ رٹے جدید اے آئی ایڈیٹرز کے ذریعے مکمل ویب سائٹس اور ایپس تیار کریں۔',
      tools: ['Cursor AI', 'Windsurf', 'Claude Code', 'Full-Stack Prototypes'],
    },
    {
      icon: <Workflow className="w-6 h-6 text-emerald-400" />,
      title: 'AI Business Automation & Agents',
      urduTitle: 'اے آئی آٹومیشن و ایجنٹس',
      desc: 'Connect AI into real business operations: automated lead responses, document summarizers, WhatsApp auto-responders, and autonomous research agents.',
      urduDesc: 'کاروباری آٹومیشن، ای میل رسپانسز اور بغیر کسی انسانی مداخلت کے کام کرنے والے اے آئی ایجنٹس۔',
      tools: ['Make.com', 'Zapier', 'n8n Workflows', 'Custom AI Agents'],
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      title: 'No-Code Projects & Live Portfolios',
      urduTitle: 'بغیر کوڈنگ پروجیکٹس و فری لانسنگ',
      desc: 'Deploy 5 live production projects to real web domains. Package and sell your AI solutions to international clients on Upwork and Fiverr.',
      urduDesc: '5 لائیو پروجیکٹس انٹرنیٹ پر لانچ کریں اور بین الاقوامی کلائنٹس کو اپنی سروسز پیش کریں۔',
      tools: ['Vercel Deployments', 'Stripe Billing', 'Client Pitching', 'Portfolio'],
    },
  ];

  return (
    <section
      id="ai-bootcamp"
      className="relative py-24 overflow-hidden border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-950 text-white"
    >
      {/* Futuristic Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.25),rgba(255,255,255,0))]" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Overlay Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Futuristic Top Bar */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-gradient-to-r from-red-600/30 via-purple-600/30 to-cyan-600/30 border border-white/20 text-white mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-red-400 animate-spin" />
            <span>BELC FLAGSHIP AI INITIATIVE 2026</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Learn AI. Build with AI. <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Work with AI.
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed ${
              isUrdu ? 'font-urdu' : ''
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            {isUrdu
              ? 'سمبڑیال کا پہلا پریکٹیکل 8 ہفتوں کا اے آئی بوٹ کیمپ۔ ویڈیو جنریشن، پرامپٹ انجینئرنگ، وائب کوڈنگ اور آٹومیشنز سیکھ کر بین الاقوامی مارکیٹ میں قدم رکھیں۔'
              : 'Sambrial’s premier 8-week intensive hands-on AI program. Transform your computer skills into monetizable modern intelligence.'}
          </p>
        </div>

        {/* Hero Interactive Split: Core Pillars & Code/Workflow Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: 5 Confirmed Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 transition-all duration-300 backdrop-blur-md hover:shadow-lg hover:shadow-red-950/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60 shrink-0 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {isUrdu ? pillar.urduTitle : pillar.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                        Module 0{idx + 1}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed ${
                        isUrdu ? 'font-urdu' : ''
                      }`}
                      dir={isUrdu ? 'rtl' : 'ltr'}
                    >
                      {isUrdu ? pillar.urduDesc : pillar.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {pillar.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 border border-zinc-700/50"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Live Interactive Neural Sandbox & Curriculum Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Terminal Window Box */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">belc-ai-lab // terminal</span>
                </div>
                <span className="text-[10px] font-mono text-red-400 font-bold">● LIVE SANDBOX</span>
              </div>

              {/* Code Snippet Tabs */}
              <div className="flex border-b border-zinc-800 bg-zinc-950/60 px-2 text-xs font-mono">
                <button
                  onClick={() => setActiveSnippetTab('vibe')}
                  className={`px-3 py-2 border-b-2 font-medium cursor-pointer transition-all ${
                    activeSnippetTab === 'vibe'
                      ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  vibe-coding.tsx
                </button>
                <button
                  onClick={() => setActiveSnippetTab('prompt')}
                  className={`px-3 py-2 border-b-2 font-medium cursor-pointer transition-all ${
                    activeSnippetTab === 'prompt'
                      ? 'border-amber-400 text-amber-400 bg-amber-950/20'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  system-prompt.txt
                </button>
                <button
                  onClick={() => setActiveSnippetTab('video')}
                  className={`px-3 py-2 border-b-2 font-medium cursor-pointer transition-all ${
                    activeSnippetTab === 'video'
                      ? 'border-rose-400 text-rose-400 bg-rose-950/20'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  video-gen.json
                </button>
              </div>

              {/* Tab Code Output */}
              <div className="p-4 font-mono-code text-xs leading-relaxed text-zinc-300 bg-zinc-950/90 overflow-x-auto min-h-[220px]">
                {activeSnippetTab === 'vibe' && (
                  <pre className="text-zinc-300">
                    <span className="text-purple-400">// BELC Vibe Coding Lab — Cursor AI Workflow</span>
                    <br />
                    <span className="text-cyan-400">async function</span>{' '}
                    <span className="text-amber-300">generateLeadApp</span>(prompt:{' '}
                    <span className="text-emerald-400">string</span>) &#123;
                    <br />
                    {'  '}
                    <span className="text-zinc-500">// 1. Context synthesis via local agent</span>
                    <br />
                    {'  '}
                    <span className="text-purple-400">const</span> app ={' '}
                    <span className="text-cyan-400">await</span> aiEngine.build(&#123;
                    <br />
                    {'    '}spec: prompt,
                    <br />
                    {'    '}stack: [<span className="text-emerald-300">&apos;React&apos;</span>,{' '}
                    <span className="text-emerald-300">&apos;Tailwind&apos;</span>,{' '}
                    <span className="text-emerald-300">&apos;AI Studio&apos;</span>],
                    <br />
                    {'    '}optimization: <span className="text-emerald-300">&apos;production-grade&apos;</span>,
                    <br />
                    {'  '}&#125;);
                    <br />
                    {'  '}
                    <span className="text-purple-400">return</span> app.deployLive();
                    <br />
                    &#125;
                  </pre>
                )}

                {activeSnippetTab === 'prompt' && (
                  <pre className="text-zinc-300">
                    <span className="text-amber-400">&gt; SYSTEM PROMPT INGESTION:</span>
                    <br />
                    &quot;You are an enterprise AI reasoning specialist.
                    <br />
                    Apply chain-of-thought diagnostics before emitting outputs.
                    <br />
                    Structure all responses with JSON schemas and verified references.
                    <br />
                    Format output for international freelance clients.&quot;
                    <br />
                    <br />
                    <span className="text-emerald-400">Status: Calibration 100% verified.</span>
                  </pre>
                )}

                {activeSnippetTab === 'video' && (
                  <pre className="text-zinc-300">
                    &#123;
                    <br />
                    {'  '}&quot;model&quot;: &quot;RunwayGen3-Alpha&quot;,
                    <br />
                    {'  '}&quot;cameraMovement&quot;: &quot;Slow cinematic dolly in, 35mm lens&quot;,
                    <br />
                    {'  '}&quot;audioCloning&quot;: &quot;ElevenLabs studio speech&quot;,
                    <br />
                    {'  '}&quot;outputResolution&quot;: &quot;4K Ultra HD 60fps&quot;,
                    <br />
                    {'  '}&quot;monetizationTier&quot;: &quot;Commercial Client Ad ($450)&quot;
                    <br />
                    &#125;
                  </pre>
                )}
              </div>
            </div>

            {/* Bootcamp Enrollment Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/40 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Admissions Open
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30">
                  8-Week Program
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">
                Join the Next AI Cohort in Sambrial
              </h4>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Learn directly inside BELC’s modern computer lab. No previous coding or IT background required. Limited seats per batch for individualized mentoring.
              </p>

              <div className="space-y-2 mb-5 text-xs text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    <span>Duration:</span>
                  </span>
                  <span className="font-semibold text-white">8 Weeks Hands-on</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Certification:</span>
                  </span>
                  <span className="font-semibold text-white">BELC Certified AI Diploma</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Batch Tuition:</span>
                  </span>
                  <span className="font-bold text-red-400">Contact us for current fee</span>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl('ai-bootcamp')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isUrdu ? 'اے آئی بوٹ کیمپ کی سیٹ بک کروائیں' : 'Reserve AI Seat on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
