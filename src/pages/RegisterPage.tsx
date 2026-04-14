import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonInput, IonText, IonLoading, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setShowToast(true);
      await Haptics.impact({ style: ImpactStyle.Medium });
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowToast(true);
      await Haptics.impact({ style: ImpactStyle.Medium });
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(email, password, username);
      await Haptics.impact({ style: ImpactStyle.Heavy });
      history.replace('/home');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setShowToast(true);
      await Haptics.impact({ style: ImpactStyle.Medium });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="register-page cyber-bg">
        <div className="register-container">
          <div className="register-header">
            <h1 className="page-title neon-text">CREATE ACCOUNT</h1>
            <p className="register-subtitle">Join the GameCenter</p>
          </div>

          <div className="register-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                placeholder="Choose a username"
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="Enter your email"
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder="Create a password"
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                placeholder="Confirm your password"
                className="custom-input"
              />
            </div>

            <IonButton
              expand="block"
              className="btn btn-primary gradient-btn register-button"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </IonButton>

            <div className="login-link">
              <IonText color="light">Already have an account? </IonText>
              <IonButton
                fill="clear"
                size="small"
                onClick={() => history.push('/login')}
                className="link-button"
              >
                Login
              </IonButton>
            </div>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Creating account..." />
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error}
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
