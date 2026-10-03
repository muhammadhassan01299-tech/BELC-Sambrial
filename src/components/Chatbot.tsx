import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  MessageCircle,
  Mic,
  MicOff,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface ChatbotProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  urduText?: string;
  timestamp: string;
  showWhatsAppCta?: boolean;
}

const nowLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const Chatbot: React.FC<ChatbotProps> = ({ theme, isUrdu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Assalam-o-Alaikum! Welcome to BELC Sambrial. I am your AI Academic Counselor. You can type or tap the microphone to ask about IELTS, PTE, AI Bootcamp, China MBBS study visas, or Umrah arrangements!',
      urduText: 'السلام علیکم! بسم اللہ انگلش لینگویج کلب سمبڑیال کے اے آئی کونسلر میں خوش آمدید۔ آپ لکھ کر یا مائیکروفون دبا کر آئیلٹس، پی ٹی ای، اے آئی بوٹ کیمپ، اسٹڈی ویزا یا عمرہ کے متعلق سوال پوچھ سکتے ہیں۔',
      timestamp: nowLabel(),
      showWhatsAppCta: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Always holds the newest chat history. The microphone callback runs later and would
  // otherwise use an OLD copy of the messages (stale closure bug).
  const messagesRef = useRef<Message[]>([]);
  const loadingRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  messagesRef.current = messages;

  const isDark = theme === 'dark';

  // Stop the microphone if the page is closed while recording
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading, transcribing]);

  const quickQuestions = [
    { en: 'IELTS class timings?', ur: 'آئیلٹس کلاس کے اوقات؟' },
    { en: 'Where is BELC located?', ur: 'اکیڈمی سمبڑیال میں کہاں ہے؟' },
    { en: 'What is 8-Week AI Bootcamp?', ur: 'اے آئی بوٹ کیمپ کیا ہے؟' },
    { en: 'China MBBS Study Visa?', ur: 'چائنا ایم بی بی ایس ویزا؟' },
    { en: 'Tuition fees & discounts?', ur: 'کورسز کی فیس کیا ہے؟' },
  ];

  // Local knowledge-base fallback if Gemini is offline
  const getFallbackAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('timing') || q.includes('time') || q.includes('schedule') || q.includes('اوقات')) {
      return 'BELC timings: IELTS main batch runs from 04:00 PM to 06:00 PM. PTE classes start daily at 04:00 PM. Spoken English is offered in Afternoon (02:00 PM – 04:00 PM) and Evening (04:00 PM – 06:00 PM) slots.';
    }
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('کہاں')) {
      return 'BELC is located on the 1st Floor, Kayseria Building on Main Wazirabad Road / Main Bazar, Sambrial, District Sialkot. You can open our Google Maps link for directions.';
    }
    if (q.includes('ai') || q.includes('bootcamp') || q.includes('vibe') || q.includes('بوٹ کیمپ')) {
      return 'The 8-Week AI Bootcamp covers AI Video Generation, Prompt Engineering, Vibe Coding (Cursor AI), Business Automations, and No-Code client projects. Zero prior coding needed!';
    }
    if (q.includes('fee') || q.includes('fees') || q.includes('فیس')) {
      return 'Tuition fees are structured affordably depending on the course and duration (2 to 4 months). Please contact Sir Muhammad Qasim on WhatsApp (+92 334 8073431) for current fee details and concessions.';
    }
    if (q.includes('visa') || q.includes('china') || q.includes('mbbs') || q.includes('ویزا')) {
      return 'BELC Study Advisors provides legitimate university admissions and visa guidance for China MBBS (WHO/PMDC recognized) and Belt & Road engineering scholarships. WhatsApp your transcripts for free evaluation.';
    }
    return 'Thank you for your question. For detailed admissions guidance, fee discounts, and batch reservations, please connect directly with Sir Muhammad Qasim on WhatsApp at +92 334 8073431.';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loadingRef.current) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: nowLabel(),
    };

    const newMessages = [...messagesRef.current, userMsg];
    messagesRef.current = newMessages;
    setMessages(newMessages);
    setInput('');
    loadingRef.current = true;
    setLoading(true);

    try {
      // The greeting messages are only for display, Gemini must not receive them
      const historyPayload = newMessages
        .filter((m) => !m.id.startsWith('welcome'))
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      const data = await res.json();
      const botText = data.reply || getFallbackAnswer(query);

      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: 'bot', text: botText, timestamp: nowLabel(), showWhatsAppCta: true },
      ]);
    } catch {
      // Graceful local fallback with zero error screen
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: getFallbackAnswer(query),
          timestamp: nowLabel(),
          showWhatsAppCta: true,
        },
      ]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // Microphone audio recording & transcription (done by the server with Gemini)
  // Small helper: show a short note from the bot (used for voice errors)
  const addBotNote = (text: string) => {
    setMessages((prev) => [...prev, { id: `bot-${Date.now()}`, sender: 'bot', text, timestamp: nowLabel() }]);
  };

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        addBotNote('Voice input is not supported in this browser. Please type your question.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || 'audio/webm',
        });
        stream.getTracks().forEach((track) => track.stop());

        // Convert audio to base64
        setTranscribing(true);
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = (reader.result as string).split(',')[1];
          try {
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioBase64: base64Data,
                mimeType: audioBlob.type || 'audio/webm',
              }),
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok && data.text) {
              setTranscribing(false);
              handleSendMessage(data.text);
            } else if (res.ok) {
              addBotNote('Sorry, I could not hear anything. Please try again or type your question.');
            } else {
              addBotNote(data.error || 'Voice input is not available right now. Please type your question.');
            }
          } catch (err) {
            console.error('Transcription failed:', err);
            addBotNote('Voice input failed. Please type your question.');
          } finally {
            setTranscribing(false);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone permission not granted or unavailable:', err);
      addBotNote('Microphone access was blocked. Allow the microphone in your browser settings, or type your question.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Conversation reset. How can I help you regarding IELTS, PTE, AI Bootcamp, China MBBS study visas, or Umrah?',
        timestamp: nowLabel(),
        showWhatsAppCta: true,
      },
    ]);
  };

  return (
    <>
      {/* Floating Chatbot Toggle Button (Positioned above WhatsApp button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-22 sm:bottom-24 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold text-xs shadow-xl shadow-red-600/35 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 group"
        aria-label="Open BELC AI Counselor"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <Bot className="w-4 h-4 text-white" />
        <span className="font-bold tracking-wide">
          {isUrdu ? 'اے آئی کونسلر' : 'AI Counselor'}
        </span>
      </button>

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[540px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 ${
            isDark
              ? 'bg-zinc-950/98 border-zinc-800 text-zinc-100'
              : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">BELC AI Counselor</h4>
                <p className="text-[10px] text-white/80">AI Assistant · Voice &amp; Chat</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => {
              const isUser = m.sender === 'user';

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-red-600 text-white rounded-br-xs'
                        : isDark
                        ? 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-xs'
                        : 'bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-bl-xs'
                    }`}
                  >
                    <p className={isUrdu && m.urduText ? 'font-urdu text-sm' : ''} dir={isUrdu && m.urduText ? 'rtl' : 'ltr'}>
                      {isUrdu && m.urduText ? m.urduText : m.text}
                    </p>

                    {m.showWhatsAppCta && !isUser && (
                      <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400">Official Admissions:</span>
                        <a
                          href={buildWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                        >
                          <MessageCircle className="w-3 h-3 fill-current" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-400 mt-0.5 px-1">{m.timestamp}</span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
                <span>BELC Counselor is thinking...</span>
              </div>
            )}

            {transcribing && (
              <div className="flex items-center gap-2 text-xs text-amber-500 p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Transcribing your speech with Gemini...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-1.5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(isUrdu ? q.ur : q.en)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-red-500 transition-all cursor-pointer shrink-0"
              >
                {isUrdu ? q.ur : q.en}
              </button>
            ))}
          </div>

          {/* Audio recording status banner */}
          {isRecording && (
            <div className="px-4 py-2 bg-red-600/10 border-t border-red-500/20 flex items-center justify-between text-xs text-red-500 animate-pulse">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                Listening... Speak your question now
              </span>
              <button
                onClick={stopRecording}
                className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-2">
            {/* Microphone transcription button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-600 text-white border-red-600 animate-bounce'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
              title={isRecording ? 'Stop recording' : 'Speak to Transcribe with Gemini'}
              aria-label="Toggle voice input"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isUrdu ? 'اپنا سوال لکھیں یا مائیک دبائیں...' : 'Type or speak your question...'}
              className="flex-1 px-3 py-2.5 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white transition-all cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
