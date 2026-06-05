import { forwardRef } from 'react'

const ChefCard = forwardRef(function ChefCard({ data }, ref) {
  const { name, photo, persona, chefId } = data
  const displayName = (name || 'CHEF NAME').toUpperCase()
  const title = persona?.title || 'THE FLAVOUR ARCHITECT'
  const quote = persona?.quote || 'Known for turning everyday ingredients into unforgettable experiences.'
  const powers = persona?.superpowers || [
    { label: 'RICH FLAVOUR', desc: 'Bold taste that leaves a mark' },
    { label: 'AROMA MASTER', desc: 'Aroma that speaks freshness' },
    { label: 'SIGNATURE RECIPES', desc: 'Original. Meticulous. Unforgettable.' },
    { label: "CHEF'S FAVOURITE", desc: 'Loved by many, recommended by all.' },
  ]

  const normalizedPowers = powers.map((p, i) => {
    if (typeof p === 'string') {
      const defaults = [
        { label: p, desc: 'Bold taste that leaves a mark' },
        { label: p, desc: 'Aroma that speaks freshness' },
        { label: p, desc: 'Original. Meticulous. Unforgettable.' },
        { label: p, desc: 'Loved by many, recommended by all.' },
      ]
      return defaults[i] || { label: p, desc: '' }
    }
    return p
  })

  const powerIcons = ['🍲', '🌿', '📖', '👥']

  return (
    <div
      ref={ref}
      id="chef-card"
      style={{
        width: '100%',
        maxWidth: 480,
        aspectRatio: '3/4',
        position: 'relative',
        fontFamily: '"Nunito", "Segoe UI", sans-serif',
        overflow: 'hidden',
        borderRadius: 16,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}
    >

      <img
        src="/bg-template.png"
        alt="template"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          zIndex: 0,
        }}
      />


      {photo && (
        <div style={{
          position: 'absolute',
          bottom: '16%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          <img
            src="/chef.png"
            alt={displayName}
            style={{
              width: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
            }}
          />
        </div>
      )}



      <div style={{
        position: 'absolute',
        top: '20%',
        left: '3%',
        width: '44%',
        maxHeight: '82%',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        paddingBottom: 8,
      }}>


        <div style={{ lineHeight: 1 }}>
          <div style={{
            color: 'white',
            fontWeight: 900,
            fontSize: 'clamp(9px, 1.8vw, 13px)',
            letterSpacing: 2,
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}>
            CHEF
          </div>
          <div style={{
            color: 'white',
            fontWeight: 900,
            fontSize: 'clamp(18px, 5vw, 34px)',
            lineHeight: 0.95,
            textShadow: '0 2px 10px rgba(0,0,0,0.35)',
            letterSpacing: -0.5,
          }}>
            {displayName}
          </div>
        </div>


        <div style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          background: '#B8F568',
          color: 'white',
          fontWeight: 900,
          fontSize: 'clamp(7px, 1.4vw, 10px)',
          letterSpacing: 0.8,
          padding: '3px 10px',
          borderRadius: 4,
          textTransform: 'uppercase',
        }}>
          {title}
        </div>


        <div style={{
          color: 'white',
          fontSize: 'clamp(7px, 1.4vw, 10px)',
          fontStyle: 'italic',
          lineHeight: 1.4,
          paddingLeft: 7,
          borderLeft: '3px solid #B8F568',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
          borderRadius: '0 6px 6px 0',
          padding: '5px 8px 5px 7px',
        }}>
          ❝ {quote} ❞
        </div>


        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 10,
          overflow: 'hidden',
          marginTop: 2,
          width: '95%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>

          <div style={{
            background: '#B8F568',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}>
            <div style={{
              color: 'white',
              fontWeight: 900,
              fontSize: 'clamp(7px, 1.3vw, 9px)',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}>
              Special Powers
            </div>
          </div>


          <div style={{ padding: '4px 7px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {normalizedPowers.map((p, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                paddingBottom: i < normalizedPowers.length - 1 ? 3 : 0,
                borderBottom: i < normalizedPowers.length - 1 ? '1px solid #f0f0f0' : 'none',
              }}>
                <div style={{
                  width: 16, height: 16, flexShrink: 0,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src='/correct.svg' style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{
                  color: '#1a1a1a',
                  fontWeight: 900,
                  fontSize: 'clamp(7px, 1.3vw, 9.5px)',
                  textTransform: 'uppercase',
                  letterSpacing: 0.3,
                  lineHeight: 1.2,
                }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
})

export default ChefCard