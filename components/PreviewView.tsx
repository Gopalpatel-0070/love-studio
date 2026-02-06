
import React, { useRef } from 'react';
import { CardData } from '../types';
import { ArrowLeft, Download, Printer, Heart, Star, Sparkles as SparkleIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Props {
  data: CardData;
  onEdit: () => void;
}

const PreviewView: React.FC<Props> = ({ data, onEdit }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      scale: 4, 
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const padding = 10;
    const maxWidth = pdfWidth - padding * 2;
    const maxHeight = pdfHeight - padding * 2;

    // Use canvas dimensions for more accurate scaling
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;

    // Compute a uniform scale so the image fits within both width and height
    const scale = Math.min(maxWidth / imgWidthPx, maxHeight / imgHeightPx);
    const renderWidth = imgWidthPx * scale;
    const renderHeight = imgHeightPx * scale;

    // Center the image on the page
    const x = (pdfWidth - renderWidth) / 2;
    const y = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
    pdf.save(`${data.specialDay}_for_${data.recipientName.replace(/\s+/g, '_')}.pdf`);
  };

  const printCard = () => {
    window.print();
  };

  const getThemeStyles = () => {
    switch(data.theme) {
      case 'modern':
        return {
          container: "bg-gradient-to-tr from-pink-400 via-rose-400 to-orange-300",
          card: "bg-white/40 backdrop-blur-xl border border-white/50 text-rose-900 shadow-2xl",
          title: "text-rose-950 font-serif-classic italic text-5xl tracking-tight drop-shadow-sm",
          to: "text-rose-800 font-bold text-2xl tracking-wide uppercase",
          message: "text-rose-900 font-medium text-xl leading-relaxed italic opacity-95",
          from: "text-rose-950 font-romantic text-6xl drop-shadow-md",
          accent: "text-orange-500/20",
          label: "text-rose-900/80", // Darker label for modern
          toolbar: "bg-white/30 border-white/40 text-rose-900",
          btnSecondary: "bg-white/30 hover:bg-white text-rose-900 hover:text-rose-600"
        };
      case 'minimal':
        return {
          container: "bg-rose-50",
          card: "bg-white text-rose-900 shadow-[0_8px_32px_rgba(244,63,94,0.04)] border border-rose-100",
          title: "text-rose-500 font-serif-classic tracking-[0.4em] uppercase text-sm font-bold border-b border-rose-50 pb-8",
          to: "text-rose-300 font-sans text-[10px] tracking-[0.5em] uppercase font-black",
          message: "text-rose-800 font-serif-classic text-2xl leading-[2] font-light italic px-10",
          from: "text-rose-400 font-sans text-[10px] tracking-[0.5em] uppercase font-black",
          accent: "text-rose-50",
          label: "text-rose-500/60", // Visible but soft for minimal
          toolbar: "bg-white/80 border-rose-100 shadow-rose-100 text-rose-600",
          btnSecondary: "bg-rose-50 hover:bg-rose-100 text-rose-600"
        };
      case 'luxury':
        return {
          container: "bg-[#0A0A0A]",
          card: "bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] border-[1px] border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_40px_100px_rgba(0,0,0,0.9)]",
          title: "text-[#D4AF37] font-serif-classic text-6xl italic tracking-tighter drop-shadow-[0_4px_10px_rgba(212,175,55,0.2)] mb-2",
          to: "text-[#D4AF37]/90 font-elegant text-4xl",
          message: "text-[#F8F5F2] font-serif-classic italic text-3xl leading-snug font-light px-10 drop-shadow-sm",
          from: "text-[#D4AF37] font-elegant text-6xl drop-shadow-lg",
          accent: "text-[#D4AF37]/10",
          label: "text-[#D4AF37]/70", // High contrast gold for luxury
          decoration: "border-[#D4AF37]/30",
          toolbar: "bg-black/40 border-[#D4AF37]/30 text-[#D4AF37]",
          btnSecondary: "bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37]"
        };
      default: // classic
        return {
          container: "bg-rose-50",
          card: "bg-[#fffafa] border-[12px] border-double border-rose-200 text-rose-900 shadow-xl shadow-rose-200/50",
          title: "text-rose-500 font-romantic text-7xl drop-shadow-sm",
          to: "text-rose-600 font-elegant text-4xl",
          message: "text-rose-800 font-serif-classic italic text-2xl px-4",
          from: "text-rose-500 font-romantic text-5xl",
          accent: "text-rose-200",
          label: "text-rose-600/70", // Classic romantic red
          toolbar: "bg-white/80 border-rose-100 shadow-rose-100 text-rose-600",
          btnSecondary: "bg-rose-50 hover:bg-rose-100 text-rose-600"
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`flex flex-col items-center py-12 px-4 min-h-screen transition-colors duration-1000 ${theme.container}`}>
      {/* Refined Action Toolbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`no-print flex flex-wrap justify-center items-center gap-3 mb-12 p-2 px-4 rounded-full backdrop-blur-3xl border shadow-2xl z-50 ${theme.toolbar}`}
      >
        <button 
          onClick={onEdit}
          className={`group flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-all active:scale-95 ${theme.btnSecondary}`}
          title="Back to edit"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Edit Details</span>
        </button>
        
        <div className={`w-px h-8 mx-1 hidden sm:block opacity-20 ${data.theme === 'luxury' ? 'bg-[#D4AF37]' : 'bg-current'}`}></div>

        <button 
          onClick={printCard}
          className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-all active:scale-95 shadow-sm ${theme.btnSecondary}`}
        >
          <Printer className="w-5 h-5" />
          <span className="hidden sm:inline">Print</span>
        </button>

        <button 
          onClick={downloadPDF}
          className="flex items-center gap-2 px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 hover:shadow-rose-400"
        >
          <Download className="w-5 h-5" />
          <span>Save PDF</span>
        </button>
      </motion.div>

      {/* The Card Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full flex justify-center"
      >
        <div 
          ref={cardRef}
          className={`relative w-full max-w-[540px] aspect-[1/1.414] p-12 rounded-[2.5rem] flex flex-col items-center justify-between overflow-hidden shadow-2xl ${theme.card}`}
        >
          {/* Theme-Specific Decorative Elements */}
          {data.theme === 'luxury' && (
            <>
               <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#D4AF37]/20 pointer-events-none rounded-[2rem]"></div>
               <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#D4AF37]/10 pointer-events-none rounded-[1.8rem]"></div>
               <Star className="absolute top-12 right-12 w-8 h-8 text-[#D4AF37]/30 animate-pulse" />
               <SparkleIcon className="absolute bottom-12 left-12 w-6 h-6 text-[#D4AF37]/40 animate-bounce" style={{ animationDuration: '3s' }} />
               <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/40 m-8"></div>
               <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/40 m-8"></div>
            </>
          )}

          {data.theme === 'minimal' && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02]">
               <Heart className="w-[80%] h-[80%] text-rose-400 fill-rose-400" />
            </div>
          )}

          {data.theme === 'modern' && (
             <>
               <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[80px] animate-pulse"></div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-200/20 rounded-full blur-[60px]"></div>
             </>
          )}

          {data.theme === 'classic' && (
            <>
              <Heart className="absolute -top-8 -left-8 w-40 h-40 text-rose-200/30 rotate-12" />
              <Heart className="absolute -bottom-8 -right-8 w-40 h-40 text-rose-200/30 -rotate-12" />
            </>
          )}

          {/* Card Content */}
          <div className="text-center w-full z-10 flex flex-col items-center flex-1 py-8">
            <header className="mb-12 w-full">
              <h2 className={`${theme.title}`}>Happy {data.specialDay}</h2>
              {data.theme === 'minimal' && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="h-px w-6 bg-rose-100"></div>
                  <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
                  <div className="h-px w-6 bg-rose-100"></div>
                </div>
              )}
            </header>

            <div className="flex-1 flex flex-col justify-center items-center gap-14 w-full">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <span className={`text-[10px] uppercase tracking-[0.6em] font-black block mb-2 ${theme.label}`}>For my beloved</span>
                <p className={`${theme.to}`}>{data.recipientName}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="max-w-md mx-auto relative px-6"
              >
                <p className={`${theme.message}`}>{data.message}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="space-y-5"
              >
                 {data.theme !== 'minimal' && (
                   <Heart className={`w-12 h-12 mx-auto mb-6 ${data.theme === 'luxury' ? 'text-[#D4AF37] fill-[#D4AF37]/10' : 'text-rose-400 fill-rose-400'}`} />
                 )}
                <span className={`text-[10px] uppercase tracking-[0.6em] font-black block mb-2 ${theme.label}`}>Ever Yours,</span>
                <p className={`${theme.from}`}>{data.senderName}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className={`no-print mt-16 text-[10px] font-black uppercase tracking-[0.4em] px-8 py-3 rounded-full border shadow-sm transition-colors duration-1000 ${
          data.theme === 'luxury' ? 'text-[#D4AF37]/40 bg-white/5 border-white/5' : 'text-rose-400/50 bg-white/50 border-rose-100'
        }`}
      >
        A moment crafted for {data.recipientName}
      </motion.footer>
    </div>
  );
};

export default PreviewView;
