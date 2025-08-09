import "./Flag.css";

function Flag() {
    return (
        <div className="container">
            <div><h2>국기 맞추기</h2></div>
            <div><img src="/img/0.png" /></div>
            <div>답?</div>
            <div>횟수:</div>
            <div>
                <input />
                <button className="btn">확인</button>
            </div>
        </div>
    )
}

export default Flag