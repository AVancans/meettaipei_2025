import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export function LandingScreen() {
  const { startGame } = useGame();

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-neon-cyan">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-noise"></div>

      <motion.div
        className="absolute w-32 h-32 bg-neon-yellow brutal-border-thick transform rotate-12"
        style={{ top: '10%', left: '10%' }}
        animate={{
          y: [0, -30, 0],
          rotate: [12, 22, 12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full bg-neon-magenta brutal-border-thick"
        style={{ top: '20%', right: '15%' }}
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute w-40 h-40 bg-neon-lime brutal-border-thick"
        style={{ bottom: '15%', left: '5%', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        animate={{
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute w-36 h-36 bg-neon-orange brutal-border-thick transform -rotate-45"
        style={{ bottom: '10%', right: '10%' }}
        animate={{
          y: [0, -20, 0],
          rotate: [-45, -35, -45],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <div className="flex flex-col items-center">
          <motion.div
            className="bg-brutal-white brutal-border-thick brutal-shadow-xl p-16 w-full transform -rotate-1"
            initial={{ opacity: 0, y: 100, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              bounce: 0.5
            }}
          >
            <motion.div
              className="inline-flex items-center gap-4 px-8 py-4 brutal-border-thick bg-neon-yellow mb-10 transform rotate-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-brutal-black"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xl font-bold text-brutal-black uppercase tracking-tight">
                AI Detection Challenge
              </span>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="font-display text-8xl md:text-[10rem] font-black text-brutal-black mb-6 leading-none uppercase tracking-tighter">
                CAN YOU
                <br />
                <span className="text-neon-magenta text-stroke">
                  SPOT THE
                </span>
                <br />
                <span className="text-neon-yellow text-stroke">
                  AI?
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-3xl md:text-4xl text-brutal-black font-bold mb-12 uppercase tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              6 EPIC ROUNDS. REAL VS FAKE. ARE YOU READY?
            </motion.p>

            <motion.div
              className="grid grid-cols-3 gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: '🎯', label: '6 ROUNDS', bg: 'bg-neon-lime' },
                { icon: '🔥', label: 'INSANE MODE', bg: 'bg-neon-magenta' },
                { icon: '⚡', label: '100% FUN', bg: 'bg-neon-orange' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className={`${feature.bg} brutal-border-thick brutal-shadow p-8 text-center cursor-default`}
                  whileHover={{
                    y: -8,
                    boxShadow: '16px 16px 0px 0px #000000'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: 'spring', bounce: 0.6 }}
                >
                  <div className="text-7xl mb-4">{feature.icon}</div>
                  <div className="text-brutal-black font-black text-xl tracking-tight uppercase">
                    {feature.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              onClick={startGame}
              className="group relative w-full px-16 py-10 font-black text-5xl text-brutal-white bg-brutal-black brutal-border-thick brutal-shadow-lg uppercase tracking-tight overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{
                y: -4,
                boxShadow: '16px 16px 0px 0px #000000',
              }}
              whileTap={{
                y: 0,
                boxShadow: '4px 4px 0px 0px #000000',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-neon-magenta"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-6">
                START NOW
                <motion.span
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl"
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.div
              className="mt-8 flex items-center justify-center gap-3 text-brutal-black text-sm font-bold uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Camera access needed
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-4 left-4 w-20 h-20 bg-neon-yellow brutal-border-thick"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          />
          <motion.div
            className="absolute top-4 right-4 w-16 h-16 rounded-full bg-neon-magenta brutal-border-thick"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-24 h-24 bg-neon-orange brutal-border-thick"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring' }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-20 h-20 bg-neon-lime brutal-border-thick transform rotate-45"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          />
        </div>
      </div>
    </div>
  );
}
