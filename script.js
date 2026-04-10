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

// ── GUESTBOOK ──
const GB_KEY = 'nip-guestbook';

function loadEntries() {
  try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
  catch { return []; }
}

function saveEntries(entries) {
  localStorage.setItem(GB_KEY, JSON.stringify(entries));
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
    div.innerHTML = `<div class="gb-name">${sanitize(entry.name)}</div><div class="gb-msg">${sanitize(entry.msg)}</div>`;
    container.appendChild(div);
  });
}

function sanitize(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.getElementById('gb-submit-btn').addEventListener('click', () => {
  const nameEl = document.getElementById('gb-name-input');
  const msgEl  = document.getElementById('gb-msg-input');
  const name = nameEl.value.trim();
  const msg  = msgEl.value.trim();
  if (!name || !msg) return;

  const entries = loadEntries();
  entries.push({ name, msg, ts: Date.now() });
  saveEntries(entries);
  nameEl.value = '';
  msgEl.value  = '';
  renderEntries();
});

renderEntries();