// ── CLOCK ──
function updateClock() {
  document.getElementById('clock').textContent =
    new Date().toLocaleTimeString('ru-RU', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// ── THEME ──
const themeBtn = document.getElementById('theme-btn');
if (localStorage.getItem('nip-theme') === 'light') {
  document.body.setAttribute('data-theme', 'light');
  themeBtn.textContent = '🌙';
}
themeBtn.addEventListener('click', () => {
  const isLight = document.body.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('nip-theme', 'dark');
    themeBtn.textContent = '☀️';
  } else {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('nip-theme', 'light');
    themeBtn.textContent = '🌙';
  }
});

// ── AVATAR UPLOAD ──
document.getElementById('coat-of-arms-upload').addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const d = document.getElementById('coat-of-arms-display');
    d.innerHTML = '';
    const img = document.createElement('img');
    img.src = e.target.result;
    d.appendChild(img);
  };
  reader.readAsDataURL(file);
});

// ── TYPEWRITER ──
const fullName = 'НИКИТА ИП';
const el = document.getElementById('typewriter-name');
let i = 0;
function type() {
  if (i <= fullName.length) {
    el.textContent = fullName.slice(0, i);
    i++;
    setTimeout(type, 80 + Math.random() * 60);
  }
}
setTimeout(type, 400);

// ── SKILL BARS (IntersectionObserver) ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.card').forEach(c => observer.observe(c));

// ── TOAST NOTIFICATIONS ──
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ── GUESTBOOK ──
const GB_KEY = 'nip-guestbook';

const EASTER_EGGS = {
  '/help': '💾 Команды: /help, /clear, /ascii, /matrix, /uptime',
  '/ascii': `
███╗   ██╗██╗██████╗
████╗  ██║██║██╔══██╗
██╔██╗ ██║██║██████╔╝
██║╚██╗██║██║██╔═══╝
██║ ╚████║██║██║
╚═╝  ╚═══╝╚═╝╚═╝ .SYS`,
  '/uptime': `⏱ Онлайн с ${new Date(Date.now() - Math.floor(Math.random()*1e7)).toLocaleString('ru-RU')}`,
  '/clear': '__CLEAR__',
  '/matrix': '__MATRIX__',
};

function loadEntries() {
  try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
  catch { return []; }
}

function saveEntries(entries) {
  localStorage.setItem(GB_KEY, JSON.stringify(entries));
}

function sanitize(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderEntries() {
  const entries = loadEntries();
  const container = document.getElementById('gb-entries');
  const emptyEl = document.getElementById('gb-empty');

  container.querySelectorAll('.gb-entry').forEach(e => e.remove());

  if (entries.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }
  emptyEl.style.display = 'none';

  entries.slice().reverse().forEach(entry => {
    const div = document.createElement('div');
    div.className = 'gb-entry';
    const date = entry.ts ? new Date(entry.ts).toLocaleDateString('ru-RU') : '';
    div.innerHTML = `
      <div class="gb-entry-header">
        <div class="gb-name">${sanitize(entry.name)}</div>
        <div class="gb-date">${date}</div>
      </div>
      <div class="gb-msg">${sanitize(entry.msg)}</div>`;
    container.appendChild(div);
  });
}

// Matrix rain easter egg
function runMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const cols = Math.floor(canvas.width / 14);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ニキタイプ';
  let frame = 0;
  const interval = setInterval(() => {
    ctx.fillStyle = 'rgba(10,10,9,0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e8d84a';
    ctx.font = '13px DM Mono, monospace';
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, y * 14);
      if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    frame++;
    if (frame > 200) {
      clearInterval(interval);
      canvas.style.display = 'none';
    }
  }, 33);
}

document.getElementById('gb-submit-btn').addEventListener('click', () => {
  const nameEl = document.getElementById('gb-name-input');
  const msgEl  = document.getElementById('gb-msg-input');
  const name = nameEl.value.trim();
  const msg  = msgEl.value.trim();
  if (!name || !msg) {
    showToast('Заполни имя и сообщение', 'error');
    return;
  }

  // Easter eggs — triggered by msg content
  if (EASTER_EGGS[msg]) {
    const response = EASTER_EGGS[msg];
    nameEl.value = '';
    msgEl.value  = '';
    if (response === '__CLEAR__') {
      saveEntries([]);
      renderEntries();
      showToast('📂 Гостевая книга очищена', 'info');
      return;
    }
    if (response === '__MATRIX__') {
      showToast('🟨 Entering the matrix...', 'info');
      runMatrix();
      return;
    }
    const entries = loadEntries();
    entries.push({ name: '> SYSTEM', msg: response, ts: Date.now() });
    saveEntries(entries);
    renderEntries();
    showToast('⚡ Команда выполнена', 'info');
    return;
  }

  const entries = loadEntries();
  entries.push({ name, msg, ts: Date.now() });
  saveEntries(entries);
  nameEl.value = '';
  msgEl.value  = '';
  renderEntries();
  showToast('✓ Сообщение добавлено', 'success');
});

// Submit on Ctrl+Enter in textarea
document.getElementById('gb-msg-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    document.getElementById('gb-submit-btn').click();
  }
});

renderEntries();

// ── GITHUB STATS ──
async function loadGitHubStats() {
  const username = 'ChrisRedfield48';
  const container = document.getElementById('gh-stats');
  if (!container) return;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposRes.json();
    const totalStars = Array.isArray(repos) ? repos.reduce((s, r) => s + r.stargazers_count, 0) : 0;

    container.innerHTML = `
      <div class="gh-stat"><span class="gh-num">${data.public_repos}</span><span class="gh-label">Репозитории</span></div>
      <div class="gh-stat"><span class="gh-num">${data.followers}</span><span class="gh-label">Подписчики</span></div>
      <div class="gh-stat"><span class="gh-num">${totalStars}</span><span class="gh-label">Звёзды</span></div>
    `;
    container.classList.add('gh-loaded');
  } catch {
    container.innerHTML = `<span style="font-size:0.7rem; color:var(--text-muted)">GitHub недоступен</span>`;
  }
}
loadGitHubStats();

// ── GOALS / ROADMAP PROGRESS ──
const goals = [
  { label: 'HTML & CSS', pct: 85, done: true },
  { label: 'JavaScript', pct: 15, done: false },
  { label: 'React.js', pct: 0, done: false },
  { label: 'Python & AI', pct: 10, done: false },
  { label: 'Node.js', pct: 0, done: false },
];

function renderGoals() {
  const wrap = document.getElementById('roadmap-goals');
  if (!wrap) return;
  wrap.innerHTML = goals.map((g, idx) => `
    <div class="goal-item ${g.done ? 'goal-done' : ''}" style="animation-delay:${0.1 + idx * 0.08}s">
      <div class="goal-row">
        <span class="goal-check">${g.done ? '✓' : '○'}</span>
        <span class="goal-label">${g.label}</span>
        <span class="goal-pct">${g.pct}%</span>
      </div>
      <div class="bar-track" style="margin-top:5px">
        <div class="bar-fill" data-width="${g.pct}" style="background:${g.done ? 'var(--green)' : 'var(--accent)'}"></div>
      </div>
    </div>
  `).join('');

  // Trigger bar animations
  setTimeout(() => {
    wrap.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 200);
}
renderGoals();

// ── CURSOR TRAIL ──
const trail = [];
const TRAIL_LEN = 8;
for (let k = 0; k < TRAIL_LEN; k++) {
  const dot = document.createElement('div');
  dot.className = 'cursor-trail';
  dot.style.opacity = String((TRAIL_LEN - k) / TRAIL_LEN * 0.5);
  dot.style.transform = 'scale(' + ((TRAIL_LEN - k) / TRAIL_LEN * 0.8 + 0.2) + ')';
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateTrail() {
  let x = mouseX, y = mouseY;
  trail.forEach((dot, i) => {
    const prev = i === 0 ? { x: mouseX, y: mouseY } : trail[i - 1];
    dot.x += (prev.x - dot.x) * 0.35;
    dot.y += (prev.y - dot.y) * 0.35;
    dot.el.style.left = dot.x + 'px';
    dot.el.style.top  = dot.y + 'px';
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ── SCROLL PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
});

// ── KONAMI CODE ──
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.key === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      document.body.classList.toggle('party-mode');
      showToast('🎉 PARTY MODE ' + (document.body.classList.contains('party-mode') ? 'ON' : 'OFF'), 'info');
    }
  } else {
    konamiIdx = 0;
  }
});