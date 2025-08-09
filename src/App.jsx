import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import About from './About.jsx'

function App() {

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App