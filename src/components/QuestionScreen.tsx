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

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#050816] via-[#1a103a] to-[#2d1654] relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-black/30">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Score display */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white px-6 py-3 brutal-border brutal-shadow text-black font-bold text-xl">
          Score: {score}/{questions.length}
        </div>
      </div>

      {/* Question number */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-neon-yellow px-6 py-3 brutal-border brutal-shadow-sm text-black font-black text-xl">
          Q{currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl grid grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            key={`image-${currentQuestionIndex}`}
            className="relative"
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="relative bg-white p-4 brutal-border brutal-shadow-lg rounded-3xl overflow-hidden">
              <img
                src={currentQuestion.imageUrl}
                alt="Question"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              {isFinalQuestion && (
                <motion.div
                  className="absolute top-8 right-8 bg-neon-pink px-4 py-2 brutal-border brutal-shadow-sm text-white font-bold text-lg rotate-12"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  THIS IS YOU! 📸
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Question & Answers */}
          <div className="space-y-8">
            {/* Question text */}
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-5xl font-black text-white mb-4 leading-tight">
                {currentQuestion.prompt}
              </h2>
              {isFinalQuestion && cheatAttempts > 0 && (
                <motion.p
                  className="text-2xl text-neon-yellow font-bold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  😏 Nice try! Attempts: {cheatAttempts}
                </motion.p>
              )}
            </motion.div>

            {/* Answer buttons */}
            <AnimatePresence mode="wait">
              {!showFeedback && (
                <motion.div
                  className="space-y-6"
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
                    className="w-full px-12 py-8 text-4xl font-black text-white bg-emerald-500 brutal-border brutal-shadow-lg rounded-2xl hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02, x: 4, y: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🧍 REAL
                  </motion.button>

                  {/* AI button - normal or dodging */}
                  {!isFinalQuestion ? (
                    <motion.button
                      id="answer-AI"
                      onClick={() => handleAnswer('AI')}
                      disabled={!!selectedAnswer}
                      className="w-full px-12 py-8 text-4xl font-black text-white bg-neon-purple brutal-border brutal-shadow-lg rounded-2xl hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02, x: 4, y: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🤖 AI
                    </motion.button>
                  ) : (
                    <DodgingAIButton onCheat={handleCheatAttempt} />
                  )}
                </motion.div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className={`p-8 brutal-border brutal-shadow-lg rounded-2xl ${
                    isCorrect
                      ? 'bg-emerald-400 text-black'
                      : 'bg-red-400 text-black'
                  }`}>
                    <p className="text-4xl font-black mb-4">
                      {isCorrect ? '✅ Correct!' : '❌ Oops!'}
                    </p>
                    <p className="text-xl font-bold">
                      {currentQuestion.funFact}
                    </p>
                  </div>

                  {!isLastQuestion && (
                    <motion.button
                      onClick={handleNext}
                      className="w-full px-12 py-6 text-3xl font-black text-black bg-neon-yellow brutal-border brutal-shadow-lg rounded-2xl hover:bg-neon-green transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Next Question →
                    </motion.button>
                  )}

                  {isLastQuestion && (
                    <motion.button
                      onClick={handleNext}
                      className="w-full px-12 py-6 text-3xl font-black text-black bg-neon-pink brutal-border brutal-shadow-lg rounded-2xl hover:bg-pink-500 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      See Results! 🎉
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
