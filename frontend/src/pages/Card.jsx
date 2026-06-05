import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import ChefCard from '../components/ChefCard'

export default function Card() {
  const navigate = useNavigate()
  const { data, update } = useApp()
  const cardRef = useRef()

  async function downloadCard() {

    try {
      const el = document.getElementById('chef-card')
      if (!el) return
      const { default: html2canvas } = await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js')
      const canvas = await html2canvas(el, { scale: 2, useCORS: true })
      const link = document.createElement('a')
      link.download = `chef-${data.name || 'id'}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch {
      alert('Download: right-click the card and save as image.')
    }
  }

  function shareWhatsApp() {
    const text = `🍴 I'm *CHEF ${data.name}* – ${data.persona?.title}!\n"${data.persona?.quote}"\n\nGenerate your Chef ID: https://addmeseasoning.com`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  function shareInstagram() {
    navigator.clipboard?.writeText(`CHEF ${data.name} | ${data.persona?.title} | Addme Seasoning`)
    alert('Caption copied! Open Instagram to share your card screenshot.')
  }

  function shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://addmeseasoning.com')}`, '_blank')
  }

  function createAnother() {
    update({ photo: null, name: '', q1: null, q2: null, q3: null, persona: null, chefId: null, agreedToTerms: false })
    navigate('/upload')
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100%', background: '#FAF6F1', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div style={{ padding: 'clamp(20px, 5vw, 40px) 20px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 22,
              color: '#8B0000',
              marginTop: '20px',
            }}>
              YOUR CHEF IDENTITY CARD<br />IS READY 🎉
            </h2>
          </motion.div>


          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ChefCard ref={cardRef} data={data} />
          </motion.div>


          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, maxWidth: '600px', margin: '0 auto', width: '100%' }}
          >
            <button
              onClick={downloadCard}
              style={{
                background: '#8B0000', color: 'white',
                borderRadius: 999, padding: '13px 8px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: 14, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            >↓ Download</button>
            <button
              onClick={shareWhatsApp}
              style={{
                background: '#B8F568', color: 'white',
                borderRadius: 999, padding: '13px 8px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: 14, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            >💬 WhatsApp</button>
            <button
              onClick={shareInstagram}
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                color: 'white', borderRadius: 999, padding: '13px 8px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: 14, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            >📸 Instagram</button>
            <button
              onClick={shareFacebook}
              style={{
                background: '#1877F2', color: 'white',
                borderRadius: 999, padding: '13px 8px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: 14, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            >🌐 Facebook</button>
          </motion.div>


          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={createAnother}
            style={{
              color: '#8B0000',
              background: 'transparent', border: 'none',
              fontFamily: 'Nunito, sans-serif', fontWeight: 800,
              fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}
          >
            ↻ Create Another Card
          </motion.button>

          <button className="btn-primary" onClick={() => navigate('/ambassador')}>
            Continue →
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
