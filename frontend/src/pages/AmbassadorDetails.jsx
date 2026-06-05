import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { FaGlassCheers, FaUtensils, FaStar, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function AmbassadorDetails() {
  const navigate = useNavigate()
  const { data, update } = useApp()
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    instagram: '',
    city: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit() {
    const { fullName, phone, email, city } = form
    if (!fullName || !phone || !email || !city) {
      setError('Please fill in all required fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    const ambassadors = JSON.parse(localStorage.getItem('ai_chef_ambassadors') || '[]')
    ambassadors.push({
      ...form,
      chefName: data.name,
      persona: data.persona?.title,
      chefId: data.chefId,
      submittedAt: new Date().toISOString(),
    })
    localStorage.setItem('ai_chef_ambassadors', JSON.stringify(ambassadors))

    setSubmitted(true)
    setTimeout(() => navigate('/success'), 2000)
  }

  if (submitted) {
    return (
      <PageTransition>
        <div style={{
          minHeight: '100%', background: '#FAF6F1',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 24, textAlign: 'center', gap: 20
        }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            style={{ fontSize: 80 }}
          >
            <FaPartyPopper style={{ color: '#8B0000' }} />
          </motion.div>
          <h2 style={{
            fontFamily: 'Nunito, sans-serif', fontWeight: 900,
            fontSize: 26, color: '#8B0000', margin: 0
          }}>
            Welcome to the<br />Addme Family!
          </h2>
          <p style={{ fontFamily: 'Nunito', color: '#666', fontSize: 15, lineHeight: 1.5 }}>
            We'll be in touch soon, Chef {data.name}! <FaUtensils style={{ display: 'inline', marginLeft: 4 }} />
          </p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100%', background: '#FAF6F1', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div style={{ padding: 'clamp(8px, 3vw, 30px) clamp(20px, 5vw, 40px) 40px', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: '1000px', margin: '0 auto', width: '100%' }}>


          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4
            }}>
              <span style={{
                fontFamily: 'Nunito', fontWeight: 800, fontSize: 12,
                letterSpacing: 2, color: '#555', textTransform: 'uppercase'
              }}>AMBASSADOR DETAILS</span>
              <FaStar style={{ color: '#B8F568', fontSize: 12 }} />
            </div>



            <h2 style={{
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 26,
              color: '#8B0000', margin: 0
            }}>
              Let's get to know you<br />better!
            </h2>
          </motion.div>


          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {[
              { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', icon: FaUser, type: 'text' },
              { name: 'phone', label: 'Phone', placeholder: '08133906655', icon: FaPhone, type: 'tel' },
              { name: 'email', label: 'Email', placeholder: 'johndoe@gmail.com', icon: FaEnvelope, type: 'email' },
              { name: 'instagram', label: 'Instagram @handle', placeholder: 'addmeseasoning', icon: '@', type: 'text' },
              { name: 'city', label: 'City / Zone', placeholder: 'Lagos, Nigeria', icon: FaMapMarkerAlt, type: 'text' },
            ].map((field) => (
              <div key={field.name}>
                <label style={{
                  fontFamily: 'Nunito', fontWeight: 700, fontSize: 14,
                  color: '#333', display: 'block', marginBottom: 6
                }}>{field.label}</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                    fontSize: field.icon === '@' ? 16 : 16, color: '#999'
                  }}>
                    {typeof field.icon === 'string' ? field.icon : <field.icon />}
                  </span>
                  <input
                    name={field.name}
                    type={field.type}
                    className="input-field"
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    style={{ paddingLeft: 42 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {error && (
            <p style={{ color: '#8B0000', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700 }}>{error}</p>
          )}


          <motion.button
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="btn-primary"
            onClick={handleSubmit}
          >
            Submit →
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
