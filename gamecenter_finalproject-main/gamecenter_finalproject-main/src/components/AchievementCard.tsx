import React from 'react';
import { IonCard } from '@ionic/react';
import './AchievementCard.css';

interface AchievementCardProps {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  icon,
  name,
  description,
  unlocked
}) => {
  return (
    <IonCard className={`achievement-card gradient-card ${!unlocked ? 'locked' : ''}`}>
      <div className="achievement-content">
        <div className="achievement-icon-container">
          <span className={`achievement-icon ${!unlocked ? 'locked-icon' : ''}`}>
            {icon}
          </span>
        </div>
        <div className="achievement-text">
          <div className={`achievement-name ${!unlocked ? 'locked-text' : ''}`}>
            {name}
          </div>
          <div className={`achievement-description ${!unlocked ? 'locked-text' : ''}`}>
            {description}
          </div>
        </div>
      </div>
    </IonCard>
  );
};
