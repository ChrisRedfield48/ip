// ── PRELOADER
window.addEventListener('load', () => {
  const steps = ['s1','s2','s3','s4'].map(id => document.getElementById(id));
  steps.forEach((s, i) => {
    setTimeout(() => { steps.forEach(x => x.classList.remove('active')); s.classList.add('active'); }, i * 400);
    setTimeout(() => { s.classList.remove('active'); s.classList.add('done'); }, i * 400 + 340);
  });
  setTimeout(() => {
    document.getElementById('preloader').classList.add('preloader-hidden');
    document.body.classList.remove('no-scroll');
    document.getElementById('app').classList.add('visible');
    animateBars();
  }, 1900);
});

// ── TIMERS
const T_TARGET = new Date('2029-03-08T00:00:00').getTime();
const T_START  = new Date('2023-09-01T00:00:00').getTime();
let secs = 0;

setInterval(() => {
  secs++;
  const el = document.getElementById('uptime');
  if (el) el.textContent = [Math.floor(secs/3600), Math.floor((secs%3600)/60), secs%60]
    .map(n => String(n).padStart(2,'0')).join(':');

  const now = Date.now(), dist = T_TARGET - now;
  const cdEl = document.getElementById('countdown');
  if (cdEl && dist > 0) {
    const d = String(Math.floor(dist/86400000)).padStart(4,'0');
    const h = String(Math.floor((dist%86400000)/3600000)).padStart(2,'0');
    const m = String(Math.floor((dist%3600000)/60000)).padStart(2,'0');
    cdEl.textContent = `${d}d ${h}h ${m}m`;
    const pct = Math.min(100, Math.max(0, (now - T_START) / (T_TARGET - T_START) * 100));
    const pg = document.getElementById('cd-prog');
    if (pg) pg.style.width = pct + '%';

    // stats
    const statD = document.getElementById('stat-days');
    if (statD) statD.textContent = String(Math.floor(dist/86400000));
    const statP = document.getElementById('stat-pct');
    if (statP) statP.textContent = pct.toFixed(0) + '%';
  } else if (cdEl) { cdEl.textContent = 'GRADUATED ✓'; }
}, 1000);

// years removed

// local time
const ltEl = document.getElementById('local-time');
function tick() {
  if (!ltEl) return;
  ltEl.textContent = new Date().toLocaleTimeString('ru-RU', {hour:'2-digit',minute:'2-digit',second:'2-digit'}) + ' LOCAL';
}
setInterval(tick, 1000); tick();

// ── WEATHER (real API + Belgrade simulation fallback)
const WMO = {0:'Ясно',1:'Преимущ. ясно',2:'Переменная облачность',3:'Пасмурно',45:'Туман',48:'Изморозь',51:'Лёгкая морось',53:'Морось',55:'Сильная морось',61:'Слабый дождь',63:'Дождь',65:'Сильный дождь',71:'Слабый снег',73:'Снег',75:'Сильный снег',80:'Ливень',81:'Сильный ливень',82:'Шквал',95:'Гроза',96:'Гроза с градом'};
const wmoIcon = wc => wc===0?'☀️':wc<=2?'🌤️':wc===3?'☁️':wc<=48?'🌫️':wc<=55?'🌦️':wc<=67?'🌧️':wc<=77?'❄️':wc<=82?'🌩️':'⛈️';

// Realistic Belgrade climate by month [min,max] C
const BG_CLIMATE = [[-3,5],[-1,8],[3,14],[8,20],[13,26],[17,30],[19,33],[19,32],[14,26],[8,19],[2,11],[-2,6]];
const BG_CODES = [[0,1,2,3,71,73,61],[0,1,2,3,61,63],[0,1,2,63,80],[0,0,1,2,3,80,95],[0,0,0,1,2,95],[0,0,0,0,1,2],[0,0,0,0,0,1,2],[0,0,0,1,2,95],[0,0,1,2,3,63],[0,1,2,3,61,63],[1,2,3,61,63,71],[2,3,61,71,73]];

let simTemp, simWc, simWind, wLastFetch = null;

function bgSimulate() {
  const m = new Date().getMonth();
  const h = new Date().getHours();
  const [lo, hi] = BG_CLIMATE[m];
  const diurnal = Math.sin((h - 6) / 24 * Math.PI * 2) * (hi - lo) * 0.35;
  simTemp = +(lo + (hi - lo) * 0.5 + diurnal + (Math.random() - 0.5) * 1.5).toFixed(1);
  const codes = BG_CODES[m];
  simWc = codes[Math.floor(Math.random() * codes.length)];
  simWind = +(5 + Math.random() * 20).toFixed(1);
}

function applyWeather(temp, wc, wind, source) {
  const iEl=document.getElementById('w-icon'), tEl=document.getElementById('w-temp'), dEl=document.getElementById('w-detail'), uEl=document.getElementById('w-updated');
  if(iEl){iEl.style.cssText='transform:scale(0.7);opacity:0;transition:transform .4s,opacity .4s';setTimeout(()=>{iEl.textContent=wmoIcon(wc);iEl.style.transform='scale(1)';iEl.style.opacity='1';},200);}
  if(tEl){tEl.style.opacity='0';setTimeout(()=>{tEl.textContent=temp+'°';tEl.style.transition='opacity .4s';tEl.style.opacity='1';},200);}
  if(dEl) dEl.textContent=(WMO[wc]||'—')+' · Ветер '+wind+' км/ч';
  wLastFetch=Date.now();
  if(uEl) uEl.textContent= source==='live' ? '🟢 Live · Обновлено только что' : '🟡 Симуляция · Белград';
}

function fetchWeather() {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=44.804&longitude=20.4651&current_weather=true&timezone=Europe%2FBelgrade')
    .then(r=>r.json()).then(d=>{
      const cw=d.current_weather;
      applyWeather(cw.temperature, cw.weathercode, cw.windspeed, 'live');
    }).catch(()=>{
      bgSimulate();
      applyWeather(simTemp, simWc, simWind, 'sim');
    });
}

fetchWeather();
setInterval(fetchWeather, 10*60*1000);
setInterval(()=>{
  const uEl=document.getElementById('w-updated');
  if(!uEl) return;
  if(uEl.textContent.includes('Симуляция')) {
    bgSimulate();
    applyWeather(simTemp, simWc, simWind, 'sim');
  } else if(wLastFetch) {
    const m=Math.floor((Date.now()-wLastFetch)/60000);
    if(m>0) uEl.textContent='🟢 Live · Обновлено '+m+' мин назад';
  }
}, 45000);

// ── SKILL BARS
function animateBars() {
  document.querySelectorAll('.sbar-fill[data-w]').forEach(b => {
    setTimeout(()=>{ b.style.width = b.dataset.w + '%'; }, 100);
  });
}

// ── TERMINAL
const termOut = document.getElementById('term-out');
const termInp = document.getElementById('term-inp');
const termWin = document.getElementById('term-win');
const hist = []; let histIdx = -1;

const CMD = {
  help: () => `<span class="t-d">Commands: <span class="t-y">status skills projects about clear matrix quote advice danya</span></span>`,
  status: () => `<span class="t-g">[OK] HTML/CSS 100% · JS 10% · Python QUEUED · Дисциплина 90%</span>`,
  skills: () => `<span class="t-y">──── STACK ────</span>\n<span class="t-d">Figma/HTML/CSS ···· ████████████ 100%</span>\n<span class="t-d">JavaScript ········ █░░░░░░░░░░░  10%</span>\n<span class="t-d">Python/AI ········· ░░░░░░░░░░░░   0%</span>`,
  projects: () => `<span class="t-y">──── PROJECTS ────</span>\n<a href="https://chrisredfield48.github.io/graphic-designer/" target="_blank" class="t-lnk">↗ graphic-designer</a>\n<a href="https://chrisredfield48.github.io/Cyberpunk/" target="_blank" class="t-lnk">↗ cyberpunk-promo</a>\n<a href="https://chrisredfield48.github.io/Createx/" target="_blank" class="t-lnk">↗ createx-ui</a>`,
  about: () => `<span class="t-d">Никита Ип · Web Developer · Serbia\nPlans: Python → AI → Europe</span>`,
  clear: () => { termOut.innerHTML = ''; return null; },
  matrix: () => {
    document.body.style.transition='filter .5s';
    document.body.style.filter='hue-rotate(60deg) brightness(0.85)';
    setTimeout(()=>document.body.style.filter='none',5000);
    return `<span class="t-g">WAKE UP, NIKITA...</span>`;
  },
  quote: () => `<span class="t-d">"Когда будущее перестало быть обещанием и стало угрозой?"\n— Невидимки</span>`,
  danya: () => `<span class="t-r">ACCESS DENIED · CLEARANCE LEVEL INSUFFICIENT</span>`,
  advice: async () => {
    addLine(`<span class="t-y">FETCHING ADVICE...</span>`);
    try {
      const r = await fetch('https://api.adviceslip.com/advice');
      const d = await r.json();
      addLine(`<span class="t-g">[INCOMING] ${d.slip.advice}</span>`);
    } catch { addLine(`<span class="t-r">API OFFLINE</span>`); }
    return null;
  }
};

function addLine(html) {
  if (!termOut || !termWin) return;
  const d = document.createElement('div');
  d.innerHTML = html;
  termOut.appendChild(d);
  while (termOut.children.length > 30) termOut.removeChild(termOut.firstChild);
  termWin.scrollTop = termWin.scrollHeight;
}

addLine(`<span class="t-g">NIP.SYS READY. TYPE 'help' FOR COMMANDS.</span>`);
termWin?.addEventListener('click', ()=>termInp?.focus());

termInp?.addEventListener('keydown', async e => {
  if (e.key==='ArrowUp') { e.preventDefault(); histIdx=Math.min(histIdx+1,hist.length-1); termInp.value=hist[histIdx]||''; return; }
  if (e.key==='ArrowDown') { e.preventDefault(); histIdx=Math.max(histIdx-1,-1); termInp.value=histIdx<0?'':hist[histIdx]; return; }
  if (e.key!=='Enter') return;
  const raw=termInp.value.trim(); termInp.value=''; histIdx=-1;
  if (!raw) return;
  hist.unshift(raw); if (hist.length>50) hist.pop();
  addLine(`<span class="t-y">nikita@nip:~$</span> <span class="t-a">${raw}</span>`);
  const fn = CMD[raw.toLowerCase()] || (() => `<span class="t-r">command not found: '${raw}' — try 'help'</span>`);
  const out = await fn();
  if (out != null) addLine(out);
});

// ── MOOD
const MOODS = {
  focus:'Максимальная продуктивность. Цель — код и прогресс.',
  grind:'Полный гринд. Задачи, дедлайны, рост. Без остановок.',
  rest:'Отдых и восстановление. Тело и разум перезаряжаются.',
  gym:'Тренировка начата. Сила, концентрация, результат.'
};
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const d = document.getElementById('mood-desc');
    if (d) { d.style.opacity='0'; setTimeout(()=>{ d.textContent=MOODS[btn.dataset.mood]||''; d.style.opacity='1'; },150); }
  });
});

// ── AI
let epoch=1, loss=0.999, acc=10.0;
const AI_LOGS=['Adjusting weights...','Backpropagation active','Optimizing gradient','Validating batch 64','Dropout 0.2 applied','Computing loss fn','Updating tensors','Feature extraction','Layer 3 fwd pass','L2 regularization','LR: 0.001','Batch norm applied'];
setInterval(()=>{
  if (epoch<500) {
    epoch=Math.min(500,epoch+Math.floor(Math.random()*4)+1);
    loss=+(loss*0.987).toFixed(4); acc=+Math.min(99.9,acc+Math.random()).toFixed(1);
    const eEl=document.getElementById('ai-epoch'),lEl=document.getElementById('ai-loss'),aEl=document.getElementById('ai-acc');
    if(eEl) eEl.textContent=epoch; if(lEl) lEl.textContent=loss; if(aEl) aEl.textContent=acc+'%';
    const pct=(epoch/500*100).toFixed(1);
    const pg=document.getElementById('ai-prog'), ptEl=document.getElementById('ai-pct');
    if(pg) pg.style.width=pct+'%'; if(ptEl) ptEl.textContent=pct+'%';
    const log=document.getElementById('ai-log');
    if(log){const l=document.createElement('div');l.textContent=`> [${epoch}/500] ${AI_LOGS[Math.floor(Math.random()*AI_LOGS.length)]}`;log.appendChild(l);while(log.children.length>4)log.removeChild(log.firstChild);}
  } else { epoch=1;loss=0.999;acc=10.0;const log=document.getElementById('ai-log');if(log)log.innerHTML='<div>> RESTARTING TRAINING CYCLE...</div>'; }
}, 700);

// ── EASTER EGG
let ks='';
document.addEventListener('keydown',e=>{
  ks+=e.key.toLowerCase();
  if(ks.includes('virus')){window.open('https://ru.wikipedia.org/wiki/Umbrella','_blank');ks='';}
  if(ks.length>20) ks=ks.slice(-20);
});