import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <header>
    <div class="user-profile">
      <div class="avatar">VS</div>
      <div class="greeting">
        <h1>Vikram Solanki</h1>
        <p>Blinkit • Delhi NCR Zone 4</p>
      </div>
    </div>
    <div class="connection-status">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: var(--transition)">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    </div>
  </header>

  <div class="glass-card hero-card">
    <div class="status-ring">
      <div class="status-icon" id="hero-icon">🛡️</div>
    </div>
    <h2 class="status-title" id="hero-title">Protection Active</h2>
    <p class="status-desc" id="hero-desc">Conditions are safe. You are fully covered if weather disruptions occur today.</p>
  </div>

  <div class="stats-grid">
    <div class="glass-card stat-item">
      <span class="stat-label">Risk Level</span>
      <span class="stat-value highlight-value" id="risk-val">Low / 0.5x</span>
    </div>
    <div class="glass-card stat-item">
      <span class="stat-label" id="metric-label">Temperature</span>
      <span class="stat-value" id="metric-val">32°C</span>
    </div>
  </div>

  <div class="glass-card wallet-card">
    <div class="premium-info">
      <h2>Weekly Premium</h2>
      <div class="premium-amount">₹<span id="premium-val">30</span></div>
    </div>
    <div class="premium-badge">Auto-deducted</div>
  </div>

  <div class="simulator">
    <div class="sim-title">Phase 1: Hazard Simulator</div>
    <div class="sim-buttons">
      <button class="sim-btn active" data-theme="safe">Safe</button>
      <button class="sim-btn" data-theme="heat">Extreme Heat</button>
      <button class="sim-btn" data-theme="flood">Flash Flood</button>
      <button class="sim-btn" data-theme="smog">Severe Smog</button>
      <button class="sim-btn" data-theme="curfew">Zone Curfew</button>
    </div>
  </div>
`

// Theme configuration matching the task
const themes = {
  safe: {
    icon: '🛡️',
    title: 'Protection Active',
    desc: 'Conditions are safe. You are fully covered if weather disruptions occur today.',
    risk: 'Low / 0.5x',
    metricLabel: 'Temperature',
    metricVal: '32°C',
    premium: '30'
  },
  heat: {
    icon: '🔥',
    title: 'Heat Wave Alert',
    desc: '47.2°C detected in your zone. If you log off now, ₹520 payout will be credited instantly.',
    risk: 'Critical / 2.5x',
    metricLabel: 'Temperature',
    metricVal: '47.2°C',
    premium: '70'
  },
  flood: {
    icon: '🌊',
    title: 'Flash Flood Warning',
    desc: 'Waterlogging reported in Zone 4. Deliveries halted. ₹480 payout is automatically available.',
    risk: 'High / 2.0x',
    metricLabel: 'Rainfall',
    metricVal: '14 mm/hr',
    premium: '50'
  },
  smog: {
    icon: '🌫️',
    title: 'Hazardous Air Quality',
    desc: 'AQI > 500 (Severe+). Exertion is highly dangerous. Logging off will trigger ₹410 payout.',
    risk: 'High / 1.8x',
    metricLabel: 'AQI Level',
    metricVal: '512',
    premium: '45'
  },
  curfew: {
    icon: '🚧',
    title: 'Civil Disruption',
    desc: 'Zone curfew declared. Road access blocked. Automatic payout of ₹600 processed to UPI.',
    risk: 'Absolute / 3.0x',
    metricLabel: 'Status',
    metricVal: 'Restricted',
    premium: '30'
  }
}

// Logic for switching themes
const dom = {
  body: document.body,
  heroIcon: document.getElementById('hero-icon'),
  heroTitle: document.getElementById('hero-title'),
  heroDesc: document.getElementById('hero-desc'),
  riskVal: document.getElementById('risk-val'),
  metricLabel: document.getElementById('metric-label'),
  metricVal: document.getElementById('metric-val'),
  premiumVal: document.getElementById('premium-val'),
  simButtons: document.querySelectorAll('.sim-btn')
}

dom.simButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // UI toggle
    dom.simButtons.forEach(b => b.classList.remove('active'))
    e.target.classList.add('active')

    // Apply theme
    const themeName = e.target.getAttribute('data-theme')
    setTheme(themeName)
  })
})

function setTheme(themeName) {
  // Change class on body
  dom.body.className = `theme-${themeName}`
  
  // Animate content change
  const contentEl = [dom.heroIcon, dom.heroTitle, dom.heroDesc, dom.riskVal, dom.metricVal, dom.metricLabel]
  
  contentEl.forEach(el => {
    el.style.opacity = 0
    el.style.transform = 'translateY(10px)'
  })

  setTimeout(() => {
    const t = themes[themeName]
    dom.heroIcon.innerText = t.icon
    dom.heroTitle.innerText = t.title
    dom.heroDesc.innerText = t.desc
    dom.riskVal.innerText = t.risk
    dom.metricLabel.innerText = t.metricLabel
    dom.metricVal.innerText = t.metricVal
    
    // Animate premium ticker
    animateValue(dom.premiumVal, parseInt(dom.premiumVal.innerText), parseInt(t.premium), 500)

    contentEl.forEach(el => {
      el.style.opacity = 1
      el.style.transform = 'translateY(0)'
    })
  }, 250)
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
