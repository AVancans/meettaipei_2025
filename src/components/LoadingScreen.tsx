import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40"></div>

      {/* Pulsing gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main content card */}
      <div className="relative z-10 text-center px-8">
        <motion.div
          className="glass-strong rounded-3xl p-12 max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated spinner */}
          <motion.div className="relative w-32 h-32 mx-auto mb-8">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-500/20"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                borderTopColor: '#8b5cf6',
                borderRightColor: '#ec4899',
              }}
            />
            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-pink-500/20"
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                borderTopColor: '#ec4899',
                borderLeftColor: '#06b6d4',
              }}
            />
            {/* Center icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-5xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              🧠
            </motion.div>
          </motion.div>

          {/* Loading text */}
          <motion.h2
            className="text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Creating Your AI Twin
          </motion.h2>

          <motion.p
            className="text-lg text-white/60 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            This will only take a moment...
          </motion.p>

          {/* Progress bar */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-8">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
              animate={{
                width: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>

          {/* Status messages */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {['Analyzing patterns...', 'Training AI model...', 'Adding final touches...'].map((text, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-center gap-2 text-sm text-white/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0.3, 1, 0.3], x: 0 }}
                transition={{
                  delay: i * 0.8,
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    delay: i * 0.8,
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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
            y: [0, -150, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
