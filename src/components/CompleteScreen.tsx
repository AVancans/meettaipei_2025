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
        title: "🏆 PERFECT SCORE!",
        subtitle: "You're definitely human... or are you? 🤔",
        color: "bg-neon-green"
      };
    } else if (percentage >= 80) {
      return {
        title: "🎉 AMAZING!",
        subtitle: "You're (probably) human!",
        color: "bg-neon-blue"
      };
    } else if (percentage >= 60) {
      return {
        title: "👍 NOT BAD!",
        subtitle: "Pretty sure you're human!",
        color: "bg-neon-yellow"
      };
    } else {
      return {
        title: "🤖 SUSPICIOUS...",
        subtitle: "Are you SURE you're not an AI?",
        color: "bg-neon-pink"
      };
    }
  };

  const message = getMessage();

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#1a103a] to-[#2d1654] relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-2xl ${
              i % 3 === 0 ? 'bg-neon-pink/20' : i % 3 === 1 ? 'bg-neon-blue/20' : 'bg-neon-yellow/20'
            }`}
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-5xl">
        {/* Trophy/Icon */}
        <motion.div
          className="text-9xl mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          🎊
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-8xl font-black mb-8 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <span className={`inline-block ${message.color} px-12 py-6 brutal-shadow-lg brutal-border rounded-3xl`}>
            {message.title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-4xl text-white font-bold mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {message.subtitle}
        </motion.p>

        {/* Score display */}
        <motion.div
          className="bg-white px-16 py-12 brutal-border brutal-shadow-lg rounded-3xl mb-12 inline-block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <div className="text-8xl font-black text-black mb-4">
            {score}/{questions.length}
          </div>
          <div className="text-3xl font-bold text-black/70">
            {percentage}% Correct
          </div>
        </motion.div>

        {/* Fun stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-neon-pink px-6 py-4 brutal-border brutal-shadow rounded-2xl">
            <div className="text-4xl font-black text-white mb-2">{score}</div>
            <div className="text-sm font-bold text-white/80">Correct</div>
          </div>
          <div className="bg-neon-purple px-6 py-4 brutal-border brutal-shadow rounded-2xl">
            <div className="text-4xl font-black text-white mb-2">{questions.length - score}</div>
            <div className="text-sm font-bold text-white/80">AI Fooled You</div>
          </div>
          <div className="bg-neon-blue px-6 py-4 brutal-border brutal-shadow rounded-2xl">
            <div className="text-4xl font-black text-white mb-2">100%</div>
            <div className="text-sm font-bold text-white/80">Fun Had</div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={resetGame}
            className="px-12 py-6 text-3xl font-black text-black bg-neon-yellow brutal-border brutal-shadow-lg rounded-2xl hover:bg-neon-green transition-all"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Play Again
          </motion.button>

          <motion.button
            onClick={() => {
              // Open QR code or external link
              console.log('Learn more about the project');
            }}
            className="px-12 py-6 text-3xl font-black text-white bg-neon-purple brutal-border brutal-shadow-lg rounded-2xl hover:bg-purple-600 transition-all"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            📱 Learn More
          </motion.button>
        </motion.div>

        {/* Footer message */}
        <motion.p
          className="mt-12 text-xl text-white/60 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Thanks for playing! 🎮✨
        </motion.p>
      </div>

      {/* Floating emojis */}
      {['🎉', '🎊', '⭐', '✨', '🌟', '💫', '🎯', '🏆'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl"
          style={{
            left: `${(i * 12 + 5)}%`,
            top: `${(i * 10 + 10)}%`
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
