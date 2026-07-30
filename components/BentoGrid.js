export function renderBentoGrid() {
  return `
    <section id="experience-section" class="experience-timeline-container" style="margin-top: var(--spacing-xl); display: flex; flex-direction: column; gap: var(--spacing-md); user-select: none;">
      
      <div style="text-align: left; margin-bottom: var(--spacing-sm);">
        <h2 style="display: flex; align-items: center; gap: 8px; font-size: clamp(1.8rem, 3vw, 2.2rem);">
          <i class="ph ph-briefcase-metal" style="color: var(--accent-color);"></i> Professional Experience
        </h2>
        <p style="color: var(--text-secondary); margin-top: 4px;">Click on any role to expand and view project details & achievements.</p>
      </div>

      <!-- Vertical Timeline Layout -->
      <div class="timeline-wrapper" style="position: relative; padding: var(--spacing-md) 0; display: flex; flex-direction: column; gap: var(--spacing-lg);">
        
        <!-- Center line -->
        <div class="timeline-line" style="position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: var(--glass-border); z-index: 1;"></div>

        <!-- 1. INTEL CORPORATION (Selected by default) -->
        <div class="timeline-item timeline-selected" data-role="intel" style="position: relative; padding-left: 60px; z-index: 2;">
          <!-- Node circle -->
          <div class="timeline-node" style="position: absolute; left: 17px; top: 22px; width: 16px; height: 16px; border-radius: 50%;"></div>
          
          <div class="glass-panel">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--spacing-sm); margin-bottom: 4px;">
              <div>
                <span class="experience-badge" style="background: var(--accent-color); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 4px; display: inline-block;">15 Years Tenure</span>
                <h3 style="font-size: 1.4rem; color: var(--text-primary); margin: 0;">Intel Corporation</h3>
                <h4 style="color: var(--text-secondary); font-weight: 500; font-size: 1.05rem; margin-top: 2px;">Senior Software Engineer & Supply Chain Analyst</h4>
              </div>
              <span style="color: var(--text-secondary); font-size: 0.88rem; font-weight: 600; background: rgba(0, 102, 204, 0.08); padding: 4px 10px; border-radius: 99px;" class="timeline-date-label">
                Jun 2009 – Sep 2024
              </span>
            </div>
            
            <!-- Collapsible details -->
            <div class="collapsible-details">
              <p style="font-size: 0.98rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 12px;">
                Spearheaded engineering of high-scale enterprise supply chain software and business intelligence web applications. Partnered with cross-functional global teams to deliver mission-critical platforms.
              </p>
              
              <ul style="margin-left: 20px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; display: flex; flex-direction: column; gap: 6px;">
                <li>Designed and architected internal supply chain analytics portals using <strong>C# .NET</strong>, <strong>SQL Server</strong>, and <strong>Angular</strong>.</li>
                <li>Engineered automated ETL pipelines optimizing data retrieval from legacy warehouses, saving thousands of developer hours.</li>
                <li>Mentored incoming interns and junior software engineers with a 100% full-time hire conversion rate.</li>
                <li>Designed interactive executive Dashboards in <strong>Power BI</strong> and <strong>Tableau</strong> used for strategic resource allocation.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 2. PUEBLO LANGUAGE -->
        <div class="timeline-item" data-role="pueblo" style="position: relative; padding-left: 60px; z-index: 2;">
          <!-- Node circle -->
          <div class="timeline-node" style="position: absolute; left: 17px; top: 22px; width: 16px; height: 16px; border-radius: 50%;"></div>
          
          <div class="glass-panel">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--spacing-sm); margin-bottom: 4px;">
              <div>
                <span class="experience-badge" style="background: #10b981; color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 4px; display: inline-block;">Current Role</span>
                <h3 style="font-size: 1.4rem; color: var(--text-primary); margin: 0;">Pueblo Language</h3>
                <h4 style="color: var(--text-secondary); font-weight: 500; font-size: 1.05rem; margin-top: 2px;">Founding Engineer / Lead Developer</h4>
              </div>
              <span style="color: var(--text-secondary); font-size: 0.88rem; font-weight: 600; background: rgba(0, 102, 204, 0.08); padding: 4px 10px; border-radius: 99px;" class="timeline-date-label">
                Nov 2025 – Present
              </span>
            </div>
            
            <!-- Collapsible details -->
            <div class="collapsible-details">
              <p style="font-size: 0.98rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 12px;">
                Architecting the migration of a language learning portal into a scalable modern web system. Built from the ground up to support heavy, interactive lesson workflows.
              </p>
              
              <ul style="margin-left: 20px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; display: flex; flex-direction: column; gap: 6px;">
                <li>Designed full-stack data models and authentication triggers using <strong>Firebase Firestore, Functions, & Auth</strong>.</li>
                <li>Constructed the core classroom and lessons map UI using <strong>React.js</strong> and bundled using <strong>Bun</strong> for zero-latency boots.</li>
                <li>Leveraged AI-assisted programming to construct boilerplate modules, accelerating shipping timeline cycles.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 3. PACS -->
        <div class="timeline-item" data-role="pacs" style="position: relative; padding-left: 60px; z-index: 2;">
          <!-- Node circle -->
          <div class="timeline-node" style="position: absolute; left: 17px; top: 22px; width: 16px; height: 16px; border-radius: 50%;"></div>
          
          <div class="glass-panel">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--spacing-sm); margin-bottom: 4px;">
              <div>
                <span class="experience-badge" style="background: #e8762d; color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 4px; display: inline-block;">SaaS Product</span>
                <h3 style="font-size: 1.4rem; color: var(--text-primary); margin: 0;">PACS</h3>
                <h4 style="color: var(--text-secondary); font-weight: 500; font-size: 1.05rem; margin-top: 2px;">Application Developer</h4>
              </div>
              <span style="color: var(--text-secondary); font-size: 0.88rem; font-weight: 600; background: rgba(0, 102, 204, 0.08); padding: 4px 10px; border-radius: 99px;" class="timeline-date-label">
                Jul 2025 – Oct 2025
              </span>
            </div>
            
            <!-- Collapsible details -->
            <div class="collapsible-details">
              <p style="font-size: 0.98rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 12px;">
                Maintained auditing compliance software systems and designed reporting widgets for corporate metrics mapping.
              </p>
              
              <ul style="margin-left: 20px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; display: flex; flex-direction: column; gap: 6px;">
                <li>Developed web tools for compliance and reporting utilizing <strong>C#</strong>, <strong>CSHTML</strong>, and <strong>JavaScript</strong>.</li>
                <li>Built robust workforce management systems that streamlined scheduling and audit workflows.</li>
                <li>Worked in a fast-paced environment ensuring strict adherence to enterprise data security principles.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </section>
  `;
}

export function initExperienceTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const card = item.querySelector('.glass-panel');
    if (!card) return;

    card.addEventListener('click', () => {
      // De-select all items
      items.forEach(otherItem => {
        otherItem.classList.remove('timeline-selected');
        const badge = otherItem.querySelector('.experience-badge');
        if (badge) {
          badge.style.opacity = '0.5';
        }
        const label = otherItem.querySelector('.timeline-date-label');
        if (label) {
          label.style.background = 'rgba(0, 0, 0, 0.03)';
        }
      });

      // Select clicked item
      item.classList.add('timeline-selected');
      const activeBadge = item.querySelector('.experience-badge');
      if (activeBadge) {
        activeBadge.style.opacity = '1';
      }
      const activeLabel = item.querySelector('.timeline-date-label');
      if (activeLabel) {
        activeLabel.style.background = 'rgba(0, 102, 204, 0.08)';
      }
    });
  });

  // Run initial state highlights for Intel
  const defaultSelected = document.querySelector('.timeline-item.timeline-selected');
  if (defaultSelected) {
    const activeBadge = defaultSelected.querySelector('.experience-badge');
    if (activeBadge) activeBadge.style.opacity = '1';
    const activeLabel = defaultSelected.querySelector('.timeline-date-label');
    if (activeLabel) activeLabel.style.background = 'rgba(0, 102, 204, 0.08)';
  }

  // Set initial opacities for others
  items.forEach(item => {
    if (!item.classList.contains('timeline-selected')) {
      const badge = item.querySelector('.experience-badge');
      if (badge) badge.style.opacity = '0.5';
    }
  });
}
