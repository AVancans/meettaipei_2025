import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import type { Answer } from '../types';
import { DodgingAIButton } from './DodgingAIButton';
import { fireSmallBurst } from '../utils/confetti';

export function QuestionScreen() {
  const {
    currentQuestion,
    currentQuestionIndex,
    questions,
    answerQuestion,
    nextQuestion,
    isLastQuestion,
    gameStatus,
    score
  } = useGame();

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [cheatAttempts, setCheatAttempts] = useState(0);

  if (!currentQuestion) return null;

  const isFinalQuestion = gameStatus === 'final';
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: Answer) => {
    if (selectedAnswer) return; // Already answered

    setSelectedAnswer(answer);
    answerQuestion(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      // Fire confetti at button position
      const buttonElement = document.getElementById(`answer-${answer}`);
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        fireSmallBurst(x, y);
      }
    }

    // Auto-advance after 2 seconds (except for final question)
    if (!isLastQuestion) {
      setTimeout(() => {
        handleNext();
      }, 2500);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    nextQuestion();
  };

  const handleCheatAttempt = () => {
    setCheatAttempts(prev => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40"></div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/20 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Header with Score and Question Number */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
        {/* Question number */}
        <motion.div
          className="glass-card px-6 py-3 rounded-xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-white/60 text-xs font-medium mb-1">Question</div>
          <div className="text-white font-bold text-lg">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </motion.div>

        {/* Score display */}
        <motion.div
          className="glass-card px-6 py-3 rounded-xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-white/60 text-xs font-medium mb-1">Score</div>
          <div className="text-white font-bold text-lg">
            {score} / {questions.length}
          </div>
        </motion.div>
      </div>

      {/* Main content - Bento Box Layout */}
      <div className="flex-1 flex items-center justify-center p-8 pt-32 relative z-10">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Image Card */}
            <motion.div
              key={`image-${currentQuestionIndex}`}
              className="glass-strong rounded-3xl p-6 overflow-hidden"
              initial={{ x: -50, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/20">
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question"
                  className="w-full h-full object-cover"
                />
                {isFinalQuestion && (
                  <motion.div
                    className="absolute top-4 right-4 glass-card px-4 py-2 rounded-xl border border-pink-400/50"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 3 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      📸 That's You!
                    </span>
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Right: Question & Answers Card */}
            <motion.div
              key={`content-${currentQuestionIndex}`}
              className="glass-strong rounded-3xl p-8 space-y-6"
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring', bounce: 0.3 }}
            >
              {/* Question text */}
              <div>
                <motion.h2
                  className="text-4xl lg:text-5xl font-black text-white leading-tight mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentQuestion.prompt}
                </motion.h2>
                {isFinalQuestion && cheatAttempts > 0 && (
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-yellow-300 font-bold text-sm">
                      😏 Nice try! Attempts: {cheatAttempts}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Answer buttons */}
              <AnimatePresence mode="wait">
                {!showFeedback && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* REAL button */}
                    <motion.button
                      id="answer-REAL"
                      onClick={() => handleAnswer('REAL')}
                      disabled={!!selectedAnswer}
                      className="group relative w-full px-8 py-6 text-2xl font-bold rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                        <span className="text-3xl">🧍</span>
                        REAL Human
                      </span>
                    </motion.button>

                    {/* AI button - normal or dodging */}
                    {!isFinalQuestion ? (
                      <motion.button
                        id="answer-AI"
                        onClick={() => handleAnswer('AI')}
                        disabled={!!selectedAnswer}
                        className="group relative w-full px-8 py-6 text-2xl font-bold rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                          <span className="text-3xl">🤖</span>
                          AI Generated
                        </span>
                      </motion.button>
                    ) : (
                      <DodgingAIButton onCheat={handleCheatAttempt} />
                    )}
                  </motion.div>
                )}

                {/* Feedback */}
                {showFeedback && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      className={`glass-card p-6 rounded-2xl border-2 ${
                        isCorrect
                          ? 'border-emerald-400/50 bg-emerald-500/10'
                          : 'border-red-400/50 bg-red-500/10'
                      }`}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${
                        isCorrect ? 'text-emerald-300' : 'text-red-300'
                      }`}>
                        <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
                        <h3 className="text-2xl font-black">
                          {isCorrect ? 'Correct!' : 'Not quite!'}
                        </h3>
                      </div>
                      <p className="text-white/90 text-base font-medium leading-relaxed">
                        {currentQuestion.funFact}
                      </p>
                    </motion.div>

                    {!isLastQuestion && (
                      <motion.button
                        onClick={handleNext}
                        className="group relative w-full px-8 py-5 text-xl font-bold rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                          Next Question
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </span>
                      </motion.button>
                    )}

                    {isLastQuestion && (
                      <motion.button
                        onClick={handleNext}
                        className="group relative w-full px-8 py-5 text-xl font-bold rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                          See Results 🎉
                        </span>
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
