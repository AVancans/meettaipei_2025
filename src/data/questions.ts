import type { Question } from '../types';

// Questions 1-5 with curated AI vs Real images
export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Is this photo REAL or AI-generated?',
    imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
    correctAnswer: 'REAL',
    type: 'NORMAL',
    funFact: 'Real photo! Those textures and lighting details are hard for AI to replicate perfectly.'
  },
  {
    id: 'q2',
    prompt: 'Can you spot the AI trickery here?',
    imageUrl: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800',
    correctAnswer: 'REAL',
    type: 'NORMAL',
    funFact: 'Tricky one! Real photograph with natural imperfections.'
  },
  {
    id: 'q3',
    prompt: 'Reality check: REAL or AI?',
    imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7f7a38?w=800',
    correctAnswer: 'REAL',
    type: 'NORMAL',
    funFact: 'Real! The organic details give it away.'
  },
  {
    id: 'q4',
    prompt: 'Is this image telling the truth?',
    imageUrl: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800',
    correctAnswer: 'REAL',
    type: 'NORMAL',
    funFact: 'Absolutely real! Mother nature never lies.'
  },
  {
    id: 'q5',
    prompt: 'Last warmup question - REAL or AI?',
    imageUrl: 'https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=800',
    correctAnswer: 'REAL',
    type: 'NORMAL',
    funFact: 'Real deal! Now get ready for the ultimate test...'
  },
  {
    id: 'q6',
    prompt: 'The ULTIMATE question: Is this YOU or AI?',
    imageUrl: '', // Will be filled with user's AI meme photo
    correctAnswer: 'AI',
    type: 'FINAL',
    funFact: 'SURPRISE! That\'s AI-generated! Hope you enjoyed the ride! 🎉'
  }
];

export const AI_MEME_PRESETS = [
  'riding a majestic alpaca through the clouds',
  'astronaut floating in a bowl of ramen',
  'surfing on a pizza slice in space',
  'dancing with penguins on an iceberg',
  'as a superhero saving cats from trees',
  'riding a unicorn into the sunset',
  'conducting an orchestra of robots',
  'skydiving with butterflies',
];

export function getRandomMemePreset(): string {
  return AI_MEME_PRESETS[Math.floor(Math.random() * AI_MEME_PRESETS.length)];
}
