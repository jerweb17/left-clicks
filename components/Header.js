export function renderHeader() {
  return `
    <header class="main-header glass-panel">
      <div class="header-container">
        <a href="#" class="header-logo">
          Left Clicks Development
          <span class="logo-badge">Freelance & Contract</span>
        </a>
        <nav class="header-nav">
          <a href="#projects-section" id="nav-projects-lnk" class="nav-link">Projects</a>
          <a href="#experience-section" id="nav-experience-lnk" class="nav-link">Experience</a>
          <a href="#pipeline-trigger" id="nav-pipeline-trigger" class="nav-link">Data Showcase</a>
          <a href="#terminal-trigger" id="nav-terminal-trigger" class="nav-link">Terminal</a>
        </nav>
        <div class="header-actions">
          <a href="https://github.com/jerweb17" target="_blank" rel="noopener noreferrer" class="social-icon-link" title="GitHub">
            <i class="ph ph-github-logo"></i>
          </a>
          <a href="https://www.linkedin.com/in/jeremy-r-webster/" target="_blank" rel="noopener noreferrer" class="social-icon-link" title="LinkedIn">
            <i class="ph ph-linkedin-logo"></i>
          </a>
          <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle Dark/Light Mode">
            <i class="ph ph-moon theme-icon-dark"></i>
            <i class="ph ph-sun theme-icon-light" style="display: none;"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function initHeader() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const darkIcon = themeToggle.querySelector('.theme-icon-dark');
  const lightIcon = themeToggle.querySelector('.theme-icon-light');

  // Load saved theme or system theme preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      if (darkIcon) darkIcon.style.display = 'none';
      if (lightIcon) lightIcon.style.display = 'inline-block';
    } else {
      if (darkIcon) darkIcon.style.display = 'inline-block';
      if (lightIcon) lightIcon.style.display = 'none';
    }
  }

  // Projects navigation click
  const navProj = document.getElementById('nav-projects-lnk');
  if (navProj) {
    navProj.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('projects-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Experience navigation click
  const navExp = document.getElementById('nav-experience-lnk');
  if (navExp) {
    navExp.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('experience-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hook up navigation clicks to open overlays if needed
  const navPipeline = document.getElementById('nav-pipeline-trigger');
  if (navPipeline) {
    navPipeline.addEventListener('click', (e) => {
      e.preventDefault();
      const trigger = document.getElementById('pipeline-trigger');
      if (trigger) trigger.click();
    });
  }

  const navTerminal = document.getElementById('nav-terminal-trigger');
  if (navTerminal) {
    navTerminal.addEventListener('click', (e) => {
      e.preventDefault();
      const trigger = document.getElementById('terminal-trigger');
      if (trigger) trigger.click();
    });
  }
}
