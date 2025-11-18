import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { fireConfettiContinuous } from '../utils/confetti';

export function CompleteScreen() {
  const { score, questions, resetGame } = useGame();

  const percentage = Math.round((score / questions.length) * 100);

  useEffect(() => {
    // Fire continuous confetti for 5 seconds
    fireConfettiContinuous(5000);
  }, []);

  const getMessage = () => {
    if (percentage === 100) {
      return {
        title: "Perfect Score!",
        emoji: "🏆",
        subtitle: "You're definitely human... or are you?",
        gradient: "from-yellow-400 via-amber-400 to-orange-500"
      };
    } else if (percentage >= 80) {
      return {
        title: "Amazing!",
        emoji: "🎉",
        subtitle: "You're (probably) human!",
        gradient: "from-purple-400 via-pink-400 to-cyan-400"
      };
    } else if (percentage >= 60) {
      return {
        title: "Not Bad!",
        emoji: "👍",
        subtitle: "Pretty sure you're human!",
        gradient: "from-blue-400 via-cyan-400 to-teal-400"
      };
    } else {
      return {
        title: "Suspicious...",
        emoji: "🤖",
        subtitle: "Are you SURE you're not an AI?",
        gradient: "from-pink-400 via-purple-400 to-indigo-400"
      };
    }
  };

  const message = getMessage();

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40"></div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              width: `${150 + Math.random() * 150}px`,
              height: `${150 + Math.random() * 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(139, 92, 246, 0.4)' :
                i % 3 === 1 ? 'rgba(236, 72, 153, 0.4)' :
                'rgba(6, 182, 212, 0.4)'
              } 0%, transparent 70%)`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
        <div className="glass-strong rounded-3xl p-12">
          {/* Trophy/Icon */}
          <motion.div
            className="text-8xl mb-6 text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {message.emoji}
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`text-6xl md:text-7xl font-black mb-4 text-center bg-gradient-to-r ${message.gradient} bg-clip-text text-transparent`}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {message.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl text-white/70 font-medium mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message.subtitle}
          </motion.p>

          {/* Score display card */}
          <motion.div
            className="glass-card p-8 rounded-2xl mb-8 border border-white/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <div className="text-center mb-6">
              <div className="text-7xl font-black text-white mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-2xl font-bold text-white/60">
                {percentage}% Accuracy
              </div>
            </div>

            {/* Circular progress */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 552' }}
                  animate={{ strokeDasharray: `${(percentage / 100) * 552} 552` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-white">{percentage}%</span>
              </div>
            </div>
          </motion.div>

          {/* Fun stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="glass rounded-2xl p-6 text-center border border-purple-400/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
            >
              <div className="text-4xl font-black text-purple-400 mb-2">{score}</div>
              <div className="text-xs font-medium text-white/60">Correct</div>
            </motion.div>
            <motion.div
              className="glass rounded-2xl p-6 text-center border border-pink-400/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
            >
              <div className="text-4xl font-black text-pink-400 mb-2">{questions.length - score}</div>
              <div className="text-xs font-medium text-white/60">Tricked</div>
            </motion.div>
            <motion.div
              className="glass rounded-2xl p-6 text-center border border-cyan-400/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
            >
              <div className="text-4xl font-black text-cyan-400 mb-2">100%</div>
              <div className="text-xs font-medium text-white/60">Fun</div>
            </motion.div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={resetGame}
              className="group relative px-10 py-4 text-lg font-bold rounded-xl overflow-hidden flex-1"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                🔄 Play Again
              </span>
            </motion.button>

            <motion.button
              onClick={() => {
                // Open QR code or external link
                console.log('Learn more about the project');
              }}
              className="group relative px-10 py-4 text-lg font-bold rounded-xl overflow-hidden flex-1"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                📱 Learn More
              </span>
            </motion.button>
          </motion.div>

          {/* Footer message */}
          <motion.p
            className="mt-8 text-center text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Thanks for playing! Made with AI & ❤️
          </motion.p>
        </div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
