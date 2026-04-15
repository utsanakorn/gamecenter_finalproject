import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { StatsCard } from '../components/StatsCard';
import { QuickPlayCard } from '../components/QuickPlayCard';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { stats } = useGame();
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonTitle>
            <div className="home-header">
              <h1 className="page-title neon-text">GAMECENTER</h1>
              <p className="home-subtitle">Your Arcade Hub</p>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-page cyber-bg">
        <div className="home-content">
          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              <StatsCard 
                label="GAMES PLAYED" 
                value={stats.gamesPlayed} 
              />
              <StatsCard 
                label="HIGH SCORE" 
                value={stats.highScore} 
              />
            </div>
            <div className="stats-grid">
              <StatsCard 
                label="WIN RATE" 
                value={`${stats.winRate}%`} 
              />
              <StatsCard 
                label="STREAK" 
                value={stats.streak}
                icon="🔥" 
              />
            </div>
          </div>

          {/* Quick Play Section */}
          <div className="quick-play-section">
            <h2 className="section-title">QUICK PLAY</h2>
            
            <QuickPlayCard
              title="Quiz Master"
              description="Test your knowledge"
              icon="assets/image/trivia.png"
              route="/tabs/games"
              buttonText="PLAY"
              onClick={() => history.push('/trivia')}
            />

            <QuickPlayCard
              title="Tic Tac Toe"
              description="Beat the AI"
              icon="assets/image/tictactoe.png"
              route="/tabs/games"
              buttonText="PLAY"
              onClick={() => history.push('/tabs/tictactoe')}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
