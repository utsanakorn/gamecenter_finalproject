// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: Date;
}

// Stats Types
export interface UserStats {
  gamesPlayed: number;
  highScore: number;
  winRate: number;
  streak: number;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: Date;
}

// Badge Types
export interface Badge {
  id: string;
  name: string;
  icon: string;
}

// User Profile
export interface UserProfile extends User {
  stats: UserStats;
  badges: Badge[];
  achievements: Achievement[];
}

// Game Types
export interface Game {
  id: string;
  name: string;
  description: string;
  status: 'NEW' | 'PLAY' | 'SOON';
  icon: string;
  gradient: [string, string];
  route: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Game Context Types
export interface GameContextType {
  stats: UserStats;
  updateStats: (newStats: Partial<UserStats>) => void;
  incrementGamesPlayed: () => void;
  updateHighScore: (score: number) => void;
  updateWinRate: (won: boolean) => void;
  updateStreak: (won: boolean) => void;
  resetStats: () => void;
}

// Achievement Context Types
export interface AchievementContextType {
  achievements: Achievement[];
  badges: Badge[];
  unlockAchievement: (achievementId: string) => void;
  checkAndUnlockAchievements: (stats: UserStats) => void;
}
