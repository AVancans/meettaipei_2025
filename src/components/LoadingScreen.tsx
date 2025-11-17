import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#1a103a] to-[#2d1654] relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* AI Brain animation */}
        <motion.div
          className="text-9xl mb-8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🧠
        </motion.div>

        {/* Loading text */}
        <motion.h2
          className="text-5xl font-black text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block bg-neon-pink px-8 py-4 brutal-shadow-lg brutal-border rounded-2xl">
            Generating Your AI Twin...
          </span>
        </motion.h2>

        <motion.p
          className="text-2xl text-white/80 font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          This won't take long!
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center gap-3 mt-12">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-neon-yellow rounded-full brutal-border"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Fun messages */}
        <motion.div
          className="mt-16 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-lg text-white/60">🎨 Creating masterpiece...</p>
          <p className="text-lg text-white/60">🤖 Training AI artists...</p>
          <p className="text-lg text-white/60">✨ Adding magic dust...</p>
        </motion.div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-neon-blue rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
