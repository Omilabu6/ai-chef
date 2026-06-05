import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { getPersona, generateChefId } from '../utils/persona'
import { MdRestaurant, MdPalette, MdCake, MdFastfood, MdSchool, MdNature, MdDinnerDining, MdOpacity, MdFlashOn, MdRecycling, MdArtTrack, MdMenuBook, MdFavoriteBorder } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'

const QUESTIONS = {
  1: {
    label: 'QUESTION 1',
    text: 'What type of chef are you?',
    field: 'q1',
    options: [
      { label: 'Traditional Chef', icon: MdRestaurant },
      { label: 'Creative Chef', icon: MdPalette },
      { label: 'Pastry Chef', icon: MdCake },
      { label: 'Street Food Expert', icon: MdFastfood },
      { label: 'Culinary Educator', icon: MdSchool },
      { label: 'Healthy Food Chef', icon: MdNature },
    ],
  },
  2: {
    label: 'QUESTION 2',
    text: 'What matters most in your cooking?',
    field: 'q2',
    options: [
      { label: 'Taste', icon: MdDinnerDining },
      { label: 'Aroma', icon: MdOpacity },
      { label: 'Creativity', icon: MdPalette },
      { label: 'Presentation', icon: MdArtTrack },
      { label: 'Speed', icon: MdFlashOn },
      { label: 'Consistency', icon: MdRecycling },
    ],
  },
  3: {
    label: 'QUESTION 3',
    text: 'What do people remember most about your food?',
    field: 'q3',
    options: [
      { label: 'Rich Flavour', icon: MdDinnerDining },
      { label: 'Great Aroma', icon: MdOpacity },
      { label: 'Beautiful Presentation', icon: MdPalette },
      { label: 'Signature Recipes', icon: MdMenuBook },
      { label: 'Comfort Food', icon: MdFavoriteBorder },
      { label: 'Unique Recipes', icon: MdFlashOn },
    ],
  },
}

export default function Question() {
  const { num } = useParams()
  const qNum = parseInt(num)
  const navigate = useNavigate()
  const { data, update } = useApp()
  const q = QUESTIONS[qNum]

  const fieldValue = data[q?.field] || null
  const [selected, setSelected] = useState(fieldValue)

  if (!q) return null

  const totalDots = 3
  const activeDot = qNum

  function handleContinue() {
    if (!selected) return
    const updateData = { [q.field]: selected }

    if (qNum === 3) {
      const persona = getPersona(data.q2, selected)
      const chefId = data.chefId || generateChefId()
      update({ ...updateData, persona, chefId })
      navigate('/generating')
    } else {
      update(updateData)
      navigate(`/question/${qNum + 1}`)
    }
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', background: '#FAF6F1', display: 'flex', flexDirection: 'column' }}>
        <Header />


        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(16px, 3vw, 48px) clamp(20px, 5vw, 40px) 40px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 760,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 2,
                color: '#8B0000'
              }}>{q.label}</span>
              <div className="progress-dots">
                {Array.from({ length: totalDots }).map((_, i) => (
                  <div key={i} className={`dot ${i + 1 === activeDot ? 'active' : ''}`} />
                ))}
              </div>
            </div>


            <motion.h2
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(24px, 4vw, 38px)',
                color: '#8B0000',
                margin: 0,
                lineHeight: 1.25,
                textAlign: 'center'
              }}
            >
              {q.text}
            </motion.h2>



            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 14,
              }}
            >
              {q.options.map((opt) => {
                const IconComponent = opt.icon
                return (
                  <button
                    key={opt.label}
                    className={`option-card ${selected === opt.label ? 'selected' : ''}`}
                    onClick={() => setSelected(opt.label)}
                  >
                    <div className="icon-circle">
                      <IconComponent style={{ fontSize: 18 }} />
                    </div>
                    <span>{opt.label}</span>
                  </button>
                )
              })}
            </motion.div>

            <motion.button
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="btn-primary"
              onClick={handleContinue}
              disabled={!selected}
            >
              Continue →
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}