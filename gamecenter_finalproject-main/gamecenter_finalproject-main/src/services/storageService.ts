import { Preferences } from '@capacitor/preferences';
import { UserStats, Achievement, Badge } from '../types';
import { STORAGE_KEYS } from '../theme/constants';

class StorageService {
  // Stats Methods
  async saveStats(stats: UserStats): Promise<void> {
    try {
      await Preferences.set({
        key: STORAGE_KEYS.STATS,
        value: JSON.stringify(stats),
      });
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }

  async getStats(): Promise<UserStats | null> {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEYS.STATS });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting stats:', error);
      return null;
    }
  }

  // Achievements Methods
  async saveAchievements(achievements: Achievement[]): Promise<void> {
    try {
      await Preferences.set({
        key: STORAGE_KEYS.ACHIEVEMENTS,
        value: JSON.stringify(achievements),
      });
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }

  async getAchievements(): Promise<Achievement[] | null> {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEYS.ACHIEVEMENTS });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting achievements:', error);
      return null;
    }
  }

  // Badges Methods
  async saveBadges(badges: Badge[]): Promise<void> {
    try {
      await Preferences.set({
        key: STORAGE_KEYS.BADGES,
        value: JSON.stringify(badges),
      });
    } catch (error) {
      console.error('Error saving badges:', error);
    }
  }

  async getBadges(): Promise<Badge[] | null> {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEYS.BADGES });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting badges:', error);
      return null;
    }
  }

  // User Methods
  async saveUser(key: string, data: any): Promise<void> {
    try {
      await Preferences.set({
        key,
        value: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  async getUser(key: string): Promise<any | null> {
    try {
      const { value } = await Preferences.get({ key });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async removeUser(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storageService = new StorageService();
