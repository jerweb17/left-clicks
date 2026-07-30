export function renderHero() {
  return `
    <section class="hero-container" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--spacing-xl); align-items: center; padding: calc(var(--spacing-xl) * 1.5) 0 var(--spacing-xl) 0;">
      
      <!-- Left Column: Bio / Pitching Left Clicks Dev -->
      <div class="hero-copy" style="grid-column: span 7 / span 12; display: flex; flex-direction: column; gap: var(--spacing-md); text-align: left;">
        <h1 class="hero-title" style="margin-bottom: var(--spacing-sm);">
          Jeremy R. Webster
        </h1>
        <h2 class="hero-subtitle" style="color: var(--text-secondary); font-weight: 400; font-size: clamp(1.4rem, 2.5vw, 2rem);">
          Founder, <span style="color: var(--accent-color); font-weight: 600;">Left Clicks Development</span>
        </h2>
        <p style="max-width: 600px; margin-top: var(--spacing-sm); font-size: 1.1rem; line-height: 1.6; color: var(--text-secondary);">
          Building high-velocity, production-grade applications with an AI-first workflow. Partner with <strong>Left Clicks Development</strong> to rapidly ship custom SaaS solutions, cloud architectures, legacy systems migrations, and dashboard solutions. 
        </p>
        
        <div class="hero-actions" style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); margin-top: var(--spacing-md);">
          <a href="#projects-section" id="nav-work-btn" class="btn btn-primary">
            <i class="ph ph-folder-open" style="font-size: 1.2rem;"></i> View Portfolio
          </a>
          <a href="#ai-capabilities-section" id="nav-ai-workflow-btn" class="btn btn-secondary" style="border: 1px solid var(--accent-color); color: var(--accent-color); background: rgba(0, 102, 204, 0.05); font-weight: 600; display: flex; align-items: center; gap: 6px;">
            <i class="ph ph-lightning" style="font-size: 1.2rem;"></i> Live AI Pitch & Sandbox
          </a>
          <a href="#projects-section" id="nav-hire-btn" class="btn btn-secondary" style="border: 1px solid #10b981; color: #10b981; background: rgba(16, 185, 129, 0.04);">
            <i class="ph ph-paper-plane-tilt" style="font-size: 1.2rem;"></i> Contract Inquiries
          </a>
        </div>
      </div>

      <!-- Right Column: Interactive AI-Human Synergy Conductor Graphic -->
      <div class="hero-visual" style="grid-column: span 5 / span 12; display: flex; flex-direction: column; justify-content: center;">
        <div class="synergy-console" style="background: #090e17; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; height: 430px; width: 100%; font-family: system-ui, -apple-system, sans-serif;">
          
          <!-- Console Top Bar with Toggle -->
          <div style="background: #111827; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06); user-select: none;">
            <span style="color: #94a3b8; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
              <i class="ph ph-sliders" style="color: var(--accent-color);"></i> Simulator State:
            </span>
            
            <!-- Toggle pill - Enlarged and made prominent -->
            <div class="synergy-toggle-wrapper" style="position: relative; display: flex; background: #030712; padding: 4px; border-radius: 99px; border: 1px solid rgba(255, 255, 255, 0.08); cursor: pointer; width: 260px; height: 38px; align-items: center;">
              <div class="synergy-toggle-slider" style="position: absolute; left: 4px; top: 4px; bottom: 4px; width: calc(50% - 4px); background: #ef4444; border-radius: 99px; transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease; z-index: 1;"></div>
              <button id="toggle-alone-btn" style="flex: 1; text-align: center; border: none; background: none; font-size: 0.85rem; font-weight: 800; color: #fff; z-index: 2; cursor: pointer; padding: 4px 0; transition: color 0.3s; outline: none; border-radius: 99px;">AI Alone</button>
              <button id="toggle-conductor-btn" class="pulse-highlight" style="flex: 1; text-align: center; border: none; background: none; font-size: 0.85rem; font-weight: 800; color: #94a3b8; z-index: 2; cursor: pointer; padding: 4px 0; transition: color 0.3s; outline: none; border-radius: 99px;">AI + Jeremy</button>
            </div>
          </div>

          <!-- Main Display Board -->
          <div id="synergy-display-panel" class="state-alone" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #070b12; padding: 18px; gap: 14px; position: relative;">
            
            <!-- Row 1: Graph Diagnostic Canvas (Staggered warnings to prevent overlaps) -->
            <div style="flex: 1.4; display: flex; align-items: center; justify-content: space-around; border: 1px solid rgba(255, 255, 255, 0.04); background: rgba(0,0,0,0.15); border-radius: 10px; padding: 12px; position: relative; overflow: hidden; min-height: 150px;">
              
              <!-- Node 1: Client/UX -->
              <div class="canvas-node node-client" style="text-align: center; z-index: 5;">
                <div class="node-circle" style="width: 38px; height: 38px; border-radius: 50%; background: #1f2937; border: 2px solid #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);">
                  <i class="ph ph-app-window" style="font-size: 1.2rem; color: #f1f5f9;"></i>
                </div>
                <span style="font-size: 0.68rem; color: #94a3b8; display: block; margin-top: 4px; font-weight: 600;">Client View</span>
              </div>

              <!-- Connecting line Client -> Server -->
              <div class="node-connection-line line-client-server" style="position: absolute; left: 24%; top: 38%; width: 20%; height: 2px; border-top: 2px dashed #ef4444; z-index: 1; transition: all 0.3s ease;"></div>

              <!-- Node 2: Server API -->
              <div class="canvas-node node-server" style="text-align: center; z-index: 5;">
                <div class="node-circle" style="width: 38px; height: 38px; border-radius: 50%; background: #1f2937; border: 2px solid #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);">
                  <i class="ph ph-cpu" style="font-size: 1.2rem; color: #f1f5f9;"></i>
                </div>
                <span style="font-size: 0.68rem; color: #94a3b8; display: block; margin-top: 4px; font-weight: 600;">Server API</span>
              </div>

              <!-- Connecting line Server -> DB -->
              <div class="node-connection-line line-server-db" style="position: absolute; left: 56%; top: 38%; width: 20%; height: 2px; border-top: 2px dashed #ef4444; z-index: 1; transition: all 0.3s ease;"></div>

              <!-- Node 3: Database -->
              <div class="canvas-node node-database" style="text-align: center; z-index: 5;">
                <div class="node-circle" style="width: 38px; height: 38px; border-radius: 50%; background: #1f2937; border: 2px solid #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);">
                  <i class="ph ph-database" style="font-size: 1.2rem; color: #f1f5f9;"></i>
                </div>
                <span style="font-size: 0.68rem; color: #94a3b8; display: block; margin-top: 4px; font-weight: 600;">Database</span>
              </div>

              <!-- Hovering warnings list overlay (Repositioned to distinct corners to prevent overlaps) -->
              <div class="warning-tag sql-warn" style="position: absolute; top: 12px; left: 50%; font-size: 0.7rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; transition: all 0.3s ease; z-index: 6; opacity: 1; transform: translateX(-50%);">
                <i class="ph ph-warning-circle"></i> SQL Injection Risk
              </div>
              <div class="warning-tag ux-warn" style="position: absolute; bottom: 12px; left: 10px; font-size: 0.7rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; transition: all 0.3s ease; z-index: 6; opacity: 1;">
                <i class="ph ph-warning-circle"></i> Mobile UI Overlaps
              </div>
              <div class="warning-tag db-warn" style="position: absolute; bottom: 12px; right: 10px; font-size: 0.7rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; transition: all 0.3s ease; z-index: 6; opacity: 1;">
                <i class="ph ph-warning-circle"></i> N+1 Query Lockups
              </div>
              
              <!-- Success indicators -->
              <div class="success-tag secure-ok" style="position: absolute; top: 12px; left: 50%; font-size: 0.7rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #a7f3d0; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; transition: all 0.3s ease; z-index: 6; opacity: 0; transform: translate(-50%, -5px);">
                <i class="ph ph-check-circle"></i> Audited & Secure
              </div>
              <div class="success-tag ux-ok" style="position: absolute; bottom: 12px; left: 10px; font-size: 0.7rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #a7f3d0; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; transition: all 0.3s ease; z-index: 6; opacity: 0; transform: translateY(-5px);">
                <i class="ph ph-check-circle"></i> Responsive UX Checked
              </div>
              <div class="success-tag db-ok" style="position: absolute; bottom: 12px; right: 10px; font-size: 0.7rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #a7f3d0; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; transition: all 0.3s ease; z-index: 6; opacity: 0; transform: translateY(-5px);">
                <i class="ph ph-check-circle"></i> Redis Cache Bound
              </div>
            </div>

            <!-- Row 2: Metrics Progress Blocks -->
            <div style="flex: 1.1; display: flex; flex-direction: column; gap: 12px; justify-content: center;">
              <!-- Speed Progress -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
                  <span style="color: var(--text-secondary); font-weight: 600;">Coding & Build Speed</span>
                  <strong id="metric-speed-val" style="color: #ef4444; font-weight: 700;">10x Speed (Raw typing)</strong>
                </div>
                <div style="height: 7px; background: rgba(255,255,255,0.04); border-radius: 99px; overflow: hidden;">
                  <div id="metric-speed-bar" style="height: 100%; width: 100%; background: #ef4444; transition: width 0.4s ease, background-color 0.4s ease;"></div>
                </div>
              </div>
              
              <!-- Coherence Progress -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
                  <span style="color: var(--text-secondary); font-weight: 600;">System Coherence & Security</span>
                  <strong id="metric-coherence-val" style="color: #ef4444; font-weight: 700;">35% (Build Failure)</strong>
                </div>
                <div style="height: 7px; background: rgba(255,255,255,0.04); border-radius: 99px; overflow: hidden;">
                  <div id="metric-coherence-bar" style="height: 100%; width: 35%; background: #ef4444; transition: width 0.4s ease, background-color 0.4s ease;"></div>
                </div>
              </div>
            </div>

            <!-- Row 3: Conductor Description Block -->
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px; text-align: left;">
              <p id="synergy-description" style="font-size: 0.8rem; line-height: 1.5; color: #94a3b8; margin: 0;">
                Without structured scaffolding and security validation checks, raw AI coding generates disjointed modules, legacy database locks, and responsive layout overlaps.
              </p>
            </div>

          </div>

          <!-- Footer Status Bar -->
          <div style="background: #111827; padding: 12px 18px; border-top: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; user-select: none;">
            <span id="synergy-status-dot" style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: #ef4444; transition: color 0.3s;">
              <span class="status-pulse" style="width: 9px; height: 9px; border-radius: 50%; background: #ef4444; display: inline-block; transition: background-color 0.3s;"></span>
              <span id="synergy-status-text" style="text-transform: uppercase; font-weight: 700;">DEPLOY FAILURE (Rollback)</span>
            </span>
            <span style="color: #64748b; font-size: 0.72rem;">Conductor Engine v1.0.0</span>
          </div>
        </div>
      </div>
      
    </section>
  `;
}

export function initHeroConsole() {
  const toggleAlone = document.getElementById('toggle-alone-btn');
  const toggleConductor = document.getElementById('toggle-conductor-btn');
  const slider = document.querySelector('.synergy-toggle-slider');
  const panel = document.getElementById('synergy-display-panel');
  
  const speedVal = document.getElementById('metric-speed-val');
  const speedBar = document.getElementById('metric-speed-bar');
  const coherenceVal = document.getElementById('metric-coherence-val');
  const coherenceBar = document.getElementById('metric-coherence-bar');
  
  const desc = document.getElementById('synergy-description');
  const statusDot = document.getElementById('synergy-status-dot');
  const statusPulse = document.querySelector('.status-pulse');
  const statusText = document.getElementById('synergy-status-text');

  // Canvas nodes and lines
  const clientNode = document.querySelector('.node-client .node-circle');
  const serverNode = document.querySelector('.node-server .node-circle');
  const dbNode = document.querySelector('.node-database .node-circle');
  const clientServerLine = document.querySelector('.line-client-server');
  const serverDbLine = document.querySelector('.line-server-db');

  // Warning & Success tags
  const warnings = document.querySelectorAll('.warning-tag');
  const successes = document.querySelectorAll('.success-tag');

  if (!toggleAlone || !toggleConductor || !panel) return;

  // Auto-rotation State loop
  let autoRotateInterval = setInterval(() => {
    if (panel.classList.contains('state-alone')) {
      toggleConductor.click();
    } else {
      toggleAlone.click();
    }
  }, 4500);

  // Clear auto-rotation on user click anywhere in the console box
  const consoleBox = document.querySelector('.synergy-console');
  if (consoleBox) {
    consoleBox.addEventListener('click', () => {
      stopAutoRotation();
    });
  }

  function stopAutoRotation() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Click AI Alone
  toggleAlone.addEventListener('click', (e) => {
    if (e && e.isTrusted) stopAutoRotation();

    // 1. Shift toggle styles
    if (slider) {
      slider.style.transform = 'translateX(0)';
      slider.style.backgroundColor = '#ef4444';
    }
    toggleAlone.style.color = '#fff';
    toggleConductor.style.color = '#94a3b8';
    toggleConductor.classList.add('pulse-highlight');

    // 2. Adjust panel classes
    panel.className = 'state-alone';

    // 3. Metrical dials
    if (speedVal && speedBar) {
      speedVal.innerText = "10x Speed (Raw typing)";
      speedVal.style.color = "#ef4444";
      speedBar.style.backgroundColor = "#ef4444";
      speedBar.style.width = "100%";
    }
    if (coherenceVal && coherenceBar) {
      coherenceVal.innerText = "35% (Build Failure)";
      coherenceVal.style.color = "#ef4444";
      coherenceBar.style.backgroundColor = "#ef4444";
      coherenceBar.style.width = "35%";
    }

    // 4. Update Description copy
    if (desc) {
      desc.innerText = "Without structured scaffolding and security validation checks, raw AI coding generates disjointed modules, legacy database locks, and responsive layout overlaps.";
    }

    // 5. Status indicators
    if (statusDot && statusPulse && statusText) {
      statusDot.style.color = "#ef4444";
      statusPulse.style.backgroundColor = "#ef4444";
      statusText.innerText = "DEPLOY FAILURE (Rollback)";
    }

    // 6. Graph nodes & connections
    if (clientNode) {
      clientNode.style.borderColor = "#ef4444";
      clientNode.style.boxShadow = "0 0 10px rgba(239,68,68,0.25)";
    }
    if (serverNode) {
      serverNode.style.borderColor = "#ef4444";
      serverNode.style.boxShadow = "0 0 10px rgba(239,68,68,0.25)";
    }
    if (dbNode) {
      dbNode.style.borderColor = "#ef4444";
      dbNode.style.boxShadow = "0 0 10px rgba(239,68,68,0.25)";
    }
    if (clientServerLine) {
      clientServerLine.style.borderTop = "2px dashed #ef4444";
    }
    if (serverDbLine) {
      serverDbLine.style.borderTop = "2px dashed #ef4444";
    }

    // 7. Toggle warnings/success visibility
    warnings.forEach(tag => {
      tag.style.opacity = '1';
      tag.style.transform = tag.classList.contains('sql-warn') ? 'translate(-50%, 0)' : 'translateY(0)';
    });
    successes.forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = tag.classList.contains('secure-ok') ? 'translate(-50%, -5px)' : 'translateY(-5px)';
    });
  });

  // Click AI + Jeremy (Conductor)
  toggleConductor.addEventListener('click', (e) => {
    if (e && e.isTrusted) stopAutoRotation();

    // 1. Shift toggle styles
    if (slider) {
      slider.style.transform = 'translateX(100%)';
      slider.style.backgroundColor = 'var(--accent-color)';
    }
    toggleAlone.style.color = '#94a3b8';
    toggleConductor.style.color = '#fff';
    toggleConductor.classList.remove('pulse-highlight');

    // 2. Adjust panel classes
    panel.className = 'state-conductor';

    // 3. Metrical dials
    if (speedVal && speedBar) {
      speedVal.innerText = "10x Speed (Project shipping)";
      speedVal.style.color = "var(--accent-color)";
      speedBar.style.backgroundColor = "var(--accent-color)";
      speedBar.style.width = "100%";
    }
    if (coherenceVal && coherenceBar) {
      coherenceVal.innerText = "99.8% (Production Ready)";
      coherenceVal.style.color = "#10b981";
      coherenceBar.style.backgroundColor = "#10b981";
      coherenceBar.style.width = "100%";
    }

    // 4. Update Description copy
    if (desc) {
      desc.innerText = "AI writes raw code at 10x typing speed. Jeremy provides the system architecture, security auditing, and human UX intuition to turn raw syntax into a scalable software suite.";
    }

    // 5. Status indicators
    if (statusDot && statusPulse && statusText) {
      statusDot.style.color = "#10b981";
      statusPulse.style.backgroundColor = "#10b981";
      statusText.innerText = "RUNNING (Production Stable)";
    }

    // 6. Graph nodes & connections
    if (clientNode) {
      clientNode.style.borderColor = "var(--accent-color)";
      clientNode.style.boxShadow = "0 0 12px rgba(0, 102, 204, 0.4)";
    }
    if (serverNode) {
      serverNode.style.borderColor = "var(--accent-color)";
      serverNode.style.boxShadow = "0 0 12px rgba(0, 102, 204, 0.4)";
    }
    if (dbNode) {
      dbNode.style.borderColor = "#10b981";
      dbNode.style.boxShadow = "0 0 12px rgba(16, 185, 129, 0.4)";
    }
    if (clientServerLine) {
      clientServerLine.style.borderTop = "2px solid var(--accent-color)";
    }
    if (serverDbLine) {
      serverDbLine.style.borderTop = "2px solid #10b981";
    }

    // 7. Toggle warnings/success visibility
    warnings.forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = tag.classList.contains('sql-warn') ? 'translate(-50%, -5px)' : 'translateY(-5px)';
    });
    successes.forEach(tag => {
      tag.style.opacity = '1';
      tag.style.transform = tag.classList.contains('secure-ok') ? 'translate(-50%, 0)' : 'translateY(0)';
    });
  });

  // Bind smooth scrolling for Hero action buttons
  const workBtn = document.getElementById('nav-work-btn');
  if (workBtn) {
    workBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('projects-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const aiWorkflowBtn = document.getElementById('nav-ai-workflow-btn');
  if (aiWorkflowBtn) {
    aiWorkflowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('ai-capabilities-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const hireBtn = document.getElementById('nav-hire-btn');
  if (hireBtn) {
    hireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('projects-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const formName = document.getElementById('contact-name');
          if (formName) formName.focus();
        }, 800);
      }
    });
  }
}
