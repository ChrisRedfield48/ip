window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderText = document.getElementById('loader-text');

    setTimeout(() => { loaderText.innerText = "LOADING UI MODULES..."; }, 500);
    setTimeout(() => { loaderText.innerText = "CONNECTING TO DATABASE..."; }, 1000);
    setTimeout(() => { loaderText.innerText = "ACCESS GRANTED."; loaderText.style.color = "#22c55e"; }, 1500);

    setTimeout(() => { 
        preloader.classList.add('preloader-hidden'); 
        document.body.classList.remove('no-scroll');
    }, 1800);
});

document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

const targetDate = new Date('2029-03-08T00:00:00').getTime();

const uptimeEl = document.getElementById('uptime');
const countdownEl = document.getElementById('countdown');
let totalSeconds = 0;

setInterval(() => {
    totalSeconds++;
    const uh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const um = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const us = String(totalSeconds % 60).padStart(2, '0');
    if(uptimeEl) uptimeEl.innerText = `${uh}:${um}:${us}`;

    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance > 0) {
        const d = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(4, '0');
        const h = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        countdownEl.innerText = `${d}d ${h}h ${m}m`;
    } else {
        countdownEl.innerText = "GRADUATED";
    }
}, 1000);

fetch('https://api.open-meteo.com/v1/forecast?latitude=44.804&longitude=20.4651&current_weather=true')
    .then(res => res.json())
    .then(data => document.getElementById('weather').innerText = `${data.current_weather.temperature}°C, OK`)
    .catch(() => document.getElementById('weather').innerText = "OFFLINE");

const coffeeCountEl = document.getElementById('coffee-count');
const brewBtn = document.getElementById('brew-btn');
let coffeeCount = localStorage.getItem('systemFuel') || 0;

if(coffeeCountEl) coffeeCountEl.innerText = coffeeCount;

if(brewBtn) {
    brewBtn.addEventListener('click', () => {
        coffeeCount++;
        coffeeCountEl.innerText = coffeeCount;
        localStorage.setItem('systemFuel', coffeeCount);
        
        const originalText = brewBtn.innerText;
        brewBtn.innerText = "ГОТОВО!";
        brewBtn.style.borderColor = "#22c55e";
        brewBtn.style.color = "#22c55e";
        
        setTimeout(() => {
            brewBtn.innerText = originalText;
            brewBtn.style.borderColor = "var(--card-border)";
            brewBtn.style.color = "var(--text-primary)";
        }, 400);
    });
}

const termOutput = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');
const termWindow = document.getElementById('terminal-window');

termOutput.innerHTML = `<div>SYSTEM_READY.</div>`;
termWindow.addEventListener('click', () => termInput.focus());

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = termInput.value.trim().toLowerCase(); 
        termOutput.innerHTML += `<div><span style="color: #3b82f6;">></span> <span style="color: #fff;">${termInput.value}</span></div>`;
        if (val === 'help') {
            termOutput.innerHTML += `<div style="color: #a1a1aa; margin-bottom: 5px;">CMD: status, clear, love, wiki, matrix, danya, quote, advice</div>`;
        } 
        else if (val === 'status') {
            termOutput.innerHTML += `<div style="color: #22c55e;">[OK] HTML/CSS (100%). JS Engine: 5%.</div>`;
        } 
        else if (val === 'matrix') {
            document.body.style.filter = "hue-rotate(90deg) invert(0.9)";
            termOutput.innerHTML += `<div style="color: #22c55e;">WAKE UP, NIKITA...</div>`;
            setTimeout(() => document.body.style.filter = "none", 5000);
        }
        else if (val === 'clear') {
            termOutput.innerHTML = '';
        } 
        else if (val === 'love') {
            termOutput.innerHTML += `<div style="color: #ff3366;">Lov 1</div>`;
        }
        else if (val === 'danya') {
            termOutput.innerHTML += `<div style="color: #ef4444;">lox</div>`;
        }
        else if (val.includes('wiki')) {
            termOutput.innerHTML += `<div style="color: #3b82f6;">Wikipedia: OK.</div>`;
            setTimeout(() => window.open('https://ru.wikipedia.org', '_blank'), 1000);
        }
        else if (val === 'quote') {
            termOutput.innerHTML += `<div style="color: #a1a1aa; font-style: italic;">"Когда будущее перестало быть обещанием и стало угрозой?" — Невидимки</div>`;
        }
        else if (val === 'advice') {
            termOutput.innerHTML += `<div style="color: #3b82f6;">SYNCING WITH EXTERNAL API...</div>`;
            fetch('https://api.adviceslip.com/advice')
                .then(res => res.json())
                .then(data => {
                    termOutput.innerHTML += `<div style="color: #22c55e;">[INCOMING]: ${data.slip.advice}</div>`;
                    termWindow.scrollTop = termWindow.scrollHeight;
                })
                .catch(() => {
                    termOutput.innerHTML += `<div style="color: #ef4444;">API OFFLINE</div>`;
                });
        }
        else if (val !== '') {
            termOutput.innerHTML += `<div style="color: #ef4444;">Error.</div>`;
        }
        termInput.value = '';
        termWindow.scrollTop = termWindow.scrollHeight;
    }
});

const taskList = document.getElementById("task-list");
const extraTasks = [
  "○ Доработать портфолио",
  "○ Сдать на права в автошколе",
  "○ Настроить CI/CD"
];

extraTasks.forEach(task => {
  const li = document.createElement("li");
  li.className = "wait";
  li.textContent = task;
  taskList.appendChild(li);
});

const githubUsername = "ChrisRedfield48"; // <-- ТВОЙ GITHUB НИКНЕЙМ
const graph = document.getElementById("commit-graph");

function renderSkeleton() {
  graph.innerHTML = "";
  for (let i = 0; i < 364; i++) {
    const cell = document.createElement("div");
    cell.className = "commit-cell skeleton-cell";
    graph.appendChild(cell);
  }
}

async function renderGitHubActivity(username) {
  renderSkeleton();
  try {
    const response = await fetch(`https://github-contributions-api.jasonwood.me/v1/${username}`);
    const data = await response.json();
    graph.innerHTML = "";
    
    const contributions = data.contributions || [];
    const lastYear = contributions.slice(-364);

    lastYear.forEach(day => {
      const cell = document.createElement("div");
      cell.className = "commit-cell";
      const count = day.count;
      
      if (count > 0 && count <= 2) cell.classList.add("lvl-1");
      else if (count > 2 && count <= 5) cell.classList.add("lvl-2");
      else if (count > 5 && count <= 8) cell.classList.add("lvl-3");
      else if (count > 8) cell.classList.add("lvl-4");
      
      graph.appendChild(cell);
    });
  } catch (err) {
    graph.innerHTML = `<span style="color: var(--text-secondary); font-size: 12px; grid-column: 1 / -1;">GitHub API Error</span>`;
  }
}

renderGitHubActivity(githubUsername);

let keySequence = "";
document.addEventListener("keydown", (e) => {
  keySequence += e.key.toLowerCase();
  
  if (keySequence.includes("virus")) {
    window.open("https://ru.wikipedia.org/wiki/Umbrella", "_blank");
    keySequence = "";
  }
  
  if (keySequence.length > 15) {
    keySequence = keySequence.slice(-15);
  }
});