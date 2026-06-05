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
      <p className="section-eyebrow">Services</p>
      <h2 className="section-title">What I Offer</h2>

      {/* Primary services */}
      <div className="services-grid services-grid-primary">
        <div className="service-card service-featured">
          <div className="service-icon-wrap"><i className='bx bx-server'></i></div>
          <span className="service-badge"><i className='bx bx-star' style={{ fontSize: '10px' }}></i> Core offering</span>
          <h3 className="service-title">Enterprise Web Applications</h3>
          <p className="service-desc">Production-ready business systems built with ASP.NET Core MVC and SQL Server. From transaction management and approval workflows to dashboards and internal portals — systems that teams depend on for daily operations.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> Transaction management &amp; approval workflows</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Role-based access control &amp; authentication</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Dashboards, reporting &amp; analytics</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Excel / PDF data pipelines &amp; exports</div>
          </div>
          <div className="service-tags">
            <span className="service-tag">ASP.NET Core</span>
            <span className="service-tag">C#</span>
            <span className="service-tag">SQL Server</span>
            <span className="service-tag">Entity Framework</span>
          </div>
          <div className="service-note">
            <span className="service-note-dot"></span>
            Built for production — not demos, not prototypes
          </div>
        </div>

        <div className="service-card service-featured">
          <div className="service-icon-wrap"><i className='bx bx-globe'></i></div>
          <span className="service-badge"><i className='bx bx-star' style={{ fontSize: '10px' }}></i> Core offering</span>
          <h3 className="service-title">Business Websites</h3>
          <p className="service-desc">Clean, responsive websites that represent your business professionally online. Corporate sites, landing pages, portfolio sites, and WordPress setups — built with performance and usability in mind.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> Corporate websites &amp; landing pages</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Responsive HTML / CSS / JavaScript</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> WordPress setup &amp; customization</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> SEO basics &amp; performance optimization</div>
          </div>
          <div className="service-tags">
            <span className="service-tag">HTML</span>
            <span className="service-tag">CSS</span>
            <span className="service-tag">JavaScript</span>
            <span className="service-tag">Bootstrap</span>
            <span className="service-tag">WordPress</span>
          </div>
          <div className="service-note">
            <span className="service-note-dot"></span>
            From static sites to full WordPress setups
          </div>
        </div>
      </div>

      {/* Supporting services */}
      <div className="services-grid" style={{ marginTop: '20px' }}>
        <div className="service-card">
          <div className="service-icon-wrap"><i className='bx bx-palette'></i></div>
          <span className="service-badge"><i className='bx bx-info-circle' style={{ fontSize: '10px' }}></i> Support level</span>
          <h3 className="service-title">UI &amp; Graphic Design</h3>
          <p className="service-desc">Basic UI layouts for system interfaces and digital assets. Design in service of the product — clean, functional visuals that support the systems I build rather than standalone creative work.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> System UI layouts and wireframes</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Simple branding — logos, banners</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Social media and thumbnail assets</div>
          </div>
          <div className="service-tags">
            <span className="service-tag">Figma</span>
            <span className="service-tag">UI Layout</span>
            <span className="service-tag">Branding</span>
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
          <p className="service-desc">Keeping the operational side of your business systems running smoothly — data handling, documentation, and day-to-day technical tasks that keep teams productive.</p>
          <div className="service-includes">
            <div className="service-includes-item"><i className='bx bx-check'></i> Data entry, cleanup, and validation</div>
            <div className="service-includes-item"><i className='bx bx-check'></i> Excel processing and reporting</div>
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
