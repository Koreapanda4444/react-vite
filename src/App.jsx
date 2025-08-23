import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './Layout';
import Home from "./Home";
import About from "./About";
import Flag from "./Flag";
import RacingGame from "./RacingGame";
import Lotto from "./Lotto";
import SelfIntro from "./SelfIntro";
import Floating from "./Floating";
import Pacman from "./Pacman";
import Univ from "./Univ";
import Tetris from "./Tetris";
import RockPaperScissors from "./RockPaperScissors";
import NumberGuess from "./NumberGuess";
import QuizGame from "./QuizGame";
import CardFlipGame from "./CardFlipGame";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="About" element={<About />} />
            <Route path="Flag" element={<Flag />} />
            <Route path="racing" element={<RacingGame />} />
            <Route path="lotto" element={<Lotto />} />
            <Route path="intro" element={<SelfIntro />} />
            <Route path="pacman" element={<Pacman />} />
            <Route path="Univ" element={<Univ />} />
            <Route path="tetris" element={<Tetris />} />
            <Route path="rps" element={<RockPaperScissors />} />
            <Route path="numberguess" element={<NumberGuess />} />
            <Route path="quiz" element={<QuizGame />} />
            <Route path="cardflip" element={<CardFlipGame />} />
          </Route>
        </Routes>
        <Floating />
      </BrowserRouter>
    </>
  )
}

export default App