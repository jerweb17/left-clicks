import './style.css';
import { renderHero } from './components/Hero.js';
import { renderBentoGrid } from './components/BentoGrid.js';
import { renderTerminalSearch, initTerminalSearch } from './components/TerminalSearch.js';
import { renderFooter } from './components/Footer.js';
import { renderDataPipeline, initDataPipeline } from './components/DataPipeline.js';

document.querySelector('#app').innerHTML = `
  ${renderHero()}
  ${renderBentoGrid()}
  ${renderTerminalSearch()}
  ${renderDataPipeline()}
  ${renderFooter()}
`;

// Initialize Terminal/Search interactions
initTerminalSearch();
initDataPipeline();

// Initialize GSAP Animations
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Animate Hero
  gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
  gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero-actions', { y: 20, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });

  // Animate Bento Grid Cells
  gsap.utils.toArray('.bento-cell').forEach((cell, i) => {
    gsap.from(cell, {
      scrollTrigger: {
        trigger: cell,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.2)',
      delay: i * 0.1
    });
  });
}
