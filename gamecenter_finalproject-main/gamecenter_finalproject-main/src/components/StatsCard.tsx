import React from 'react';
import { IonCard } from '@ionic/react';
import './StatsCard.css';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon }) => {
  return (
    <IonCard className="stats-card gradient-card">
      <div className="stats-content">
        <div className="stats-label">{label}</div>
        <div className="stats-value-container">
          {icon && <span className="stats-icon">{icon}</span>}
          <span className="stats-value">{value}</span>
        </div>
      </div>
    </IonCard>
  );
};
