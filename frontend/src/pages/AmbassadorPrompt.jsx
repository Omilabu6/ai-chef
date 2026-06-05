import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'

export default function AmbassadorPrompt() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{
        minHeight: '100%',
        background: '#FAF6F1',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(20px, 5vw, 50px)',
          gap: 28,
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          width: '100%'
        }}>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: 2,
              color: '#8B0000',
              textTransform: 'uppercase'
            }}
          >
            Chef Ambassador
          </motion.div>


          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 24,
              width: '100%',
              maxWidth: 320,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              position: 'relative'
            }}
          >
            <img
              src="/ambassador.jpg"
              alt="Chef Ambassador"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>


          <motion.h2
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 26,
              color: '#8B0000',
              margin: 0,
              lineHeight: 1.3
            }}
          >
            Would you like to<br />become an Addme<br />Chef Ambassador?
          </motion.h2>


          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate('/ambassador/details')}
            >
              Yes, I'm Interested →
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/ambassador/maybe-later')}
            >
              Maybe Later
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/')}
            >
              No, Thanks
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
