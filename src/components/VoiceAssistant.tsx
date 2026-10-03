import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, RotateCcw, Sparkles } from 'lucide-react';
import { ACADEMY_DATA } from '../data/academy';

interface VoiceAssistantProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ theme, isUrdu }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeVoiceName, setActiveVoiceName] = useState<string>('');

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const urduVoice = voices.find(
          (v) => v.lang.startsWith('ur') || v.lang.includes('PK') || v.name.toLowerCase().includes('urdu')
        );
        if (urduVoice) {
          setActiveVoiceName(urduVoice.name);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    speak();
  };

  // Always starts the greeting from the beginning (also used by the Replay button)
  const speak = () => {
    setShowTranscript(true);
    // Muted or no speech support: just show the written text
    if (!isSupported || isMuted) {
      return;
    }

    window.speechSynthesis.cancel();

    const script = ACADEMY_DATA.voiceAssistant.scriptUrdu;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'ur-PK';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const urduVoice = voices.find(
      (v) => v.lang.startsWith('ur') || v.lang.includes('PK') || v.name.toLowerCase().includes('urdu')
    );
    if (urduVoice) {
      utterance.voice = urduVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setShowTranscript(true);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      handleStop();
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
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
                ? (isUrdu ? 'آواز جاری ہے...' : 'Speaking welcome message...')
                : isPaused
                ? (isUrdu ? 'آواز روکی گئی ہے' : 'Audio paused')
                : (isUrdu ? 'سننے کے لیے پلے کریں' : 'Click Play for official academy audio greeting')}
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
            {showTranscript ? (isUrdu ? 'متن چھپائیں' : 'Hide Text') : (isUrdu ? 'متن دیکھیں' : 'Transcript')}
          </button>
        </div>
      </div>

      {/* Transcript Accordion / Fallback View */}
      {showTranscript && (
        <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-sm">
            <div className="flex items-center justify-between mb-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isUrdu ? 'مستند کلمات (سرکاری پیغام):' : 'Official Urdu Transcript:'}
              </span>
              {activeVoiceName && (
                <span className="text-[10px] text-zinc-400">Voice: {activeVoiceName}</span>
              )}
            </div>
            <p className="font-urdu text-right text-base leading-relaxed text-zinc-800 dark:text-zinc-100" dir="rtl">
              {ACADEMY_DATA.voiceAssistant.scriptUrdu}
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 italic">
              &quot;{ACADEMY_DATA.voiceAssistant.scriptEnglish}&quot;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
