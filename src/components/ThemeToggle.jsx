import { useState } from 'react'

const LIGHT_VARS = {
  '--bg':      '#f8f7f2',
  '--bg2':     '#f0ede4',
  '--surface':  '#e8e4d9',
  '--surface2': '#ddd9cc',
  '--border':   '#ccc8ba',
  '--border2':  '#b8b4a6',
  '--text':     '#1a1610',
  '--muted':    '#7a7568',
}

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  const toggle = () => {
    const next = !isLight
    setIsLight(next)

    if (next) {
      Object.entries(LIGHT_VARS).forEach(([k, v]) =>
        document.documentElement.style.setProperty(k, v)
      )
    } else {
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