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
            className="game-card" 
            onClick={() => router.push('/trivia')}
          >
            <IonCardContent className="card-layout">
            <div className="image-container">
              <img 
                src="assets/image/trivia.png" 
                className="game-image" 
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
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GamesPage;
