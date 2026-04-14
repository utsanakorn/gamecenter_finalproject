import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonButton,
  IonInput,
  IonToast,
  IonIcon,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import './EditProfilePage.css';

// Avatar options (emojis)
const AVATAR_OPTIONS = ['👤', '😀', '😎', '🤓', '🥳', '🤠', '👨‍💻', '👩‍💻', '🧙', '🦸', '🦹', '🧛'];

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  
  // States
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '👤');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  // Validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    // Validation
    if (username.length < 3) {
      setToastMessage('Username must be at least 3 characters');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    if (!isValidEmail(email)) {
      setToastMessage('Invalid email format (example: name@email.com)');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    // If changing password
    if (newPassword) {
      if (newPassword.length !== 6) {
        setToastMessage('Password must be exactly 6 characters');
        setToastColor('danger');
        setShowToast(true);
        return;
      }

      if (newPassword !== confirmPassword) {
        setToastMessage('Passwords do not match');
        setToastColor('danger');
        setShowToast(true);
        return;
      }
    }

    try {
      // Update user data
      const updatedUser = {
        ...user,
        username,
        email,
        avatar: selectedAvatar
      };

      // Save to storage
      await storageService.saveUser('gamecenter_current_user', updatedUser);

      // If password changed, update stored credentials
      if (newPassword) {
        const userKey = `gamecenter_user:${user?.email}`;
        const oldUserData = await storageService.getUser(userKey);
        
        if (oldUserData) {
          oldUserData.password = newPassword;
          oldUserData.email = email;
          oldUserData.username = username;
          await storageService.saveUser(userKey, oldUserData);
        }

        // If email changed, save under new key
        if (email !== user?.email) {
          const newUserKey = `gamecenter_user:${email}`;
          await storageService.saveUser(newUserKey, {
            email,
            password: newPassword,
            username
          });
        }
      }

      setToastMessage('Profile updated successfully! 🎉');
      setToastColor('success');
      setShowToast(true);

      // Redirect after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/tabs/profile';
      }, 1500);
    } catch (error) {
      setToastMessage('Failed to update profile');
      setToastColor('danger');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            <div className="edit-header">
              <h1 className="page-title neon-text">EDIT PROFILE</h1>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="edit-profile-page cyber-bg">
        <div className="edit-content">
          
          {/* Avatar Selection */}
          <div className="avatar-section">
            <h3 className="section-title">Choose Avatar</h3>
            <IonGrid className="avatar-grid">
              <IonRow>
                {AVATAR_OPTIONS.map((avatar, index) => (
                  <IonCol size="3" key={index}>
                    <div 
                      className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <span className="avatar-emoji">{avatar}</span>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>

          {/* Current Avatar Preview */}
          <div className="avatar-preview">
            <div className="preview-avatar neon-border">
              <span className="avatar-emoji-large">{selectedAvatar}</span>
            </div>
            <p className="preview-label">Selected Avatar</p>
          </div>

          {/* Form Fields */}
          <div className="form-group">
            <label className="form-label">Username (min 3 characters)</label>
            <IonInput
              type="text"
              value={username}
              onIonInput={(e: any) => setUsername(e.detail.value || '')}
              placeholder="Your username"
              className="custom-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <IonInput
              type="email"
              value={email}
              onIonInput={(e: any) => setEmail(e.detail.value || '')}
              placeholder="your@email.com"
              className="custom-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Password (6 characters, leave blank to keep current)</label>
            <IonInput
              type="password"
              value={newPassword}
              onIonInput={(e: any) => setNewPassword(e.detail.value || '')}
              placeholder="New password"
              className="custom-input"
              maxlength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonInput={(e: any) => setConfirmPassword(e.detail.value || '')}
              placeholder="Confirm password"
              className="custom-input"
              maxlength={6}
            />
          </div>

          {/* Buttons */}
          <IonButton
            expand="block"
            className="gradient-btn save-button"
            onClick={handleSave}
          >
            💾 SAVE CHANGES
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            className="cancel-button"
            onClick={() => history.goBack()}
          >
            ❌ CANCEL
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default EditProfilePage;
