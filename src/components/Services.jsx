import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Services() {
  useEffect(() => {
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.set(card, { opacity: 1, y: 0 })
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 95%', toggleActions: 'play none none none' },
        opacity: 0, y: 40, duration: .8, delay: i * .12, ease: 'power2.out'
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="services">
      <p className="section-eyebrow">Also Available</p>
      <h2 className="section-title">Support &amp;<br />Secondary Services</h2>

      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon-wrap"><i className='bx bx-palette'></i></div>
          <span className="service-badge"><i className='bx bx-info-circle' style={{ fontSize: '10px' }}></i> Support level</span>
          <h3 className="service-title">UI &amp; Graphic Design</h3>
          <p className="service-desc">Basic UI layouts for system interfaces and digital assets. Design in service of the product — clean, functional visuals that support the systems I build rather than standalone creative work.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> System UI layouts and wireframes</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Simple branding — logos, banners</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Social media and thumbnail assets</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Basic digital marketing materials</div>
          </div>
          <div className="service-tags">
            <span className="service-tag">Figma</span>
            <span className="service-tag">UI Layout</span>
            <span className="service-tag">Branding</span>
            <span className="service-tag">Assets</span>
          </div>
          <div className="service-note">
            <span className="service-note-dot"></span>
            Best when paired with a development project
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon-wrap"><i className='bx bxl-wordpress'></i></div>
          <span className="service-badge"><i className='bx bx-info-circle' style={{ fontSize: '10px' }}></i> Setup &amp; customisation</span>
          <h3 className="service-title">WordPress Setup</h3>
          <p className="service-desc">Theme customisation, plugin configuration, and content management setup for business websites that need a reliable, low-maintenance online presence without the overhead of custom development.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> Theme selection and customisation</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Plugin setup — forms, SEO, backups</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Content management configuration</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Performance and security basics</div>
          </div>
          <div className="service-tags">
            <span className="service-tag">WordPress</span>
            <span className="service-tag">Themes</span>
            <span className="service-tag">Plugins</span>
            <span className="service-tag">SEO</span>
          </div>
          <div className="service-note">
            <span className="service-note-dot"></span>
            Setup &amp; customisation only — not custom plugin dev
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon-wrap"><i className='bx bx-support'></i></div>
          <span className="service-badge"><i className='bx bx-info-circle' style={{ fontSize: '10px' }}></i> For business systems</span>
          <h3 className="service-title">Technical &amp; Admin Support</h3>
          <p className="service-desc">Keeping the operational side of your business systems running smoothly — data handling, documentation, and day-to-day technical tasks that keep teams productive without requiring a full developer engagement.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> Data entry, cleanup, and validation</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Excel processing and reporting</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> System maintenance and monitoring</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Technical documentation writing</div>
          </div>
          <div className="service-tags">
            <span className="service-tag">Excel</span>
            <span className="service-tag">Data Cleanup</span>
            <span className="service-tag">Docs</span>
            <span className="service-tag">Maintenance</span>
          </div>
          <div className="service-note">
            <span className="service-note-dot"></span>
            Often bundled with system handoffs and onboarding
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services