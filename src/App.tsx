import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, gameController, person } from 'ionicons/icons';

/* Import Bootstrap CSS as per ADR */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Custom Theme */
import './theme/custom.css';
import './App.css';

/* Pages */
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage'; 

/* Context Providers */
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { AchievementProvider } from './context/AchievementContext';

setupIonicReact();

const PrivateRoute: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({ 
  component: Component, 
  ...rest 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={() =>
        user ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0A1628',
        color: '#00D9FF'
      }}>
        <h2 className="loading-pulse">Loading GameCenter...</h2>
      </div>
    );
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        
        <PrivateRoute path="/tabs" component={TabsPage} />

       
      <Route exact path="/home">
        <Redirect to="/tabs/home" />
      </Route>
        
        <Route exact path="/">
          <Redirect to={user ? "/tabs/home" : "/login"} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const TabsPage: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <PrivateRoute exact path="/tabs/home" component={HomePage} />
        <PrivateRoute exact path="/tabs/games" component={GamesPage} />
        <PrivateRoute exact path="/tabs/profile" component={ProfilePage} />
        <Route exact path="/tabs/edit-profile" component={EditProfilePage} />
        
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>HOME</IonLabel>
        </IonTabButton>

        <IonTabButton tab="games" href="/tabs/games">
          <IonIcon icon={gameController} />
          <IonLabel>GAMES</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={person} />
          <IonLabel>PROFILE</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <GameProvider>
          <AchievementProvider>
            <AppContent />
          </AchievementProvider>
        </GameProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
