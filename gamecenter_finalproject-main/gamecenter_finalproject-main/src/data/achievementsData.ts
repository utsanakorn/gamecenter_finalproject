import { Achievement, Badge } from '../types';

export const initialAchievements: Achievement[] = [
  {
    id: 'anti-ai',
    name: 'Anti-AI',
    description: 'Beat Tic-Tac-Toe in the highest difficulty',
    icon: '🤖',
    unlocked: false,
  },
  {
    id: 'grinder',
    name: 'Grinder',
    description: 'Win any mini-games 10 times in a row',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'smarty-pants',
    name: 'Smarty-Pants',
    description: 'Answer 100 Quiz Master questions correctly',
    icon: '🧠',
    unlocked: false,
  },
  {
    id: 'first-win',
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Complete 10 quizzes',
    icon: '📚',
    unlocked: false,
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% in a quiz',
    icon: '💯',
    unlocked: false,
  },
];

export const initialBadges: Badge[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    icon: '🥉',
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: '🥈',
  },
  {
    id: 'expert',
    name: 'Expert',
    icon: '🥇',
  },
];
