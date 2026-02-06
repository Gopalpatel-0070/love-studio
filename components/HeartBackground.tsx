
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Heart: React.FC<{ x: number; delay: number; size: number }> = ({ x, delay, size }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.7, 0.7, 0],
      rotate: [0, 20, -20, 0],
      scale: [0.5, 1, 1, 0.5]
    }}
    transition={{ 
      duration: 10, 
      delay, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    style={{ 
      left: `${x}%`, 
      position: 'absolute',
      color: '#fb7185'
    }}
  >
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </motion.div>
);

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      size: Math.random() * 20 + 20
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden no-print">
      <AnimatePresence>
        {hearts.map((heart) => (
          <Heart key={heart.id} x={heart.x} delay={heart.delay} size={heart.size} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartBackground;
