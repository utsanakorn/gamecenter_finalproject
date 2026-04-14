import React from 'react';
import './BadgeCard.css';

interface BadgeCardProps {
  icon: string;
  name: string;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ icon, name }) => {
  return (
    <div className="badge-card">
      <div className="badge-icon-container neon-border">
        <span className="badge-icon">{icon}</span>
      </div>
      <div className="badge-name">{name}</div>
    </div>
  );
};
