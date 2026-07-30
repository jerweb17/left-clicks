export function renderProjectsShowcase() {
  return `
    <section id="projects-section" class="projects-showcase-container" style="margin-top: var(--spacing-xl); display: flex; flex-direction: column; gap: var(--spacing-md);">
      <div style="text-align: left; margin-bottom: var(--spacing-sm);">
        <h2 style="display: flex; align-items: center; gap: 8px; font-size: clamp(1.8rem, 3vw, 2.2rem);">
          <i class="ph ph-folder-open" style="color: var(--accent-color);"></i> Project Portfolio
        </h2>
        <p style="color: var(--text-secondary); margin-top: 4px;">Featured projects, hardware engineering, and contracting capabilities.</p>
      </div>

      <div class="projects-grid" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--spacing-lg);">
        
        <!-- Project 1: Pueblo Language (Large, 6 columns) -->
        <div class="glass-panel project-card" style="grid-column: span 6 / span 12; display: flex; flex-direction: column; justify-content: space-between; gap: var(--spacing-md);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h3 style="color: var(--accent-color);">Pueblo Language</h3>
              <span class="project-tag">Full-Stack SaaS</span>
            </div>
            <h4 style="font-weight: 500; font-size: 0.95rem; margin-bottom: 12px; opacity: 0.85;">React • Firebase • Bun • Cursor AI</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 16px;">
              Architected the full-stack modernization of a native language learning platform. Integrated high-velocity features and robust Firestore triggers, achieving rapid speed-to-market.
            </p>
            
            <!-- Screenshot Carousel -->
            <div class="carousel-container" style="position: relative; height: 360px; border-radius: 12px; overflow: hidden; background: #070b12; border: 1px solid var(--glass-border);">
              
              <!-- Desktop Navigation Arrows -->
              <button class="carousel-arrow prev-arrow" aria-label="Previous Slide" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 15; transition: background-color 0.2s, opacity 0.2s; opacity: 0.75;">
                <i class="ph ph-caret-left" style="font-size: 1.25rem; font-weight: bold;"></i>
              </button>
              <button class="carousel-arrow next-arrow" aria-label="Next Slide" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 15; transition: background-color 0.2s, opacity 0.2s; opacity: 0.75;">
                <i class="ph ph-caret-right" style="font-size: 1.25rem; font-weight: bold;"></i>
              </button>

              <div class="carousel-slides" style="width: 300%; height: 100%; display: flex; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);">
                
                <!-- Slide 1 -->
                <div class="carousel-slide" style="width: 33.333%; height: 100%; position: relative;">
                  <img src="/assets/pueblo-screenshot1.png" alt="Pueblo Language Dashboard" class="carousel-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width:100%; height:100%; object-fit:contain; background:#070b12;">
                  <div class="carousel-placeholder" style="display:none; width:100%; height:100%; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(135deg, #1e293b, #0f172a); color:#94a3b8; padding: 20px; text-align:center;">
                    <i class="ph ph-image-square" style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 8px;"></i>
                    <strong style="color: #fff; font-size: 0.9rem;">Pueblo Language UI (Screenshot 1)</strong>
                    <span style="font-size: 0.75rem; opacity: 0.7; margin-top: 4px;">Copy "pueblo-screenshot1.png" to public/assets/</span>
                  </div>
                </div>
                
                <!-- Slide 2 -->
                <div class="carousel-slide" style="width: 33.333%; height: 100%; position: relative;">
                  <img src="/assets/pueblo-screenshot2.png" alt="Pueblo Language Lesson Editor" class="carousel-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width:100%; height:100%; object-fit:contain; background:#070b12;">
                  <div class="carousel-placeholder" style="display:none; width:100%; height:100%; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(135deg, #0f172a, #1e293b); color:#94a3b8; padding: 20px; text-align:center;">
                    <i class="ph ph-layout" style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 8px;"></i>
                    <strong style="color: #fff; font-size: 0.9rem;">Course Map & Progress UI (Screenshot 2)</strong>
                    <span style="font-size: 0.75rem; opacity: 0.7; margin-top: 4px;">Copy "pueblo-screenshot2.png" to public/assets/</span>
                  </div>
                </div>

                <!-- Slide 3 -->
                <div class="carousel-slide" style="width: 33.333%; height: 100%; position: relative;">
                  <img src="/assets/pueblo-screenshot3.png" alt="Pueblo Language Lesson Content" class="carousel-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width:100%; height:100%; object-fit:contain; background:#070b12;">
                  <div class="carousel-placeholder" style="display:none; width:100%; height:100%; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(135deg, #1e293b, #151b26); color:#94a3b8; padding: 20px; text-align:center;">
                    <i class="ph ph-desktop" style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 8px;"></i>
                    <strong style="color: #fff; font-size: 0.9rem;">Interactive Classroom View (Screenshot 3)</strong>
                    <span style="font-size: 0.75rem; opacity: 0.7; margin-top: 4px;">Copy "pueblo-screenshot3.png" to public/assets/</span>
                  </div>
                </div>

              </div>
              
              <!-- Navigation dots -->
              <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 10; user-select: none;">
                <span class="carousel-dot active" data-slide="0" style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-color); cursor: pointer; transition: opacity 0.2s;"></span>
                <span class="carousel-dot" data-slide="1" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: opacity 0.2s;"></span>
                <span class="carousel-dot" data-slide="2" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: opacity 0.2s;"></span>
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 12px; margin-top: var(--spacing-sm);">
            <a href="https://pueblolanguage.com" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; padding: 8px 16px; font-size: 0.85rem; display: flex; justify-content: center; align-items: center; gap: 6px;">
              <i class="ph ph-arrow-square-out"></i> Visit Platform
            </a>
          </div>
        </div>

        <!-- Project 2: Hardware & Circuits (6 columns) -->
        <div class="glass-panel project-card" style="grid-column: span 6 / span 12; display: flex; flex-direction: column; justify-content: space-between; gap: var(--spacing-md);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h3 style="color: var(--accent-color);">Hardware & Circuits</h3>
              <span class="project-tag">Electronics & Code</span>
            </div>
            <h4 style="font-weight: 500; font-size: 0.95rem; margin-bottom: 12px; opacity: 0.85;">3D Printing • Arduino • Raspberry Pi • CAD</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 16px;">
              Designed customized mechanical models using Code-CAD workflows. Prototyped and wired custom electronic hardware components integrated with custom control software for physical automation.
            </p>
            
            <!-- Video Container -->
            <div class="video-container" style="position: relative; height: 360px; border-radius: 12px; overflow: hidden; background: #070b12; border: 1px solid var(--glass-border);">
              <video id="hardware-demo-video" controls preload="metadata" style="width: 100%; height: 100%; object-fit: contain; background: #070b12; display: none;">
                <source src="/assets/hardware-demo.mp4" type="video/mp4">
              </video>
              <div id="video-fallback" style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(135deg, #0c1524, #060b13); color:#94a3b8; padding: 20px; text-align:center;">
                <i class="ph ph-cpu" style="font-size: 2.8rem; color: var(--accent-color); margin-bottom: 8px;"></i>
                <strong style="color: #fff; font-size: 0.9rem;">Electronics & 3D Printing Demo</strong>
                <span style="font-size: 0.75rem; opacity: 0.7; margin-top: 4px; max-width: 250px; line-height: 1.3;">Place "hardware-demo.mp4" in public/assets/ to activate video player</span>
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 12px; margin-top: var(--spacing-sm);">
            <button id="play-project-video" class="btn btn-secondary" style="flex: 1; padding: 8px 16px; font-size: 0.85rem; display: flex; justify-content: center; align-items: center; gap: 6px;">
              <i class="ph ph-play"></i> Watch Project Video
            </button>
          </div>
        </div>

        <!-- Project 3: Left Clicks Development Contract Pitch (Full width, 12 columns) -->
        <div class="glass-panel pitch-card" style="grid-column: span 12 / span 12; background: linear-gradient(135deg, var(--glass-bg), rgba(0, 102, 204, 0.04)); display: flex; gap: var(--spacing-lg); align-items: center; border: 1px solid rgba(0, 102, 204, 0.15); flex-wrap: wrap;">
          
          <div style="flex: 1 1 350px; display: flex; flex-direction: column; gap: var(--spacing-sm);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: 1.5rem; color: var(--text-primary); font-weight: 700; margin: 0;">Left Clicks Development</h3>
              <span style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; text-transform: uppercase;">Open for Contracts</span>
            </div>
            <h4 style="color: var(--accent-color); font-weight: 600; font-size: 1.1rem; margin-top: 2px;">Partner with an AI-First Principal Architect</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-top: 6px;">
              Looking to accelerate your software shipping? I contract for selective freelance projects under <strong>Left Clicks Development</strong>. Specializing in high-velocity MVP builds, secure Firebase/cloud integrations, performance optimization, and custom dashboard development. Let's turn your specs into running systems.
            </p>
            
            <div style="display: flex; gap: var(--spacing-lg); margin-top: 8px; flex-wrap: wrap;">
              <span style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-secondary);">
                <i class="ph ph-clock-countdown" style="color: var(--accent-color); font-size: 1.1rem;"></i> 10x Velocity
              </span>
              <span style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-secondary);">
                <i class="ph ph-lock-key" style="color: var(--accent-color); font-size: 1.1rem;"></i> Secure Deployments
              </span>
              <span style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-secondary);">
                <i class="ph ph-stack" style="color: var(--accent-color); font-size: 1.1rem;"></i> Legacy Migrations
              </span>
            </div>
          </div>
          
          <div class="glass-panel contact-pitch-form" style="flex: 1 1 350px; background: rgba(0,0,0,0.02); border: 1px solid var(--glass-border); padding: var(--spacing-md); border-radius: 12px; text-align: left;">
            <h4 style="margin-bottom: var(--spacing-sm); font-size: 1rem; color: var(--text-primary); font-weight: 600;">Start a Project / Hire Me</h4>
            <form id="left-clicks-contact" style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
              <div style="display: flex; gap: var(--spacing-sm);">
                <input type="text" id="contact-name" placeholder="Your Name" required style="width: 50%; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--bg-primary); color: var(--text-primary); font-size: 0.85rem; outline: none;">
                <input type="email" id="contact-email" placeholder="Your Email" required style="width: 50%; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--bg-primary); color: var(--text-primary); font-size: 0.85rem; outline: none;">
              </div>
              <textarea id="contact-message" placeholder="What are you building? Project goals, timeline, details..." required style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--bg-primary); color: var(--text-primary); font-size: 0.85rem; outline: none; min-height: 80px; resize: vertical; font-family: inherit;"></textarea>
              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px; font-size: 0.85rem; border-radius: 8px; font-weight: 600;">
                <i class="ph ph-paper-plane-tilt"></i> Send Inquiry
              </button>
            </form>
            <div id="contact-success" style="display: none; color: #10b981; font-weight: 600; text-align: center; padding: 12px; font-size: 0.9rem;">
              <i class="ph ph-check-circle" style="font-size: 1.4rem; display: block; margin: 0 auto 6px auto;"></i>
              Message received! I'll get back to you shortly.
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}

export function initProjectsShowcase() {
  // 1. Pueblo Screenshot Carousel
  const dots = document.querySelectorAll('.carousel-dot');
  const slides = document.querySelector('.carousel-slides');
  const container = document.querySelector('.carousel-container');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  let currentSlide = 0;
  const totalSlides = 3;

  if (slides) {
    // Shared transition/update mechanism
    function updateCarousel(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      // Translate by 33.333% per slide since we have 3 slides
      slides.style.transform = `translateX(-${currentSlide * 33.333}%)`;
      
      dots.forEach((d, i) => {
        if (i === currentSlide) {
          d.classList.add('active');
          d.style.background = 'var(--accent-color)';
        } else {
          d.classList.remove('active');
          d.style.background = 'rgba(255,255,255,0.4)';
        }
      });
    }

    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        updateCarousel(slideIndex);
      });
    });

    // Arrow navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateCarousel(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateCarousel(currentSlide + 1);
      });
    }

    // Touch Swipe Support (Mobile friendly)
    if (container) {
      let touchStartX = 0;
      let touchEndX = 0;

      container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 55;
        if (touchStartX - touchEndX > swipeThreshold) {
          // Swiped Left -> next slide
          updateCarousel(currentSlide + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
          // Swiped Right -> prev slide
          updateCarousel(currentSlide - 1);
        }
      }, { passive: true });
    }
  }

  // 2. Hardware Video Fallback & Play script
  const video = document.getElementById('hardware-demo-video');
  const fallback = document.getElementById('video-fallback');
  const playBtn = document.getElementById('play-project-video');

  if (video && fallback && playBtn) {
    // Check if video file exists on load
    fetch(video.querySelector('source').src, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          video.style.display = 'block';
          fallback.style.display = 'none';
          playBtn.style.display = 'none'; // Native controls are shown
        }
      })
      .catch(() => {
        // Log or keep placeholder
      });

    playBtn.addEventListener('click', () => {
      video.style.display = 'block';
      fallback.style.display = 'none';
      playBtn.style.display = 'none';
      video.play().catch(err => {
        // If file doesn't exist or play fails, show alert overlay
        video.style.display = 'none';
        fallback.style.display = 'flex';
        playBtn.style.display = 'block';
        alert('Could not find the "hardware-demo.mp4" video file in public/assets/. Please check file naming in public/assets!');
      });
    });
  }

  // 3. Contact Form Submission Simulation
  const form = document.getElementById('left-clicks-contact');
  const successMsg = document.getElementById('contact-success');
  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      console.log('Contract inquiry received:', { name, email, message });

      // Save to localStorage so leads can be seen or retrieved in a mock dashboard
      const leads = JSON.parse(localStorage.getItem('left_clicks_leads') || '[]');
      leads.push({ name, email, message, date: new Date().toISOString() });
      localStorage.setItem('left_clicks_leads', JSON.stringify(leads));

      // Visual success state
      form.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }
}
