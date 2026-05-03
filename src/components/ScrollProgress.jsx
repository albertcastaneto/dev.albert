import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    gsap.set(bar, { width: '0%' })
    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        scrub: 0.3,
        start: 'top top',
        end: 'bottom bottom',
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return <div className="scroll-progress" ref={barRef}></div>
}

export default ScrollProgress