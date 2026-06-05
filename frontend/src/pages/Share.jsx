import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import ChefCard from '../components/ChefCard'

export default function Share() {
  const navigate = useNavigate()
  const { data, update } = useApp()

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

  async function downloadCard() {
    try {
      const el = document.getElementById('chef-card')
      if (!el) return
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
      script.onload = async () => {
        const canvas = await window.html2canvas(el, { scale: 2, useCORS: true })
        const link = document.createElement('a')
        link.download = `chef-${data.name || 'id'}.png`
        link.href = canvas.toDataURL()
        link.click()
      }
      document.head.appendChild(script)
    } catch {
      alert('Right-click the card and save as image.')
    }
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100%', background: '#FAF6F1', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div style={{ padding: 'clamp(20px, 5vw, 40px) 20px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', marginTop: 20 }}>
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 10,
              color: '#8B0000',
              margin: 0,
              letterSpacing: 1
            }}>SHARE YOUR CHEF IDENTITY</h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 12,
              color: '#999',
              margin: '4px 0 0',
              letterSpacing: 1.5,
              textTransform: 'uppercase'
            }}>SHOW THE WORLD YOUR CULINARY PERSONALITY</p>
          </motion.div>

          <div style={{ position: 'absolute', top: 120, left: 16, color: '#B8F568', fontSize: 16, opacity: 0.6 }}>✦</div>
          <div style={{ position: 'absolute', top: 160, right: 20, color: '#B8F568', fontSize: 20, opacity: 0.5 }}>✦</div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ChefCard data={data} />
          </motion.div>


          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
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
            ><img src="/whatsapp-icon.svg" style={{ width: 20, height: 20 }} />WhatsApp</button>
            <button
              onClick={shareInstagram}
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                color: 'white', borderRadius: 999, padding: '13px 8px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: 14, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            ><img src="/instagram-icon.svg" style={{ width: 20, height: 20 }} /> Instagram</button>
            <button
              onClick={shareFacebook}
              style={{
                background: '#1877F2', color: 'white',
                borderRadius: 999, padding: '13px 8px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: 14, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            ><img src="/facebook-icon.svg" style={{ width: 20, height: 20 }} /> Facebook</button>
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
