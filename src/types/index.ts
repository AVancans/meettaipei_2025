export type Answer = 'REAL' | 'AI';

export type QuestionType = 'NORMAL' | 'FINAL';

export interface Question {
  id: string;
  prompt: string;
  imageUrl?: string;
  correctAnswer: Answer;
  type: QuestionType;
  funFact?: string;
}

export interface DodgingButtonInstance {
  id: string;
  top: number;
  left: number;
  scale: number;
}

export type GameStatus = 'landing' | 'playing' | 'waiting' | 'final' | 'complete';

export type NanoBananaStatus = 'idle' | 'pending' | 'ready' | 'error';

export interface GameState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: (Answer | null)[];
  score: number;
  userPhoto: string | null;
  aiMemePhoto: string | null;
  aiMemeStatus: NanoBananaStatus;
  gameStatus: GameStatus;
}
