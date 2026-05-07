// ── NAV SCROLL & DOTS ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });

const SECTIONS = ['hero', 'projects', 'skills', 'contact'];
const dots = document.querySelectorAll('.page-dot');
dots.forEach(d => d.addEventListener('click', () => document.getElementById(d.dataset.target).scrollIntoView({ behavior: 'smooth' })));

window.addEventListener('scroll', () => {
  let curSection = 'hero';
  SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
      curSection = id;
    }
  });
  dots.forEach(d => d.classList.toggle('active', d.dataset.target === curSection));
}, { passive: true });

// ── DATA: PROJECTS ──
const projects = [
  {
    title: 'NIP.SYS v2',
    ru: 'Предыдущая версия портфолио в стиле OS. Сайдбар, GitHub Stats.',
    en: 'Previous OS-style portfolio. Sidebar, GitHub Stats.',
    tags: ['HTML','CSS','JS'],
    link: 'https://chrisredfield48.github.io/nip.sys-v.02/',
    featured: true
  },
  {
    title: 'Projects Hub',
    ru: 'Витрина JS-проектов с динамическими карточками.',
    en: 'JS project showcase with dynamic cards.',
    tags: ['HTML','CSS','JS'],
    link: 'https://chrisredfield48.github.io/Projects/'
  },
  {
    title: 'Python Path',
    ru: 'Страница прогресса изучения Python. Roadmap.',
    en: 'Python learning progress. Roadmap.',
    tags: ['Python','HTML','CSS'],
    link: 'https://chrisredfield48.github.io/python/'
  },
  {
    title: 'Zodiac Calculator',
    ru: 'Определение знака зодиака по дате рождения.',
    en: 'Zodiac sign by birth date.',
    tags: ['JavaScript'],
    link: 'https://chrisredfield48.github.io/zodiac/'
  },
  {
    title: 'Graphic Designer',
    ru: 'Лендинг дизайнера. Верстка, UI компоненты, адаптив.',
    en: 'Designer landing page. Layout, UI components, responsive.',
    tags: ['HTML','CSS'],
    link: 'https://chrisredfield48.github.io/graphic-designer/'
  },
  {
    title: 'Birthday Search',
    ru: 'Поиск дней рождения жильцов по имени.',
    en: 'Search residents birthday by name.',
    tags: ['JavaScript'],
    link: 'https://chrisredfield48.github.io/voda/'
  }
];

const grid = document.getElementById('grid');

// ── RENDER CARDS (No Filters) ──
function renderCards() {
  grid.innerHTML = '';
  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'proj-card' + (p.featured ? ' featured' : '');
    card.style.animationDelay = `${0.05 + i * 0.06}s`;
    
    card.innerHTML = `
      <div class="proj-card-inner">
        <div class="proj-preview">
          <div class="proj-abstract-bg">
            <span class="proj-alias">${p.title.split(' ')[0]}</span>
          </div>
        </div>
        <div class="proj-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="proj-title">${p.title}</div>
        <div class="proj-desc ru">${p.ru}</div>
        <div class="proj-desc en">${p.en}</div>
        <div class="proj-footer">
          <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
          <a href="${p.link}" target="_blank" class="proj-link"><span class="ru">Открыть</span><span class="en">Open</span> →</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}
renderCards();

// ── SMART HOVER (Saves CPU) ──
grid.addEventListener('mousemove', e => {
  const card = e.target.closest('.proj-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  card.style.setProperty('--my', `${e.clientY - rect.top}px`);
});
grid.addEventListener('mouseout', e => {
  const card = e.target.closest('.proj-card');
  if (card) {
    card.style.setProperty('--mx', `-100%`);
    card.style.setProperty('--my', `-100%`);
  }
});

// ── INTERSECTION OBSERVER (Reveal & Skills) ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const bars = e.target.querySelectorAll('.bar-fill');
      bars.forEach(b => b.style.width = b.dataset.w + '%');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .skills-col').forEach(el => io.observe(el));

// ── LANG TOGGLE ──
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.setAttribute('data-lang', btn.dataset.lang);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── THREE.JS BACKGROUND (With Auto-Pause) ──
let isVisible = true;
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 30;

const COUNT = 800;
const pos = new Float32Array(COUNT * 3);
for(let i=0; i < COUNT; i++) {
  pos[i*3] = (Math.random() - .5) * 120;
  pos[i*3+1] = (Math.random() - .5) * 80;
  pos[i*3+2] = (Math.random() - .5) * 60;
}
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const mat = new THREE.PointsMaterial({ size: 0.35, color: 0x6c63ff, transparent: true, opacity: 0.6 });
const points = new THREE.Points(geo, mat);
scene.add(points);

// Пауза 3D анимации, когда первый экран уходит из вида
const observer = new IntersectionObserver(entries => {
  isVisible = entries[0].isIntersecting;
}, { threshold: 0 });
observer.observe(document.getElementById('hero'));

let dmx = 0, dmy = 0;
document.addEventListener('mousemove', e => {
  dmx = (e.clientX / innerWidth - .5) * 2;
  dmy = -(e.clientY / innerHeight - .5) * 2;
});

let t = 0;
function anim() {
  requestAnimationFrame(anim);
  if (!isVisible) return; 
  
  t += 0.003;
  points.rotation.y = t * 0.07 + dmx * 0.07;
  points.rotation.x = dmy * 0.04;
  renderer.render(scene, camera);
}
anim();

// ── RESIZE ──
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ── KONAMI CODE ──
const K = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === K[ki]) {
    ki++;
    if (ki === K.length) {
      ki = 0;
      document.documentElement.style.filter = document.documentElement.style.filter ? '' : 'hue-rotate(180deg)';
    }
  } else ki = 0;
});