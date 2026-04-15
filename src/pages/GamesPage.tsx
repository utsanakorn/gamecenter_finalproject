import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonCardContent, IonCard, IonImg, useIonRouter } from '@ionic/react';
import './GamesPage.css';

const GamesPage: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonTitle>
            <div className="games-header">
              <h1 className="page-title neon-text">ALL GAMES</h1>
              <p className="games-subtitle">Choose your challenge</p>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="games-page cyber-bg">
        <div className="games-content">
          <div className="placeholder-message">
            <IonCard 
            className="game-card stats-card" 
            onClick={() => router.push('/trivia')}
          >
            <IonCardContent className="card-layout">
            <div className="quick-play-icon-bg">
              <img 
                src="assets/image/trivia.png" 
                className="quick-play-image" 
                alt="Quiz Master"
              />
            </div>
            <div className="text-column">
              <IonText className="game-name">
                <h2>Quiz Master</h2>
              </IonText>
              <IonText className="game-stats">
                <p>Test your Knowledge</p>
              </IonText>
            </div>
          </IonCardContent>
          </IonCard>

          
          {/* Tic Tac Toe Game */}
          <IonCard
            className="game-card stats-card"
            onClick={() => router.push('/tabs/tictactoe')}>
            <IonCardContent className="card-layout">

              {/* Image Section */}
              <div className="quick-play-icon-bg">
                <img
                  src="assets/image/tictactoe.png"
                  className="quick-play-image"
                  alt="Tic Tac Toe"
                />
              </div>

              {/* Text Section */}
              <div className="text-column">
                <IonText className="game-name">
                  <h2>Tic Tac Toe</h2>
                </IonText>
                <IonText className="game-stats">
                  <p>Beat the AI</p>
                </IonText>
              </div>

              
            </IonCardContent>
          </IonCard>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GamesPage;
