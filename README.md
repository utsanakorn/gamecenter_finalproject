# GameCenter - Mobile Gaming Hub

**Team:** The Gang (Kylle Bangeng, Kate Chinkonglar, Paolo Manalastas)

A mobile gaming application built with Ionic React, TypeScript, and Bootstrap CSS.

## Architecture

- **Framework:** Ionic Framework (React + TypeScript)
- **Styling:** Bootstrap CSS
- **Navigation:** Tab Bar with Stack Navigation
- **Hardware:** Haptics (Vibration), Audio
- **Storage:** Local Storage (Capacitor Preferences)

## Features (Person 1)

### ✅ Authentication System
- Login with email/password
- Register new account
- Logout functionality
- Session persistence

### ✅ Home Page
- User statistics display
  - Games Played
  - High Score
  - Win Rate
  - Streak (with fire emoji)
- Quick Play section
- Haptic feedback

### ✅ Profile Page
- User avatar and info
- Badges display
- Achievements list (locked/unlocked)
- Logout button

### ✅ State Management
- AuthContext - User authentication
- GameContext - Game statistics
- AchievementContext - Badges & achievements

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

2. **Run in browser:**
```bash
npm start
```
The app will open at `http://localhost:3000`

3. **Build for production:**
```bash
npm run build
```

## Android Development

### Add Android Platform

1. **Add Capacitor Android:**
```bash
npm install @capacitor/cli @capacitor/core
npx cap init
npx cap add android
```

2. **Sync web code to Android:**
```bash
npm run build
npx cap sync
npx cap open android
```

3. **Run on Android Studio:**
- Open the project in Android Studio
- Wait for Gradle sync
- Click Run (green play button)
- Select emulator or physical device

### Build APK

In Android Studio:
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. APK will be in `android/app/build/outputs/apk/debug/`

## Project Structure

```
gamecenter/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable components
│   │   ├── StatsCard.tsx
│   │   ├── QuickPlayCard.tsx
│   │   ├── BadgeCard.tsx
│   │   └── AchievementCard.tsx
│   ├── context/          # React Context
│   │   ├── AuthContext.tsx
│   │   ├── GameContext.tsx
│   │   └── AchievementContext.tsx
│   ├── data/            # Static data
│   │   └── achievementsData.ts
│   ├── pages/           # App pages
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── GamesPage.tsx (placeholder)
│   ├── services/        # Business logic
│   │   ├── authService.ts
│   │   └── storageService.ts
│   ├── theme/          # Styling
│   │   ├── theme.ts
│   │   ├── constants.ts
│   │   └── custom.css
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   ├── App.tsx         # Main app component
│   └── index.tsx       # Entry point
├── capacitor.config.ts  # Capacitor configuration
├── package.json
└── tsconfig.json
```

## Usage

### First Time Setup

1. **Register an account:**
   - Open the app
   - Click "Register"
   - Fill in username, email, password
   - Click "REGISTER"

2. **Login:**
   - Enter email and password
   - Click "LOGIN"

3. **Navigate:**
   - Use bottom tab bar
   - HOME: View stats and quick play
   - GAMES: Access all games (Person 2 will implement)
   - PROFILE: View achievements and logout

### Testing Accounts

Since this uses local storage, create your own test accounts:
- Email: test@example.com
- Password: test123
- Username: testuser

## Person 1 Implementation Details

### Components Created
1. **StatsCard** - Display game statistics
2. **QuickPlayCard** - Quick game access
3. **BadgeCard** - User badges
4. **AchievementCard** - Achievement display

### Pages Created
1. **LoginPage** - User authentication
2. **RegisterPage** - Account creation
3. **HomePage** - Main dashboard
4. **ProfilePage** - User profile
5. **GamesPage** - Placeholder for Person 2

### Services
1. **authService** - Handle login/register/logout
2. **storageService** - Local data persistence

### Context Providers
1. **AuthContext** - User authentication state
2. **GameContext** - Game statistics management
3. **AchievementContext** - Achievements & badges

## For Person 2 & 3

### Person 2 (Games Page + Tic Tac Toe)
- Implement GamesPage.tsx
- Create game cards (Quiz Master, Tic Tac Toe, etc.)
- Build Tic Tac Toe game
- Integrate with GameContext

### Person 3 (Quiz Master)
- Create QuizMasterPage
- Implement quiz logic
- Add question database
- Connect to GameContext for stats

## Technologies Used

- **Ionic Framework 7.5.0** - Mobile UI components
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Bootstrap 5.3.2** - CSS framework
- **Capacitor 5.5.1** - Native functionality
  - Haptics - Vibration feedback
  - Preferences - Local storage
  - StatusBar - Status bar styling

## Troubleshooting

### Common Issues

**1. App not starting:**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**2. Android build fails:**
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

**3. Haptics not working:**
- Only works on physical device
- Check device vibration settings

## License

MIT License - Created for CPRG-303-C Mobile App Development

## Contact

- Kylle Bangeng
- Utsanakorn(Kate) Chinkonglar
- Paolo Manalastas

GitHub: https://github.com/utsanakorn/gamecenter_finalproject
