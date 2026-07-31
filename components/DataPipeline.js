export function renderDataPipeline() {
  return `
    <div id="pipeline-overlay" style="display: none; position: fixed; inset: 0; background: rgba(255,255,255,0.4); backdrop-filter: blur(12px); z-index: 2000; align-items: center; justify-content: center; padding: var(--spacing-lg);">
      <div class="glass-panel" style="width: 100%; max-width: 1000px; height: 85vh; display: flex; flex-direction: column; position: relative; overflow: hidden; background: rgba(255,255,255,0.95);">
        
        <button id="pipeline-close" style="position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 1.5rem; z-index: 10;">
          <i class="ph ph-x"></i>
        </button>

        <div style="padding-bottom: var(--spacing-md); border-bottom: 1px solid rgba(0,0,0,0.05);">
          <h2 style="display: flex; align-items: center; gap: 8px;">
            <i class="ph ph-chart-line-up" style="color: var(--accent-color);"></i> Data Pipeline Showcase
          </h2>
          <p style="font-size: 0.95rem; margin-top: 4px;">Explore how raw data is ingested, transformed, and visualized.</p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: var(--spacing-md) 0;">
          <button class="btn btn-secondary pipeline-tab active" data-dataset="ai">AI Productivity (Mixed Chart)</button>
          <button class="btn btn-secondary pipeline-tab" data-dataset="pokemon">Pokémon TCG (Scatter Plot)</button>
          <button class="btn btn-secondary pipeline-tab" data-dataset="nba">NBA Stats (Radar Chart)</button>
        </div>

        <!-- Pipeline Steps Indicators -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
          <div class="step-indicator" data-step="1" style="padding: 8px; text-align: center; font-weight: 600; border-bottom: 2px solid var(--accent-color); color: var(--accent-color); cursor: pointer;">1. Ingest</div>
          <div class="step-indicator" data-step="2" style="padding: 8px; text-align: center; font-weight: 600; border-bottom: 2px solid rgba(0,0,0,0.1); color: var(--text-secondary); cursor: pointer;">2. Transform</div>
          <div class="step-indicator" data-step="3" style="padding: 8px; text-align: center; font-weight: 600; border-bottom: 2px solid rgba(0,0,0,0.1); color: var(--text-secondary); cursor: pointer;">3. Visualize</div>
        </div>

        <!-- Pipeline Content Area -->
        <div id="pipeline-content" style="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
          <!-- Content gets injected here -->
        </div>

        <!-- Controls -->
        <div style="margin-top: var(--spacing-md); display: flex; justify-content: flex-end; border-top: 1px solid rgba(0,0,0,0.05); padding-top: var(--spacing-md);">
          <button id="pipeline-next" class="btn btn-primary">
            Next Step <i class="ph ph-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initDataPipeline() {
  const trigger = document.getElementById('pipeline-trigger');
  const overlay = document.getElementById('pipeline-overlay');
  const close = document.getElementById('pipeline-close');
  const tabs = document.querySelectorAll('.pipeline-tab');
  const indicators = document.querySelectorAll('.step-indicator');
  const contentArea = document.getElementById('pipeline-content');
  const nextBtn = document.getElementById('pipeline-next');

  let currentDataset = 'ai';
  let currentStep = 1;
  let chartInstance = null;
  let processedDataCache = null;

  const pipelineData = {
    ai: {
      source: '/data/ai_productivity.csv',
      cite: 'GitHub/Microsoft Copilot Research Study',
      ingestCode: `// Fetching multi-dimensional CSV data
fetch('/data/ai_productivity.csv')
  .then(res => res.text())
  .then(csv => parseCSV(csv));`,
      transformCode: `// Multi-metric aggregation for a Mixed Chart
const aggregated = data.reduce((acc, row) => {
  const g = row.group;
  if (!acc[g]) acc[g] = { time: 0, bugs: 0, sat: 0, count: 0 };
  
  acc[g].time += parseInt(row.completion_time_minutes);
  acc[g].bugs += parseInt(row.bugs_found);
  acc[g].sat += parseFloat(row.satisfaction);
  acc[g].count += 1;
  
  return acc;
}, {});

// Map into separate arrays for Chart.js dual-axis
const labels = Object.keys(aggregated);
const avgTime = labels.map(l => aggregated[l].time / aggregated[l].count);
const avgSat = labels.map(l => aggregated[l].sat / aggregated[l].count);`,
      async fetchData() {
        const res = await fetch('/data/ai_productivity.csv');
        const text = await res.text();
        const rows = text.split('\n').slice(1).filter(r => r);
        let controlTime = 0, controlSat = 0, cCount = 0;
        let treatTime = 0, treatSat = 0, tCount = 0;
        rows.forEach(r => {
          const [group, task, time, bugs, sat] = r.split(',');
          if(group.includes('Control')) { controlTime += parseInt(time); controlSat += parseFloat(sat); cCount++; }
          if(group.includes('Treatment')) { treatTime += parseInt(time); treatSat += parseFloat(sat); tCount++; }
        });
        return {
          labels: ['Control (No AI)', 'Treatment (Copilot)'],
          time: [controlTime/cCount, treatTime/tCount],
          sat: [controlSat/cCount, treatSat/tCount]
        };
      },
      renderChart(ctx, data) {
        return new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [
              {
                type: 'line',
                label: 'Developer Satisfaction (out of 5)',
                data: data.sat,
                borderColor: '#34c759',
                backgroundColor: '#34c759',
                borderWidth: 3,
                yAxisID: 'y1',
                tension: 0.3
              },
              {
                type: 'bar',
                label: 'Avg Completion Time (Minutes)',
                data: data.time,
                backgroundColor: ['#86868b', '#0066cc'],
                borderRadius: 8,
                yAxisID: 'y'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'AI Impact: Speed vs Satisfaction (Mixed Chart)' } },
            scales: {
              y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Minutes (Lower = Better)' } },
              y1: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'Satisfaction (Higher = Better)' }, min: 1, max: 5, grid: { drawOnChartArea: false } }
            }
          }
        });
      }
    },
    pokemon: {
      source: 'https://api.pokemontcg.io/v2/cards?q=set.id:base1',
      cite: 'PokemonTCG.io API',
      ingestCode: `// Live API Fetch for deep metadata
fetch('https://api.pokemontcg.io/v2/cards?q=set.id:base1')
  .then(res => res.json())
  .then(data => data.data);`,
      transformCode: `// Mapping HP to Market Price for a Scatter Plot
const scatterData = rawData
  .filter(card => card.hp && card.tcgplayer?.prices?.holofoil?.market)
  .map(card => ({
    x: parseInt(card.hp),
    y: card.tcgplayer.prices.holofoil.market,
    name: card.name
  }));

// Identifies correlations between game stats (HP) and real-world value`,
      async fetchData() {
        const res = await fetch('https://api.pokemontcg.io/v2/cards?q=set.id:base1&pageSize=40');
        const json = await res.json();
        const points = json.data
          .filter(c => c.hp && c.tcgplayer && c.tcgplayer.prices && c.tcgplayer.prices.holofoil)
          .map(c => ({
            x: parseInt(c.hp),
            y: c.tcgplayer.prices.holofoil.market,
            name: c.name
          }));
        return points;
      },
      renderChart(ctx, data) {
        return new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Base Set Holographics',
              data: data,
              backgroundColor: 'rgba(255, 203, 5, 0.7)',
              borderColor: '#3b4cca',
              pointRadius: 8,
              pointHoverRadius: 12
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: 'Pokémon Base Set: HP vs Market Price (Scatter Plot)' },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    const point = ctx.raw;
                    return point.name + ': HP ' + point.x + ' | $' + point.y.toFixed(2);
                  }
                }
              }
            },
            scales: {
              x: { title: { display: true, text: 'Hit Points (HP)' } },
              y: { title: { display: true, text: 'Market Price (USD)' } }
            }
          }
        });
      }
    },
    nba: {
      source: '/data/nba_stats.json',
      cite: 'Kaggle / NBA.com',
      ingestCode: `// Fetching multi-variate player statistics
fetch('/data/nba_stats.json')
  .then(res => res.json())
  .then(data => processStats(data));`,
      transformCode: `// Normalize data for Radar Chart comparison
// We map each player's object to an array of metric values:
// [Points, Assists, Rebounds, Steals, Blocks]

const datasets = topScorers.map(player => ({
  label: player.name,
  data: [
    player.ppg, 
    player.apg * 2, // Scaled for radar visibility
    player.rpg, 
    player.spg * 10, 
    player.bpg * 10
  ]
}));`,
      async fetchData() {
        const res = await fetch('/data/nba_stats.json');
        const json = await res.json();
        return json;
      },
      renderChart(ctx, data) {
        const colors = [
          { border: '#0066cc', bg: 'rgba(0, 102, 204, 0.2)' },
          { border: '#34c759', bg: 'rgba(52, 199, 89, 0.2)' },
          { border: '#e8762d', bg: 'rgba(232, 118, 45, 0.2)' }
        ];
        
        const datasets = data.map((p, i) => ({
          label: p.player,
          data: [p.ppg, p.apg * 2, p.rpg, p.spg * 10, p.bpg * 10], // Scaled for visual comparison
          borderColor: colors[i].border,
          backgroundColor: colors[i].bg,
          borderWidth: 2,
          pointBackgroundColor: colors[i].border
        }));

        return new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Points (PPG)', 'Assists (x2)', 'Rebounds', 'Steals (x10)', 'Blocks (x10)'],
            datasets: datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Top 3 NBA Players Multi-Metric Comparison (Radar Chart)' } }
          }
        });
      }
    }
  };

  async function renderStep() {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    const config = pipelineData[currentDataset];
    updateIndicators();

    if (currentStep === 1) {
      nextBtn.innerHTML = 'Next: Run Transform <i class="ph ph-arrow-right"></i>';
      nextBtn.style.display = 'block';
      contentArea.innerHTML = `
        <div style="padding: 20px; background: #f5f5f7; border-radius: 12px; height: 100%; animation: fadeIn 0.4s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3>Step 1: Ingest Raw Data</h3>
            <span style="font-size: 0.8rem; background: #e0e0e0; padding: 4px 8px; border-radius: 4px;">Source: ${config.source}</span>
          </div>
          <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 16px;">Demonstrating asynchronous data retrieval via HTTP APIs and simulated Data Warehouses.</p>
          <pre><code class="language-javascript">${config.ingestCode}</code></pre>
        </div>
      `;
      if (window.hljs) hljs.highlightAll();
    } 
    else if (currentStep === 2) {
      nextBtn.innerHTML = 'Next: Render Chart <i class="ph ph-arrow-right"></i>';
      nextBtn.style.display = 'block';
      contentArea.innerHTML = `
        <div style="padding: 20px; background: #f5f5f7; border-radius: 12px; height: 100%; animation: fadeIn 0.4s ease;">
          <h3>Step 2: Transform & Aggregate</h3>
          <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 16px;">Using complex JavaScript array methods to clean, group, and structure the data for advanced visualization formats.</p>
          <pre><code class="language-javascript">${config.transformCode}</code></pre>
        </div>
      `;
      if (window.hljs) hljs.highlightAll();
    } 
    else if (currentStep === 3) {
      nextBtn.style.display = 'none';
      contentArea.innerHTML = `
        <div style="padding: 20px; background: white; border-radius: 12px; height: 100%; display: flex; flex-direction: column; animation: fadeIn 0.4s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3>Step 3: Visualize</h3>
            <span style="font-size: 0.8rem; background: #eee; padding: 4px 8px; border-radius: 4px;">Cited: ${config.cite}</span>
          </div>
          <div style="position: relative; flex: 1; min-height: 400px; display: flex; justify-content: center; align-items: center;">
            <div id="loading-chart" style="color: var(--text-secondary);">Fetching & Rendering...</div>
            <canvas id="pipeline-chart" style="display:none;"></canvas>
          </div>
        </div>
      `;
      
      try {
        if (!processedDataCache) {
          processedDataCache = await config.fetchData();
        }
        document.getElementById('loading-chart').style.display = 'none';
        const canvas = document.getElementById('pipeline-chart');
        canvas.style.display = 'block';
        chartInstance = config.renderChart(canvas, processedDataCache);
      } catch(e) {
        document.getElementById('loading-chart').innerHTML = '<span style="color:red;">Error rendering chart: ' + e.message + '</span>';
      }
    }
  }

  function updateIndicators() {
    indicators.forEach(ind => {
      const step = parseInt(ind.dataset.step);
      if (step === currentStep) {
        ind.style.borderBottom = '2px solid var(--accent-color)';
        ind.style.color = 'var(--accent-color)';
      } else if (step < currentStep) {
        ind.style.borderBottom = '2px solid #34c759'; 
        ind.style.color = '#34c759';
      } else {
        ind.style.borderBottom = '2px solid rgba(0,0,0,0.1)';
        ind.style.color = 'var(--text-secondary)';
      }
    });
  }

  // Set up CSS animations dynamically if not present
  if (!document.getElementById('pipeline-styles')) {
    const style = document.createElement('style');
    style.id = 'pipeline-styles';
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  // Event Listeners
  if (trigger) {
    trigger.addEventListener('click', () => {
      overlay.style.display = 'flex';
      currentStep = 1;
      processedDataCache = null;
      renderStep();
      if (window.gsap) {
        gsap.fromTo(overlay.querySelector('.glass-panel'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      }
    });
  }

  if (close) {
    close.addEventListener('click', () => {
      if (window.gsap) {
        gsap.to(overlay, { opacity: 0, duration: 0.2, onComplete: () => overlay.style.display = 'none' });
      } else {
        overlay.style.display = 'none';
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < 3) {
        currentStep++;
        renderStep();
      }
    });
  }

  // Allow clicking indicators to jump steps
  indicators.forEach(ind => {
    ind.addEventListener('click', (e) => {
      const targetStep = parseInt(e.target.dataset.step);
      currentStep = targetStep;
      renderStep();
    });
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => {
        t.style.border = '1px solid rgba(0,0,0,0.1)';
        t.style.color = 'var(--text-primary)';
      });
      e.target.style.border = '1px solid var(--accent-color)';
      e.target.style.color = 'var(--accent-color)';
      currentDataset = e.target.dataset.dataset;
      currentStep = 1;
      processedDataCache = null;
      renderStep();
    });
  });
}
