import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Header from '../components/Header'

export default function Landing() {
  const navigate = useNavigate()
  const isMobile = window.innerWidth < 1024;

  return (
    <PageTransition>
      <div style={{
        minHeight: '100%',
        background: '#FAF6F1',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>

        <Header />


        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }} className="desktop-two-col">

          <div style={{
            padding: '36px 28px 0',
            textAlign: 'center',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(32px, 6vw, 56px)',
                color: '#8B0000',
                margin: 0,
                lineHeight: 1.15,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Discover Your Chef<br />Identity
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: 'clamp(14px, 2.5vw, 20px)',
                color: '#555',
                marginTop: 14,
                lineHeight: 1.6,
              }}
            >
              Upload your photo and answer 3 quick
              questions to generate your
              personalized AI Chef Card.
            </motion.p>


            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/upload')}
              style={{
                marginTop: 24,
                background: '#B8F568',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: 50,
                padding: '14px 0',
                width: '100%',
                maxWidth: '300px',
                alignSelf: 'center',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 16px rgba(139,195,74,0.35)',
              }}
            >
              Start →
            </motion.button>
          </div>


          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            style={{
              position: 'relative',
              margin: '40px auto 0',
              width: 'clamp(240px, 50vw, 420px)',
              height: 'clamp(240px, 50vw, 420px)',
              flex: 1,
            }}
          >

            <div style={{
              position: 'absolute',
              inset: -10,
              borderRadius: '50%',
              border: '2px dashed #B8F568',
              opacity: 0.6,
            }} />


            <div style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 28,
              height: 28,
              background: '#B8F568',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(139,195,74,0.4)',
            }}>
              ✦
            </div>


            <div style={{
              position: 'absolute',
              bottom: 10,
              left: -14,
              fontSize: 16,
              color: '#B8F568',
              zIndex: 2,
            }}>
              ✦
            </div>


            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#e8e0d8',
            }}>
              <img
                src="/landingFood.svg"
                alt="Signature dish"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>

          {isMobile && (
            <div style={{ marginTop: 'auto', lineHeight: 0 }}>
              <svg
                viewBox="0 0 400 80"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', display: 'block' }}
                preserveAspectRatio="none"
              >
                <path
                  d="M0,40 C80,80 160,0 240,40 C320,80 360,20 400,40 L400,80 L0,80 Z"
                  fill="#8B0000"
                />
              </svg>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  )
}