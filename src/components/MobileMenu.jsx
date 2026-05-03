import React, { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  { icon: 'bxl-github', href: 'https://github.com/albertcastaneto', label: 'GitHub' },
  { icon: 'bxl-linkedin', href: 'https://linkedin.com/in/albert-casta%C3%B1eto', label: 'LinkedIn' },
  { icon: 'bx-mail-send', href: 'mailto:albertcastaneto@gmail.com', label: 'Email' },
]

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 420)
  }

  const renderNavLinks = () => {
    return NAV_LINKS.map(link => {
      return React.createElement(
        'a',
        {
          key: link.href,
          href: link.href,
          className: 'mobile-link',
          onClick: e => handleLinkClick(e, link.href),
          tabIndex: isOpen ? 0 : -1,
        },
        link.label
      )
    })
  }

  const renderSocialLinks = () => {
    return SOCIAL_LINKS.map(s => {
      return React.createElement(
        'a',
        {
          key: s.href,
          className: 'social-link',
          href: s.href,
          target: s.href.startsWith('http') ? '_blank' : undefined,
          rel: s.href.startsWith('http') ? 'noopener noreferrer' : undefined,
          'aria-label': s.label,
          tabIndex: isOpen ? 0 : -1,
          onClick: () => setIsOpen(false),
        },
        React.createElement('i', { className: `bx ${s.icon}` })
      )
    })
  }

  return (
    <>
      <button
        className={`mobile-menu-btn${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="mobile-menu"
        className={`mobile-menu${isOpen ? ' open' : ''}`}
        aria-hidden={!isOpen}
      >
        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {renderNavLinks()}
        </nav>

        <div className="mobile-menu-social">
          {renderSocialLinks()}
        </div>
      </div>
    </>
  )
}

export default MobileMenu