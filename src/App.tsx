import React, { useState, useEffect, useRef } from 'react';
import AIPitchShowcase from './components/AIPitchShowcase';

import '../style.css';
import { renderHero, initHeroConsole } from '../components/Hero.js';
import { renderBentoGrid, initExperienceTimeline } from '../components/BentoGrid.js';
import { renderTerminalSearch, initTerminalSearch } from '../components/TerminalSearch.js';
import { renderFooter } from '../components/Footer.js';
import { renderDataPipeline, initDataPipeline } from '../components/DataPipeline.js';
import { renderHeader, initHeader } from '../components/Header.js';
import { renderProjectsShowcase, initProjectsShowcase } from '../components/ProjectsShowcase.js';
import { renderAICapabilities, initAICapabilities } from '../components/AICapabilities.js';

export function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'ai-pitch'>(() => {
    return window.location.hash === '#ai-pitch-demo' ? 'ai-pitch' : 'portfolio';
  });

  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#ai-pitch-demo') {
        setCurrentView('ai-pitch');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('portfolio');
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView === 'portfolio' && portfolioRef.current) {
      portfolioRef.current.innerHTML = `
        ${renderHeader()}
        ${renderHero()}
        ${renderAICapabilities()}
        ${renderProjectsShowcase()}
        ${renderBentoGrid()}
        ${renderTerminalSearch()}
        ${renderDataPipeline()}
        ${renderFooter()}
      `;

      // Initialize component interactions
      initHeader();
      initHeroConsole();
      initAICapabilities();
      initProjectsShowcase();
      initExperienceTimeline();
      initTerminalSearch();
      initDataPipeline();

      // Initialize GSAP Animations if available
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
        gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
        gsap.from('.hero-actions', { y: 20, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });

        gsap.utils.toArray('.bento-cell').forEach((cell: any, i: number) => {
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
    }
  }, [currentView]);

  const handlePortfolioClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('#ai-demo-trigger');
    if (target) {
      e.preventDefault();
      window.location.hash = 'ai-pitch-demo';
      setCurrentView('ai-pitch');
      window.scrollTo(0, 0);
    }
  };

  const navigateToPortfolio = () => {
    window.location.hash = '';
    setCurrentView('portfolio');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {currentView === 'ai-pitch' ? (
        <AIPitchShowcase onBack={navigateToPortfolio} />
      ) : (
        <div ref={portfolioRef} id="app" onClick={handlePortfolioClick} />
      )}
    </div>
  );
}

export default App;
