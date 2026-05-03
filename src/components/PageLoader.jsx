import { useEffect, useState } from 'react'

function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2200)
    const hideTimer = setTimeout(() => setVisible(false), 2700)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`page-loader${fading ? ' fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-title">Welcome to my portfolio!</div>
        <div className="loader-subtitle">Albert Fernandez Castañeto</div>
        <div className="loader-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

export default PageLoader