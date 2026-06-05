import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { FaCamera, FaTimes, FaCheck } from 'react-icons/fa'

export default function Upload() {
  const navigate = useNavigate()
  const { data, update } = useApp()
  const [photo, setPhoto] = useState(data.photo || null)
  const [name, setName] = useState(data.name || '')
  const [agreed, setAgreed] = useState(data.agreedToTerms || false)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef()
  const videoRef = useRef()
  const streamRef = useRef()

  const canContinue = photo && name.trim().length > 0 && agreed

  function handleNameChange(e) {
    let val = e.target.value.replace(/ /g, '').toUpperCase()
    setName(val)
    setError('')
  }

  function handleNameKeyDown(e) {
    if (e.key === ' ') e.preventDefault()
  }

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhoto(ev.target.result)
      stopCamera()
    }
    reader.readAsDataURL(file)
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      streamRef.current = stream
      setCameraActive(true)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      }, 100)
    } catch {
      setError('Camera not available. Please upload a photo instead.')
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setCameraActive(false)
  }

  function takeSelfie() {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    setPhoto(canvas.toDataURL('image/jpeg', 0.85))
    stopCamera()
  }

  function handleContinue() {
    if (!canContinue) {
      if (!photo) setError('Please add a photo.')
      else if (!name.trim()) setError('Please enter your first name.')
      else if (!agreed) setError('Please agree to the Terms & Conditions.')
      return
    }
    update({ photo, name: name.trim(), agreedToTerms: agreed })
    navigate('/question/1')
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100%', background: '#FAF6F1', display: 'flex', flexDirection: 'column' }}>
        <Header />


        {cameraActive && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 50,
            background: '#000', display: 'flex', flexDirection: 'column'
          }}>


            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />



            </div>


            <div style={{
              background: 'rgba(0,0,0,0.8)', padding: '20px 16px 32px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ width: 72 }} />


              <button
                onClick={takeSelfie}
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'white', border: 'none',
                  cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.92)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              >
                <FaCamera style={{ fontSize: 32, color: '#000' }} />
              </button>


              <button
                onClick={stopCamera}
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(139,0,0,0.8)', border: '2px solid rgba(139,0,0,1)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', backdropFilter: 'blur(10px)'
                }}
              >
                <FaTimes style={{ fontSize: 24, color: 'white' }} />
              </button>
            </div>
          </div>
        )}

        <div style={{ padding: 'clamp(8px, 3vw, 30px) clamp(20px, 5vw, 40px) 32px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1, maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <motion.h2
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 26,
              color: '#8B0000',
              textAlign: 'center',
              margin: 0
            }}
          >
            Let's start with your<br />photo and name
          </motion.h2>


          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            {!photo && error?.includes('photo') && (
              <span style={{ color: '#8B0000', fontSize: 12, fontFamily: 'Nunito', fontWeight: 700 }}>* Required</span>
            )}
            <div style={{ position: 'relative' }}>
              <div
                onClick={photo ? undefined : startCamera}
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: photo ? 'transparent' : '#E8F5E9',
                  border: '3px dashed #B8F568',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: photo ? 'default' : 'pointer',
                  position: 'relative'
                }}
              >
                {photo ? (
                  <img src={photo} alt="Your photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                      <rect width="52" height="52" rx="26" fill="#C8E6C9" />
                      <path d="M26 16C22.7 16 20 18.7 20 22C20 25.3 22.7 28 26 28C29.3 28 32 25.3 32 22C32 18.7 29.3 16 26 16ZM16 36C16 31.6 20.5 28 26 28C31.5 28 36 31.6 36 36" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="26" cy="22" r="5" stroke="#2E7D32" strokeWidth="2" />
                    </svg>
                  </div>
                )}

                <div style={{ position: 'absolute', top: -8, left: -8, fontSize: 18 }}>🌿</div>
                <div style={{ position: 'absolute', bottom: -4, right: -8, fontSize: 18 }}>🌿</div>
              </div>


              <div style={{
                position: 'absolute', bottom: 8, right: -8,
                background: '#8B0000', color: 'white',
                borderRadius: 8, padding: '3px 8px',
                fontSize: 10, fontWeight: 800, fontFamily: 'Nunito, sans-serif',
                letterSpacing: 0.5
              }}>CHEF ID</div>


              {photo && (
                <button
                  onClick={() => setPhoto(null)}
                  style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#8B0000', border: 'none',
                    color: 'white', cursor: 'pointer', fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >✕</button>
              )}
            </div>
          </motion.div>


          {!photo && (
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <button className="btn-danger" onClick={startCamera}>
                Take a selfie
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: '#DDD' }} />
                <span style={{ color: '#999', fontSize: 13, fontFamily: 'Nunito' }}>or</span>
                <div style={{ flex: 1, height: 1, background: '#DDD' }} />
              </div>
              <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                ↑ Upload photo
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
            </motion.div>
          )}


          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#333', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              Your First Name
              {!name.trim() && error?.includes('name') && <span style={{ color: '#8B0000', fontSize: 12 }}>* Required</span>}
            </label>
            <input
              className="input-field"
              placeholder="Enter your first name"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleNameKeyDown}
              maxLength={20}
              autoComplete="off"
            />
            <p style={{ fontSize: 11, color: '#999', marginTop: 4, fontFamily: 'Nunito' }}>
              No spaces allowed • Will appear on your Chef ID card
            </p>
          </motion.div>


          <motion.label
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                onClick={() => setAgreed(!agreed)}
                style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: agreed ? '#8B0000' : 'white',
                  border: `2px solid ${agreed ? '#8B0000' : '#DDD'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {agreed && <span style={{ color: 'white', fontSize: 14, fontWeight: 900 }}>✓</span>}
              </div>
              {!agreed && error?.includes('Terms') && <span style={{ color: '#8B0000', fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, marginLeft: 8 }}>* Required</span>}
            </div>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#555', flex: 1 }}>
              I agree to the{' '}
              <span style={{ color: '#8B0000', fontWeight: 700 }}>Terms &amp; Condition</span>
              {' '}and{' '}
              <span style={{ color: '#8B0000', fontWeight: 700 }}>Privacy Policy</span>
            </span>
          </motion.label>

          {error && (
            <p style={{ color: '#8B0000', fontSize: 13, fontFamily: 'Nunito', fontWeight: 600 }}>{error}</p>
          )}

          <motion.button
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="btn-primary"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue →
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
