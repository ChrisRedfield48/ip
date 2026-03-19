function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const loaderText = document.getElementById("loader-text");

  setTimeout(() => {
    loaderText.textContent = "LOADING UI MODULES...";
  }, 500);
  setTimeout(() => {
    loaderText.textContent = "CONNECTING TO DATABASE...";
  }, 1000);
  setTimeout(() => {
    loaderText.textContent = "ACCESS GRANTED.";
    loaderText.classList.add("loader-text--success");
  }, 1500);
  setTimeout(() => {
    preloader.classList.add("preloader-hidden");
    document.body.classList.remove("no-scroll");
  }, 1800);
});

document.querySelectorAll(".bento-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  });
});

const targetDate = new Date("2029-03-08T00:00:00+01:00").getTime();

const uptimeEl = document.getElementById("uptime");
const countdownEl = document.getElementById("countdown");
let totalSeconds = 0;

setInterval(() => {
  totalSeconds++;
  const uh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const um = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const us = String(totalSeconds % 60).padStart(2, "0");
  if (uptimeEl) uptimeEl.textContent = `${uh}:${um}:${us}`;

  const distance = targetDate - Date.now();
  if (distance > 0) {
    const d = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
      4,
      "0",
    );
    const h = String(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    ).padStart(2, "0");
    const m = String(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    ).padStart(2, "0");
    if (countdownEl) countdownEl.textContent = `${d}d ${h}h ${m}m`;
  } else {
    if (countdownEl) countdownEl.textContent = "GRADUATED";
  }
}, 1000);

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=44.804&longitude=20.4651&current_weather=true",
)
  .then((res) => res.json())
  .then((data) => {
    const el = document.getElementById("weather");
    if (el) el.textContent = `${data.current_weather.temperature}°C, OK`;
  })
  .catch(() => {
    const el = document.getElementById("weather");
    if (el) el.textContent = "OFFLINE";
  });

const coffeeCountEl = document.getElementById("coffee-count");
const brewBtn = document.getElementById("brew-btn");

let coffeeCount = parseInt(localStorage.getItem("systemFuel"), 10) || 0;
if (coffeeCountEl) coffeeCountEl.textContent = coffeeCount;

if (brewBtn) {
  brewBtn.addEventListener("click", () => {
    if (brewBtn.disabled) return;

    coffeeCount++;
    if (coffeeCountEl) coffeeCountEl.textContent = coffeeCount;
    localStorage.setItem("systemFuel", coffeeCount);

    brewBtn.disabled = true;
    brewBtn.textContent = "ГОТОВО!";
    brewBtn.classList.add("brewing");

    setTimeout(() => {
      brewBtn.textContent = "+ Сварить кофе";
      brewBtn.classList.remove("brewing");
      brewBtn.disabled = false;
    }, 400);
  });
}

const termOutput = document.getElementById("terminal-output");
const termInput = document.getElementById("terminal-input");
const termWindow = document.getElementById("terminal-window");

if (termOutput && termInput && termWindow) {
  termOutput.innerHTML = `<div>SYSTEM_READY.</div>`;
  termWindow.addEventListener("click", () => termInput.focus());

  termInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const raw = termInput.value;
    const val = raw.trim().toLowerCase();

    termOutput.innerHTML += `<div><span style="color: var(--accent);">></span> <span style="color: var(--text-primary);">${escapeHtml(raw)}</span></div>`;

    if (val === "help") {
      termOutput.innerHTML += `<div style="color: var(--text-secondary); margin-bottom: 5px;">CMD: status, clear, love, wiki, matrix, danya, quote, advice</div>`;
    } else if (val === "status") {
      termOutput.innerHTML += `<div style="color: var(--green);">[OK] HTML/CSS (100%). JS Engine: 10%.</div>`;
    } else if (val === "matrix") {
      document.body.style.filter = "hue-rotate(90deg) invert(0.9)";
      termOutput.innerHTML += `<div style="color: var(--green);">WAKE UP, NIKITA...</div>`;
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 5000);
    } else if (val === "clear") {
      termOutput.innerHTML = "";
    } else if (val === "love") {
      termOutput.innerHTML += `<div style="color: #ff3366;">Lov 1</div>`;
    } else if (val === "danya") {
      termOutput.innerHTML += `<div style="color: var(--accent);">lox</div>`;
    } else if (val === "wiki") {
      termOutput.innerHTML += `<div style="color: var(--accent);">Wikipedia: OK.</div>`;
      setTimeout(() => window.open("https://ru.wikipedia.org", "_blank"), 1000);
    } else if (val === "quote") {
      termOutput.innerHTML += `<div style="color: var(--text-secondary); font-style: italic;">"Когда будущее перестало быть обещанием и стало угрозой?" — Невидимки</div>`;
    } else if (val === "advice") {
      termOutput.innerHTML += `<div style="color: var(--accent);">SYNCING WITH EXTERNAL API...</div>`;
      fetch("https://api.adviceslip.com/advice")
        .then((res) => res.json())
        .then((data) => {
          termOutput.innerHTML += `<div style="color: var(--green);">[INCOMING]: ${escapeHtml(data.slip.advice)}</div>`;
          termWindow.scrollTop = termWindow.scrollHeight;
        })
        .catch(() => {
          termOutput.innerHTML += `<div style="color: #ef4444;">API OFFLINE</div>`;
        });
    } else if (val !== "") {
      termOutput.innerHTML += `<div style="color: #ef4444;">Error: unknown command. Type 'help'.</div>`;
    }

    termInput.value = "";
    termWindow.scrollTop = termWindow.scrollHeight;
  });
}

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

const epochEl = document.getElementById("ai-epoch");
const lossEl = document.getElementById("ai-loss");
const accEl = document.getElementById("ai-acc");
const logEl = document.getElementById("ai-log");
const progressEl = document.getElementById("ai-progress");

let currentEpoch = 1;
let currentLoss = 0.999;
let currentAcc = 10.0;

const aiLogs = [
  "Adjusting weights...",
  "Backpropagation active",
  "Optimizing gradient descent",
  "Validating batch size 64",
  "Dropout rate applied: 0.2",
  "Computing loss function",
  "Updating tensor matrix",
  "Extracting features...",
];

if (epochEl && lossEl && accEl && logEl && progressEl) {
  setInterval(() => {
    if (currentEpoch < 500) {
      currentEpoch += Math.floor(Math.random() * 4) + 1;
      if (currentEpoch > 500) currentEpoch = 500;

      currentLoss = parseFloat((currentLoss * 0.985).toFixed(4));
      currentAcc = parseFloat(
        Math.min(99.9, currentAcc + Math.random() * 1.2).toFixed(1),
      );

      epochEl.textContent = currentEpoch;
      lossEl.textContent = currentLoss;
      accEl.textContent = currentAcc + "%";
      progressEl.style.width = (currentEpoch / 500) * 100 + "%";

      const newLog = document.createElement("div");
      newLog.textContent = `> [${currentEpoch}/500] ${aiLogs[Math.floor(Math.random() * aiLogs.length)]}`;
      logEl.appendChild(newLog);

      if (logEl.children.length > 3) {
        logEl.removeChild(logEl.firstChild);
      }
    } else {
      currentEpoch = 1;
      currentLoss = 0.999;
      currentAcc = 10.0;
      logEl.innerHTML = "<div>> RESTARTING TRAINING CYCLE...</div>";
    }
  }, 800);
}
