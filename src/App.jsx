import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro          from './components/Intro'
import Hero           from './components/Hero'
import About          from './components/About'
import Rooms          from './components/Rooms'
import Amenities      from './components/Amenities'
import Gallery        from './components/Gallery'
import Testimonials   from './components/Testimonials'
import Footer         from './components/Footer'
import RoomsPage      from './pages/RoomsPage'
import RoomDetailPage from './pages/RoomDetailPage'
import BookingPage    from './pages/BookingPage'
import DiningPage     from './pages/DiningPage'
import MyOrdersPage   from './pages/MyOrdersPage'
import GalleryPage    from './pages/GalleryPage'
import AdminPage      from './pages/AdminPage'
import ScrollToTop    from './components/ScrollToTop'
import './App.css'

function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])
  return (
    <>
      {!introDone && <Intro onComplete={handleIntroDone} />}
      <Hero />
      <About />
      <Rooms />
      <Gallery />
      <Testimonials />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/rooms"          element={<RoomsPage />} />
        <Route path="/rooms/:slug"    element={<RoomDetailPage />} />
        <Route path="/book/:slug"     element={<BookingPage />} />
        <Route path="/dining"         element={<DiningPage />} />
        <Route path="/my-orders"      element={<MyOrdersPage />} />
        <Route path="/gallery"        element={<GalleryPage />} />
        <Route path="/admin"          element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
