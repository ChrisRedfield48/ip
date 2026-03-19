window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const steps = [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4'),
    ];

    steps.forEach((s, i) => {
        setTimeout(() => {
            steps.forEach(x => x.classList.remove('active'));
            s.classList.add('active');
        }, i * 400);
        setTimeout(() => {
            s.classList.remove('active');
            s.classList.add('done');
        }, i * 400 + 350);
    });

    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('no-scroll');
        document.getElementById('main-container')?.classList.add('visible');
        animateSkillBars();
    }, 1900);
});

document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
});

const ACADEMY_TARGET = new Date('2029-03-08T00:00:00').getTime();
const ACADEMY_START  = new Date('2023-09-01T00:00:00').getTime();
const uptimeEl       = document.getElementById('uptime');
const countdownEl    = document.getElementById('countdown');
const cdProgress     = document.getElementById('countdown-progress');
let totalSeconds = 0;

setInterval(() => {
    totalSeconds++;
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2,'0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2,'0');
    const s = String(totalSeconds % 60).padStart(2,'0');
    if (uptimeEl) uptimeEl.innerText = `${h}:${m}:${s}`;

    const now  = Date.now();
    const dist = ACADEMY_TARGET - now;
    if (countdownEl) {
        if (dist > 0) {
            const d  = String(Math.floor(dist / 86400000)).padStart(4,'0');
            const ch = String(Math.floor((dist % 86400000) / 3600000)).padStart(2,'0');
            const cm = String(Math.floor((dist % 3600000) / 60000)).padStart(2,'0');
            countdownEl.innerText = `${d}d ${ch}h ${cm}m`;
            const total = ACADEMY_TARGET - ACADEMY_START;
            const done  = now - ACADEMY_START;
            const pct   = Math.min(100, Math.max(0, (done / total) * 100));
            if (cdProgress) cdProgress.style.width = pct + '%';
        } else {
            countdownEl.innerText = "GRADUATED ✓";
        }
    }
}, 1000);

const localTimeEl = document.getElementById('local-time');
function updateClock() {
    if (!localTimeEl) return;
    const now = new Date();
    localTimeEl.textContent = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' LOCAL';
}
setInterval(updateClock, 1000);
updateClock();

const WMO_DESC = {
    0: 'Ясно', 1: 'Преимущ. ясно', 2: 'Переменная облачность', 3: 'Пасмурно',
    45: 'Туман', 48: 'Изморозь',
    51: 'Лёгкая морось', 53: 'Морось', 55: 'Сильная морось',
    61: 'Слабый дождь', 63: 'Дождь', 65: 'Сильный дождь',
    71: 'Слабый снег', 73: 'Снег', 75: 'Сильный снег',
    80: 'Ливень', 81: 'Сильный ливень', 82: 'Шквал',
    95: 'Гроза', 96: 'Гроза с градом',
};

fetch('https://api.open-meteo.com/v1/forecast?latitude=44.804&longitude=20.4651&current_weather=true&hourly=relativehumidity_2m,windspeed_10m')
    .then(r => r.json())
    .then(d => {
        const cw   = d.current_weather;
        const wc   = cw.weathercode;
        const temp = cw.temperature;
        const wind = cw.windspeed;
        const icon = wc <= 1 ? '☀️' : wc <= 3 ? '⛅' : wc <= 48 ? '🌫️' : wc <= 67 ? '🌧️' : wc <= 77 ? '❄️' : wc <= 82 ? '🌩️' : '⛈️';
        const desc = WMO_DESC[wc] || 'Синоптик отдыхает';

        const iconEl   = document.getElementById('weather-icon');
        const tempEl   = document.getElementById('weather');
        const detailEl = document.getElementById('weather-detail');

        if (iconEl)   iconEl.innerText   = icon;
        if (tempEl)   tempEl.innerText   = `${temp}°C`;
        if (detailEl) detailEl.innerText = `${desc} · Ветер ${wind} км/ч`;
    })
    .catch(() => {
        const el = document.getElementById('weather');
        const detailEl = document.getElementById('weather-detail');
        if (el)       el.innerText       = "—";
        if (detailEl) detailEl.innerText = "OFFLINE";
    });

function animateSkillBars() {
    document.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 100);
    });
}

const termOutput = document.getElementById('terminal-output');
const termInput  = document.getElementById('terminal-input');
const termWindow = document.getElementById('terminal-window');
const history    = [];
let   histIdx    = -1;

const COMMANDS = {
    help: () => `<div class="t-dim">Commands: <span class="t-acc">status</span> · <span class="t-acc">skills</span> · <span class="t-acc">projects</span> · <span class="t-acc">about</span> · <span class="t-acc">clear</span> · <span class="t-acc">matrix</span> · <span class="t-acc">quote</span> · <span class="t-acc">advice</span> · <span class="t-acc">danya</span></div>`,

    status: () => `<div class="t-ok">[OK] HTML/CSS 100% · JS 10% · Python: QUEUED · Дисциплина: 90%</div>`,

    skills: () => [
        '<div class="t-acc">──── STACK ────</div>',
        '<div class="t-dim">Figma ········ ████████████ 100%</div>',
        '<div class="t-dim">HTML/CSS ····· ████████████ 100%</div>',
        '<div class="t-dim">JavaScript ··· █░░░░░░░░░░░  10%</div>',
        '<div class="t-dim">Python/AI ···· ░░░░░░░░░░░░   0%</div>',
    ].join(''),

    projects: () => [
        '<div class="t-acc">──── PROJECTS ────</div>',
        '<div><a href="https://chrisredfield48.github.io/graphic-designer/" target="_blank" class="t-link">↗ graphic-designer</a></div>',
        '<div><a href="https://chrisredfield48.github.io/Cyberpunk/" target="_blank" class="t-link">↗ cyberpunk-promo</a></div>',
        '<div><a href="https://chrisredfield48.github.io/Createx/" target="_blank" class="t-link">↗ createx-ui</a></div>',
    ].join(''),

    about: () => `<div class="t-dim">Никита Ип · Web Developer · Serbia<br>Plans: Python → AI → Europe transfer</div>`,

    clear: () => { termOutput.innerHTML = ''; return null; },

    matrix: () => {
        document.body.style.transition = 'filter 0.5s';
        document.body.style.filter = 'hue-rotate(90deg) brightness(0.9)';
        setTimeout(() => { document.body.style.filter = 'none'; }, 5000);
        return `<div class="t-ok">WAKE UP, NIKITA...</div>`;
    },

    quote: () => `<div class="t-dim">"Когда будущее перестало быть обещанием и стало угрозой?"<br>— Невидимки</div>`,

    danya: () => `<div class="t-err">ACCESS DENIED · CLEARANCE LEVEL INSUFFICIENT</div>`,

    advice: async () => {
        addLine(`<div class="t-acc">FETCHING ADVICE...</div>`);
        try {
            const r = await fetch('https://api.adviceslip.com/advice');
            const d = await r.json();
            addLine(`<div class="t-ok">[INCOMING] ${d.slip.advice}</div>`);
        } catch {
            addLine(`<div class="t-err">API OFFLINE</div>`);
        }
        return null;
    }
};

function addLine(html) {
    if (!termOutput || !termWindow) return;
    const div = document.createElement('div');
    div.innerHTML = html;
    termOutput.appendChild(div);
    while (termOutput.children.length > 30) termOutput.removeChild(termOutput.firstChild);
    termWindow.scrollTop = termWindow.scrollHeight;
}

if (termOutput) addLine(`<div class="t-ok">SYSTEM_READY. TYPE 'help' FOR COMMANDS.</div>`);
if (termWindow) termWindow.addEventListener('click', () => termInput?.focus());

if (termInput) {
    termInput.addEventListener('keydown', async e => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            histIdx = Math.min(histIdx + 1, history.length - 1);
            termInput.value = history[histIdx] || '';
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            histIdx = Math.max(histIdx - 1, -1);
            termInput.value = histIdx < 0 ? '' : history[histIdx];
            return;
        }
        if (e.key !== 'Enter') return;

        const raw = termInput.value.trim();
        const val = raw.toLowerCase();
        termInput.value = '';
        histIdx = -1;
        if (!raw) return;

        history.unshift(raw);
        if (history.length > 50) history.pop();

        addLine(`<div><span class="t-ok">nikita@system:~$</span> <span style="color:#eeeef0">${raw}</span></div>`);
        const fn  = COMMANDS[val] || (() => `<div class="t-err">command not found: '${raw}' — try 'help'</div>`);
        const out = await fn();
        if (out !== null && out !== undefined) addLine(out);
    });
}

const MOODS = {
    focus: 'Максимальная продуктивность. Цель — код и прогресс.',
    grind: 'Полный гринд. Задачи, дедлайны, рост. Без остановок.',
    rest:  'Отдых и восстановление. Тело и разум перезаряжаются.',
    gym:   'Тренировка начата. Сила, концентрация, результат.'
};

document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active-mood'));
        btn.classList.add('active-mood');
        const desc = document.getElementById('mood-desc');
        if (desc) {
            desc.style.transition = 'opacity 0.15s ease';
            desc.style.opacity = '0';
            setTimeout(() => {
                desc.textContent = MOODS[btn.dataset.mood] || '';
                desc.style.opacity = '1';
            }, 150);
        }
    });
});

const epochEl    = document.getElementById('ai-epoch');
const lossEl     = document.getElementById('ai-loss');
const accEl      = document.getElementById('ai-acc');
const logEl      = document.getElementById('ai-log');
const progressEl = document.getElementById('ai-progress');
const pctEl      = document.getElementById('ai-pct');

const AI_LOGS = [
    'Adjusting weights...', 'Backpropagation active',
    'Optimizing gradient descent', 'Validating batch size 64',
    'Dropout rate applied: 0.2', 'Computing loss function',
    'Updating tensor matrix', 'Extracting features...',
    'Layer 3 forward pass', 'Regularization L2 active',
    'Learning rate: 0.001', 'Batch norm applied',
];

let epoch = 1, loss = 0.999, acc = 10.0;

if (epochEl) {
    setInterval(() => {
        if (epoch < 500) {
            epoch = Math.min(500, epoch + Math.floor(Math.random() * 4) + 1);
            loss  = +(loss * 0.987).toFixed(4);
            acc   = +Math.min(99.9, acc + Math.random() * 1.0).toFixed(1);
            epochEl.innerText = epoch;
            lossEl.innerText  = loss;
            accEl.innerText   = acc + '%';
            const pct = (epoch / 500 * 100).toFixed(1);
            if (progressEl) progressEl.style.width = pct + '%';
            if (pctEl) pctEl.innerText = pct + '%';
            const line = document.createElement('div');
            line.textContent = `> [${epoch}/500] ${AI_LOGS[Math.floor(Math.random() * AI_LOGS.length)]}`;
            logEl.appendChild(line);
            while (logEl.children.length > 4) logEl.removeChild(logEl.firstChild);
        } else {
            epoch = 1; loss = 0.999; acc = 10.0;
            logEl.innerHTML = '<div>> RESTARTING TRAINING CYCLE...</div>';
        }
    }, 700);
}

let keySeq = '';
document.addEventListener('keydown', e => {
    keySeq += e.key.toLowerCase();
    if (keySeq.includes('virus')) { window.open('https://ru.wikipedia.org/wiki/Umbrella', '_blank'); keySeq = ''; }
    if (keySeq.length > 20) keySeq = keySeq.slice(-20);
});