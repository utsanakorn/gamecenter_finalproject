import React, { useState } from 'react';
import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, 
  IonButton, IonText, IonCard, IonCardContent, useIonRouter 
} from '@ionic/react';
import { useGame } from '../context/GameContext'; // Person 1's hook
import './TriviaPage.css';

// The Data stays the same!
const QUIZ_DATA: any = {
  Movies: [
    { question: "Was 'Inception' directed by Christopher Nolan?", answer: true },
    { question: "Did 'Avatar' come out in 2005?", answer: false },
    { question: "Is 'The Godfather' a comedy?", answer: false },
    { question: "Did 'Titanic' win Best Picture?", answer: true },
    { question: "Is 'Pulp Fiction' a horror movie?", answer: false },
    { question: "Was 'The Dark Knight' released in 2008?", answer: true },
    { question: "Is 'Forrest Gump' a science fiction film?", answer: false },
    { question: "Did 'The Matrix' popularize the 'bullet time' effect?", answer: true },
    { question: "Is 'La La Land' a musical?", answer: true },
    { question: "Did 'The Shawshank Redemption' win Best Picture?", answer: false },
  ],
  Sports: [
    { question: "Is a soccer match 90 minutes long?", answer: true },
    { question: "Did Michael Jordan play for the Chicago Bulls?", answer: true },
    { question: "Is cricket played with a round ball?", answer: false },
    { question: "Did Serena Williams win 23 Grand Slam titles?", answer: true },
    { question: "Is the Super Bowl the championship game of the NBA?", answer: false },
    { question: "Did Usain Bolt set the world record for 100m in 9.58 seconds?", answer: true },
    { question: "Is golf played on a rectangular field?", answer: false },
    { question: "Did the New York Yankees win 27 World Series titles?", answer: true },
    { question: "Is the Tour de France a marathon race?", answer: false },
    { question: "Did the Chicago Cubs win the World Series in 2016?", answer: true },
  ],
  History: [
    { question: "Did the Roman Empire fall in 476 AD?", answer: true },
    { question: "Was the Declaration of Independence signed in 1776?", answer: true },
    { question: "Did World War II end in 1945?", answer: true },
    { question: "Was Napoleon Bonaparte exiled to Elba?", answer: true },
    { question: "Did the Cold War end in 1991?", answer: true },
    { question: "Was the Great Wall of China built in the 20th century?", answer: false },
    { question: "Did the Renaissance begin in Italy?", answer: true },
    { question: "Was the Berlin Wall torn down in 1989?", answer: true },
    { question: "Did the American Civil War end in 1865?", answer: true },
    { question: "Was Cleopatra the last pharaoh of Egypt?", answer: true },
  ],
  Geography: [
    { question: "Is Mount Everest the tallest mountain in the world?", answer: true },
    { question: "Is the Amazon River the longest river in the world?", answer: false },
    { question: "Is Africa the largest continent?", answer: false },
    { question: "Is the Sahara Desert the largest desert?", answer: true },
    { question: "Is Australia both a country and a continent?", answer: true },
    { question: "Is the Nile River located in South America?", answer: false },
    { question: "Is the Great Barrier Reef located in Australia?", answer: true },
    { question: "Is Antarctica the coldest place on Earth?", answer: true },
    { question: "Is Russia the largest country by land area?", answer: true },
    { question: "Is the Dead Sea the lowest point on Earth?", answer: true },
  ]
};

const TriviaPage: React.FC = () => {
  const router = useIonRouter();
  const { incrementGamesPlayed, updateHighScore } = useGame();

  const [category, setCategory] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (userChoice: boolean) => {
    const correctAnswer = QUIZ_DATA[category!][index].answer;
    let currentScore = score;
    
    if (userChoice === correctAnswer) {
      currentScore = score + 1;
      setScore(currentScore);
    }

    if (index + 1 < QUIZ_DATA[category!].length) {
      setIndex(index + 1);
    } else {
      setIsFinished(true);
      incrementGamesPlayed();
      updateHighScore(currentScore);
    }
  };

  // 1. Topic Selection Screen
  if (!category) {
    return (
      <IonPage>
        <IonContent className="trivia-bg">
          <div className="center-header">
            <h1 className="neon-text">Pick a Topic</h1>
          </div>
          <div className="category-list">
            {Object.keys(QUIZ_DATA).map((cat) => (
              <IonCard key={cat} className="topic-card" onClick={() => setCategory(cat)}>
                <IonCardContent>
                  <h2 className="topic-text">{cat}</h2>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </IonContent>
      </IonPage>
    );
  }


if (isFinished) {
  return (
    <IonPage>
      <IonContent className="trivia-bg">
        <div className="center-box">
          <h1 className="neon-text">Quiz Complete!</h1>
          <IonText color="primary">
            <h2 className="final-score">You got {score} / {QUIZ_DATA[category!].length}</h2>
          </IonText>
          
          <IonButton 
            expand="block" 
            className="cyber-button" 
            onClick={() => {
              setCategory(null);
              setIndex(0);
              setScore(0);
              setIsFinished(false);
              router.push('/tabs/games');
            }}
          >
            Return to Games
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

  return (
    <IonPage>
      <IonContent className="trivia-bg">
        <div className="progress-bar">
          <p>Question {index + 1} of {QUIZ_DATA[category].length}</p>
        </div>
        
        <div className="question-container">
          <IonCard className="question-card">
            <IonCardContent>
              <h2 className="question-text">{QUIZ_DATA[category][index].question}</h2>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="answer-row">
          <IonButton color="success" className="ans-btn" onClick={() => handleAnswer(true)}>YES</IonButton>
          <IonButton color="danger" className="ans-btn" onClick={() => handleAnswer(false)}>NO</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TriviaPage;