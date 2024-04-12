import { useState } from 'react';
import Box from './Components/Box';
import './Stylings/App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Start Player : X');
  const [winner, setWinner] = useState(null); // Manage the winner in the state
  const [tie, setTie] = useState(false);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || winner || tie) return; // Check if there's already a winner
    const nextSquares = squares.slice();
    nextSquares[i] = isX ? 'X' : 'O';
    const newWinner = calculateWinner(nextSquares);
    setWinner(newWinner); // Update the winner in the state
    setStatusMessage(newWinner ? `Winner: ${newWinner}` : `Next Player: ${isX ? 'O' : 'X'}`);
    setSquares(nextSquares);
    setIsX(!isX);
    const filled = squares.filter(Boolean).length;
    if (filled === squares.length-1) {
      setStatusMessage('Tie Between X & O')
      setTie(true);
    }
  }

  function calculateWinner(squares) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  return (
    <>
      <div className='gameContainer'>
        <div id='statusMessage'>{statusMessage}</div>
        <div className='boxContainer'>
          {squares.map((square, i) => (
            <Box key={i} onSquareClick={() => handleClick(i)} value={square} />
          ))}
        </div>
        {(winner || tie) && <button className="RestartBtn" onClick={() => window.location.reload()}>Play Again!</button>}
      </div>
    </>
  );
}

export default App;
