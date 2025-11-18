import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import type { Answer } from '../types';
import { DodgingAIButton } from './DodgingAIButton';
import { AnswerFeedbackAnimation } from './AnswerFeedbackAnimation';
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
  const [showAnticipation, setShowAnticipation] = useState(false);
  const [showFullScreenFeedback, setShowFullScreenFeedback] = useState(false);
  const [cheatAttempts, setCheatAttempts] = useState(0);

  if (!currentQuestion) return null;

  const isFinalQuestion = gameStatus === 'final';
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswer = (answer: Answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    setShowAnticipation(true);

    setTimeout(() => {
      setShowAnticipation(false);
      setShowFullScreenFeedback(true);
      answerQuestion(answer);

      if (answer === currentQuestion.correctAnswer) {
        const buttonElement = document.getElementById(`answer-${answer}`);
        if (buttonElement) {
          const rect = buttonElement.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          fireSmallBurst(x, y);
        }
      }

      setTimeout(() => {
        setShowFullScreenFeedback(false);
        setShowFeedback(true);

        if (!isLastQuestion) {
          setTimeout(() => {
            handleNext();
          }, 2500);
        }
      }, 1000);
    }, 1000);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    nextQuestion();
  };

  const handleCheatAttempt = () => {
    setCheatAttempts(prev => prev + 1);
  };

  const bgColors = ['bg-neon-cyan', 'bg-neon-yellow', 'bg-neon-lime', 'bg-neon-magenta', 'bg-neon-orange'];
  const currentBg = bgColors[currentQuestionIndex % bgColors.length];

  return (
    <div className={`w-full h-full flex flex-col ${currentBg} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-noise"></div>

      <AnswerFeedbackAnimation
        isCorrect={isCorrect}
        isVisible={showFullScreenFeedback}
      />

      {showAnticipation && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          animate={{
            x: [-10, 10, -10, 10, -5, 5, 0],
            y: [-10, 10, -10, 10, -5, 5, 0],
          }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-full" />
        </motion.div>
      )}

      <div className="absolute top-0 left-0 right-0 h-3 bg-brutal-black z-30 flex">
        {Array.from({ length: questions.length }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-full ${i <= currentQuestionIndex ? 'bg-neon-magenta' : 'bg-brutal-white'}`}
            style={{ width: `${100 / questions.length}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i <= currentQuestionIndex ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
        <motion.div
          className="bg-brutal-white brutal-border-thick brutal-shadow px-8 py-6 transform -rotate-2"
          initial={{ x: -100, opacity: 0, rotate: -10 }}
          animate={{ x: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="text-brutal-black text-sm font-black uppercase mb-2">Round</div>
          <div className="text-brutal-black font-black text-5xl">
            {currentQuestionIndex + 1}/{questions.length}
          </div>
        </motion.div>

        <motion.div
          className="bg-brutal-black brutal-border-thick brutal-shadow px-8 py-6 transform rotate-2"
          initial={{ x: 100, opacity: 0, rotate: 10 }}
          animate={{ x: 0, opacity: 1, rotate: 2 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="text-neon-yellow text-sm font-black uppercase mb-2">Score</div>
          <motion.div
            className="text-brutal-white font-black text-5xl"
            key={score}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.3 }}
          >
            {score}/{questions.length}
          </motion.div>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-56 relative z-10">
        <div className="w-full max-w-7xl">
          <motion.h2
            key={`question-${currentQuestionIndex}`}
            className="font-display text-6xl md:text-8xl font-black text-brutal-black text-center mb-10 uppercase leading-tight tracking-tighter"
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
          >
            {currentQuestion.prompt}
          </motion.h2>

          <motion.div
            key={`image-${currentQuestionIndex}`}
            className="relative mx-auto max-w-3xl"
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{
              scale: showAnticipation ? [1, 0.95, 1.05, 0.95, 1] : 1,
              opacity: 1,
              rotate: 0
            }}
            transition={{
              scale: showAnticipation ? { duration: 1, repeat: 0 } : { duration: 0.5, type: 'spring' },
              opacity: { duration: 0.5 },
              rotate: { duration: 0.5, type: 'spring' }
            }}
          >
            <div className="bg-brutal-white brutal-border-thick brutal-shadow-xl p-4 transform -rotate-1">
              <div className="relative aspect-square overflow-hidden bg-brutal-black">
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question"
                  className="w-full h-full object-cover"
                />
                {isFinalQuestion && (
                  <motion.div
                    className="absolute top-4 right-4 bg-neon-magenta brutal-border px-6 py-3 transform rotate-12"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ delay: 0.5, type: 'spring', bounce: 0.7 }}
                  >
                    <span className="text-brutal-white font-black text-xl flex items-center gap-2 uppercase">
                      📸 YOU!
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {isFinalQuestion && cheatAttempts > 0 && (
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-neon-orange brutal-border-thick px-6 py-3 whitespace-nowrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-brutal-black font-black text-lg uppercase">
                  😏 Attempts: {cheatAttempts}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!showFeedback && (
              <motion.div
                className="grid grid-cols-2 gap-8"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.button
                  id="answer-REAL"
                  onClick={() => handleAnswer('REAL')}
                  disabled={!!selectedAnswer}
                  className={`relative px-12 py-12 font-black text-5xl uppercase tracking-tight overflow-hidden disabled:opacity-50 ${
                    showAnticipation && selectedAnswer === 'REAL' ? 'animate-tremble' : ''
                  }`}
                  style={{
                    backgroundColor: '#CCFF00',
                    border: '8px solid #000000',
                    boxShadow: selectedAnswer === 'REAL' ? '4px 4px 0px 0px #000000' : '12px 12px 0px 0px #000000'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '16px 16px 0px 0px #000000',
                  }}
                  whileTap={{
                    y: 0,
                    boxShadow: '4px 4px 0px 0px #000000',
                  }}
                >
                  <span className="flex items-center justify-center gap-6 text-brutal-black">
                    <span className="text-7xl">🧍</span>
                    REAL
                  </span>
                </motion.button>

                {!isFinalQuestion ? (
                  <motion.button
                    id="answer-AI"
                    onClick={() => handleAnswer('AI')}
                    disabled={!!selectedAnswer}
                    className={`relative px-12 py-12 font-black text-5xl uppercase tracking-tight overflow-hidden disabled:opacity-50 ${
                      showAnticipation && selectedAnswer === 'AI' ? 'animate-tremble' : ''
                    }`}
                    style={{
                      backgroundColor: '#FF006E',
                      border: '8px solid #000000',
                      boxShadow: selectedAnswer === 'AI' ? '4px 4px 0px 0px #000000' : '12px 12px 0px 0px #000000'
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: '16px 16px 0px 0px #000000',
                    }}
                    whileTap={{
                      y: 0,
                      boxShadow: '4px 4px 0px 0px #000000',
                    }}
                  >
                    <span className="flex items-center justify-center gap-6 text-brutal-white">
                      <span className="text-7xl">🤖</span>
                      AI
                    </span>
                  </motion.button>
                ) : (
                  <div className="relative">
                    <DodgingAIButton onCheat={handleCheatAttempt} />
                  </div>
                )}
              </motion.div>
            )}

            {showFeedback && (
              <motion.div
                className="space-y-6"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
              >
                <motion.div
                  className={`${
                    isCorrect ? 'bg-neon-lime' : 'bg-neon-magenta'
                  } brutal-border-thick brutal-shadow-lg p-8 transform ${
                    isCorrect ? 'rotate-1' : '-rotate-1'
                  }`}
                  initial={{ scale: 0.8, rotate: 0 }}
                  animate={{ scale: 1, rotate: isCorrect ? 1 : -1 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl">{isCorrect ? '✅' : '❌'}</span>
                    <h3 className="text-4xl font-black text-brutal-black uppercase">
                      {isCorrect ? 'CORRECT!' : 'WRONG!'}
                    </h3>
                  </div>
                  <p className="text-brutal-black text-xl font-bold leading-relaxed uppercase">
                    {currentQuestion.funFact}
                  </p>
                </motion.div>

                {!isLastQuestion && (
                  <motion.button
                    onClick={handleNext}
                    className="w-full px-10 py-6 font-black text-3xl bg-brutal-black brutal-border-thick brutal-shadow-lg uppercase tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{
                      y: -4,
                      boxShadow: '16px 16px 0px 0px #000000',
                    }}
                    whileTap={{
                      y: 0,
                      boxShadow: '4px 4px 0px 0px #000000',
                    }}
                  >
                    <span className="flex items-center justify-center gap-4 text-brutal-white">
                      NEXT
                      <motion.span
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-4xl"
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                )}

                {isLastQuestion && (
                  <motion.button
                    onClick={handleNext}
                    className="w-full px-10 py-6 font-black text-3xl bg-neon-orange brutal-border-thick brutal-shadow-lg uppercase tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{
                      y: -4,
                      boxShadow: '16px 16px 0px 0px #000000',
                    }}
                    whileTap={{
                      y: 0,
                      boxShadow: '4px 4px 0px 0px #000000',
                    }}
                  >
                    <span className="flex items-center justify-center gap-3 text-brutal-black">
                      SEE RESULTS 🎉
                    </span>
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
