import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Explore from './pages/Explore'
import VTuberDetail from './pages/VTuberDetail'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/v/:id" element={<VTuberDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
