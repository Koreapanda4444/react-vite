import './QuizGame.css';
import { useState } from 'react';

const questions = [
    {
        q: "대한민국의 수도는?",
        a: ["서울", "부산", "대구", "인천"],
        correct: 0
    },
    {
        q: "HTML의 약자는?",
        a: ["HyperText Markup Language", "HighText Markup Language", "HyperText Markdown Language", "HyperTransfer Markup Language"],
        correct: 0
    },
    {
        q: "React는 어떤 언어 기반인가요?",
        a: ["Python", "JavaScript", "Java", "C#"],
        correct: 1
    }
];

function QuizGame() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (idx) => {
        setSelected(idx);
        if (idx === questions[step].correct) setScore(score + 1);
        setTimeout(() => {
            setSelected(null);
            if (step + 1 < questions.length) {
                setStep(step + 1);
            } else {
                setShowResult(true);
            }
        }, 700);
    };

    const restart = () => {
        setStep(0);
        setScore(0);
        setSelected(null);
        setShowResult(false);
    };

    return (
        <div className="quiz-container">
            <h1>퀴즈 게임</h1>
            {showResult ? (
                <div className="result">
                    <h2>점수: {score} / {questions.length}</h2>
                    <button onClick={restart}>다시하기</button>
                </div>
            ) : (
                <div>
                    <div className="question">{questions[step].q}</div>
                    <ul className="answers">
                        {questions[step].a.map((ans, idx) => (
                            <li
                                key={idx}
                                className={selected === idx ? (idx === questions[step].correct ? "correct" : "wrong") : ""}
                                onClick={() => selected === null && handleAnswer(idx)}
                            >
                                {ans}
                            </li>
                        ))}
                    </ul>
                    <div className="progress">{step + 1} / {questions.length}</div>
                </div>
            )}
        </div>
    );
}

export default QuizGame;