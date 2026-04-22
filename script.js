// ── CLOCK ──
const clockEl = document.getElementById('clock');
function tick() {
  clockEl.textContent = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(tick, 1000);
tick();

// ── SCROLL PROGRESS ──
const mainEl = document.getElementById('main');
const prog = document.getElementById('prog');
mainEl.addEventListener('scroll', () => {
  const max = mainEl.scrollHeight - mainEl.clientHeight;
  prog.style.width = (max > 0 ? (mainEl.scrollTop / max) * 100 : 0) + '%';
}, { passive: true });

// ── ACTIVE NAV ──
const sections = ['stack', 'projects', 'roadmap', 'github', 'infra', 'guestbook'];
const navItems = document.querySelectorAll('.nav-item');

mainEl.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop - 60 <= mainEl.scrollTop) current = id;
  });
  navItems.forEach(n => {
    n.classList.toggle('active', n.getAttribute('href') === '#' + current);
  });
}, { passive: true });

navItems.forEach(n => n.addEventListener('click', e => {
  e.preventDefault();
  const id = n.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) mainEl.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
}));

// ── SKILL BARS (IntersectionObserver) ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    io.unobserve(e.target);
  });
}, { threshold: 0.2 });
document.querySelectorAll('.panel').forEach(p => io.observe(p));

// ── TOAST ──
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2400);
}

// ── GITHUB STATS ──
(async () => {
  try {
    const u = await fetch('https://api.github.com/users/ChrisRedfield48').then(r => r.json());
    const repos = await fetch('https://api.github.com/users/ChrisRedfield48/repos?per_page=100').then(r => r.json());
    const stars = Array.isArray(repos) ? repos.reduce((s, r) => s + r.stargazers_count, 0) : 0;

    function count(el, n) {
      let v = 0;
      const step = Math.max(1, Math.ceil(n / 16));
      const id = setInterval(() => {
        v = Math.min(v + step, n);
        el.textContent = v;
        if (v >= n) clearInterval(id);
      }, 50);
    }

    count(document.getElementById('gh-repos'), u.public_repos);
    count(document.getElementById('gh-followers'), u.followers);
    count(document.getElementById('gh-stars'), stars);
  } catch { /* silent fail */ }
})();

// ── GUESTBOOK ──
const GB_KEY = 'nip3-gb';

const CMDS = {
  '/help': '→ доступно: /help  /clear  /matrix  /ascii  /uptime',
  '/ascii': '█▄ █ █ █▄█\n█ ▀█ █  █ \nNIP.SYS v3',
  '/uptime': () => `→ онлайн с: ${new Date().toLocaleDateString('ru-RU')}`,
  '/clear': '__CLEAR__',
  '/matrix': '__MATRIX__',
};

function loadGB() {
  try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
  catch { return []; }
}

function saveGB(d) {
  localStorage.setItem(GB_KEY, JSON.stringify(d));
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderGB() {
  const list = document.getElementById('gb-list');
  const empty = document.getElementById('gb-empty');
  const entries = loadGB();
  list.querySelectorAll('.gb-entry').forEach(e => e.remove());
  if (!entries.length) { empty.style.display = ''; return; }
  empty.style.display = 'none';
  [...entries].reverse().forEach(entry => {
    const d = document.createElement('div');
    d.className = 'gb-entry';
    d.innerHTML = `
      <div class="gb-entry-top">
        <span class="gb-ename">${esc(entry.name)}</span>
        <span class="gb-edate">${entry.ts ? new Date(entry.ts).toLocaleDateString('ru-RU') : ''}</span>
      </div>
      <div class="gb-emsg">${esc(entry.msg)}</div>`;
    list.appendChild(d);
  });
}

function matrixRain() {
  let cv = document.getElementById('m-cv');
  if (!cv) {
    cv = document.createElement('canvas');
    cv.id = 'm-cv';
    Object.assign(cv.style, {
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      zIndex: 9998, pointerEvents: 'none'
    });
    document.body.appendChild(cv);
  }
  cv.width = innerWidth;
  cv.height = innerHeight;
  const ctx = cv.getContext('2d');
  const cols = Math.floor(innerWidth / 14);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01ニキタ';
  let f = 0;
  const id = setInterval(() => {
    ctx.fillStyle = 'rgba(12,12,12,0.08)';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = '#c8f050';
    ctx.font = '12px Space Mono, monospace';
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, y * 14);
      if (y * 14 > cv.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    if (++f > 200) { clearInterval(id); cv.remove(); }
  }, 33);
}

document.getElementById('gb-send').addEventListener('click', () => {
  const name = document.getElementById('gb-name').value.trim();
  const msg  = document.getElementById('gb-msg').value.trim();
  if (!name || !msg) { toast('_ введи имя и сообщение'); return; }

  const cmd = CMDS[msg];
  if (cmd !== undefined) {
    document.getElementById('gb-name').value = '';
    document.getElementById('gb-msg').value = '';
    if (cmd === '__CLEAR__') { saveGB([]); renderGB(); toast('_ очищено'); return; }
    if (cmd === '__MATRIX__') { matrixRain(); toast('_ загружаю матрицу...'); return; }
    const txt = typeof cmd === 'function' ? cmd() : cmd;
    const d = loadGB();
    d.push({ name: 'SYSTEM', msg: txt, ts: Date.now() });
    saveGB(d); renderGB();
    return;
  }

  const d = loadGB();
  d.push({ name, msg, ts: Date.now() });
  saveGB(d);
  document.getElementById('gb-name').value = '';
  document.getElementById('gb-msg').value = '';
  renderGB();
  toast('_ записано');
});

document.getElementById('gb-msg').addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) document.getElementById('gb-send').click();
});

renderGB();

// ── KONAMI CODE ──
const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === K[ki]) {
    ki++;
    if (ki === K.length) {
      ki = 0;
      document.documentElement.style.filter = document.documentElement.style.filter ? '' : 'hue-rotate(180deg)';
      toast('_ KONAMI ACTIVATED');
    }
  } else {
    ki = 0;
  }
});