import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, RotateCcw, Sparkles } from 'lucide-react';
import { ACADEMY_DATA } from '../data/academy';

interface VoiceAssistantProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

type VoiceMode = 'ur' | 'hi' | 'en';

// Same greeting written in Hindi (Devanagari) letters.
// Many phones/PCs have NO Urdu voice, but almost all have a Hindi voice, and spoken Hindi and
// Urdu sound the same. Hindi voices cannot read Urdu letters, so this version is the fallback.
const SCRIPT_HINDI =
  'बिस्मिल्लाह इंग्लिश लैंग्वेज क्लब सम्बड़ियाल में ख़ुश आमदीद। सर मुहम्मद क़ासिम और माहिर उस्तादों की निगरानी में आईएलटीएस, पीटीई, स्पोकन इंग्लिश, जदीद ए आई बूट कैंप, स्टडी वीज़ा और उमरा सर्विसेज़ के लिए हम आपकी ख़िदमत में हाज़िर हैं। मज़ीद मालूमात के लिए वॉट्सऐप पर राबता करें।';

const normLang = (l: string) => l.toLowerCase().replace('_', '-');

// Picks the best voice this device has: Urdu -> Hindi -> English
function chooseVoice(): { voice: SpeechSynthesisVoice | null; mode: VoiceMode } {
  const voices = window.speechSynthesis.getVoices();
  const ur = voices.find((v) => normLang(v.lang).startsWith('ur') || v.name.toLowerCase().includes('urdu'));
  if (ur) return { voice: ur, mode: 'ur' };
  const hi = voices.find((v) => normLang(v.lang).startsWith('hi') || v.name.toLowerCase().includes('hindi'));
  if (hi) return { voice: hi, mode: 'hi' };
  const en =
    voices.find((v) => normLang(v.lang) === 'en-in') ||
    voices.find((v) => normLang(v.lang) === 'en-gb') ||
    voices.find((v) => normLang(v.lang).startsWith('en'));
  return { voice: en || null, mode: 'en' };
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ theme, isUrdu }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeVoiceName, setActiveVoiceName] = useState<string>('');
  const [voiceMode, setVoiceMode] = useState<VoiceMode>('ur');
  // true while we are waiting for the visitor's first tap/click (browsers block sound before that)
  const [needsTap, setNeedsTap] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]); // keeps them alive (Chrome garbage-collects them otherwise)
  const genRef = useRef(0); // every new start gets a new number; old callbacks are ignored
  const mutedRef = useRef(false);
  const greetedRef = useRef(false);

  mutedRef.current = isMuted;

  // Always starts the greeting from the beginning
  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    greetedRef.current = true;
    setShowTranscript(true);
    if (mutedRef.current) return;

    const synth = window.speechSynthesis;
    const myId = ++genRef.current;

    const run = () => {
      if (genRef.current !== myId) return;
      const { voice, mode } = chooseVoice();
      setVoiceMode(mode);
      setActiveVoiceName(voice?.name || '');

      const text =
        mode === 'ur'
          ? ACADEMY_DATA.voiceAssistant.scriptUrdu
          : mode === 'hi'
          ? SCRIPT_HINDI
          : ACADEMY_DATA.voiceAssistant.scriptEnglish;

      // Short pieces (one sentence each) work better than one long text (Chrome stops long ones)
      const chunks = (text.match(/[^۔।.!?؟]+[۔।.!?؟]?/g) || [text]).map((c) => c.trim()).filter(Boolean);

      utterancesRef.current = chunks.map((chunk, i) => {
        const u = new SpeechSynthesisUtterance(chunk);
        u.lang = voice?.lang || (mode === 'ur' ? 'ur-PK' : mode === 'hi' ? 'hi-IN' : 'en-US');
        if (voice) u.voice = voice;
        u.rate = mode === 'en' ? 1 : 0.95;
        u.pitch = 1;
        u.onstart = () => {
          if (genRef.current !== myId) return;
          setIsPlaying(true);
          setIsPaused(false);
          setNeedsTap(false);
          try {
            sessionStorage.setItem('belc_greeted', '1');
          } catch {
            /* ignore */
          }
        };
        u.onend = () => {
          if (genRef.current !== myId) return;
          if (i === chunks.length - 1) {
            setIsPlaying(false);
            setIsPaused(false);
          }
        };
        u.onerror = (ev) => {
          if (genRef.current !== myId) return;
          if (ev.error === 'not-allowed') {
            // Browser blocked sound because the visitor has not clicked yet -> wait for the first click
            greetedRef.current = false;
            setNeedsTap(true);
          }
          setIsPlaying(false);
          setIsPaused(false);
        };
        return u;
      });

      utterancesRef.current.forEach((u) => synth.speak(u));
    };

    // Chrome sometimes drops speak() right after cancel(), so wait a moment when something is active
    if (synth.speaking || synth.pending) {
      synth.cancel();
      setTimeout(run, 80);
    } else {
      run();
    }
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    speak();
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    genRef.current++;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    mutedRef.current = next;
    if (next) handleStop();
  };

  // Setup: check support, load voices, and play the greeting automatically
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const { voice, mode } = chooseVoice();
      setActiveVoiceName(voice?.name || '');
      setVoiceMode(mode);
    };
    updateVoices();
    synth.addEventListener('voiceschanged', updateVoices);

    // Play the greeting only once per visit (not again on every refresh / language switch)
    let alreadyGreeted = false;
    try {
      alreadyGreeted = sessionStorage.getItem('belc_greeted') === '1';
    } catch {
      /* ignore */
    }

    let removeGesture = () => {};
    let timer = 0;

    if (!alreadyGreeted) {
      setNeedsTap(true);

      // Browsers (Chrome, Edge, Safari) BLOCK sound until the visitor clicks/taps/presses a key once.
      // So: 1) try right away (works in some browsers), 2) otherwise play on the very first click/tap.
      const onGesture = (e: Event) => {
        if (greetedRef.current) {
          removeGesture();
          return;
        }
        // If the first click was on the audio player itself, let its own buttons handle it
        if (rootRef.current && e.target instanceof Node && rootRef.current.contains(e.target)) return;
        removeGesture();
        speak();
      };
      const events: (keyof WindowEventMap)[] = ['click', 'touchend', 'keydown'];
      events.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
      removeGesture = () => events.forEach((ev) => window.removeEventListener(ev, onGesture));

      timer = window.setTimeout(speak, 700);
    }

    return () => {
      window.clearTimeout(timer);
      removeGesture();
      synth.removeEventListener('voiceschanged', updateVoices);
      genRef.current++;
      synth.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      ref={rootRef}
      className={`rounded-2xl transition-all duration-300 p-4 border ${
        isDark
          ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-xl shadow-red-950/20'
          : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-lg shadow-zinc-200/50'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Info & Soundwaves */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-600/10 text-red-600 border border-red-500/20">
            <Volume2 className="w-5 h-5 animate-pulse" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight">
                {isUrdu ? 'آڈیو گائیڈ — بی ایل سی' : 'BELC Audio Guide & Voice Greeting'}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-600/20 text-red-500 border border-red-500/30">
                Urdu
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {isPlaying
                ? isUrdu
                  ? 'آواز جاری ہے...'
                  : 'Speaking welcome message...'
                : isPaused
                ? isUrdu
                  ? 'آواز روکی گئی ہے'
                  : 'Audio paused'
                : needsTap
                ? isUrdu
                  ? 'آواز سننے کے لیے صفحے پر کہیں بھی ٹیپ کریں'
                  : 'Tap anywhere on the page to hear the welcome greeting'
                : isUrdu
                ? 'سننے کے لیے پلے کریں'
                : 'Click Play for official academy audio greeting'}
            </p>
          </div>
        </div>

        {/* Right: Audio Player Controls */}
        <div className="flex items-center gap-1.5">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Play welcome audio message"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isUrdu ? 'سنیں' : 'Play Greeting'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="p-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow transition-all cursor-pointer"
              aria-label="Pause audio"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="p-2 rounded-xl text-xs font-semibold bg-zinc-700 hover:bg-zinc-800 text-white transition-all cursor-pointer"
              aria-label="Stop audio"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <button
            onClick={() => {
              handleStop();
              setTimeout(speak, 100);
            }}
            className="p-2 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            title="Replay from start"
            aria-label="Replay audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
              isMuted
                ? 'bg-red-600 text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-red-500 transition-all cursor-pointer"
          >
            {showTranscript ? (isUrdu ? 'متن چھپائیں' : 'Hide Text') : isUrdu ? 'متن دیکھیں' : 'Transcript'}
          </button>
        </div>
      </div>

      {!isSupported && (
        <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          {isUrdu
            ? 'اس براؤزر میں آواز کی سہولت موجود نہیں۔ براہِ کرم نیچے متن پڑھیں۔'
            : 'Audio is not supported in this browser. Please read the text below.'}
        </p>
      )}

      {/* Transcript Accordion / Fallback View */}
      {showTranscript && (
        <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-sm">
            <div className="flex items-center justify-between mb-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isUrdu ? 'مستند کلمات (سرکاری پیغام):' : 'Official Urdu Transcript:'}
              </span>
              {activeVoiceName && <span className="text-[10px] text-zinc-400">Voice: {activeVoiceName}</span>}
            </div>
            <p
              className="font-urdu text-right text-base leading-relaxed text-zinc-800 dark:text-zinc-100"
              dir="rtl"
            >
              {ACADEMY_DATA.voiceAssistant.scriptUrdu}
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 italic">
              &quot;{ACADEMY_DATA.voiceAssistant.scriptEnglish}&quot;
            </p>
            {isSupported && voiceMode === 'hi' && (
              <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400">
                {isUrdu
                  ? 'آپ کے ڈیوائس میں اردو آواز نہیں، اس لیے ہندی آواز استعمال ہو رہی ہے (تلفظ ایک جیسا ہے)۔'
                  : 'No Urdu voice on this device, so a Hindi voice is used (it sounds the same when spoken).'}
              </p>
            )}
            {isSupported && voiceMode === 'en' && (
              <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400">
                {isUrdu
                  ? 'آپ کے ڈیوائس میں اردو/ہندی آواز نہیں، اس لیے انگریزی پیغام سنایا جا رہا ہے۔'
                  : 'No Urdu or Hindi voice on this device, so the English message is spoken.'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};