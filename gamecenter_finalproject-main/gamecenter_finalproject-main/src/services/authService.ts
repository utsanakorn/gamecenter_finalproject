import { storageService } from './storageService';
import { User } from '../types';
import { STORAGE_KEYS } from '../theme/constants';

// Mock Auth Service using Local Storage (as per ADR)
// This stores data locally and unencrypted as specified in the Architecture Decision

class AuthService {
  async register(email: string, password: string, username: string): Promise<User> {
    // Validate inputs
    if (!email || !password || !username) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user exists
    const existingUser = await storageService.getUser(`${STORAGE_KEYS.USER}:${email}`);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user
    const userData = { email, password, username };
    await storageService.saveUser(`${STORAGE_KEYS.USER}:${email}`, userData);

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      username,
      createdAt: new Date(),
    };

    await storageService.saveUser(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const storedUser = await storageService.getUser(`${STORAGE_KEYS.USER}:${email}`);
    
    if (!storedUser) {
      throw new Error('User not found. Please register first.');
    }

    if (storedUser.password !== password) {
      throw new Error('Invalid password');
    }

    const user: User = {
      id: `user_${Date.now()}`,
      email: storedUser.email,
      username: storedUser.username,
      createdAt: new Date(),
    };

    await storageService.saveUser(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  async logout(): Promise<void> {
    await storageService.removeUser(STORAGE_KEYS.CURRENT_USER);
  }

  async getCurrentUser(): Promise<User | null> {
    return await storageService.getUser(STORAGE_KEYS.CURRENT_USER);
  }

  async resetPassword(email: string): Promise<void> {
    console.log('Password reset for:', email);
    // Mock password reset
  }
}

export const authService = new AuthService();
