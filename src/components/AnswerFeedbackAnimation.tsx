import { motion, AnimatePresence } from 'framer-motion';

interface AnswerFeedbackAnimationProps {
  isCorrect: boolean;
  isVisible: boolean;
}

export function AnswerFeedbackAnimation({ isCorrect, isVisible }: AnswerFeedbackAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className={`fixed inset-0 z-50 pointer-events-none ${
              isCorrect ? 'bg-neon-lime' : 'bg-neon-magenta'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.3, 1] }}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: [0, 1.5, 1], rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              bounce: 0.5
            }}
          >
            <div className={`${
              isCorrect ? 'bg-neon-lime' : 'bg-neon-magenta'
            } brutal-border-thick brutal-shadow-xl p-12 transform ${
              isCorrect ? 'rotate-12' : '-rotate-12'
            }`}>
              <span className="text-9xl">{isCorrect ? '✓' : '✗'}</span>
            </div>
          </motion.div>

          {isCorrect && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="fixed z-50 pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, x: '-50%', y: '-50%' }}
                  animate={{
                    scale: [0, 1, 1],
                    x: `calc(-50% + ${Math.cos(i * (360 / 20) * Math.PI / 180) * 300}px)`,
                    y: `calc(-50% + ${Math.sin(i * (360 / 20) * Math.PI / 180) * 300}px)`,
                    rotate: Math.random() * 360,
                    opacity: [1, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'easeOut'
                  }}
                >
                  <div className={`w-8 h-8 ${
                    i % 3 === 0 ? 'bg-neon-yellow' :
                    i % 3 === 1 ? 'bg-neon-cyan' : 'bg-neon-orange'
                  } brutal-border`} />
                </motion.div>
              ))}
            </>
          )}

          {!isCorrect && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="fixed inset-0 z-50 pointer-events-none"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    times: [0, 0.3, 0.7, 1]
                  }}
                  style={{
                    background: '#000000',
                    height: '8px',
                    top: `${30 + i * 20}%`,
                    transformOrigin: 'left'
                  }}
                />
              ))}
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
