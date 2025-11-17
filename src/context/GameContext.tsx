import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { GameState, Answer, Question, GameStatus } from '../types';
import { QUIZ_QUESTIONS, getRandomMemePreset } from '../data/questions';
import { useCameraCapture } from '../hooks/useCameraCapture';
import { useNanoBanana } from '../hooks/useNanoBanana';

interface GameContextValue extends GameState {
  startGame: () => Promise<void>;
  answerQuestion: (answer: Answer) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  isLastQuestion: boolean;
  currentQuestion: Question | null;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const { capturePhoto } = useCameraCapture();
  const { status: aiMemeStatus, imageUrl: aiMemePhoto, generate, reset: resetNanoBanana } = useNanoBanana();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(QUIZ_QUESTIONS);
  const [answers, setAnswers] = useState<(Answer | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [score, setScore] = useState(0);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('landing');

  const currentQuestion = questions[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const startGame = useCallback(async () => {
    console.log('🎮 Starting game...');
    setGameStatus('playing');

    // Capture user photo and generate AI meme in background
    try {
      console.log('📸 Capturing selfie...');
      const photo = await capturePhoto();

      if (photo) {
        setUserPhoto(photo);
        console.log('✅ Selfie captured!');

        // Start generating AI meme in background
        const memePrompt = getRandomMemePreset();
        console.log('🚀 Generating AI meme:', memePrompt);
        await generate(photo, memePrompt);
      } else {
        console.warn('⚠️ Failed to capture photo, continuing without it');
      }
    } catch (err) {
      console.error('Error in startGame:', err);
    }

    // Move to first question
    setCurrentQuestionIndex(0);
  }, [capturePhoto, generate]);

  const answerQuestion = useCallback((answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    // Check if answer is correct
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;

      // If moving to last question, check if AI meme is ready
      if (nextIndex === questions.length - 1) {
        if (aiMemeStatus !== 'ready') {
          setGameStatus('waiting');
          // Will transition to 'final' when aiMemeStatus becomes 'ready'
        } else {
          // Update the final question with the AI meme photo
          const updatedQuestions = [...questions];
          updatedQuestions[nextIndex] = {
            ...updatedQuestions[nextIndex],
            imageUrl: aiMemePhoto || ''
          };
          setQuestions(updatedQuestions);
          setGameStatus('final');
        }
      }

      setCurrentQuestionIndex(nextIndex);
    } else {
      // Game complete
      setGameStatus('complete');
    }
  }, [currentQuestionIndex, questions, aiMemeStatus, aiMemePhoto]);

  // Effect to handle transition from waiting to final when AI meme is ready
  React.useEffect(() => {
    if (gameStatus === 'waiting' && aiMemeStatus === 'ready' && aiMemePhoto) {
      console.log('✅ AI meme ready! Moving to final question...');

      // Update the final question with the AI meme photo
      const updatedQuestions = [...questions];
      updatedQuestions[questions.length - 1] = {
        ...updatedQuestions[questions.length - 1],
        imageUrl: aiMemePhoto
      };
      setQuestions(updatedQuestions);
      setGameStatus('final');
    }
  }, [gameStatus, aiMemeStatus, aiMemePhoto, questions]);

  const resetGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setScore(0);
    setUserPhoto(null);
    setGameStatus('landing');
    setQuestions(QUIZ_QUESTIONS);
    resetNanoBanana();
  }, [resetNanoBanana]);

  const value: GameContextValue = {
    currentQuestionIndex,
    questions,
    answers,
    score,
    userPhoto,
    aiMemePhoto,
    aiMemeStatus,
    gameStatus,
    startGame,
    answerQuestion,
    nextQuestion,
    resetGame,
    isLastQuestion,
    currentQuestion
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
