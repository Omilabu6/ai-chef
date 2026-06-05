import { useNavigate } from 'react-router-dom'

export default function Header({ onClose }) {
  const navigate = useNavigate()

  function handleClose() {
    if (onClose) {
      onClose()
    } else {
      navigate('/')
    }
  }

  return (
  <div style={{
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 3px 10px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      justifyContent: 'space-between',
      padding: '16px 20px 0',
    }}>
      <div className="addme-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer',}}>
      <img
        src="/logo.svg"
        alt="Addme Logo"
        style={{
          width: '4rem',
          height: '4rem',
        }}
      />
      </div>
      <img src="/spoonNfork.svg" alt="" />
    </div>
  )
}
