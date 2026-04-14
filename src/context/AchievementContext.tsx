import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Achievement, Badge, AchievementContextType, UserStats } from '../types';
import { storageService } from '../services/storageService';
import { initialAchievements, initialBadges } from '../data/achievementsData';

const AchievementContext = createContext<AchievementContextType | null>(null);

export const AchievementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  useEffect(() => {
    loadAchievements();
  }, []);

  useEffect(() => {
    if (achievements !== initialAchievements) {
      saveAchievements();
    }
  }, [achievements]);

  const loadAchievements = async () => {
    const savedAchievements = await storageService.getAchievements();
    const savedBadges = await storageService.getBadges();
    
    if (savedAchievements) {
      setAchievements(savedAchievements);
    }
    if (savedBadges) {
      setBadges(savedBadges);
    }
  };

  const saveAchievements = async () => {
    await storageService.saveAchievements(achievements);
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedDate: new Date() }
          : achievement
      )
    );
  };

  const checkAndUnlockAchievements = (stats: UserStats) => {
    // First Win
    if (stats.gamesPlayed === 1 && stats.winRate > 0) {
      unlockAchievement('first-win');
    }

    // Grinder - 10 win streak
    if (stats.streak >= 10) {
      unlockAchievement('grinder');
    }

    // Quiz Master - 10 games played
    if (stats.gamesPlayed >= 10) {
      unlockAchievement('quiz-master');
    }

    // Perfect score
    if (stats.winRate === 100 && stats.gamesPlayed >= 5) {
      unlockAchievement('perfect-score');
    }
  };

  return (
    <AchievementContext.Provider 
      value={{ 
        achievements, 
        badges, 
        unlockAchievement, 
        checkAndUnlockAchievements 
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementProvider');
  }
  return context;
};
