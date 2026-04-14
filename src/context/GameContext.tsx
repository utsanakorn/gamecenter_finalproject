import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserStats, GameContextType } from '../types';
import { storageService } from '../services/storageService';

const initialStats: UserStats = {
  gamesPlayed: 0,
  highScore: 0,
  winRate: 0,
  streak: 0,
};

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [totalWins, setTotalWins] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (stats !== initialStats) {
      saveStats();
    }
  }, [stats]);

  const loadStats = async () => {
    const savedStats = await storageService.getStats();
    if (savedStats) {
      setStats(savedStats);
      // Calculate total wins from win rate and games played
      const wins = Math.round((savedStats.winRate / 100) * savedStats.gamesPlayed);
      setTotalWins(wins);
    }
  };

  const saveStats = async () => {
    await storageService.saveStats(stats);
  };

  const updateStats = (newStats: Partial<UserStats>) => {
    setStats(prev => ({
      ...prev,
      ...newStats,
    }));
  };

  const incrementGamesPlayed = () => {
    setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  };

  const updateHighScore = (score: number) => {
    setStats(prev => ({
      ...prev,
      highScore: Math.max(prev.highScore, score),
    }));
  };

  const updateWinRate = (won: boolean) => {
    const newTotalWins = won ? totalWins + 1 : totalWins;
    setTotalWins(newTotalWins);
    
    const newGamesPlayed = stats.gamesPlayed + 1;
    const newWinRate = newGamesPlayed > 0 
      ? Math.round((newTotalWins / newGamesPlayed) * 100) 
      : 0;
    
    setStats(prev => ({
      ...prev,
      winRate: newWinRate,
    }));
  };

  const updateStreak = (won: boolean) => {
    setStats(prev => ({
      ...prev,
      streak: won ? prev.streak + 1 : 0,
    }));
  };

  const resetStats = () => {
    setStats(initialStats);
    setTotalWins(0);
    storageService.saveStats(initialStats);
  };

  return (
    <GameContext.Provider 
      value={{ 
        stats, 
        updateStats, 
        incrementGamesPlayed, 
        updateHighScore, 
        updateWinRate, 
        updateStreak,
        resetStats 
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
