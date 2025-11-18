import { motion, AnimatePresence } from 'framer-motion';

interface AnswerFeedbackAnimationProps {
  isCorrect: boolean;
  isVisible: boolean;
}

export function AnswerFeedbackAnimation({ isCorrect, isVisible }: AnswerFeedbackAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`${
              isCorrect ? 'bg-neon-lime' : 'bg-neon-magenta'
            } brutal-border-thick brutal-shadow-xl px-20 py-16 transform`}
            initial={{ scale: 0, rotate: isCorrect ? -45 : 45 }}
            animate={{ scale: 1, rotate: isCorrect ? 3 : -3 }}
            exit={{ scale: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h1 className={`font-display text-[12rem] font-black uppercase leading-none tracking-tighter ${
              isCorrect ? 'text-brutal-black' : 'text-brutal-white'
            }`}>
              {isCorrect ? 'CORRECT!' : 'WRONG!'}
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
