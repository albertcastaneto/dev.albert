import { useEffect, useState } from 'react'

const navItems = [
  { section: 'hero',     icon: 'bx-home',           title: 'Home' },
  { section: 'about',    icon: 'bx-user',            title: 'About' },
  { section: 'projects', icon: 'bx-layer',           title: 'Projects' },
  { section: 'skills',   icon: 'bx-code-alt',        title: 'Skills' },
  { section: 'services', icon: 'bx-briefcase-alt-2', title: 'Services' },
  { section: 'contact',  icon: 'bx-envelope',        title: 'Contact' },
]

function SidebarNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveSection(e.target.id)
      })
    }, { rootMargin: '-50% 0px -50% 0px' })

    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="sidebar-nav">
      {navItems.map(item => (
        <div
          key={item.section}
          className={`nav-dot ${activeSection === item.section ? 'active' : ''}`}
          title={item.title}
          onClick={() => scrollTo(item.section)}
        >
          <i className={`bx ${item.icon}`}></i>
        </div>
      ))}
    </nav>
  )
}

export default SidebarNav