import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export function LandingScreen() {
  const { startGame } = useGame();

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient animate-gradient opacity-60"></div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            top: '10%',
            left: '10%'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute w-[32rem] h-[32rem] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%'
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <div className="flex flex-col items-center">
          {/* Hero Card */}
          <motion.div
            className="glass-strong rounded-3xl p-12 max-w-4xl w-full"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white/80">AI Detection Challenge</span>
            </motion.div>

            {/* Title */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-7xl md:text-8xl font-black text-white mb-4 leading-tight">
                Can You Spot
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  The AI?
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xl md:text-2xl text-white/70 mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Test your skills in distinguishing real images from AI-generated art.
              6 challenging questions await!
            </motion.p>

            {/* Features grid */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: '🎯', label: '6 Questions', desc: 'Carefully curated' },
                { icon: '📸', label: 'Photo Finish', desc: 'Epic final twist' },
                { icon: '✨', label: '100% Fun', desc: 'Guaranteed' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-2xl p-6 text-center border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <div className="text-white font-bold text-sm mb-1">{feature.label}</div>
                  <div className="text-white/50 text-xs">{feature.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={startGame}
              className="group relative w-full px-12 py-6 text-2xl font-bold text-white rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Challenge
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {/* Info footer */}
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Camera access needed for the surprise finale
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
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
      </div>
    </div>
  );
}
