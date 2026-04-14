export const APP_NAME = 'GAMECENTER';
export const APP_TAGLINE = 'Your Arcade Hub';

// Storage Keys (using Capacitor Preferences as per ADR)
export const STORAGE_KEYS = {
  USER: 'gamecenter_user',
  STATS: 'gamecenter_stats',
  ACHIEVEMENTS: 'gamecenter_achievements',
  BADGES: 'gamecenter_badges',
  CURRENT_USER: 'gamecenter_current_user',
};

// Quiz Settings
export const QUIZ_SETTINGS = {
  QUESTIONS_PER_QUIZ: 10,
  TIME_PER_QUESTION: 30,
  POINTS_PER_CORRECT: 10,
  PASS_PERCENTAGE: 70,
};

// Tic Tac Toe Settings
export const TIC_TAC_TOE_SETTINGS = {
  BOARD_SIZE: 3,
  DIFFICULTY_LEVELS: ['easy', 'hard'] as const,
};

// Achievement IDs
export const ACHIEVEMENT_IDS = {
  ANTI_AI: 'anti-ai',
  GRINDER: 'grinder',
  SMARTY_PANTS: 'smarty-pants',
  FIRST_WIN: 'first-win',
  QUIZ_MASTER: 'quiz-master',
  PERFECT_SCORE: 'perfect-score',
};

// Badge IDs
export const BADGE_IDS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert',
};
