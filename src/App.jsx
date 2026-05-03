import { useState } from 'react'
import Chatbot from './components/Chatbot'
import MeshBackground from './components/MeshBackground'
import PageLoader from './components/PageLoader'
import MobileMenu from './components/MobileMenu'
import ThemeToggle from './components/ThemeToggle'
import ScrollProgress from './components/ScrollProgress'
import SidebarNav from './components/SidebarNav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import ProjectModal from './components/ProjectModal'
import Skills from './components/Skills'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div>
      <PageLoader />
      <MobileMenu />
      <ThemeToggle />
      <ScrollProgress />
      <MeshBackground />
      <SidebarNav />
      <Hero onResumeClick={() => setResumeOpen(true)} />
      <About />
      <Projects onProjectClick={setActiveProject} />
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
      <Skills />
      <Services />
      <Contact />
      <Footer />{resumeOpen && (
        <ResumeModal onClose={() => setResumeOpen(false)} />
      )}
      <Chatbot />
    </div>
  )
}

export default App