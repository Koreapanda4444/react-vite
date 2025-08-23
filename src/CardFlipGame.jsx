import './CardFlipGame.css';
import { useState } from 'react';

const initialCards = () => {
    const arr = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'];
    return arr
        .map((v) => ({ value: v, id: Math.random() }))
        .sort(() => Math.random() - 0.5);
};

function CardFlipGame() {
    const [cards, setCards] = useState(initialCards());
    const [opened, setOpened] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);

    const handleClick = (idx) => {
        if (opened.length === 2 || opened.includes(idx) || matched.includes(cards[idx].value)) return;
        setOpened([...opened, idx]);
        if (opened.length === 1) {
            setMoves(moves + 1);
            const first = cards[opened[0]];
            const second = cards[idx];
            if (first.value === second.value) {
                setMatched([...matched, first.value]);
                setTimeout(() => setOpened([]), 700);
            } else {
                setTimeout(() => setOpened([]), 700);
            }
        }
    };

    const restart = () => {
        setCards(initialCards());
        setOpened([]);
        setMatched([]);
        setMoves(0);
    };

    return (
        <div className="cardflip-container">
            <h1>카드 뒤집기 게임</h1>
            <div className="cards">
                {cards.map((card, idx) => {
                    const isOpen = opened.includes(idx) || matched.includes(card.value);
                    return (
                        <div
                            key={card.id}
                            className={`card ${isOpen ? "open" : ""}`}
                            onClick={() => handleClick(idx)}
                        >
                            {isOpen ? card.value : "?"}
                        </div>
                    );
                })}
            </div>
            <div className="moves">이동 수: {moves}</div>
            {matched.length === 4 && (
                <div className="result">
                    <span>🎉 성공!</span>
                    <button onClick={restart}>다시하기</button>
                </div>
            )}
        </div>
    );
}

export default CardFlipGame;