import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButton,
  IonAlert
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useAchievements } from '../context/AchievementContext';
import { BadgeCard } from '../components/BadgeCard';
import { AchievementCard } from '../components/AchievementCard';
import { useHistory } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { achievements, badges } = useAchievements();
  const history = useHistory();
  const [showLogoutAlert, setShowLogoutAlert] = React.useState(false);

  const handleLogout = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
    await logout();
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonTitle>
            <div className="profile-header-title">
              <h1 className="page-title neon-text">PROFILE</h1>
              <p className="profile-subtitle">See Achievements and Progress</p>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-page cyber-bg">
        <div className="profile-content">
{/* User Info Section */}
<div className="user-section">
  <div className="user-avatar neon-border">
    <span className="avatar-emoji">{user?.avatar || '👤'}</span>
  </div>
  <h2 className="username">{user?.username || 'Player'}</h2>
  <p className="user-email">{user?.email}</p>
  
  {/* Edit Profile Button */}
  <IonButton
    expand="block"
    fill="outline"
    className="edit-profile-btn"
    onClick={() => history.push('/tabs/edit-profile')}
  >
    ✏️ EDIT PROFILE
  </IonButton>
</div>

          {/* Badges Section */}
          <div className="badges-section">
            <h3 className="section-title">Badges</h3>
            <div className="badges-container">
              {badges.map((badge) => (
                <BadgeCard key={badge.id} icon={badge.icon} name={badge.name} />
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="achievements-section">
            <h3 className="section-title">Achievements</h3>
            <div className="achievements-list">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  icon={achievement.icon}
                  name={achievement.name}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                />
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <div className="logout-section">
            <IonButton
              expand="block"
              color="danger"
              className="logout-button"
              onClick={() => setShowLogoutAlert(true)}
            >
              LOGOUT
            </IonButton>
          </div>
        </div>

        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Logout"
          message="Are you sure you want to logout?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Logout',
              handler: handleLogout
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
