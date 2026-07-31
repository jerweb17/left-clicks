export function renderFooter() {
  return `
    <footer class="page-footer" style="margin-top: var(--spacing-xl); padding-top: var(--spacing-lg); border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--spacing-md); color: var(--text-secondary); font-size: 0.95rem;">
      
      <div>
        <strong>Education:</strong> B.S. Information Systems, BYU (2009) | Full Stack Web Dev, Udacity (2017)
      </div>
      
      <div style="display: flex; gap: var(--spacing-md);">
        <a href="mailto:Jerweb17@gmail.com" style="color: var(--text-secondary); text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color 0.2s;">
          <i class="ph ph-envelope-simple"></i> Email
        </a>
        <a href="tel:3854751916" style="color: var(--text-secondary); text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color 0.2s;">
          <i class="ph ph-phone"></i> 385-475-1916
        </a>
      </div>
      
    </footer>
  `;
}
