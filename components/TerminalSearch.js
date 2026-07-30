export function renderTerminalSearch() {
  return `
    <!-- Floating Button -->
    <button id="terminal-trigger" class="btn btn-primary" style="position: fixed; bottom: var(--spacing-lg); right: var(--spacing-lg); z-index: 100; box-shadow: 0 8px 32px rgba(0, 102, 204, 0.3);">
      <i class="ph ph-terminal-window"></i> Search / Terminal
    </button>

    <!-- Overlay -->
    <div id="terminal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); z-index: 1000; align-items: center; justify-content: center; padding: var(--spacing-md);">
      <div class="glass-panel" style="width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: var(--spacing-md); position: relative;">
        
        <button id="terminal-close" style="position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 1.5rem;">
          <i class="ph ph-x"></i>
        </button>

        <h3 style="display: flex; align-items: center; gap: 8px;"><i class="ph ph-magnifying-glass"></i> Quick Search</h3>
        
        <input type="text" id="terminal-input" placeholder="Type 'skills', 'experience', or 'Python'..." style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.5); font-size: 1.1rem; outline: none; font-family: inherit; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
        
        <div id="terminal-output" style="min-height: 150px; max-height: 300px; overflow-y: auto; padding: 12px; background: rgba(0,0,0,0.02); border-radius: 8px; font-size: 0.95rem;">
          <div style="color: var(--text-secondary);">Type a command or keyword to search...</div>
        </div>
      </div>
    </div>
  `;
}

export function initTerminalSearch() {
  const trigger = document.getElementById('terminal-trigger');
  const overlay = document.getElementById('terminal-overlay');
  const close = document.getElementById('terminal-close');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  // Hardcoded resume data for search
  const data = [
    { keywords: ['skills', 'tech', 'arsenal', 'react', 'firebase', 'bun', 'tailwind', 'sql', 'python', 'c#'], result: '<strong>Technical Arsenal:</strong> React.js, Firebase (Auth, Firestore, Functions), Bun, Tailwind CSS, Node.js, C# .NET, SQL Server, Python (Pandas), Power BI.' },
    { keywords: ['experience', 'work', 'jobs', 'pueblo'], result: '<strong>Pueblo Language (Nov 2025 - Present):</strong> Founding Engineer / Lead Developer. Architecting full-stack rebuild using React, Firebase, Bun.' },
    { keywords: ['experience', 'work', 'jobs', 'intel'], result: '<strong>Intel Corporation (2009 - 2024):</strong> Senior Software Engineer & Supply Chain Analyst. 15 years developing C# .NET, SQL Server, and Angular apps.' },
    { keywords: ['experience', 'work', 'jobs', 'pacs'], result: '<strong>PACS (Jul 2025 - Oct 2025):</strong> Application Developer. Developed web tools for compliance and reporting using C# and JavaScript.' },
    { keywords: ['education', 'degree', 'byu', 'udacity'], result: '<strong>Education:</strong> B.S. Information Systems, BYU (2009). Full Stack Web Development Nanodegree, Udacity (2017).' },
    { keywords: ['hardware', 'maker', '3d printing', 'arduino'], result: '<strong>Hardware & Making:</strong> Passionate about Code-CAD, 3D Printing, Arduino, and Raspberry Pi.' },
  ];

  function openOverlay() {
    overlay.style.display = 'flex';
    setTimeout(() => input.focus(), 100);
    // GSAP animation
    if (window.gsap) {
      gsap.fromTo(overlay.querySelector('.glass-panel'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
  }

  function closeOverlay() {
    if (window.gsap) {
      gsap.to(overlay, { opacity: 0, duration: 0.2, onComplete: () => overlay.style.display = 'none' });
    } else {
      overlay.style.display = 'none';
    }
  }

  trigger.addEventListener('click', openOverlay);
  close.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (!val) {
      output.innerHTML = '<div style="color: var(--text-secondary);">Type a command or keyword to search...</div>';
      return;
    }

    const results = data.filter(item => item.keywords.some(k => k.includes(val) || val.includes(k)));
    
    if (results.length > 0) {
      output.innerHTML = results.map(r => `<div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--glass-border);">${r.result}</div>`).join('');
    } else {
      output.innerHTML = `<div style="color: var(--text-secondary);">No results found for "${val}". Try 'skills', 'intel', or 'pueblo'.</div>`;
    }
  });
}
