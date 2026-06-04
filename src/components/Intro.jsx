import { useEffect, useState } from 'react'
import logoImg from '../assets/logo.jpeg'
import './Intro.css'

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState('enter') // enter → hold → exit

  useEffect(() => {
    const holdTimer  = setTimeout(() => setPhase('exit'),    2000)
    const doneTimer  = setTimeout(() => onComplete(),        2900)
    return () => { clearTimeout(holdTimer); clearTimeout(doneTimer) }
  }, [onComplete])

  return (
    <div className={`intro-screen intro-${phase}`}>
      <div className="intro-logo-wrap">
        <img src={logoImg} alt="Landmark Pallavaa" className="intro-logo" />
        <div className="intro-line" />
      </div>
    </div>
  )
}
