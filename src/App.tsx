import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import NotesList from './components/NotesList'
import NoteEditor from './components/NoteEditor'
import Contact from './components/Contact'

function Home() {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  )
}

function Notes() {
  return (
    <Routes>
      <Route index element={<NotesList />} />
      <Route path="new" element={<NoteEditor />} />
      <Route path=":id" element={<NoteEditor />} />
    </Routes>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/*" element={<Notes />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
