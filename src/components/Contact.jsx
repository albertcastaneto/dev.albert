import { useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useToast } from '../context/ToastContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EMAILJS_SERVICE_ID  = 'service_j1f02io'
const EMAILJS_TEMPLATE_ID = 'template_qch2xn9'
const EMAILJS_PUBLIC_KEY  = '8ZnHAXeW2oNnTb5hi'

function Contact() {
  const showToast  = useToast()
  const nameRef    = useRef(null)
  const emailRef   = useRef(null)
  const subjectRef = useRef(null)
  const messageRef = useRef(null)
  const submitRef  = useRef(null)

  useEffect(() => {
    gsap.fromTo('.contact-headline',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-headline', start: 'top 85%' } }
    )
    gsap.fromTo('.contact-desc',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: .8, delay: .15, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-desc', start: 'top 90%' } }
    )
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('albertcastaneto@gmail.com')
      .then(() => showToast('Email copied to clipboard!', 'success'))
      .catch(() => showToast('Could not copy — try manually.', 'error'))
  }

  const handleSubmit = () => {
    const name    = nameRef.current.value
    const email   = emailRef.current.value
    const subject = subjectRef.current.value
    const message = messageRef.current.value

    let valid = true

    if (name.trim().length < 2) {
      nameRef.current.classList.add('error')
      valid = false
    } else {
      nameRef.current.classList.remove('error')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailRef.current.classList.add('error')
      valid = false
    } else {
      emailRef.current.classList.remove('error')
    }

    if (subject === '') {
      subjectRef.current.classList.add('error')
      valid = false
    } else {
      subjectRef.current.classList.remove('error')
    }

    if (message.trim().length < 10) {
      messageRef.current.classList.add('error')
      valid = false
    } else {
      messageRef.current.classList.remove('error')
    }

    if (!valid) {
      showToast('Please fill in all required fields.', 'error')
      return
    }

    const btn = submitRef.current
    btn.classList.add('loading')
    btn.disabled = true

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  name,
        from_email: email,
        subject:    subject,
        message:    message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      btn.classList.remove('loading')
      btn.disabled = false
      btn.innerHTML = `<i class='bx bx-check'></i> <span class="btn-text">Message Sent!</span>`
      btn.style.background = '#22c55e'
      showToast("Message sent! I'll get back to you soon.", 'success', 4500)
      nameRef.current.value    = ''
      emailRef.current.value   = ''
      subjectRef.current.value = ''
      messageRef.current.value = ''
      setTimeout(() => {
        btn.innerHTML = `<div class="spinner"></div><span class="btn-text"><i class='bx bx-send'></i> Send Message</span>`
        btn.style.background = ''
      }, 3000)
    })
    .catch(() => {
      btn.classList.remove('loading')
      btn.disabled = false
      showToast('Something went wrong. Please try again.', 'error')
    })
  }

  return (
    <section id="contact">
      <div className="contact-inner">
        <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Contact</p>
        <h2 className="contact-headline">Let's Build<br />Something <span>Real.</span></h2>
        <p className="contact-desc">Interested in building reliable systems? I focus on production-ready applications that teams depend on for daily operations — not demos, not prototypes.</p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="copy-email-wrap" onClick={copyEmail} data-tooltip="Click to copy">
            <i className='bx bx-envelope' style={{ color: 'var(--amber)' }}></i>
            <strong>albertcastaneto@gmail.com</strong>
            <i className='bx bx-copy copy-icon'></i>
          </div>
        </div>

        <div className="cta-group" style={{ justifyContent: 'center' }}>
          <a href="mailto:albertcastaneto@gmail.com" className="cta cta-primary">
            <i className='bx bx-mail-send'></i> Send Email
          </a>
          <a href="https://linkedin.com/in/albert-casta%C3%B1eto" target="_blank" rel="noopener noreferrer" className="cta cta-secondary">
            <i className='bx bxl-linkedin'></i> LinkedIn
          </a>
        </div>

        <div className="contact-form">
          <h3>Send a Message</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input ref={nameRef} type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input ref={emailRef} type="email" placeholder="you@company.com" />
            </div>
          </div>
          <div className="form-group">
            <label>What's this about?</label>
            <select ref={subjectRef} defaultValue="">
              <option value="">Select a topic…</option>
              <option value="job">Job opportunity</option>
              <option value="system">System / Software development</option>
              <option value="collab">Project collaboration</option>
              <option value="automation">Business process automation</option>
              <option value="consulting">System consultation</option>
              <option value="support">Technical / System support</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea ref={messageRef} placeholder="Tell me what you're working on…"></textarea>
          </div>
          <button className="form-submit" ref={submitRef} onClick={handleSubmit}>
            <div className="spinner"></div>
            <span className="btn-text"><i className='bx bx-send'></i> Send Message</span>
          </button>
        </div>

        <div className="social-links">
          <a className="social-link" href="https://github.com/albertcastaneto" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
          <a className="social-link" href="https://linkedin.com/in/albert-casta%C3%B1eto" target="_blank" rel="noopener noreferrer"><i className='bx bxl-linkedin'></i></a>
        </div>
      </div>
    </section>
  )
}

export default Contact