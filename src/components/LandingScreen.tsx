import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export function LandingScreen() {
  const { startGame } = useGame();

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#1a103a] to-[#2d1654] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 bg-neon-pink/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ bottom: '10%', right: '20%' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Title */}
        <motion.h1
          className="text-8xl font-black mb-6 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <span className="inline-block bg-neon-pink px-8 py-4 -rotate-2 brutal-shadow-lg brutal-border">
            ARE YOU
          </span>
        </motion.h1>

        <motion.h1
          className="text-9xl font-black mb-8 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        >
          <span className="inline-block bg-neon-blue px-12 py-6 rotate-1 brutal-shadow-lg brutal-border">
            AI? 🤖
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-2xl text-white/90 mb-12 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          6 questions · 1 ultimate twist · 100% fun guaranteed
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={startGame}
          className="group relative px-16 py-8 text-3xl font-black text-black bg-neon-yellow brutal-border brutal-shadow-lg rounded-2xl hover:bg-neon-green transition-all duration-200"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          whileHover={{
            scale: 1.05,
            rotate: 2,
            boxShadow: '16px 16px 0px 0px rgba(0,0,0,1)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">START GAME 🎮</span>
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-2xl"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Footer info */}
        <motion.div
          className="mt-16 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>💡 We'll need your camera for the final surprise!</p>
        </motion.div>
      </div>

      {/* Floating emojis */}
      {['🤖', '🎯', '✨', '🎮', '🎨', '🚀'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-20"
          style={{
            left: `${(i * 15 + 10)}%`,
            top: `${(i * 12 + 5)}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4 + i,
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
