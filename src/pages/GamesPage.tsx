import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './GamesPage.css';

const GamesPage: React.FC = () => {
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
            <h2>🎮 Games Page</h2>
            <p>This page will be implemented by Person 2</p>
            <p className="placeholder-note">
              Will include: Quiz Master, Tic Tac Toe, Memory Match, Puzzle Rush
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GamesPage;
