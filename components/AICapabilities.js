export function renderAICapabilities() {
  return `
    <section id="ai-capabilities-section" class="ai-capabilities-container" style="margin-top: var(--spacing-xl); display: flex; flex-direction: column; gap: var(--spacing-md);">
      
      <div style="text-align: left; margin-bottom: var(--spacing-sm);">
        <h2 style="display: flex; align-items: center; gap: 10px; font-size: clamp(1.8rem, 3vw, 2.2rem);">
          <video autoplay loop muted playsinline style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid var(--glass-border); background: #070b12; flex-shrink: 0; box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);">
            <source src="/assets/left-clicks-logo-animate.mp4" type="video/mp4">
          </video>
          AI-First Capabilities & Workflow
        </h2>
        <p style="color: var(--text-secondary); margin-top: 4px;">Pioneering rapid feature shipping by pairing developer oversight with agentic code generation.</p>
      </div>

      <!-- Main Columns: Pitch on Left, Tool Stack on Right -->
      <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--spacing-lg); align-items: stretch;">
        
        <!-- Left Column: The Velocity Pitch & Division of Labor -->
        <div class="glass-panel capabilities-left" style="display: flex; flex-direction: column; justify-content: space-between; gap: var(--spacing-sm); padding: var(--spacing-lg); text-align: left;">
          <div>
            <h3 style="font-size: 1.35rem; color: var(--text-primary); margin-bottom: 6px;">The 10x Developer Division of Labor</h3>
            <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary);">
              When writing software with AI, syntax and language specifics become implementation details. The developer is freed from manual typing and can focus on system state, user requirements, and secure architectures.
            </p>

            <!-- Division of Labor Side-by-Side Sub-Cards -->
            <div class="synergy-split-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 14px; margin-bottom: 14px;">
              
              <!-- Jeremy Column -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 12px; text-align: left;">
                <strong style="color: var(--accent-color); font-size: 0.88rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                  <i class="ph ph-user-gear"></i> Jeremy (The Director)
                </strong>
                <ul style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; display: flex; flex-direction: column; gap: 6px; list-style: none; padding-left: 0; margin: 0;">
                  <li><span style="color: var(--text-primary); font-weight: 600;">System Architect:</span> Directs the database structures, security parameters, and modular API endpoints.</li>
                  <li><span style="color: var(--text-primary); font-weight: 600;">State & Logic:</span> Owns how data is collected, stored, and the exact state behavior of the app.</li>
                  <li><span style="color: var(--text-primary); font-weight: 600;">QA & Intuition:</span> Inspects UX flows from a human perspective, checks edge-case logic, and runs tests.</li>
                </ul>
              </div>

              <!-- AI Column -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 12px; text-align: left;">
                <strong style="color: #10b981; font-size: 0.88rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                  <i class="ph ph-sparkle"></i> AI Agents (The Synthesizers)
                </strong>
                <ul style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; display: flex; flex-direction: column; gap: 6px; list-style: none; padding-left: 0; margin: 0;">
                  <li><span style="color: var(--text-primary); font-weight: 600;">Polyglot Syntax:</span> Holds complete syntax mapping of every coding language and library in existence.</li>
                  <li><span style="color: var(--text-primary); font-weight: 600;">Deep Spec Research:</span> Performs localized research on tools & packages to apply modern formatting standards.</li>
                  <li><span style="color: var(--text-primary); font-weight: 600;">Typing Speed:</span> Generates scaffolding, type parameters, and repetitive CRUD handlers at lightning speed.</li>
                </ul>
              </div>
              
            </div>
          </div>

          <!-- Playground Trigger Box -->
          <div style="background: rgba(0, 102, 204, 0.04); border: 1px dashed rgba(0, 102, 204, 0.15); border-radius: 10px; padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-md); flex-wrap: wrap; margin-top: 4px;">
            <div style="flex: 1; min-width: 200px;">
              <strong style="color: var(--text-primary); font-size: 0.92rem; display: block; margin-bottom: 2px;">Interactive Sandbox</strong>
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Watch a live code-generation agent run mock tests, database migrations, and compiler loops in real time.</span>
            </div>
            <button id="open-sandbox-modal-btn" class="btn btn-primary" style="background: var(--accent-color); padding: 8px 16px; font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 6px; border-radius: 6px;">
              <i class="ph ph-terminal-window" style="font-size: 1.1rem;"></i> Open Sandbox
            </button>
          </div>
        </div>

        <!-- Right Column: Visual Stage Pipeline -->
        <div class="glass-panel capabilities-right" style="padding: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-md); text-align: left;">
          <h3 style="font-size: 1.3rem; color: var(--text-primary); margin-bottom: 4px;">Our Engineering Pipeline</h3>
          
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Stage 1 -->
            <div style="display: flex; gap: var(--spacing-sm); align-items: flex-start;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(56, 189, 248, 0.1); border: 1px solid var(--accent-color); color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;">1</div>
              <div>
                <strong style="color: var(--text-primary); font-size: 0.92rem; display: block;">Architectural Scaffolding</strong>
                <span style="color: var(--text-secondary); font-size: 0.84rem; display: block; line-height: 1.4; margin-top: 2px;">The human developer outlines modular structures, database relationship schemes, and security specs.</span>
              </div>
            </div>
            <!-- Stage 2 -->
            <div style="display: flex; gap: var(--spacing-sm); align-items: flex-start;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(56, 189, 248, 0.1); border: 1px solid var(--accent-color); color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;">2</div>
              <div>
                <strong style="color: var(--text-primary); font-size: 0.92rem; display: block;">Agentic Coding</strong>
                <span style="color: var(--text-secondary); font-size: 0.84rem; display: block; line-height: 1.4; margin-top: 2px;">AI agents write boilerplate, TypeScript types, and Bun server controllers at lightspeed.</span>
              </div>
            </div>
            <!-- Stage 3 -->
            <div style="display: flex; gap: var(--spacing-sm); align-items: flex-start;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(56, 189, 248, 0.1); border: 1px solid var(--accent-color); color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;">3</div>
              <div>
                <strong style="color: var(--text-primary); font-size: 0.92rem; display: block;">Audit & Verification</strong>
                <span style="color: var(--text-secondary); font-size: 0.84rem; display: block; line-height: 1.4; margin-top: 2px;">Automated scanners check for SQL injection, verify type safety, and execute unit test builds.</span>
              </div>
            </div>
            <!-- Stage 4 -->
            <div style="display: flex; gap: var(--spacing-sm); align-items: flex-start;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;">4</div>
              <div>
                <strong style="color: var(--text-primary); font-size: 0.92rem; display: block;">Human Validation</strong>
                <span style="color: var(--text-secondary); font-size: 0.84rem; display: block; line-height: 1.4; margin-top: 2px;">The developer inspects responsiveness, UX flows, and checks logic coherence before final release.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Relocated Agentic Playground Modal -->
      <div id="agent-modal" style="display: none; position: fixed; inset: 0; background: rgba(10, 14, 23, 0.65); backdrop-filter: blur(12px); z-index: 3000; align-items: center; justify-content: center; padding: var(--spacing-lg);">
        <div class="glass-panel" style="width: 100%; max-width: 950px; height: 80vh; display: flex; flex-direction: column; background: #0a0f1d; border: 1px solid rgba(255, 255, 255, 0.1); padding: 0; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
          
          <!-- Header with window controls -->
          <div style="background: #111827; padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); user-select: none;">
            <div style="display: flex; gap: 8px;">
              <span id="agent-modal-close" style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56; display: inline-block; cursor: pointer;" title="Close Workspace"></span>
              <span style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e; display: inline-block;"></span>
              <span style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f; display: inline-block;"></span>
            </div>
            <div style="color: #94a3b8; font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 6px;">
              <i class="ph ph-terminal-window" style="color: var(--accent-color);"></i> AI Agent Developer Workspace
            </div>
            <div style="width: 12px;"></div>
          </div>
          
          <div id="modal-workspace-wrapper">
            <!-- Sidebar Selector -->
            <div style="width: 240px; background: #0f1624; border-right: 1px solid rgba(255, 255, 255, 0.06); display: flex; flex-direction: column; gap: var(--spacing-sm); padding: var(--spacing-md); user-select: none; min-height: 0;">
              <h5 style="color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-bottom: 8px;">Select Agent Action</h5>
              
              <button class="scenario-btn active-btn" data-scenario="api" style="text-align: left; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; width: 100%; border: none;">
                <i class="ph ph-lightning"></i> API Optimization
              </button>
              <button class="scenario-btn" data-scenario="react" style="text-align: left; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; width: 100%; border: none;">
                <i class="ph ph-atom"></i> React Form Builder
              </button>
              <button class="scenario-btn" data-scenario="schema" style="text-align: left; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; width: 100%; border: none;">
                <i class="ph ph-database"></i> Schema Migration
              </button>
              
              <div style="margin-top: auto; padding-top: var(--spacing-md); border-top: 1px solid rgba(255, 255, 255, 0.06); display: flex; flex-direction: column; gap: 8px;">
                <button id="agent-execute-btn" class="btn btn-primary" style="padding: 10px; font-size: 0.85rem; border-radius: 8px; width: 100%; font-weight: 600;">
                  <i class="ph ph-sparkle"></i> Run AI Agent
                </button>
              </div>
            </div>
            
            <!-- Editor & Console Content Panel -->
            <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #070b13; min-height: 0;">
              
              <!-- Code Tab header -->
              <div style="background: #0b0f19; padding: 8px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-size: 0.8rem; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; user-select: none;">
                <span style="color: #f1f5f9; display: flex; align-items: center; gap: 6px; font-weight: 500;">
                  <i class="ph ph-file-code" style="color: var(--accent-color);"></i> <span id="playground-filename">api_optimizer.py</span>
                </span>
                <span id="agent-activity-status" style="font-size: 0.75rem; color: #64748b; background: rgba(255,255,255,0.03); padding: 2px 8px; border-radius: 4px;">Agent Idle</span>
              </div>
              
              <!-- Split Panel: Code (top) and Terminal (bottom) -->
              <div style="display: flex; flex-direction: column; flex: 1; overflow: hidden; min-height: 0;">
                
                <!-- Code Block Typing area -->
                <div style="flex: 1.2; overflow-y: auto; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-family: 'Fira Code', Consolas, monospace; font-size: 0.8rem; line-height: 1.5; color: #38bdf8; background: #060910; text-align: left; min-height: 0;">
                  <pre style="margin:0;"><code id="playground-code"># Click "Run AI Agent" to watch code generation...</code></pre>
                </div>
                
                <!-- Terminal logs and Rendering preview split -->
                <div class="terminal-preview-split" style="background: #03060a; border-top: 1px solid rgba(255, 255, 255, 0.04);">
                  <!-- Logs -->
                  <div id="playground-terminal" style="flex: 1.2; padding: 14px; overflow-y: auto; font-family: 'Fira Code', Consolas, monospace; font-size: 0.78rem; line-height: 1.6; color: #e2e8f0; border-right: 1px solid rgba(255, 255, 255, 0.04); text-align: left; min-width: 250px; min-height: 0;">
                    <div style="color: #64748b;">// Compilation logs appear here...</div>
                  </div>
                  
                  <!-- Result visual box -->
                  <div style="flex: 1; background: #070b13; padding: 14px; display: flex; flex-direction: column; overflow-y: auto; justify-content: flex-start; align-items: flex-start; min-width: 200px; min-height: 0;">
                    <h6 style="color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; width: 100%; text-align: left; user-select: none;">Live Preview / Output</h6>
                    <div id="playground-preview" style="width: 100%; flex: 1; display: flex; justify-content: center; align-items: center; border: 1px dashed rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 10px; background: rgba(0,0,0,0.1); min-height: 0;">
                      <div style="color: #64748b; font-size: 0.8rem; text-align: center; user-select: none;">Waiting for execution...</div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initAICapabilities() {
  const triggerBtn = document.getElementById('open-sandbox-modal-btn');
  const modal = document.getElementById('agent-modal');
  const closeBtn = document.getElementById('agent-modal-close');
  
  if (!triggerBtn || !modal) return;

  // Scenarios list data
  const scenarios = {
    api: {
      filename: "api_optimizer.py",
      code: `import redis
from models import DB, UserProfile

# Optimized API Endpoint with eager-loading and caching
class UserProfileAPI:
    def __init__(self):
        self.cache = redis.Redis(host='localhost', port=6379, db=0)
        
    def get_profile(self, user_id):
        # 1. Check Redis Cache
        cached_data = self.cache.get(f"profile:{user_id}")
        if cached_data:
            return cached_data
            
        # 2. Cache Miss: Execute optimized join query (select_related)
        profile = DB.session.query(UserProfile)\\
            .options(DB.joinedload(UserProfile.settings))\\
            .filter(UserProfile.id == user_id).first()
            
        # 3. Store in cache for 300 seconds
        self.cache.setex(f"profile:{user_id}", 300, profile.json())
        return profile.json()`,
      logs: [
        { text: "$ python api_optimizer.py --user-id=107", color: "#94a3b8" },
        { text: "[Analyze] legacy query overhead: 14 queries detected (N+1)", color: "#ef4444" },
        { text: "[Analyze] average database response time: 480ms", color: "#ef4444" },
        { text: "[Compile] optimizing query plan... mapping SQL joins", color: "#38bdf8" },
        { text: "[Compile] caching middleware bound via local Redis instance", color: "#38bdf8" },
        { text: "[Test] running automated Vitest load test...", color: "#94a3b8" },
        { text: "  ✓ 100 concurrent threads completed with 0 errors", color: "#10b981" },
        { text: "[Success] query index established. latency reduced: 480ms -> 12ms", color: "#10b981" },
        { text: "[Success] performance multiplier: 40x speedup ⚡", color: "#10b981" }
      ],
      preview: `
        <div style="width: 100%; text-align: center; padding: 10px;">
          <strong style="color: #fff; font-size: 0.85rem; display: block; margin-bottom: 8px;">Database Query Speedup</strong>
          <div style="display: flex; flex-direction: column; gap: 8px; text-align: left;">
            <div>
              <span style="font-size: 0.7rem; color: #94a3b8;">Original Latency (N+1 Query): 480ms</span>
              <div style="background: #ef4444; height: 12px; width: 100%; border-radius: 4px;"></div>
            </div>
            <div>
              <span style="font-size: 0.7rem; color: #94a3b8;">Optimized Latency (Cached + Joined): 12ms</span>
              <div style="background: #10b981; height: 12px; width: 5%; min-width: 8px; border-radius: 4px; box-shadow: 0 0 10px rgba(16,185,129,0.5);"></div>
            </div>
          </div>
        </div>
      `
    },
    react: {
      filename: "ContactForm.tsx",
      code: `import React, { useState } from 'react';

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [val, setVal] = useState('');
  
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg max-w-sm">
      <h3 className="text-white text-sm font-semibold mb-2">Hire Jeremy Webster</h3>
      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-2">
          <input 
            type="text" 
            placeholder="Type 'Hello' to test..." 
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full text-xs p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 outline-none"
            required
          />
          <button className="w-full text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold p-2 rounded">
            Submit Proposal
          </button>
        </form>
      ) : (
        <div className="text-emerald-400 text-xs text-center py-4">✓ Success! Form state working.</div>
      )}
    </div>
  );
};`,
      logs: [
        { text: "$ npm run build:component --name=ContactForm", color: "#94a3b8" },
        { text: "[Drafting] writing React component definition...", color: "#38bdf8" },
        { text: "[Drafting] generating hook states for form submit", color: "#38bdf8" },
        { text: "[Styling] bundling CSS utilities using Tailwind CSS v4...", color: "#38bdf8" },
        { text: "[Test] executing Vitest suite...", color: "#94a3b8" },
        { text: "  ✓ renders contact form elements correctly", color: "#10b981" },
        { text: "  ✓ updates state value on input change", color: "#10b981" },
        { text: "  ✓ calls onSubmit when button triggers", color: "#10b981" },
        { text: "[Success] module bundled in 140ms. interactive preview loaded.", color: "#10b981" }
      ],
      preview: `
        <div style="width: 100%; padding: 4px; text-align: left;" id="mock-form-container">
          <h6 style="color:#fff; font-size: 0.8rem; margin-bottom: 6px;">ContactForm.tsx (Live Render)</h6>
          <div style="background:#0f172a; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
            <div id="mock-form-state">
              <input type="text" id="mock-form-input" placeholder="Type hello..." style="width:100%; font-size: 0.75rem; padding: 6px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:#020617; color:#fff; margin-bottom:8px; outline:none;">
              <button id="mock-form-submit" style="width:100%; font-size:0.75rem; padding:6px; border-radius:4px; border:none; background:#38bdf8; color:#000; font-weight:700; cursor:pointer;">Submit Proposal</button>
            </div>
            <div id="mock-form-success" style="display:none; color:#10b981; font-size:0.75rem; text-align:center; padding: 8px 0;">
              ✓ Success! Simulated React state triggered.
            </div>
          </div>
        </div>
      `
    },
    schema: {
      filename: "schema-update.sql",
      code: `-- SQL Script: Transactional database index migration
BEGIN TRANSACTION;

-- 1. Create table indices for optimizing query lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_recruiter_leads_email
ON "RecruiterLeads" (email);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_recruiter_leads_created_at
ON "RecruiterLeads" (created_at DESC);

-- 2. Validate indices and commit transaction
COMMIT;`,
      logs: [
        { text: "$ psql -d left-clicks-prod -f schema-update.sql", color: "#94a3b8" },
        { text: "[Migration] schema analyze: checking database locking status...", color: "#38bdf8" },
        { text: "[Migration] indices declared CONCURRENTLY: table writes safe", color: "#38bdf8" },
        { text: "[Execute] running transaction blocks...", color: "#38bdf8" },
        { text: "  ├── CREATE INDEX CONCURRENTLY: idx_recruiter_leads_email ... OK", color: "#e2e8f0" },
        { text: "  └── CREATE INDEX CONCURRENTLY: idx_recruiter_leads_created ... OK", color: "#e2e8f0" },
        { text: "[Test] testing query planner optimizations...", color: "#94a3b8" },
        { text: "  ✓ query index scans preferred over sequence scan", color: "#10b981" },
        { text: "[Success] migration complete. leads lookups reduced to 0.1ms.", color: "#10b981" }
      ],
      preview: `
        <div style="width: 100%; text-align: left; font-family: monospace; font-size: 0.72rem; color: #94a3b8;">
          <strong style="color: #fff; font-size: 0.8rem; display: block; margin-bottom: 6px;">Schema visual</strong>
          <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); padding: 8px; border-radius: 6px;">
            <span style="color: #38bdf8;">Table:</span> RecruiterLeads<br>
            ├── id [UUID] [PK]<br>
            ├── email [VARCHAR] <span style="color: #10b981;">[Index]</span><br>
            ├── name [VARCHAR]<br>
            └── created_at [TIMESTAMP] <span style="color: #10b981;">[Index]</span>
          </div>
        </div>
      `
    }
  };

  let playgroundRunning = false;
  let activeScenario = 'api';
  let playgroundTimeout;

  // Open modal
  triggerBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock background scroll
    // Trigger initial default execute
    executeScenario(activeScenario);
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Unlock background scroll
      clearTimeout(playgroundTimeout);
      playgroundRunning = false;
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      clearTimeout(playgroundTimeout);
      playgroundRunning = false;
    }
  });

  // Scenario buttons selection
  const scenarioBtns = document.querySelectorAll('#agent-modal .scenario-btn');
  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (playgroundRunning) return;
      
      const targetBtn = e.target.closest('.scenario-btn');
      scenarioBtns.forEach(b => {
        b.classList.remove('active-btn');
        b.style.background = 'none';
        b.style.borderColor = 'transparent';
        b.style.color = '#94a3b8';
      });

      targetBtn.classList.add('active-btn');
      targetBtn.style.background = 'rgba(56, 189, 248, 0.08)';
      targetBtn.style.border = '1px solid rgba(56, 189, 248, 0.2)';
      targetBtn.style.color = '#38bdf8';

      activeScenario = targetBtn.dataset.scenario;
      document.getElementById('playground-filename').innerText = scenarios[activeScenario].filename;
      
      const codeBlock = document.getElementById('playground-code');
      codeBlock.innerText = `# Click "Run AI Agent" to compile ${scenarios[activeScenario].filename}...`;
      
      document.getElementById('playground-terminal').innerHTML = `<div style="color: #64748b;">// Ready to run...</div>`;
      document.getElementById('playground-preview').innerHTML = `<div style="color: #64748b; font-size: 0.8rem; text-align: center;">Waiting for execution...</div>`;
    });
  });

  // Execute scenario
  const executeBtn = document.getElementById('agent-execute-btn');
  if (executeBtn) {
    executeBtn.addEventListener('click', () => {
      if (!playgroundRunning) {
        executeScenario(activeScenario);
      }
    });
  }

  async function executeScenario(scKey) {
    playgroundRunning = true;
    if (executeBtn) {
      executeBtn.style.opacity = '0.5';
      executeBtn.style.cursor = 'not-allowed';
    }
    document.getElementById('agent-activity-status').innerText = "Running Agent...";
    document.getElementById('agent-activity-status').style.color = "#38bdf8";

    const data = scenarios[scKey];
    const codeBlock = document.getElementById('playground-code');
    const termBlock = document.getElementById('playground-terminal');
    const prevBlock = document.getElementById('playground-preview');

    codeBlock.innerHTML = "";
    termBlock.innerHTML = "";
    prevBlock.innerHTML = `<div style="color: #64748b; font-size: 0.8rem; text-align: center;">Analyzing...</div>`;

    // 1. Type Code
    await typeText(codeBlock, data.code, 6);
    
    // 2. Play Console
    for (let i = 0; i < data.logs.length; i++) {
      const line = document.createElement('div');
      line.style.color = data.logs[i].color;
      line.style.marginBottom = "4px";
      termBlock.appendChild(line);
      termBlock.scrollTop = termBlock.scrollHeight;
      
      await typeText(line, data.logs[i].text, 10);
      await wait(150 + Math.random() * 150);
    }

    // 3. Render Output Visual
    prevBlock.innerHTML = data.preview;

    // React interactive form bindings if selected
    if (scKey === 'react') {
      const mockSubmit = document.getElementById('mock-form-submit');
      const mockInput = document.getElementById('mock-form-input');
      const mockState = document.getElementById('mock-form-state');
      const mockSuccess = document.getElementById('mock-form-success');

      if (mockSubmit && mockInput) {
        mockSubmit.addEventListener('click', () => {
          if (mockInput.value.trim() !== '') {
            mockState.style.display = 'none';
            mockSuccess.style.display = 'block';
          } else {
            mockInput.style.borderColor = '#ef4444';
            setTimeout(() => mockInput.style.borderColor = 'rgba(255,255,255,0.1)', 1000);
          }
        });
      }
    }

    document.getElementById('agent-activity-status').innerText = "Agent Idle";
    document.getElementById('agent-activity-status').style.color = "#64748b";
    if (executeBtn) {
      executeBtn.style.opacity = '1';
      executeBtn.style.cursor = 'pointer';
    }
    playgroundRunning = false;
  }

  // Typewriting function
  function typeText(element, text, speed = 10) {
    return new Promise((resolve) => {
      let index = 0;
      function type() {
        if (index < text.length) {
          if (text[index] === '\n') {
            element.innerHTML += '<br>';
          } else if (text[index] === ' ' && text[index-1] === ' ') {
            element.innerHTML += '&nbsp;';
          } else {
            element.innerHTML += escapeHtml(text[index]);
          }
          index++;
          playgroundTimeout = setTimeout(type, speed);
        } else {
          resolve();
        }
      }
      type();
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
