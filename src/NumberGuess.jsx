import './NumberGuess.css';
import { useState, useEffect } from 'react';

function NumberGuess() {
    const [targetNumber, setTargetNumber] = useState(0);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [gameHistory, setGameHistory] = useState([]);
    const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
    const [hint, setHint] = useState('1부터 100까지의 숫자를 맞춰보세요!');
    const [difficulty, setDifficulty] = useState('normal');
    const [maxAttempts, setMaxAttempts] = useState(10);
    const [range, setRange] = useState({ min: 1, max: 100 });

    const difficulties = {
        easy: { max: 50, attempts: 15 },
        normal: { max: 100, attempts: 10 },
        hard: { max: 200, attempts: 8 }
    };

    useEffect(() => {
        startNewGame();
        // eslint-disable-next-line
    }, [difficulty]);

    const startNewGame = () => {
        const diffConfig = difficulties[difficulty] || difficulties['normal'];
        const newTarget = Math.floor(Math.random() * diffConfig.max) + 1;
        setTargetNumber(newTarget);
        setGuess('');
        setAttempts(0);
        setGameHistory([]);
        setGameStatus('playing');
        setMaxAttempts(diffConfig.attempts);
        setRange({ min: 1, max: diffConfig.max });
        setHint(`1부터 ${diffConfig.max}까지의 숫자를 맞춰보세요! (${diffConfig.attempts}번의 기회)`);
    };

    const makeGuess = () => {
        const guessNum = parseInt(guess, 10);

        if (isNaN(guessNum) || guessNum < range.min || guessNum > range.max) {
            setHint(`${range.min}부터 ${range.max} 사이의 숫자를 입력해주세요!`);
            return;
        }

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        const result =
            guessNum === targetNumber
                ? 'correct'
                : guessNum < targetNumber
                ? 'low'
                : 'high';

        setGameHistory([
            ...gameHistory,
            {
                guess: guessNum,
                attempt: newAttempts,
                result: result
            }
        ]);

        if (guessNum === targetNumber) {
            setGameStatus('won');
            setHint(`🎉 정답입니다! ${newAttempts}번 만에 맞추셨네요!`);
        } else if (newAttempts >= maxAttempts) {
            setGameStatus('lost');
            setHint(`😭 게임 오버! 정답은 ${targetNumber}이었습니다.`);
        } else {
            const remainingAttempts = maxAttempts - newAttempts;
            if (guessNum < targetNumber) {
                setHint(`📈 더 큰 수입니다! (남은 기회: ${remainingAttempts}번)`);
            } else {
                setHint(`📉 더 작은 수입니다! (남은 기회: ${remainingAttempts}번)`);
            }
        }

        setGuess('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && gameStatus === 'playing') {
            makeGuess();
        }
    };

    const getScoreRating = () => {
        if (gameStatus !== 'won') return '';
        const percentage = (attempts / maxAttempts) * 100;
        if (percentage <= 30) return '🏆 완벽해요!';
        if (percentage <= 50) return '⭐ 훌륭해요!';
        if (percentage <= 70) return '👍 좋아요!';
        return '✅ 성공!';
    };

    return (
        <div className="number-guess-container">
            <h1>🔢 숫자 맞추기 게임</h1>

            <div className="difficulty-selector">
                <h3>난이도 선택</h3>
                <div className="difficulty-buttons">
                    {Object.entries(difficulties).map(([level, config]) => (
                        <button
                            key={level}
                            className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                            onClick={() => setDifficulty(level)}
                            disabled={gameStatus === 'playing' && attempts > 0}
                        >
                            {level === 'easy' ? '쉬움' : level === 'normal' ? '보통' : '어려움'}
                            <br />
                            <small>1-{config.max} ({config.attempts}번)</small>
                        </button>
                    ))}
                </div>
            </div>

            <div className="game-info">
                <div className="attempts-counter">
                    시도 횟수: {attempts} / {maxAttempts}
                </div>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${(attempts / maxAttempts) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="hint-area">
                <p className={`hint ${gameStatus}`}>{hint}</p>
                {gameStatus === 'won' && (
                    <p className="score-rating">{getScoreRating()}</p>
                )}
            </div>

            <div className="input-area">
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={`${range.min} - ${range.max}`}
                    min={range.min}
                    max={range.max}
                    disabled={gameStatus !== 'playing'}
                    className="guess-input"
                />
                <button
                    onClick={makeGuess}
                    disabled={gameStatus !== 'playing' || !guess}
                    className="guess-btn"
                >
                    추측하기
                </button>
            </div>

            <button onClick={startNewGame} className="new-game-btn">
                새 게임 시작
            </button>

            {gameHistory.length > 0 && (
                <div className="history">
                    <h3>게임 기록</h3>
                    <div className="history-list">
                        {gameHistory.map((entry, index) => (
                            <div key={index} className={`history-item ${entry.result}`}>
                                <span className="attempt-num">{entry.attempt}번째</span>
                                <span className="guess-num">{entry.guess}</span>
                                <span className="result">
                                    {entry.result === 'correct'
                                        ? '🎯 정답!'
                                        : entry.result === 'low'
                                        ? '📈 UP'
                                        : '📉 DOWN'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NumberGuess;