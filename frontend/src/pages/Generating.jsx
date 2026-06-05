import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

export default function Generating() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 3200

    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / duration) * 100, 99)
      setProgress(Math.floor(p))
      if (elapsed >= duration) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => navigate('/share'), 400)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <PageTransition>
      <div style={{
        minHeight: '100%',
        background: '#FAF6F1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 5vw, 60px)', gap: 28, width: '100%', maxWidth: '1100px', margin: '0 auto' }}>


          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 300,
              height: 240,
              background: 'linear-gradient(135deg, #E8F5E9 0%, #FFF9C4 50%, #E3F2FD 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src="/loadingImg.svg"
              alt="Chef Hat"
              style={{ width: 120, height: 120 }}
            />
          </motion.div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 26,
              color: '#8B0000',
              margin: 0,
              marginBottom: 8
            }}>
              Creating your unique<br />chef identity...
            </h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 14,
              color: '#888',
              margin: 0
            }}>
              This will only take a few seconds
            </p>
          </div>


          <div style={{ width: '100%', maxWidth: 340 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700, color: '#555' }}>
                Magical Mix in Progress
              </span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 900, color: '#555' }}>
                {progress}%
              </span>
            </div>
            <div style={{
              width: '100%', height: 10, background: '#E8E0D8',
              borderRadius: 99, overflow: 'hidden'
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #B8F568, #B8F568)',
                  borderRadius: 99
                }}
              />
            </div>
          </div>
        </div>


        <div style={{ width: '100%', height: 60, overflow: 'hidden' }}>
          <svg viewBox="0 0 430 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 30 Q107 0 215 30 Q322 60 430 30 L430 60 L0 60 Z" fill="#8B0000" />
          </svg>
        </div>
      </div>
    </PageTransition>
  )
}
