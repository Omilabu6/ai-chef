import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import PageTransition from '../components/PageTransition'

export default function Success() {
  const navigate = useNavigate()
  const { data, reset } = useApp()

  return (
    <PageTransition>
      <div style={{
        minHeight: '100%',
        background: 'linear-gradient(160deg, #8B0000 0%, #6B0000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(30px, 5vw, 80px)',
        textAlign: 'center',
        gap: 24,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>

        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          style={{ fontSize: 80 }}
        >
          🎉
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(28px, 6vw, 56px)',
            color: 'white',
            margin: 0,
            lineHeight: 1.2
          }}>
            You're now part<br />of the Addme<br />Chef Family!
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(15px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          Thank you, Chef {data.name}!<br />
          We'll reach out to you soon with<br />
          your ambassador details. 🍴
        </motion.p>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span style={{ color: 'white', fontWeight: 900, fontSize: 24, fontFamily: 'Nunito' }}>Addme</span>
          <span style={{ background: '#B8F568', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 8px', borderRadius: 4, letterSpacing: 1.5 }}>SEASONING</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
            Add me to your SIGNATURE meals.
          </span>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            reset()
            navigate('/')
          }}
          style={{
            background: '#B8F568', color: '#1A1A1A',
            borderRadius: 999, padding: '16px 48px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 900,
            fontSize: 17, border: 'none', cursor: 'pointer'
          }}
        >
          Back to Home
        </motion.button>
      </div>
    </PageTransition>
  )
}
