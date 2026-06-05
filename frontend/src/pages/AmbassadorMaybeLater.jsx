import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { FaStar, FaClock } from 'react-icons/fa'

export default function MaybeLater() {
    const navigate = useNavigate()

    return (
        <PageTransition>
            <div style={{ minHeight: '100%', background: '#FAF6F1', display: 'flex', flexDirection: 'column' }}>
                <Header />

                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: 'clamp(20px, 5vw, 50px)', textAlign: 'center', gap: 20,
                    maxWidth: '1000px', margin: '0 auto', width: '100%'
                }}>

                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 14 }}
                        style={{
                            width: 120, height: 120,
                            background: 'rgba(139, 0, 0, 0.1)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: 20
                        }}
                    >
                        <FaClock style={{ fontSize: 60, color: '#8B0000' }} />
                    </motion.div>


                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ display: 'flex', gap: 8 }}
                    >
                        <FaStar style={{ fontSize: 14, color: '#B8F568', opacity: 0.6 }} />
                        <FaStar style={{ fontSize: 14, color: '#B8F568', opacity: 0.8 }} />
                        <FaStar style={{ fontSize: 14, color: '#B8F568', opacity: 0.6 }} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{
                            fontFamily: 'Nunito, sans-serif',
                            color: '#8B0000', fontWeight: 900,
                            fontSize: 26,
                            textAlign: 'center', lineHeight: 1.2,
                            marginBottom: 8,
                            margin: 0
                        }}
                    >
                        No rush, Chef!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        style={{
                            fontFamily: 'Nunito', color: '#666', fontSize: 15,
                            textAlign: 'center', lineHeight: 1.6,
                            maxWidth: 300, marginBottom: 8
                        }}
                    >
                        The Ambassador programme will be here when you're ready. Great chefs always come back for more!
                    </motion.p>


                    <div style={{
                        width: '100%', maxWidth: 300, height: 1,
                        background: 'linear-gradient(90deg, transparent, #B8F568, transparent)',
                        marginBottom: 16,
                    }} />

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 12 }}
                    >
                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Back to Home
                        </button>
                        <button className="btn-outline" onClick={() => navigate('/ambassador/details')}>
                            Actually, I'm in! →
                        </button>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
