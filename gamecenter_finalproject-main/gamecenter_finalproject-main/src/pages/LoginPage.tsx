import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonInput, IonText, IonLoading, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      setShowToast(true);
      await Haptics.impact({ style: ImpactStyle.Medium });
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      await Haptics.impact({ style: ImpactStyle.Heavy });
      history.replace('/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setShowToast(true);
      await Haptics.impact({ style: ImpactStyle.Medium });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <IonPage>
      <IonContent className="login-page cyber-bg">
        <div className="login-container">
          <div className="login-header">
            <h1 className="page-title neon-text">GAMECENTER</h1>
            <p className="login-subtitle">Your Arcade Hub</p>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                className="custom-input"
              />
            </div>

            <IonButton
              expand="block"
              className="btn btn-primary gradient-btn login-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </IonButton>

            <div className="register-link">
              <IonText color="light">Don't have an account? </IonText>
              <IonButton
                fill="clear"
                size="small"
                onClick={() => history.push('/register')}
                className="link-button"
              >
                Register
              </IonButton>
            </div>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Logging in..." />
        
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

export default LoginPage;
