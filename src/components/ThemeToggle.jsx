import { useState } from 'react'

const LIGHT_VARS = {
  '--bg':           '#f8f7f2',
  '--bg2':          '#f0ede4',
  '--surface':      '#e8e4d9',
  '--surface2':     '#ddd9cc',
  '--border':       '#ccc8ba',
  '--border2':      '#b8b4a6',
  '--text':         '#1a1610',
  '--muted':        '#7a7568',
  '--amber':        '#b45309',
  '--amber-lt':     '#d97706',
  '--amber-pale':   'rgba(180,83,9,.08)',
  '--blue':         '#2563eb',
  '--hero-grad-a':  'rgba(248,247,242,0.95)',
  '--hero-grad-b':  'rgba(248,247,242,0.0)',
  '--hero-bg':      "url('/light-bg.png')",
}

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  const toggle = () => {
    const next = !isLight
    setIsLight(next)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'light')
      Object.entries(LIGHT_VARS).forEach(([k, v]) =>
        document.documentElement.style.setProperty(k, v)
      )
    } else {
      document.documentElement.removeAttribute('data-theme')
      Object.keys(LIGHT_VARS).forEach(k =>
        document.documentElement.style.removeProperty(k)
      )
    }
  }

  return (
    <button
      className="theme-btn"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <i className={`bx ${isLight ? 'bx-moon' : 'bx-sun'}`} />
    </button>
  )
}

export default ThemeToggle
