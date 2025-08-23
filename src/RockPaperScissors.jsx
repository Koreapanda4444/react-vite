import './RockPaperScissors.css';
import { useState } from 'react';

function RockPaperScissors() {
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [score, setScore] = useState({ player: 0, computer: 0 });
    const [gameHistory, setGameHistory] = useState([]);

    const choices = ['가위', '바위', '보'];
    const emojis = { '가위': '✂️', '바위': '🗿', '보': '📄' };

    const playGame = (playerSelection) => {
        const computerSelection = choices[Math.floor(Math.random() * 3)];
        setPlayerChoice(playerSelection);
        setComputerChoice(computerSelection);

        let gameResult = '';
        if (playerSelection === computerSelection) {
            gameResult = '무승부!';
        } else if (
            (playerSelection === '가위' && computerSelection === '보') ||
            (playerSelection === '바위' && computerSelection === '가위') ||
            (playerSelection === '보' && computerSelection === '바위')
        ) {
            gameResult = '승리!';
            setScore(prev => ({ ...prev, player: prev.player + 1 }));
        } else {
            gameResult = '패배!';
            setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        }

        setResult(gameResult);
        setGameHistory(prev => [...prev, {
            player: playerSelection,
            computer: computerSelection,
            result: gameResult
        }].slice(-5));
    };

    const resetGame = () => {
        setPlayerChoice('');
        setComputerChoice('');
        setResult('');
        setScore({ player: 0, computer: 0 });
        setGameHistory([]);
    };

    return (
        <div className="rps-container">
            <h1>🎮 가위바위보 게임</h1>
            
            <div className="score-board">
                <div className="score">
                    <span>플레이어: {score.player}</span>
                    <span>컴퓨터: {score.computer}</span>
                </div>
            </div>

            <div className="game-area">
                <div className="choices">
                    <div className="player-section">
                        <h3>플레이어</h3>
                        <div className="choice-display">
                            {playerChoice ? emojis[playerChoice] : '❓'}
                        </div>
                        <p>{playerChoice || '선택해주세요'}</p>
                    </div>

                    <div className="vs">VS</div>

                    <div className="computer-section">
                        <h3>컴퓨터</h3>
                        <div className="choice-display">
                            {computerChoice ? emojis[computerChoice] : '❓'}
                        </div>
                        <p>{computerChoice || '대기중...'}</p>
                    </div>
                </div>

                {result && (
                    <div className={`result ${result === '승리!' ? 'win' : result === '패배!' ? 'lose' : 'draw'}`}>
                        <h2>{result}</h2>
                    </div>
                )}
            </div>

            <div className="buttons">
                {choices.map(choice => (
                    <button 
                        key={choice}
                        className="choice-btn"
                        onClick={() => playGame(choice)}
                    >
                        <span className="emoji">{emojis[choice]}</span>
                        <span>{choice}</span>
                    </button>
                ))}
            </div>

            <button className="reset-btn" onClick={resetGame}>
                게임 초기화
            </button>

            {gameHistory.length > 0 && (
                <div className="history">
                    <h3>최근 게임 기록</h3>
                    <div className="history-list">
                        {gameHistory.map((game, index) => (
                            <div key={index} className="history-item">
                                <span>{emojis[game.player]} vs {emojis[game.computer]}</span>
                                <span className={game.result === '승리!' ? 'win' : game.result === '패배!' ? 'lose' : 'draw'}>
                                    {game.result}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RockPaperScissors;