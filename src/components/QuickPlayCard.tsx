import React from 'react';
import { IonCard, IonButton } from '@ionic/react';
import './QuickPlayCard.css';

interface QuickPlayCardProps {
  title: string;
  description: string;
  icon: string;
  route: string;
  buttonText?: string;
  onClick?: () => void;
}

export const QuickPlayCard: React.FC<QuickPlayCardProps> = ({
  title,
  description,
  icon,
  route,
  buttonText = 'PLAY',
  onClick
}) => {
  return (
    <IonCard className="quick-play-card gradient-card" onClick={onClick}>
      <div className="quick-play-content">
        <div className="quick-play-icon-container">
          <div className="quick-play-icon-bg">
            <img
              src={icon}
              className="quick-play-image"
              alt={title}
            />
          </div>
        </div>
        
        <div className="quick-play-text">
          <div className="quick-play-title">{title}</div>
          <div className="quick-play-description">{description}</div>
        </div>

        <IonButton className="quick-play-button gradient-btn" size="small">
          {buttonText}
        </IonButton>
      </div>
    </IonCard>
  );
};
