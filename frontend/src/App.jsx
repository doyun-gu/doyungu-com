import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './pages/About'
import Life from './pages/Life'
import Project from './pages/Projects'
import Vision from './pages/Vision'
import Home from './pages/Home'
import Bvat from './pages/bvat'
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
          <Route path="/project" element={<Project />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/bvat" element={<Bvat />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
