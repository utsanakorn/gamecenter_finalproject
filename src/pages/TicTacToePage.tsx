import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonModal, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useGame } from '../context/GameContext';
import './TicTacToePage.css';


const TicTacToePage: React.FC = () => {

  // Board state (9 cells)
  const [board, setBoard] = useState(Array(9).fill(null));

  // Tracks whose turn it is (true = X, false = O)
  const [isXTurn, setIsXTurn] = useState(true);

  // GameContext integration, stast
  const { incrementGamesPlayed, updateWinRate, updateHighScore } = useGame();

  // Tracks if stats have been updated for current game to prevent multiple updates on re-render
  const [gameEnded, setGameEnded] = useState(false);

  // Card pop up when game ends
  const [showResult, setShowResult] = useState(false);

  /**
   * handleClick
   * Handles user clicking a cell on the board
   * 
   * @param index - position on the board (0–8)
   */
  const handleClick = (index: number) => {

    // Prevents clicking if cell in the board is already filled OR game already won
    if (board[index] || calculateWinner(board) || gameEnded) return;

    // Create a copy of the board
    const newBoard = [...board];

    // Set value based on current turn
    newBoard[index] = isXTurn ? 'X' : 'O';

    // Update board state
    setBoard(newBoard);

    // Switch turn
    setIsXTurn(!isXTurn);
  };

  // Determine winner if someone wins
  const winner = calculateWinner(board);

  // Checks for draw (no winner and board is full)
  const isDraw = !winner && board.every(cell => cell !== null);

  /**
   * resetGame
   * Resets game state
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameEnded(false); // allow stats to update again when game ends
    setShowResult(false); // close modal if open
  };

  /**
   * GAME END Handling
   * 
   * Runs when someone wins OR game is a draw.
   * Updates:
   * - games played
   * - win rate (assumes player is X)
   * - high score
   */
  useEffect(() => {
    if ((winner || isDraw) && !gameEnded) {
      incrementGamesPlayed();

      // Only update win rate if there is a winner
      if (winner) {
        updateWinRate(winner === 'X');
      }

      updateHighScore(1);

      setGameEnded(true);
      setShowResult(true); // show result card
    }
  }, [winner, isDraw, gameEnded, incrementGamesPlayed, updateWinRate, updateHighScore]);

  return (
    <IonPage>

      {/* Quit/Back button */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/tabs/games' />
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      {/* Main Content */}
      <IonContent className="tic-container">

        {/* Display game status */}
          <h2 className="game-status">
            {!gameEnded && `Turn: ${isXTurn ? 'X' : 'O'}`}
          </h2>

        {/* Game Board */}
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className="cell"
              onClick={() => handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <IonButton className="restart-btn gradient-btn" onClick={resetGame}>
          Restart
        </IonButton>

        {/* Result Modal */}
        <IonModal isOpen={showResult} backdropDismiss={false}>
          <div className="result-card">
            <h2>
              {winner 
                ? `Winner: ${winner}` 
                : "It's a draw!"}
            </h2>

            <IonButton 
              className="restart-btn gradient-btn"
              onClick={() => {
                resetGame();
              }}
            >
              Play Again
            </IonButton>
          </div>
        </IonModal>

      </IonContent>

    </IonPage>
  );
};


/**
 * WINNER CALCULATION
 * calculateWinner
 * Checks all winning combinations on the board
 * 
 * @param board - current game board array
 * @returns 'X', 'O', or null
 */
function calculateWinner(board: any[]) {

  // All possible winning combinations
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],   // rows
    [0,3,6],[1,4,7],[2,5,8],   // columns
    [0,4,8],[2,4,6],           // diagonals
  ];

  // Check each combination
  for (let line of lines) {
    const [a,b,c] = line;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

export default TicTacToePage;