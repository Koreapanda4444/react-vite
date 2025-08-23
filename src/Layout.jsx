import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

function Layout() {
    return (
      <div>
        <nav>
            <div className="tit">React Study</div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">친구</Link></li>
                <li><Link to="/Flag">국기</Link></li>
                <li><Link to="/racing">레이싱게임</Link></li>
                <li><Link to="/lotto">로또</Link></li>
                <li><Link to="/intro">자기소개</Link></li>
                <li><Link to="/pacman">팩맨</Link></li>
                <li><Link to="/Univ">대학</Link></li>
                <li><Link to="/tetris">테트리스</Link></li>
                <li><Link to="/rps">가위바위보</Link></li>
                <li><Link to="/numberguess">숫자맞추기</Link></li>
                <li><Link to="/quiz">퀴즈게임</Link></li>
                <li><Link to="/cardflip">카드뒤집기</Link></li>
            </ul>
            <div>#</div>
        </nav>
        <main>
            <Outlet />
        </main>
      </div>
    )
}

export default Layout