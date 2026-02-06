
import React, { useState, useEffect } from 'react';
import { CardData } from '../types';
import { Heart, Sparkles, Type, Layout, Square, Star, Flower2, CalendarHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onGenerate: (data: CardData) => void;
  initialData: CardData | null;
}

const InputView: React.FC<Props> = ({ onGenerate, initialData }) => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState<'classic' | 'modern' | 'minimal' | 'luxury'>('classic');
  const [specialDay, setSpecialDay] = useState('Valentine\'s Day');
  const [error, setError] = useState('');

  const valentineWeek = [
    "Rose Day", "Propose Day", "Chocolate Day", "Teddy Day", 
    "Promise Day", "Hug Day", "Kiss Day", "Valentine's Day"
  ];

  useEffect(() => {
    if (initialData) {
      setSenderName(initialData.senderName);
      setRecipientName(initialData.recipientName);
      setMessage(initialData.message);
      setTheme(initialData.theme || 'classic');
      setSpecialDay(initialData.specialDay || "Valentine's Day");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !recipientName.trim() || !message.trim()) {
      setError('Please fill in all the details! ❤️');
      return;
    }
    setError('');
    onGenerate({ senderName, recipientName, message, theme, specialDay });
  };

  const themes = [
    { 
      id: 'classic' as const, 
      label: 'Classic', 
      icon: <Type className="w-4 h-4" />, 
      preview: "bg-[#fffafa] border-rose-200 border" 
    },
    { 
      id: 'modern' as const, 
      label: 'Modern', 
      icon: <Layout className="w-4 h-4" />, 
      preview: "bg-gradient-to-tr from-pink-400 to-orange-300 border-white/20 border" 
    },
    { 
      id: 'minimal' as const, 
      label: 'Minimal', 
      icon: <Square className="w-4 h-4" />, 
      preview: "bg-rose-50 border-rose-200 border" 
    },
    { 
      id: 'luxury' as const, 
      label: 'Luxury', 
      icon: <Star className="w-4 h-4" />, 
      preview: "bg-gradient-to-b from-[#2a0808] to-[#120404] border-[#d4af37]/30 border" 
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 py-8 sm:py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-3xl rounded-2xl sm:rounded-[3.5rem] shadow-[0_20px_40px_rgba(244,63,94,0.12)] sm:shadow-[0_40px_80px_rgba(244,63,94,0.12)] p-5 sm:p-8 md:p-14 border border-white relative overflow-hidden"
      >
        {/* Decorative Patterns */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.05]">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20"
          >
            <Flower2 className="w-64 h-64 text-rose-600" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-20 -left-20"
          >
            <Heart className="w-80 h-80 text-rose-600 fill-rose-600" />
          </motion.div>
        </div>

        <div className="text-center mb-6 sm:mb-10 relative z-10">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-flex items-center justify-center p-3 sm:p-5 bg-rose-500 rounded-full mb-4 sm:mb-6 shadow-lg sm:shadow-2xl shadow-rose-200 ring-4 sm:ring-8 ring-rose-50"
          >
            <Heart className="w-6 sm:w-10 h-6 sm:h-10 text-white fill-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 font-romantic mb-1">Love Studio</h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="text-rose-400 text-xs italic font-medium mb-2 sm:mb-3"
          >
            developed by Gopal ❤️
          </motion.p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-4 sm:w-8 bg-rose-100"></span>
            <p className="text-rose-300 font-black tracking-[0.3em] uppercase text-[7px] sm:text-[9px]">The Heart's Design Studio</p>
            <span className="h-px w-4 sm:w-8 bg-rose-100"></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-7 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {/* Recipient Input */}
            <div className="relative group">
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5 ml-2 sm:ml-3">
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 fill-rose-200" />
                <label className="block text-[8px] sm:text-[10px] font-black text-rose-600 uppercase tracking-widest">Receiver's Name</label>
              </div>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter her/his name..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-rose-50/50 bg-white/40 focus:border-rose-300 focus:bg-white focus:outline-none transition-all text-sm sm:text-base text-rose-900 placeholder-rose-600/60 shadow-sm"
              />
            </div>

            {/* Day Selector */}
            <div className="relative group">
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5 ml-2 sm:ml-3">
                <CalendarHeart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 fill-rose-200" />
                <label className="block text-[8px] sm:text-[10px] font-black text-rose-600 uppercase tracking-widest">Select Day</label>
              </div>
              <select
                value={specialDay}
                onChange={(e) => setSpecialDay(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-rose-50/50 bg-white/40 focus:border-rose-300 focus:bg-white focus:outline-none transition-all text-sm sm:text-base text-rose-900 shadow-sm appearance-none"
              >
                {valentineWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Input */}
          <div className="relative group">
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5 ml-2 sm:ml-3">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 fill-rose-200" />
              <label className="block text-[8px] sm:text-[10px] font-black text-rose-600 uppercase tracking-widest">Your Dedicated Message</label>
            </div>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Speak from your heart here..."
              className="w-full px-4 sm:px-8 py-3 sm:py-4.5 rounded-xl sm:rounded-[2rem] border-2 border-rose-50/50 bg-white/40 focus:border-rose-300 focus:bg-white focus:outline-none transition-all text-sm sm:text-base text-rose-900 placeholder-rose-600/60 resize-none shadow-sm"
            />
          </div>

          {/* Sender Input */}
          <div className="relative group">
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5 ml-2 sm:ml-3">
              <Flower2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 fill-rose-200" />
              <label className="block text-[8px] sm:text-[10px] font-black text-rose-600 uppercase tracking-widest">Your Name (Sender)</label>
            </div>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="With love, from..."
              className="w-full px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-[2rem] border-2 border-rose-50/50 bg-white/40 focus:border-rose-300 focus:bg-white focus:outline-none transition-all text-sm sm:text-base text-rose-900 placeholder-rose-600/60 shadow-sm"
            />
          </div>

          <div className="pt-2">
            <label className="block text-[8px] sm:text-[10px] font-black text-rose-300 uppercase tracking-[0.4em] mb-3 sm:mb-5 text-center">Aesthetic Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`flex flex-col items-center gap-1.5 sm:gap-2.5 p-2 sm:p-3.5 rounded-lg sm:rounded-[2.2rem] border-2 transition-all group relative ${
                    theme === t.id 
                    ? 'border-rose-400 bg-rose-50 shadow-lg sm:shadow-xl scale-100 sm:scale-105' 
                    : 'border-transparent bg-white/40 text-rose-200 hover:border-rose-100'
                  }`}
                >
                  <div className={`w-full aspect-square rounded-lg sm:rounded-[1.2rem] flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${t.preview}`}>
                    <div className={theme === t.id ? 'text-rose-500' : 'text-rose-200'}>
                      {t.icon}
                    </div>
                  </div>
                  <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${theme === t.id ? 'text-rose-700' : 'text-rose-300'}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="text-rose-600 text-[10px] text-center font-black uppercase tracking-widest bg-rose-100/50 py-3 rounded-full border border-rose-200"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs py-4 sm:py-6 rounded-xl sm:rounded-[2.5rem] shadow-[0_10px_20px_rgba(244,63,94,0.3)] sm:shadow-[0_20px_40px_rgba(244,63,94,0.3)] hover:shadow-[0_15px_30px_rgba(244,63,94,0.4)] sm:hover:shadow-[0_25px_50px_rgba(244,63,94,0.4)] transition-all flex items-center justify-center gap-2 sm:gap-4 group active:scale-[0.98]"
          >
            Generate Masterpiece
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="mt-6 sm:mt-12 text-rose-300 font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[8px] sm:text-[10px] text-center px-2"
      >
        A Digital Love Letter Experience
      </motion.div>
    </div>
  );
};

export default InputView;
