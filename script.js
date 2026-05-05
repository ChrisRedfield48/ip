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

function onScroll() {
  const scrollEl = window.innerWidth <= 640 ? document.documentElement : mainEl;
  const top = scrollEl.scrollTop;
  const max = scrollEl.scrollHeight - scrollEl.clientHeight;
  prog.style.width = (max > 0 ? (top / max) * 100 : 0) + '%';
  updateNav(top);
}

mainEl.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('scroll', onScroll, { passive: true });

// ── ACTIVE NAV ──
const sections = ['stack', 'projects', 'roadmap', 'github', 'infra', 'contacts'];
const navItems = document.querySelectorAll('.nav-item');
const mobileNavItems = document.querySelectorAll('.mn-item');

function updateNav(scrollTop) {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop - 80 <= scrollTop) current = id;
  });
  navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + current));
  mobileNavItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + current));
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.innerWidth <= 640) {
    window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  } else {
    mainEl.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  }
}

navItems.forEach(n => n.addEventListener('click', e => {
  e.preventDefault();
  scrollToSection(n.getAttribute('href').slice(1));
}));

mobileNavItems.forEach(n => n.addEventListener('click', e => {
  e.preventDefault();
  scrollToSection(n.getAttribute('href').slice(1));
}));

// ── PANEL REVEAL (IntersectionObserver) ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    // stagger siblings
    const siblings = e.target.parentElement.querySelectorAll('.reveal');
    siblings.forEach((el, idx) => {
      setTimeout(() => el.classList.add('visible'), idx * 80);
    });
    // also animate skill bars inside
    e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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