import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Landing from './pages/Landing'
import Upload from './pages/Upload'
import Question from './pages/Question'
import Generating from './pages/Generating'
import Card from './pages/Card'
import Share from './pages/Share'
import AmbassadorPrompt from './pages/AmbassadorPrompt'
import AmbassadorMaybeLater from './pages/AmbassadorMaybeLater'
import AmbassadorDetails from './pages/AmbassadorDetails'
import Success from './pages/Success'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/question/:num" element={<Question />} />
        <Route path="/generating" element={<Generating />} />
        <Route path="/card" element={<Card />} />
        <Route path="/share" element={<Share />} />
        <Route path="/ambassador" element={<AmbassadorPrompt />} />
        <Route path="/ambassador/maybe-later" element={<AmbassadorMaybeLater />} />
        <Route path="/ambassador/details" element={<AmbassadorDetails />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
