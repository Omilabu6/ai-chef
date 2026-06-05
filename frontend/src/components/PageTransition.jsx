import { motion } from 'framer-motion'

const variants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="screen"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
