import React, { useState, useEffect } from 'react';
import { X, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileDesktopNotification: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      // Show notification on first load if mobile
      if (isMobileDevice && !localStorage.getItem('desktopNotificationDismissed')) {
        setShowNotification(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem('desktopNotificationDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showNotification && isMobile && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
        >
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white px-4 py-4 sm:py-5 shadow-2xl pointer-events-auto">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  <Monitor className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm sm:text-base leading-snug">
                    💻 Better Experience Available!
                  </p>
                  <p className="text-xs sm:text-sm opacity-95 mt-1">
                    For the best experience, open this site in <strong>Desktop Mode</strong>. 
                    <span className="block sm:inline sm:ml-1">
                      (Browser menu → Request Desktop Site)
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 inline-flex text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDesktopNotification;
