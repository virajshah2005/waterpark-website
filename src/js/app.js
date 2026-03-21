import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Alpine from 'alpinejs'

gsap.registerPlugin(ScrollTrigger)

// Global GSAP Setup
gsap.defaults({
  ease: 'power3.out',
  duration: 1
})

// AOS Init
AOS.init({
  duration: 1200,
  once: true,
  offset: 100
})

// Navbar Scroll Effect
gsap.to('nav', {
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  backdropFilter: 'blur(20px)',
  padding: '1rem 0',
  scrollTrigger: {
    trigger: 'body',
    start: '10% top',
    end: 'bottom bottom',
    scrub: true
  }
})

// Hero Animations
gsap.timeline()
  .from('.hero-title', { y: 50, opacity: 0, duration: 1, stagger: 0.1 })
  .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
  .from('.hero-cta', { scale: 0.8, opacity: 0, rotation: 10, duration: 0.8 }, '-=0.3')

// Stats Counter Animation
ScrollTrigger.create({
  trigger: '.stats-section',
  start: 'top 80%',
  onEnter: () => {
    gsap.to('.stat-number', {
      innerHTML: 100, // Update with actual data
      duration: 2,
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
        onUpdate: self => {
          const num = Math.ceil(self.progress * 100)
          document.querySelector('.stat-number').innerHTML = num
        }
      }
    })
  }
})

// Floating Elements
gsap.to('.floating-card', {
  y: -20,
  rotation: 5,
  duration: 3,
  repeat: -1,
  yoyo: true,
  stagger: 0.2,
  ease: 'power2.inOut'
})

// Parallax Hero Images
gsap.to('.hero-bg', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})

// Alpine.js Data for Interactive Components
document.addEventListener('alpine:init', () => {
  Alpine.data('bookingForm', () => ({
    step: 1,
    guests: { adults: 2, children: 0 },
    package: 'standard',
    promo: '',
    price: 2000,
    
    nextStep() {
      this.step++
    },
    
    prevStep() {
      this.step--
    },
    
    applyPromo() {
      // Promo logic
      if (this.promo === 'FAMILYTYM') {
        this.price *= 0.85
      }
    },
    
    calculatePrice() {
      const base = this.guests.adults * 1000 + this.guests.children * 500
      this.price = base * (this.package === 'premium' ? 1.2 : 1)
    }
  }))
})

// Page Load Animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded')
  gsap.from('body', { duration: 0.8, opacity: 0, y: 20 })
})

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

console.log('🌊 AquaLand Modern UI Loaded!')

