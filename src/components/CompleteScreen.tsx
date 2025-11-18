import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { fireConfettiContinuous } from '../utils/confetti';

export function CompleteScreen() {
  const { score, questions, resetGame } = useGame();

  const percentage = Math.round((score / questions.length) * 100);

  useEffect(() => {
    fireConfettiContinuous(5000);
  }, []);

  const getMessage = () => {
    if (percentage === 100) {
      return {
        title: "PERFECT!",
        emoji: "🏆",
        subtitle: "YOU'RE A LEGEND!",
        bg: "bg-neon-yellow"
      };
    } else if (percentage >= 80) {
      return {
        title: "AMAZING!",
        emoji: "🎉",
        subtitle: "YOU CRUSHED IT!",
        bg: "bg-neon-lime"
      };
    } else if (percentage >= 60) {
      return {
        title: "NOT BAD!",
        emoji: "👍",
        subtitle: "SOLID PERFORMANCE!",
        bg: "bg-neon-cyan"
      };
    } else {
      return {
        title: "SUSPICIOUS!",
        emoji: "🤖",
        subtitle: "ARE YOU EVEN HUMAN?",
        bg: "bg-neon-magenta"
      };
    }
  };

  const message = getMessage();

  return (
    <div className="w-full h-full flex items-center justify-center bg-neon-orange relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
      <div className="absolute inset-0 bg-noise"></div>

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            i % 4 === 0 ? 'bg-neon-yellow' :
            i % 4 === 1 ? 'bg-neon-magenta' :
            i % 4 === 2 ? 'bg-neon-cyan' : 'bg-neon-lime'
          } brutal-border-thick`}
          style={{
            width: `${60 + Math.random() * 60}px`,
            height: `${60 + Math.random() * 60}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8">
        <motion.div
          className="bg-brutal-white brutal-border-thick brutal-shadow-xl p-12 transform rotate-1"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
        >
          <motion.div
            className={`${message.bg} brutal-border-thick p-8 mb-8 transform -rotate-2`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
          >
            <motion.div
              className="text-9xl mb-4 text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring', bounce: 0.7 }}
            >
              {message.emoji}
            </motion.div>

            <motion.h1
              className="font-display text-7xl md:text-9xl font-black text-brutal-black text-center mb-4 uppercase leading-none tracking-tighter"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {message.title}
            </motion.h1>

            <motion.p
              className="text-3xl text-brutal-black font-black text-center uppercase tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {message.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-brutal-black brutal-border-thick brutal-shadow-lg p-10 mb-8 transform rotate-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
          >
            <div className="text-center mb-6">
              <motion.div
                className="text-9xl font-black text-neon-yellow mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', bounce: 0.6 }}
              >
                {score}/{questions.length}
              </motion.div>
              <div className="text-4xl font-black text-brutal-white uppercase">
                {percentage}% ACCURACY
              </div>
            </div>

            <div className="relative w-64 h-64 mx-auto">
              <svg className="transform -rotate-90 w-64 h-64">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="#FFFFFF"
                  strokeWidth="16"
                  fill="none"
                  opacity="0.2"
                />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="#F7FF00"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="square"
                  initial={{ strokeDasharray: '0 704' }}
                  animate={{ strokeDasharray: `${(percentage / 100) * 704} 704` }}
                  transition={{ duration: 2, delay: 0.9, ease: 'easeOut' }}
                />
              </svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', bounce: 0.6 }}
              >
                <span className="text-6xl font-black text-brutal-white">{percentage}%</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="bg-neon-lime brutal-border-thick brutal-shadow p-6 text-center transform -rotate-2"
              whileHover={{
                rotate: 2,
                y: -8,
                boxShadow: '12px 12px 0px 0px #000000'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: 'spring', bounce: 0.6 }}
            >
              <div className="text-6xl font-black text-brutal-black mb-2">{score}</div>
              <div className="text-sm font-black text-brutal-black uppercase">Correct</div>
            </motion.div>

            <motion.div
              className="bg-neon-magenta brutal-border-thick brutal-shadow p-6 text-center transform rotate-2"
              whileHover={{
                rotate: -2,
                y: -8,
                boxShadow: '12px 12px 0px 0px #000000'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', bounce: 0.6 }}
            >
              <div className="text-6xl font-black text-brutal-white mb-2">{questions.length - score}</div>
              <div className="text-sm font-black text-brutal-white uppercase">Wrong</div>
            </motion.div>

            <motion.div
              className="bg-neon-cyan brutal-border-thick brutal-shadow p-6 text-center transform -rotate-2"
              whileHover={{
                rotate: 2,
                y: -8,
                boxShadow: '12px 12px 0px 0px #000000'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3, type: 'spring', bounce: 0.6 }}
            >
              <div className="text-6xl font-black text-brutal-black mb-2">100%</div>
              <div className="text-sm font-black text-brutal-black uppercase">Fun</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <motion.button
              onClick={resetGame}
              className="px-10 py-6 font-black text-2xl bg-brutal-black brutal-border-thick brutal-shadow-lg uppercase tracking-tight"
              whileHover={{
                y: -4,
                boxShadow: '16px 16px 0px 0px #000000',
              }}
              whileTap={{
                y: 0,
                boxShadow: '4px 4px 0px 0px #000000',
              }}
            >
              <span className="flex items-center justify-center gap-3 text-brutal-white">
                🔄 AGAIN
              </span>
            </motion.button>

            <motion.button
              onClick={() => {
                console.log('Learn more about the project');
              }}
              className="px-10 py-6 font-black text-2xl bg-neon-magenta brutal-border-thick brutal-shadow-lg uppercase tracking-tight"
              whileHover={{
                y: -4,
                boxShadow: '16px 16px 0px 0px #000000',
              }}
              whileTap={{
                y: 0,
                boxShadow: '4px 4px 0px 0px #000000',
              }}
            >
              <span className="flex items-center justify-center gap-3 text-brutal-white">
                📱 SHARE
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            className="mt-8 text-center text-base text-brutal-black font-bold uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Made with AI & ❤️
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
