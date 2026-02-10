import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Life from './pages/Life'
import Projects from './pages/Projects'
import Vision from './pages/Vision'
import Bvat from './pages/Bvat'
import Hackathon from './pages/Hackathon'
import July from './pages/July'
import Spyder from './pages/Spyder'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/life" element={<Life />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/bvat" element={<Bvat />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/july" element={<July />} />
          <Route path="/spyder" element={<Spyder />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
